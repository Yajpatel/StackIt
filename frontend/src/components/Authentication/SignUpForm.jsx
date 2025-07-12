// src/components/SignUpForm.jsx
import React from "react";
import { useAuth } from "../../context/AuthContext.jsx";

const SignUpForm = () => {
  const { toggleAuthMode } = useAuth();

  return (
    <div className="form sign-up">
      <div className="input-group">
        <i className="bx bxs-user"></i>
        <input type="text" placeholder="Username" />
      </div>
      <div className="input-group">
        <i className="bx bx-mail-send"></i>
        <input type="email" placeholder="Email" />
      </div>
      <div className="input-group">
        <i className="bx bxs-lock-alt"></i>
        <input type="password" placeholder="Password" />
      </div>
      <div className="input-group">
        <i className="bx bxs-lock-alt"></i>
        <input type="password" placeholder="Confirm password" />
      </div>
      <button>Sign up</button>
      <p>
        <span>Already have an account?</span>
        <b onClick={toggleAuthMode} className="pointer">
          Sign in here
        </b>
      </p>
    </div>
  );
};

export default SignUpForm;
