import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import './App.css'; // Ensure you have a separate CSS file

const Login = ({ setAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'admin' && password === '1234') {
      setAuthenticated(true);
      navigate('/home');
    } else {
      alert('Incorrect username or password');
    }
  };

  return (
    <div>
    <LoginContainer>
      <Logo src={`${process.env.PUBLIC_URL}/images/Hirdaramanilogo.png`} alt="Logo" />
      <LoginCard>
        <h2>Login</h2>
        <FormGroup>
          <Input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </FormGroup>
        <FormGroup>
          <Input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </FormGroup>
        <Button onClick={handleLogin}>Login</Button>
      </LoginCard>
     
    </LoginContainer>
     <Footer>
     Powered By: PLANET ENTERTAINMENT  <img src={`${process.env.PUBLIC_URL}/images/PLANET LOGO 2.jpg`} alt="Planet Entertainment Logo" />
   </Footer>
   </div>
  );
};

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background: url('${process.env.PUBLIC_URL}/images/your-background-image.jpg') no-repeat center center/cover;
`;

const Logo = styled.img`
position: absolute;
top: 80px;
left: 50%;
transform: translateX(-50%);
max-width: 150px;
height: auto;

@media (max-width: 768px) {
  max-width: 120px;
}

@media (max-width: 480px) {
  max-width: 120px;
}
`;



const LoginCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  text-align: center;
  position: absolute;
  top: 280px;

  h2 {
    margin-bottom: 20px;
  }
`;

const FormGroup = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px 20px;
  background-color: #1825AA;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
  color: white;
  margin-top: auto;
  padding: 10px 0;
  background-color: #1825AA; /* Optional: Add background color for better visibility */

  img {
    margin-left: 10px;
    max-width: 50px;
    height: auto;
  }

  @media (max-width: 768px) {
    font-size: 14px;

    img {
      max-width: 40px;
    }
  }

  @media (max-width: 480px) {
    font-size: 12px;

    img {
      max-width: 30px;
    }
  }
`;

export default Login;
