import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

const Header = ({ setAuthenticated, onBack, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    setAuthenticated(false);
    localStorage.removeItem('authenticated');
    navigate('/');
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    }
    navigate('/home');
  };

  return (
    <div className="header">
      {location.pathname !== '/home' && (
        <button className="btn btn-primary back-button" onClick={handleBack}>Back</button>
      )}
      <button className="btn btn-danger logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Header;
