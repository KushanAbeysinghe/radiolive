import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import './App.css';

const Home = ({ setAuthenticated }) => {
  const navigate = useNavigate();

  return (
    <div>
      <Header setAuthenticated={setAuthenticated} />
      <div className="home-container">
        <div className="card">
          <h2>H-Beat Radio Online Stream</h2>
          <div className="button-group">
            <button className="btn btn-secondary" onClick={() => navigate('/sinhala-radio')}>Sinhala Radio</button>
            <button className="btn btn-secondary" onClick={() => navigate('/tamil-radio')}>Tamil Radio</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
