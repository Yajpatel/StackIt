// src/components/SignUpForm.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const result = await signup(username, email, password);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error || 'Signup failed');
      }
    } catch (err) {
      setError('An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form-content">
      <div className="form-group">
        <label className="form-label">
          Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="form-input"
          required
        />
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary"
      >
        {loading ? 'Creating Account...' : 'Sign Up'}
      </button>
    </form>
  );
};

export default SignUpForm;
