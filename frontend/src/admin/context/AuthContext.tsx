import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Define types
interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  profileImage?: string;
  cloudinaryId?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  refreshUser: () => Promise<void>;
}

// Create context
export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
  error: null,
  refreshUser: async () => {}
});

// Provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Set auth token in axios headers
  const setAuthToken = (token: string | null) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  };

  // Load user if token exists
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        setAuthToken(token);
        try {
          const res = await axios.get(`${API_URL}/auth/me`);
          setUser(res.data.user);
          setIsAuthenticated(true);
        } catch (err) {
          console.error('Error loading user:', err);
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
          setIsAuthenticated(false);
          setError('Authentication failed. Please login again.');
        }
      }
      setIsLoading(false);
    };

    loadUser();
  }, [token]);

  // Login user
  const login = async (email: string, password: string) => {
    setError(null);
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { token, user } = res.data;
      setToken(token);
      setUser(user);
      setIsAuthenticated(true);
      setAuthToken(token);
    } catch (err: any) {
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
      setError(
        err.response?.data?.message || 'Login failed. Please check your credentials.'
      );
      throw err;
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await axios.get(`${API_URL}/auth/logout`);
    } catch (err) {
      console.error('Error during logout:', err);
    } finally {
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
      setAuthToken(null);
    }
  };

  // Refresh user data
  const refreshUser = async () => {
    if (token) {
      try {
        const res = await axios.get(`${API_URL}/auth/me`);
        setUser(res.data.user);
      } catch (err) {
        console.error('Error refreshing user data:', err);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isLoading,
        login,
        logout,
        error,
        refreshUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider; 