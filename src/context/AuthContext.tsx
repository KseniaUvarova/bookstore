import React, { createContext, useState, useEffect, ReactNode } from 'react';
import api from '../services/api';

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for user in localStorage
    const userFromStorage = localStorage.getItem('user');
    if (userFromStorage) {
      const parsedUser = JSON.parse(userFromStorage);
      setUser(parsedUser);
      
      // Set auth token in api defaults
      api.defaults.headers.common['Authorization'] = `Bearer ${parsedUser.token}`;
    }
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data } = await api.post('/api/users/login', { email, password });
      
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      
      // Set auth token in api defaults
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during login');
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data } = await api.post('/api/users', { name, email, password });
      
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      
      // Set auth token in api defaults
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during registration');
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    
    // Remove auth token
    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;