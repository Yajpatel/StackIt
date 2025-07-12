// src/components/AuthPage.jsx
import React, { useState } from 'react';
import SignInForm from '../components/Authentication/SignInForm';
import SignUpForm from '../components/Authentication/SignUpForm';
import './AuthPage.css';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="auth-container">
      <div className="auth-form">
        <div className="auth-tabs">
          <button
            className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Sign In
          </button>
          <button
            className={`auth-tab ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
        </div>
        
        <div className="auth-content">
          <div className={`auth-slide ${activeTab === 'login' ? 'slide-in' : 'slide-out'}`}>
            {activeTab === 'login' && <SignInForm />}
          </div>
          <div className={`auth-slide ${activeTab === 'signup' ? 'slide-in' : 'slide-out'}`}>
            {activeTab === 'signup' && <SignUpForm />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
