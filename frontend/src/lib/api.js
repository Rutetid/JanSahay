import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const session = localStorage.getItem('supabase_session');
    if (session) {
      const { access_token } = JSON.parse(session);
      if (access_token) {
        config.headers.Authorization = `Bearer ${access_token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and not already retried, try to refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const session = localStorage.getItem('supabase_session');
        if (session) {
          const { refresh_token } = JSON.parse(session);
          
          if (refresh_token) {
            const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
              refresh_token,
            });

            const { session: newSession } = response.data;
            localStorage.setItem('supabase_session', JSON.stringify(newSession));

            // Retry original request with new token
            originalRequest.headers.Authorization = `Bearer ${newSession.access_token}`;
            return apiClient(originalRequest);
          }
        }
      } catch (refreshError) {
        // Refresh failed, logout user
        localStorage.removeItem('supabase_session');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  signup: async (email, password, name) => {
    const response = await apiClient.post('/auth/signup', { email, password, name });
    return response.data;
  },

  login: async (email, password) => {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },

  getMe: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  verifyEmail: async (token, type) => {
    const response = await apiClient.post('/auth/verify-email', { token, type });
    return response.data;
  },

  resendVerification: async (email) => {
    const response = await apiClient.post('/auth/resend-verification', { email });
    return response.data;
  },

  refreshToken: async (refreshToken) => {
    const response = await apiClient.post('/auth/refresh', { refresh_token: refreshToken });
    return response.data;
  },
};

// User API
export const userAPI = {
  getProfile: async (userId) => {
    const response = await apiClient.get(`/users/${userId}/profile`);
    return response.data;
  },

  updateProfile: async (userId, profileData) => {
    const response = await apiClient.put(`/users/${userId}/profile`, profileData);
    return response.data;
  },

  getSavedSchemes: async (userId) => {
    const response = await apiClient.get(`/users/${userId}/saved-schemes`);
    return response.data;
  },

  saveScheme: async (userId, schemeId) => {
    const response = await apiClient.post(`/users/${userId}/saved-schemes`, { schemeId });
    return response.data;
  },

  removeSavedScheme: async (userId, schemeId) => {
    const response = await apiClient.delete(`/users/${userId}/saved-schemes/${schemeId}`);
    return response.data;
  },
};

// Scheme API
export const schemeAPI = {
  discover: async (profileData) => {
    const response = await apiClient.post('/schemes/discover', profileData);
    return response.data;
  },

  getScheme: async (schemeId) => {
    const response = await apiClient.get(`/schemes/${schemeId}`);
    return response.data;
  },

  getAllSchemes: async (params = {}) => {
    const response = await apiClient.get('/schemes', { params });
    return response.data;
  },
};

// Document API
export const documentAPI = {
  getDocuments: async (userId) => {
    const response = await apiClient.get(`/documents/${userId}`);
    return response.data;
  },

  updateDocument: async (userId, documentId, hasDocument) => {
    const response = await apiClient.put(`/documents/${userId}/${documentId}`, { hasDocument });
    return response.data;
  },

  uploadDocument: async (userId, documentType, fileName, fileData) => {
    const response = await apiClient.post(`/documents/${userId}/upload`, {
      documentType,
      fileName,
      fileData,
    });
    return response.data;
  },

  deleteDocumentFile: async (userId, documentId) => {
    const response = await apiClient.delete(`/documents/${userId}/${documentId}/file`);
    return response.data;
  },
};

export default apiClient;
