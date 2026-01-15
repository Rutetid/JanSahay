import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const RAG_BASE_URL = process.env.RAG_SERVICE_URL || 'http://localhost:7860';

// Create axios instance for RAG service
const ragClient = axios.create({
  baseURL: RAG_BASE_URL,
  timeout: 30000, // 30 seconds timeout for RAG operations
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
ragClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('RAG Service Error:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    return Promise.reject(error);
  }
);

export default ragClient;
