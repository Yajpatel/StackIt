// src/context/AuthContext.jsx
import { createContext, useState, useContext } from 'react';
import axios from 'axios';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const api = axios.create({
    baseURL:"http://localhost:5000"
  })

  const toggleAuthMode = () => setIsSignIn(prev => !prev);

  const register = async (formData) => {
    try {
      const res = await api.post('/user/register', formData);
      setUser(res.data.result);
      setToken(res.data.token);
      return { success: true, msg: res.data.msg };
    } catch (err) {
      return { success: false, msg: err.response?.data?.msg || 'Signup failed' };
    }
  };

  const login = async (formData) => {
    try {
      const res = await api.post('/user/login', formData);
      setUser(res.data.result);
      setToken(res.data.token);
      return { success: true, msg: 'Login successful' };
    } catch (err) {
      return { success: false, msg: err.response?.data?.msg || 'Login failed' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isSignIn, toggleAuthMode, user, token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
