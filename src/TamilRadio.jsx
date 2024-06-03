import React from 'react';
import Header from './Header';
import './App.css';

const TamilRadio = ({ setAuthenticated }) => {
  return (
    <div>
      <Header setAuthenticated={setAuthenticated} />
      <div className="radio-container">
        <h2>Tamil Radio</h2>
      </div>
    </div>
  );
};

export default TamilRadio;
