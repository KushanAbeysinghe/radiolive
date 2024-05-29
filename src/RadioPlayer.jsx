import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

  body {
    font-family: 'Roboto', sans-serif;
  }
`;

const BackgroundContainer = styled.div`
  background: linear-gradient(to right, #1825AA, #1825AA90);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 35px; /* Increased padding */
  width: 35%; /* Adjust width as needed */
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  color: #1825AA;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
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
  width: 200px;
  height: auto;
`;

const RadioPlayer = () => {
  const audioRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const audioElement = audioRef.current;

    const playStream = () => {
      setIsLoading(true);
      audioElement.src = "https://altair.streamerr.co/stream/8052"; // Set the source to ensure it plays live
      audioElement.load(); // Reload the audio element
      audioElement.play().then(() => {
        setIsLoading(false);
      }).catch(error => {
        console.error('Error attempting to play the stream:', error);
        setIsLoading(true);
        setTimeout(playStream, 5000); // Retry every 5 seconds
      });
    };

    const handleAudioError = () => {
      console.error('Stream error, attempting to reload the stream...');
      playStream(); // Try to play the stream again
    };

    const handleOnline = () => {
      console.log('Internet connection restored, refreshing the page...');
      window.location.reload(true); // Force a full page reload from the server
    };

    const handleOffline = () => {
      console.log('Internet connection lost.');
    };

    // Attempt to play the stream when the component mounts
    playStream();

    // Add event listeners
    audioElement.addEventListener('error', handleAudioError);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup event listeners on component unmount
    return () => {
      audioElement.removeEventListener('error', handleAudioError);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleLiveButtonClick = () => {
    const audioElement = audioRef.current;
    audioElement.src = "https://altair.streamerr.co/stream/8052"; // Reset the source to ensure it plays live
    audioElement.load(); // Reload the audio element
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

  return (
    <BackgroundContainer>
      <GlobalStyle />
      <PlayerContainer>
        <Title>H BEAT Live Radio Stream</Title>
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
      </PlayerContainer>
    </BackgroundContainer>
  );
};

export default RadioPlayer;
