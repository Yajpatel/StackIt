// src/context/AuthContext.jsx
import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleAuthMode = () => setIsSignIn(prev => !prev);

  return (
    <AuthContext.Provider value={{ isSignIn, toggleAuthMode }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
