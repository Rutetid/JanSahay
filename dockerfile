# Use Python 3.10
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy everything
COPY . /app

# Upgrade pip and install dependencies
RUN pip install --upgrade pip
RUN pip install -r RAG/requirements.txt

# Expose default HF Spaces port
EXPOSE 7860

# Start FastAPI
CMD ["uvicorn", "RAG.main:app", "--host", "0.0.0.0", "--port", "7860"]
