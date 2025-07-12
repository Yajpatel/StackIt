// src/components/SignUpForm.jsx
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // ✅ Step 1

const SignUpForm = () => {
  const { toggleAuthMode, register } = useAuth();
  const navigate = useNavigate(); // ✅ Step 2

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ Prevent default form behavior
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const { confirmPassword, ...signupData } = formData;
    const result = await register(signupData);

    if (result.success) {
      toast.success(result.msg);
      console.log("Navigating to home...");
      navigate("/");
    } else {
      toast.error(result.msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} method="POST"> {/* ✅ onSubmit instead of onClick */}
      <div className="form sign-up">
        <div className="input-group">
          <i className="bx bxs-user"></i>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <i className="bx bx-mail-send"></i>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <i className="bx bxs-lock-alt"></i>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <i className="bx bxs-lock-alt"></i>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Sign up</button> {/* ✅ type="submit" */}
        <p>
          <span>Already have an account?</span>
          <b onClick={toggleAuthMode} className="pointer">
            Sign in here
          </b>
        </p>
      </div>
    </form>
  );
};

export default SignUpForm;
