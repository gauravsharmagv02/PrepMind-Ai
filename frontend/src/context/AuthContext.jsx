import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const data = await api.get('/auth/me');
          if (data.success && data.user) {
            setUser(data.user);
          } else {
            logout();
          }
        } catch (err) {
          console.warn('Failed to verify token:', err.message);
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [token]);

  const login = async (email, password) => {
    const data = await api.post('/auth/login', { email, password });
    if (data.success && data.token) {
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.user);
    }
    return data;
  };

  const register = async (userData) => {
    const data = await api.post('/auth/register', userData);
    if (data.success && data.token) {
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.user);
    }
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    try {
      api.post('/auth/logout').catch(() => {});
    } catch (e) {}
  };

  const updateUserGoal = async (goalData) => {
    const data = await api.post('/auth/goal', goalData);
    if (data.success && data.user) {
      setUser(prev => ({ ...prev, ...data.user }));
    }
    return data;
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateUserGoal, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
