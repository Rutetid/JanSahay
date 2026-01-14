from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

db = FAISS.load_local(
    "jansahay_vector_db",
    embeddings,
    allow_dangerous_deserialization=True
)

# question = input("Ask your question: ")
results = db.similarity_search(
    "Scheme for farmers?",
    k=2
)

for r in results:
    print("-----")
    print(r.page_content)
