import { useState, useRef, useEffect } from 'react';
import '../styles/VideoLauncher.scss';

export const VideoLauncher = ({ forceOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (forceOpen) {
      setIsPlaying(true);
      if (videoRef.current) {
        videoRef.current.play();
      }
    }
  }, [forceOpen]);

  const toggleVideo = () => {
    if (isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
      onClose && onClose();
    } else {
      videoRef.current?.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="video-launcher-container">
      <button 
        className="cyber-button-debug"
        onClick={toggleVideo}
        aria-label={isPlaying ? "Pause video" : "Play video"}
      >
        {isPlaying ? '◼ STOP' : '▶ PLAY E.V.E'}
        <span className="cyber-button__glitch">▶_</span>
        <span className="cyber-button__tag">R25</span>
      </button>

      {isPlaying && (
        <div className="futuristic-video-overlay">
          <video
            ref={videoRef}
            src="/assets/E.V.E.mp4"
            className="glitch-video"
            controls={false}
            loop={false}
            onEnded={() => {
              setIsPlaying(false);
              onClose && onClose();
            }}
          />
          <div className="video-controls">
            <button onClick={toggleVideo} className="control-button">⏹</button>
            <div className="video-timecode">00:00</div>
          </div>
          <div className="video-noise-overlay"></div>
          <div className="video-scanlines"></div>
        </div>
      )}
    </div>
  );
}; 