import json
from langchain_core.documents import Document
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings

# -----------------------------
# USER PROFILE
# -----------------------------
user_profile = {
    "age": 25,
    "gender": "Female",
    "income": 180000,
    "state": "Bihar",
    "category": "BPL",
    "occupation": "None"
}

# -----------------------------
# LOAD SCHEMES
# -----------------------------
with open("schemes.json", "r", encoding="utf-8") as f:
    schemes = json.load(f)

# -----------------------------
# ELIGIBILITY FUNCTION
# -----------------------------
def is_eligible(user, scheme):
    e = scheme["eligibility"]

    if "min_age" in e and user["age"] < e["min_age"]:
        return False
    if "max_age" in e and user["age"] > e["max_age"]:
        return False
    if "max_income" in e and user["income"] > e["max_income"]:
        return False
    if "gender" in e and e["gender"] != "Any":
        if user["gender"] != e["gender"]:
            return False
    if "category_allowed" in e:
        if user["category"] not in e["category_allowed"]:
            return False
    if "occupation" in e:
        if user["occupation"] != e["occupation"]:
            return False

    return True

# -----------------------------
# FILTER ELIGIBLE SCHEMES
# -----------------------------
eligible_schemes = [s for s in schemes if is_eligible(user_profile, s)]

if not eligible_schemes:
    print("❌ No eligible schemes found")
    exit()

print(f"✅ Eligible schemes: {len(eligible_schemes)}")

# -----------------------------
# BUILD VECTOR DB FROM ELIGIBLE ONLY
# -----------------------------
documents = []

for scheme in eligible_schemes:
    text = f"""
    Scheme Name: {scheme['scheme_name']}
    Category: {scheme['category']}
    State: {scheme['state']}
    Eligibility: {scheme['eligibility']}
    Benefits: {scheme['benefits']}
    Documents Required: {', '.join(scheme['documents_required'])}
    Description: {scheme['description_simple']}
    """
    documents.append(Document(page_content=text))

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

eligible_db = FAISS.from_documents(documents, embeddings)

# -----------------------------
# USER QUESTION
# -----------------------------
question = "Which schemes can I apply for?"

# -----------------------------
# RAG SEARCH (100% ELIGIBLE)
# -----------------------------
results = eligible_db.similarity_search(question, k=3)

print("\n📌 ELIGIBLE & RELEVANT SCHEMES:\n")

for doc in results:
    print("----------------------------------")
    print(doc.page_content)
