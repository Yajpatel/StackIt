// src/components/SignInForm.jsx
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { toast } from "react-toastify";

const SignInForm = () => {
  const { toggleAuthMode, login } = useAuth();
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const result = await login(formData);
    if (result.success) {
      toast.success(result.msg);
    } else {
      toast.error(result.msg);
    }
  };

  return (
    <form action="" method="POST">
    <div className="form sign-in">
      <div className="input-group">
        <i className="bx bxs-user"></i>
        <input
          type="username"
          name="username"
          placeholder="username"
          value={formData.username}
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
      <button onClick={handleSubmit}>Sign in</button>
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
    </form>
  );
};

export default SignInForm;
