from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

db = FAISS.load_local(
    "RAG/chatbot/jansahay_vector_db",
    embeddings,
    allow_dangerous_deserialization=True
)

app = FastAPI(title="JanSahay RAG API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class UserProfile(BaseModel):
    age: Optional[int] = None
    gender: Optional[str] = None
    income: Optional[int] = None
    state: Optional[str] = None
    occupation: Optional[str] = None
    caste: Optional[str] = None
    residency: Optional[str] = None

@app.post("/find-schemes")
def find_schemes(user: UserProfile):
    try:
        query_parts = []

        if user.age is not None:
            query_parts.append(f"{user.age} year old")

        if user.occupation:
            query_parts.append(user.occupation)

        if user.caste:
            query_parts.append(user.caste)

        if user.gender:
            query_parts.append(user.gender)

        if user.state:
            query_parts.append(f"in {user.state}")

        if user.income is not None:
            query_parts.append(f"with income under {user.income}")

        question = "Find government schemes for " + " ".join(query_parts)

        try:
            results = db.similarity_search_with_score(question, k=10)
        except Exception:
            results = [(doc, 0.5) for doc in db.similarity_search(question, k=10)]

        response = []
        SIMILARITY_THRESHOLD = 1.0

        for idx, (doc, score) in enumerate(results, start=1):
            if score <= SIMILARITY_THRESHOLD:
                response.append({
                    "index": idx,
                    "scheme_text": doc.page_content,
                    "relevance_score": float(score)
                })
            if len(response) == 5:
                break

        if not response:
            return {
                "query": question,
                "total_schemes": 0,
                "message": "No government schemes found matching the user profile."
            }

        return {
            "query": question,
            "total_schemes": len(response),
            "results": response
        }

    except Exception as e:
        return {
            "error": "Internal processing error",
            "details": str(e)
        }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "RAG.main:app",
        host="0.0.0.0",
        port=8000,
        reload=False
    )
