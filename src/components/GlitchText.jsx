import { useEffect, useRef } from 'react';

export default function GlitchText({ text, fontSize = '2rem', className = '' }) {
  const textRef = useRef();

  return (
    <div className={`glitch-text-container ${className}`} style={{ fontSize }}>
      <div ref={textRef} className="glitch-text-original">{text}</div>
      {/* Suppression des clones pour améliorer les performances */}
    </div>
  );
} 