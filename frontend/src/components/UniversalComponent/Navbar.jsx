import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Notifications from "../Notifications";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAskQuestion = (e) => {
    if (!isAuthenticated()) {
      e.preventDefault();
      navigate('/auth');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="nav-bar">
      <Link to="/" className="nav-logo">
        <h1>StackIt</h1>
      </Link>
      
      {/* Mobile menu button */}
      <button className="mobile-menu-btn" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <div className={`nav-actions ${isMenuOpen ? 'nav-actions-open' : ''}`}>
        <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
          Home
        </Link>
        <Link
          to="/AskQuestion"
          className={`nav-link${!isAuthenticated() ? ' disabled-link' : ''}`}
          onClick={(e) => {
            handleAskQuestion(e);
            setIsMenuOpen(false);
          }}
        >
          Ask Question
        </Link>
        {isAuthenticated() && <Notifications />}
        {isAuthenticated() ? (
          <div className="user-section">
            <span className="welcome-text">Welcome, {user?.username}</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        ) : (
          <Link to="/auth" className="nav-link login-btn" onClick={() => setIsMenuOpen(false)}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
