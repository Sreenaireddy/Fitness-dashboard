import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getCurrentUser } from '../services/authService';
import '../styles/Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, [location]);

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  // Don't show navbar on auth pages
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  if (!user) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo">
          <span className="logo-icon">💪</span>
          <span className="logo-text">FitDash</span>
        </Link>

        <ul className="navbar-menu">
          <li>
            <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>
              <span className="nav-icon">📊</span>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/workouts" className={`nav-link ${isActive('/workouts')}`}>
              <span className="nav-icon">🏋️</span>
              <span>Workouts</span>
            </Link>
          </li>
          <li>
            <Link to="/profile" className={`nav-link ${isActive('/profile')}`}>
              <span className="nav-icon">👤</span>
              <span>Profile</span>
            </Link>
          </li>
        </ul>

        <div className="navbar-user">
          <span className="user-name">{user.displayName || 'User'}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
