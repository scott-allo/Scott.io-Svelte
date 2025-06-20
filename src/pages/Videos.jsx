import React from 'react';
import GlitchText from '../components/GlitchText';

const Videos = () => {
  return (
    <div className="container">
      <GlitchText text="Vidéos" />
      <div className="videos-container">
        <h2>Clips vidéo</h2>
        {/* Ici, nous ajouterons la grille de vidéos */}
      </div>
    </div>
  );
};

export default Videos; 