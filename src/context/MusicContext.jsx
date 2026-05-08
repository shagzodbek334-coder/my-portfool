import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const MusicContext = createContext();

const playlist = [
  {
    id: 1,
    title: 'Raindance (feat. Tems)',
    artist: 'Dave',
    src: '/music/Dave - Raindance (feat. Tems).mp3',
    cover: null,
  },
  {
    id: 2,
    title: 'Coding Vibes',
    artist: 'LoFi Girl',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    cover: null,
  },
  {
    id: 3,
    title: 'Night Coding',
    artist: 'Synthwave',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    cover: null,
  },
];

export function MusicProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMini, setIsMini] = useState(false);
  const audioRef = useRef(null);

  const currentSong = playlist[currentIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentIndex]);

  const togglePlay = () => setIsPlaying(prev => !prev);

  const nextSong = () => {
    setCurrentIndex(prev => (prev + 1) % playlist.length);
    setIsPlaying(true);
  };

  const prevSong = () => {
    setCurrentIndex(prev => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (value) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setProgress(value);
    }
  };

  const handleEnded = () => nextSong();

  return (
    <MusicContext.Provider value={{
      isPlaying, togglePlay, currentSong, playlist,
      currentIndex, setCurrentIndex,
      volume, setVolume,
      progress, duration, handleSeek,
      isMini, setIsMini,
    }}>
      <audio
        ref={audioRef}
        src={currentSong.src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onLoadedMetadata={handleTimeUpdate}
      />
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) throw new Error('useMusic must be used within MusicProvider');
  return context;
}
