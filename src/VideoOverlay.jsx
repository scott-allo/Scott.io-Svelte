import React, { useRef } from 'react';

export default function VideoOverlay({ show, onClose }) {
  const videoRef = useRef(null);

  if (!show) return null;

  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        margin: '0 auto',
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'none',
        transform: 'translateY(-140px)',
      }}
    >
      <div
        style={{
          position: 'relative',
          background: 'rgba(0,0,0,0.95)',
          border: '3px solid #0ff',
          borderRadius: 16,
          boxShadow: '0 0 32px #0ff, 0 0 64px #f0f',
          overflow: 'hidden',
          width: '60vw',
          maxWidth: 700,
          pointerEvents: 'auto',
        }}
      >
        {/* Bouton fermer */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 3,
            background: 'rgba(0,0,0,0.7)',
            color: '#0ff',
            border: '2px solid #f0f',
            borderRadius: 8,
            padding: '6px 16px',
            fontSize: 18,
            cursor: 'pointer',
            fontFamily: 'Share Tech Mono, monospace',
            textShadow: '0 0 8px #0ff, 0 0 16px #f0f'
          }}
        >✖</button>
        {/* Vidéo */}
        <video
          ref={videoRef}
          src="/assets/E.V.E.mp4"
          style={{
            width: '100%',
            borderRadius: 12,
            zIndex: 1,
            background: 'black',
            boxShadow: '0 0 24px #0ff, 0 0 48px #f0f'
          }}
          controls
          autoPlay
          onEnded={onClose}
        />
      </div>
    </div>
  );
}
