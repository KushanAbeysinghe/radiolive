// import React from 'react';
// import RadioPlayer from './RadioPlayer';

// function App() {
//   return (
//     <div className="App">
//       <RadioPlayer />
//     </div>
//   );
// }

// export default App;
// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import SinhalaRadio from './SinhalaRadio';
import TamilRadio from './TamilRadio';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem('authenticated') === 'true'
  );

  useEffect(() => {
    localStorage.setItem('authenticated', authenticated);
  }, [authenticated]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setAuthenticated={setAuthenticated} />} />
        <Route path="/home" element={authenticated ? <Home setAuthenticated={setAuthenticated} /> : <Navigate to="/" />} />
        <Route path="/sinhala-radio" element={authenticated ? <SinhalaRadio setAuthenticated={setAuthenticated} /> : <Navigate to="/" />} />
        <Route path="/tamil-radio" element={authenticated ? <TamilRadio setAuthenticated={setAuthenticated} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
