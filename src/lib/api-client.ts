import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { getSession } from 'next-auth/react';

// API Client Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';
const API_TIMEOUT = parseInt(process.env.API_TIMEOUT || '30000', 10);

// Create Axios Instance
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor - Add Auth Token
apiClient.interceptors.request.use(
  async (config) => {
    // Get session from NextAuth
    const session = await getSession();

    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor - Handle Errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;

      if (status === 401) {
        // Unauthorized - redirect to login
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      } else if (status === 403) {
        // Forbidden - insufficient permissions
        console.error('Access forbidden');
      } else if (status >= 500) {
        // Server error
        console.error('Server error:', error.response.data);
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('No response from server');
    } else {
      // Error setting up request
      console.error('Request setup error:', error.message);
    }

    return Promise.reject(error);
  }
);

// API Helper Functions
export const api = {
  // Generic GET request
  get: async <T = any>(url: string, config?: AxiosRequestConfig) => {
    const response = await apiClient.get<T>(url, config);
    return response.data;
  },

  // Generic POST request
  post: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => {
    const response = await apiClient.post<T>(url, data, config);
    return response.data;
  },

  // Generic PUT request
  put: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => {
    const response = await apiClient.put<T>(url, data, config);
    return response.data;
  },

  // Generic PATCH request
  patch: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => {
    const response = await apiClient.patch<T>(url, data, config);
    return response.data;
  },

  // Generic DELETE request
  delete: async <T = any>(url: string, config?: AxiosRequestConfig) => {
    const response = await apiClient.delete<T>(url, config);
    return response.data;
  },
};

export default api;
