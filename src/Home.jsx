import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import './App.css';

const Home = ({ setAuthenticated }) => {
  const navigate = useNavigate();

  return (
    <div>
      <Header setAuthenticated={setAuthenticated} />
      <HomeContainer>
        <Logo src={`${process.env.PUBLIC_URL}/images/Hirdaramanilogo.png`} alt="Logo" />
        <Content>
          <Card>
            <h2>H-Beat Radio Online Stream</h2>
            <ButtonGroup>
              <Button onClick={() => navigate('/sinhala-radio')}>Sinhala Radio</Button>
              <Button onClick={() => navigate('/tamil-radio')}>Tamil Radio</Button>
            </ButtonGroup>
          </Card>
        </Content>
        <Footer>
          Powered By: PLANET ENTERTAINMENT <img src={`${process.env.PUBLIC_URL}/images/PLANET LOGO 2.jpg`} alt="Planet Entertainment Logo" />
        </Footer>
      </HomeContainer>
    </div>
  );
};

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 95vh;
  background: url('${process.env.PUBLIC_URL}/images/your-background-image.jpg') no-repeat center center/cover;
  padding: 20px;
`;

const HeaderWrapper = styled.div`
  width: 100%;
`;

const Logo = styled.img`
  max-width: 100px;
  height: auto;
  margin: 20px 0;

  @media (max-width: 768px) {
    max-width: 80px;
  }

  @media (max-width: 480px) {
    max-width: 60px;
  }
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  text-align: center;

  h2 {
    margin-bottom: 20px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const Button = styled.button`
  width: 200px;
  height: 60px;
  font-size: 18px;
  background-color: #6c757d;
  color: #fff;
  border: none;
  border-radius: 5px;
  margin: 10px;
  cursor: pointer;

  &:hover {
    background-color: #5a6268;
  }

  @media (max-width: 600px) {
    width: 100%;
    height: 50px;
    font-size: 16px;
  }
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
  color: white;
  padding: 10px 0;
  background-color: rgba(0, 0, 0, 0.5); /* Optional: Add background color for better visibility */

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

export default Home;
