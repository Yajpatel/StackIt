// src/components/AuthPage.jsx
import React, { useEffect, useRef } from 'react';
import '../components/Authentication/AuthPage.css';
import { useAuth } from "../context/AuthContext.jsx";
import SignInForm from "../components/Authentication/SignInForm.jsx";
import SignUpForm from "../components/Authentication/SignUpForm.jsx";

const AuthPage = () => {
  const { isSignIn, toggleAuthMode } = useAuth();
  const containerRef = useRef();

  useEffect(() => {
    containerRef.current.classList.add('sign-in');
  }, []);

  useEffect(() => {
    containerRef.current.classList.toggle('sign-in', isSignIn);
    containerRef.current.classList.toggle('sign-up', !isSignIn);
  }, [isSignIn]);

  return (
    <div ref={containerRef} id="container" className="container">
      <div className="row">
        <div className="col align-items-center flex-col sign-up">
          <div className="form-wrapper align-items-center">
            <SignUpForm />
          </div>
        </div>
        <div className="col align-items-center flex-col sign-in">
          <div className="form-wrapper align-items-center">
            <SignInForm />
          </div>
        </div>
      </div>

      <div className="row content-row">
        <div className="col align-items-center flex-col">
          <div className="text sign-in">
            <h2>Welcome</h2>
          </div>
          <div className="img sign-in"></div>
        </div>
        <div className="col align-items-center flex-col">
          <div className="img sign-up"></div>
          <div className="text sign-up">
            <h2>Join with us</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
