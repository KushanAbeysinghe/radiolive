import React, { useEffect, useRef, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Header from './Header';
import Slideshow from './Slideshow';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

  body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const BackgroundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  padding: 20px;
  overflow: hidden; /* Hide the scrollbar */
`;

const Logo = styled.img`
  position: absolute;
  top: 110px;
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

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 1152px) {
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
  }
`;

const Sidebar = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  @media (max-width: 1152px) {
    width: 100%;
    order: 2;
  }
`;

const ContentContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;

  @media (max-width: 1152px) {
    width: 100%;
    order: 1;
  }
`;

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 100%;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  @media (max-width: 1152px) {
    max-width: 600px;
  }

  @media (max-width: 480px) {
    max-width: 90%;
  }
`;

const Title = styled.h2`
  color: #1825AA;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
  width: 100%;
`;

const Loading = styled.div`
  margin-top: 20px;
  font-size: 18px;
  color: #333;
`;

const Button = styled.button`
  background-color: #ff0000;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #cc0000;
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const VolumeControl = styled.input`
  margin-top: 10px;
`;

const HiddenAudio = styled.audio`
  display: none;
`;

const RadioImage = styled.img`
  margin: 20px 0;
  width: 150px;
  height: auto;
`;

const OfflineMessage = styled.div`
  color: #ff0000;
  font-size: 18px;
  margin-top: 20px;
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
  background-color:  #1825AA;

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

const SinhalaRadio = ({ setAuthenticated }) => {
  const audioRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const audioElement = audioRef.current;

    const playStream = () => {
      setIsLoading(true);
      audioElement.src = "https://altair.streamerr.co/stream/8052";
      audioElement.load();
      audioElement.play().then(() => {
        setIsLoading(false);
      }).catch(error => {
        console.error('Error attempting to play the stream:', error);
        setIsLoading(true);
        setTimeout(playStream, 5000);
      });
    };

    const handleAudioError = () => {
      console.error('Stream error, attempting to reload the stream...');
      playStream();
    };

    const handleOnline = () => {
      console.log('Internet connection restored, refreshing the page...');
      setIsOnline(true);
      window.location.reload(true);
    };

    const handleOffline = () => {
      console.log('Internet connection lost.');
      setIsOnline(false);
    };

    playStream();

    audioElement.addEventListener('error', handleAudioError);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    audioElement.muted = false;
    setIsMuted(false);

    return () => {
      audioElement.removeEventListener('error', handleAudioError);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleLiveButtonClick = () => {
    const audioElement = audioRef.current;
    audioElement.src = "https://altair.streamerr.co/stream/8052";
    audioElement.load();
    audioElement.play().catch(error => {
      console.error('Error attempting to play the live stream:', error);
    });
  };

  const handleMuteButtonClick = () => {
    const audioElement = audioRef.current;
    audioElement.muted = !audioElement.muted;
    setIsMuted(audioElement.muted);
  };

  const handleVolumeChange = (event) => {
    const audioElement = audioRef.current;
    const newVolume = event.target.value;
    audioElement.volume = newVolume;
    setVolume(newVolume);
  };

  const handleBack = () => {
    const audioElement = audioRef.current;
    audioElement.muted = true;
  };

  const handleLogout = () => {
    const audioElement = audioRef.current;
    audioElement.muted = true;
  };

  return (
    <div>
      <Header setAuthenticated={setAuthenticated} onBack={handleBack} onLogout={handleLogout} />
      <BackgroundContainer>
        <Logo src={`${process.env.PUBLIC_URL}/images/Hirdaramanilogo.png`} alt="Logo" />
        <br></br>     <br></br>     <br></br>     <br></br>
        <Container>
          <Sidebar>
            <GlobalStyle />
            <PlayerContainer>
              <Title>H BEAT - Sinhala</Title>
              <RadioImage src="/HBeat.jpg" alt="Radio" />
              <HiddenAudio ref={audioRef}>
                <source src="https://altair.streamerr.co/stream/8052" type="audio/mpeg" />
                Your browser does not support the audio element.
              </HiddenAudio>
              <Button onClick={handleLiveButtonClick}>Live</Button>
              <Button onClick={handleMuteButtonClick}>{isMuted ? 'Unmute' : 'Mute'}</Button>
              <VolumeControl
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
              />
              {isLoading && <Loading>Connecting...</Loading>}
              {!isOnline && <OfflineMessage>No connection.</OfflineMessage>}
            </PlayerContainer>
          </Sidebar>
          <ContentContainer>
            <Slideshow />
          </ContentContainer>
        </Container>
       
      </BackgroundContainer>
      <Footer>
          Powered By: PLANET ENTERTAINMENT <img src={`${process.env.PUBLIC_URL}/images/PLANET LOGO 2.jpg`} alt="Planet Entertainment Logo" />
        </Footer>
    </div>
  );
};

export default SinhalaRadio;
