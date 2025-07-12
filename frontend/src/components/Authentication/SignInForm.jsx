// src/components/SignInForm.jsx
import React from "react";
import { useAuth } from "../../context/AuthContext.jsx";

const SignInForm = () => {
  const { toggleAuthMode } = useAuth();

  return (
    <div className="form sign-in">
      <div className="input-group">
        <i className="bx bxs-user"></i>
        <input type="text" placeholder="Username" />
      </div>
      <div className="input-group">
        <i className="bx bxs-lock-alt"></i>
        <input type="password" placeholder="Password" />
      </div>
      <button>Sign in</button>
      <p>
        <b>Forgot password?</b>
      </p>
      <p>
        <span>Don't have an account?</span>
        <b onClick={toggleAuthMode} className="pointer">
          Sign up here
        </b>
      </p>
    </div>
  );
};

export default SignInForm;
