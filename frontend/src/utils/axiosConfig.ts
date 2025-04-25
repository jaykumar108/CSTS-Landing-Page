import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // Important for cookies
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    // If token exists, add to headers
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh token
        const refreshRes = await axios.get(`${API_URL}/auth/refresh-token`, {
          withCredentials: true
        });
        
        // If successful, update token and retry
        if (refreshRes.data?.token) {
          localStorage.setItem('token', refreshRes.data.token);
          
          // Update Authorization header
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${refreshRes.data.token}`;
          originalRequest.headers['Authorization'] = `Bearer ${refreshRes.data.token}`;
          
          // Retry the original request
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, redirect to login
        localStorage.removeItem('token');
        window.location.href = '/admin/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance; 