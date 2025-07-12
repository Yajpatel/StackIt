// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { usersAPI } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await usersAPI.login({ email, password });
      
      if (response.user && response.token) {
        const userData = {
          id: response.user._id,
          username: response.user.username,
          email: response.user.email,
          role: response.user.role,
          token: response.token
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true };
      } else {
        return { success: false, error: response.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message || 'Login failed' };
    }
  };

  const signup = async (username, email, password) => {
    try {
      const response = await usersAPI.register({ username, email, password });
      
      if (response.user && response.token) {
        const userData = {
          id: response.user._id,
          username: response.user.username,
          email: response.user.email,
          role: response.user.role,
          token: response.token
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true };
      } else {
        return { success: false, error: response.message || 'Signup failed' };
      }
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: error.message || 'Signup failed' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  const isAdmin = () => {
    return user && user.role === 'admin';
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isAuthenticated,
    isAdmin,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
