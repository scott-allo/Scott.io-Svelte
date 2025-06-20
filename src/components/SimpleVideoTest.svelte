import React, { useRef, useState } from 'react';

const SimpleVideoTest = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);

  const handlePlay = async () => {
    try {
      console.log('Tentative de lecture...');
      await videoRef.current.play();
      setIsPlaying(true);
      setError(null);
      console.log('Vidéo lancée avec succès !');
    } catch (err) {
      console.error('Erreur de lecture:', err);
      setError(err.message);
    }
  };

  const handlePause = () => {
    videoRef.current.pause();
    setIsPlaying(false);
  };

  return (
    <div style={{ 
      padding: '20px', 
      background: '#000', 
      color: '#0ff', 
      fontFamily: 'monospace',
      maxWidth: '600px',
      margin: '20px auto'
    }}>
      <h2>Test Vidéo Simple</h2>
      
      <video
        ref={videoRef}
        src="/assets/E.V.E.mp4"
        style={{ width: '100%', marginBottom: '20px' }}
        controls
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={(e) => {
          console.error('Erreur vidéo:', e);
          setError('Erreur de chargement vidéo');
        }}
      />
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={isPlaying ? handlePause : handlePlay}
          style={{
            background: '#0ff',
            color: '#000',
            border: 'none',
            padding: '10px 20px',
            marginRight: '10px',
            cursor: 'pointer'
          }}
        >
          {isPlaying ? 'PAUSE' : 'PLAY'}
        </button>
        
        <span>Status: {isPlaying ? 'EN COURS' : 'ARRÊTÉ'}</span>
      </div>
      
      {error && (
        <div style={{ color: '#ff0000', marginBottom: '20px' }}>
          Erreur: {error}
        </div>
      )}
      
      <div style={{ fontSize: '12px' }}>
        <p>Vidéo accessible: ✅ http://localhost:3002/assets/E.V.E.mp4</p>
        <p>Composant React: {videoRef.current ? '✅ Monté' : '❌ Non monté'}</p>
        <p>État lecture: {isPlaying ? '✅ En cours' : '❌ Arrêté'}</p>
      </div>
    </div>
  );
};

export default SimpleVideoTest; 