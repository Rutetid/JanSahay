#!/bin/bash
uvicorn RAG.main:app --host 0.0.0.0 --port $PORT
