from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_core.documents import Document
import json

with open("RAG/chatbot/schemes.json") as f:
    schemes = json.load(f)

docs = []
for s in schemes:
    content = f"""
    Scheme_ID: {s['scheme_id']}
    Scheme_Name: {s['scheme_name']}
    Category: {s['category']}
    Eligibility: {s['eligibility']}
    Benefits: {s['benefits']}
    Documents: {s['documents_required']}
    State: {s['state']}
    Description: {s['description_simple']}
    """
    docs.append(Document(page_content=content))

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

db = FAISS.from_documents(docs, embeddings)

db.save_local("RAG/chatbot/jansahay_vector_db")
print("Vector Data Saved")
