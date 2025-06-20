import React from 'react';
import GlitchText from '../components/GlitchText';

const Music = () => {
  return (
    <div className="container">
      <GlitchText text="Musique" />
      <div className="music-container">
        <h2>Derniers albums</h2>
        {/* Ici, nous ajouterons la liste des albums et le lecteur audio */}
      </div>
    </div>
  );
};

export default Music; 