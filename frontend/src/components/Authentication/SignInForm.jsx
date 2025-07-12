import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // ✅ Step 1

const SignInForm = () => {
  const { toggleAuthMode, login } = useAuth();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate(); // ✅ Step 2

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ Prevent default form submission
    const result = await login(formData);
    if (result.success) {
      toast.success(result.msg);
      navigate("/"); // ✅ Redirect to homepage
    } else {
      toast.error(result.msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} method="POST"> {/* ✅ Use onSubmit instead of onClick */}
      <div className="form sign-in">
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
          <i className="bx bxs-lock-alt"></i>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Sign in</button> {/* ✅ type="submit" */}
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
