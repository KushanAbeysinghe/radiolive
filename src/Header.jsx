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
      <h5>HIRDARAMANI</h5>
      <div className="button-group">
        {location.pathname !== '/home' && (
          <button className=" back-button" onClick={handleBack}>Back</button>
        )}
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Header;
