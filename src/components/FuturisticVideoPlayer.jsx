import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const FuturisticVideoPlayer = ({ 
  videoSrc = '/assets/E.V.E.mp4', 
  title = "E.V.E - Présentation du Site",
  autoPlay = false,
  muted = true 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showControls, setShowControls] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const screenRef = useRef(null);

  useEffect(() => {
    console.log('FuturisticVideoPlayer monté avec:', { videoSrc, autoPlay, muted });
    
    // Animation d'entrée
    gsap.fromTo(containerRef.current,
      { 
        scale: 0.8, 
        opacity: 0, 
        rotationY: -45,
        transformOrigin: "center center"
      },
      { 
        scale: 1, 
        opacity: 1, 
        rotationY: 0,
        duration: 1.5,
        ease: "power2.out",
        onComplete: () => {
          setIsVisible(true);
          console.log('Animation terminée, isVisible:', true);
          // Auto-play après l'animation si activé
          if (autoPlay && videoRef.current) {
            setTimeout(() => {
              console.log('Tentative d\'auto-play...');
              videoRef.current.play().catch(e => {
                console.log('Auto-play bloqué:', e);
                setError('Auto-play bloqué par le navigateur');
              });
            }, 500);
          }
        }
      }
    );

    // Animation continue du cadre
    gsap.to(screenRef.current, {
      boxShadow: "0 0 30px #0ff, 0 0 60px #f0f, inset 0 0 20px rgba(0,255,255,0.1)",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  }, [autoPlay, muted, videoSrc]);

  const handlePlayPause = async () => {
    console.log('handlePlayPause appelé, isPlaying:', isPlaying);
    if (videoRef.current) {
      try {
        if (isPlaying) {
          videoRef.current.pause();
          setIsPlaying(false);
        } else {
          console.log('Tentative de lecture...');
          await videoRef.current.play();
          setIsPlaying(true);
          console.log('Vidéo en cours de lecture');
        }
      } catch (error) {
        console.log('Erreur de lecture vidéo:', error);
        setError('Erreur de lecture: ' + error.message);
        // Si autoplay est bloqué, on peut essayer de démuter
        if (videoRef.current.muted) {
          console.log('Tentative de démutation...');
          videoRef.current.muted = false;
          try {
            await videoRef.current.play();
            setIsPlaying(true);
            console.log('Vidéo démarrée après démutation');
          } catch (e) {
            console.log('Impossible de lancer la vidéo:', e);
            setError('Impossible de lancer la vidéo');
          }
        }
      }
    } else {
      console.log('videoRef.current est null');
    }
  };

  const handleVideoClick = () => {
    console.log('Clic sur la vidéo');
    handlePlayPause();
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      if (videoRef.current.muted) {
        setVolume(0);
      } else {
        setVolume(0.5);
        videoRef.current.volume = 0.5;
      }
    }
  };

  const handleMouseEnter = () => {
    setShowControls(true);
  };

  const handleMouseLeave = () => {
    setShowControls(false);
  };

  const handleVideoLoad = () => {
    console.log('Vidéo chargée avec succès');
    setVideoLoaded(true);
    setError(null);
  };

  const handleVideoError = (e) => {
    console.log('Erreur de chargement vidéo:', e);
    setError('Erreur de chargement de la vidéo');
    setVideoLoaded(false);
  };

  return (
    <div 
      className="futuristic-video-container" 
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Bouton d'action principal - toujours visible pour le test */}
      <div className="launch-button-container" style={{ display: 'block' }}>
        <button 
          className="launch-button"
          onClick={handlePlayPause}
          style={{ 
            position: 'relative',
            zIndex: 1000,
            background: 'rgba(255, 0, 0, 0.8)',
            border: '2px solid red',
            color: 'white'
          }}
        >
          <span className="launch-text">LANCER E.V.E (DEBUG)</span>
          <span className="launch-icon">🤖</span>
        </button>
        
        {/* Bouton de test */}
        <button 
          className="test-button"
          onClick={() => {
            console.log('Test direct de la vidéo');
            if (videoRef.current) {
              console.log('Vidéo src:', videoRef.current.src);
              console.log('Vidéo readyState:', videoRef.current.readyState);
              console.log('Vidéo networkState:', videoRef.current.networkState);
              console.log('Vidéo error:', videoRef.current.error);
              console.log('Vidéo paused:', videoRef.current.paused);
              console.log('Vidéo muted:', videoRef.current.muted);
            }
          }}
          style={{
            position: 'absolute',
            top: '120px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(255, 0, 0, 0.8)',
            color: 'white',
            border: '1px solid red',
            padding: '5px 10px',
            borderRadius: '5px',
            fontSize: '12px',
            cursor: 'pointer',
            zIndex: 1001
          }}
        >
          TEST VIDÉO
        </button>
      </div>
      
      <div className="video-screen-frame" ref={screenRef}>
        {/* Corners décoratifs */}
        <div className="corner corner-tl"></div>
        <div className="corner corner-tr"></div>
        <div className="corner corner-bl"></div>
        <div className="corner corner-br"></div>
        
        {/* Scanlines */}
        <div className="scanlines"></div>
        
        {/* Contenu vidéo */}
        <div className="video-content">
          <video
            ref={videoRef}
            src={videoSrc}
            onClick={handleVideoClick}
            className="futuristic-video"
            muted={muted}
            preload="metadata"
            onPlay={() => {
              console.log('Événement onPlay déclenché');
              setIsPlaying(true);
            }}
            onPause={() => {
              console.log('Événement onPause déclenché');
              setIsPlaying(false);
            }}
            onEnded={() => {
              console.log('Événement onEnded déclenché');
              setIsPlaying(false);
            }}
            onLoadedMetadata={() => {
              console.log('Métadonnées vidéo chargées');
              if (videoRef.current) {
                videoRef.current.volume = volume;
              }
            }}
            onLoadStart={() => console.log('Début du chargement vidéo')}
            onCanPlay={() => {
              console.log('Vidéo peut être lue');
              handleVideoLoad();
            }}
            onError={handleVideoError}
          />
          
          {/* Overlay de contrôle */}
          <div className={`video-overlay ${showControls ? 'show' : ''}`}>
            <div className="video-title">{title}</div>
            <div className="video-controls">
              <button 
                className="control-btn play-btn"
                onClick={handlePlayPause}
              >
                {isPlaying ? '⏸' : '▶'}
              </button>
              
              <div className="volume-controls">
                <button 
                  className="control-btn volume-btn"
                  onClick={toggleMute}
                >
                  {videoRef.current?.muted || volume === 0 ? '🔇' : '🔊'}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="volume-slider"
                />
              </div>
            </div>
          </div>
          
          {/* Indicateurs de statut */}
          <div className="status-indicators">
            <div className="status-dot recording"></div>
            <div className="status-dot live"></div>
            <div className="status-dot signal"></div>
          </div>
        </div>
        
        {/* Effet de glitch occasionnel */}
        <div className="glitch-overlay"></div>
      </div>
      
      {/* Informations techniques */}
      <div className="tech-info">
        <div className="info-line">SYSTEM: E.V.E_AI_CORE v2.1</div>
        <div className="info-line">STATUS: {isPlaying ? 'STREAMING' : 'STANDBY'}</div>
        <div className="info-line">SIGNAL: {isVisible ? 'OPTIMAL' : 'INITIALIZING'}</div>
        <div className="info-line">VOLUME: {Math.round(volume * 100)}%</div>
        <div className="info-line">LOADED: {videoLoaded ? 'YES' : 'NO'}</div>
        {error && <div className="info-line error">ERROR: {error}</div>}
      </div>
    </div>
  );
};

export default FuturisticVideoPlayer; 