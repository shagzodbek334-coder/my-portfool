import React, { useState } from 'react';
import { useMusic } from '../context/MusicContext';
import { useTranslation } from 'react-i18next';
import {
  FaPlay, FaPause, FaStepForward, FaStepBackward,
  FaVolumeDown, FaVolumeUp, FaMusic, FaList,
} from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import './MusicPlayer.css';

function formatTime(sec) {
  if (!sec || isNaN(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function MusicPlayer() {
  const { t } = useTranslation();
  const {
    isPlaying, togglePlay,
    currentSong, playlist,
    currentIndex, setCurrentIndex,
    volume, setVolume,
    progress, duration, handleSeek,
    isMini, setIsMini,
  } = useMusic();

  const [showPlaylist, setShowPlaylist] = useState(false);

  return (
    <div className={`music-player ${isMini ? 'music-player--mini' : ''}`}>
      {/* Toggle button */}
      <button
        className="music-player__toggle"
        onClick={() => setIsMini(prev => !prev)}
        aria-label="Toggle music player"
      >
        {isMini ? <FaMusic size={13} /> : <IoClose size={14} />}
      </button>

      {isMini ? (
        /* Mini Player */
        <div className="music-player__mini" onClick={() => setIsMini(false)}>
          <div className={`music-player__disc ${isPlaying ? 'music-player__disc--spin' : ''}`}>
            <FaMusic size={14} />
          </div>
          <div className="music-player__mini-info">
            <span>{currentSong.title}</span>
          </div>
          <button
            className="music-player__play-btn music-player__play-btn--sm"
            onClick={(e) => { e.stopPropagation(); togglePlay(); }}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <FaPause size={10} /> : <FaPlay size={10} />}
          </button>
        </div>
      ) : (
        /* Full Player */
        <div className="music-player__full">
          <div className="music-player__header">
            <span className="music-player__label">{t('music.now_playing')}</span>
            <button
              className="music-player__playlist-btn"
              onClick={() => setShowPlaylist(prev => !prev)}
              aria-label="Toggle playlist"
            >
              <FaList size={13} />
            </button>
          </div>

          {/* Cover */}
          <div className={`music-player__cover ${isPlaying ? 'music-player__cover--active' : ''}`}>
            <div className={`music-player__disc-large ${isPlaying ? 'music-player__disc--spin' : ''}`}>
              <FaMusic size={32} />
            </div>
            {isPlaying && (
              <div className="music-player__visualizer">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="music-player__bar" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
            )}
          </div>

          {/* Song Info */}
          <div className="music-player__info">
            <h4>{currentSong.title}</h4>
            <p>{currentSong.artist}</p>
          </div>

          {/* Progress */}
          <div className="music-player__progress">
            <span>{formatTime(progress)}</span>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={progress}
              onChange={(e) => handleSeek(Number(e.target.value))}
              className="music-player__range"
              aria-label="Seek"
            />
            <span>{formatTime(duration)}</span>
          </div>

          {/* Controls */}
          <div className="music-player__controls">
            <button
              className="music-player__ctrl-btn"
              onClick={() => setCurrentIndex(prev => (prev - 1 + playlist.length) % playlist.length)}
              aria-label="Previous"
            >
              <FaStepBackward size={14} />
            </button>
            <button
              className="music-player__play-btn"
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
            </button>
            <button
              className="music-player__ctrl-btn"
              onClick={() => setCurrentIndex(prev => (prev + 1) % playlist.length)}
              aria-label="Next"
            >
              <FaStepForward size={14} />
            </button>
          </div>

          {/* Volume */}
          <div className="music-player__volume">
            <FaVolumeDown size={13} />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="music-player__range"
              aria-label="Volume"
            />
            <FaVolumeUp size={13} />
          </div>

          {/* Playlist */}
          {showPlaylist && (
            <div className="music-player__playlist">
              <h5>{t('music.playlist')}</h5>
              {playlist.map((song, idx) => (
                <button
                  key={song.id}
                  className={`music-player__song ${idx === currentIndex ? 'music-player__song--active' : ''}`}
                  onClick={() => setCurrentIndex(idx)}
                >
                  <span className="music-player__song-num">{idx + 1}</span>
                  <div>
                    <div>{song.title}</div>
                    <div className="music-player__song-artist">{song.artist}</div>
                  </div>
                  {idx === currentIndex && isPlaying && (
                    <FaMusic size={10} className="music-player__song-playing" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
