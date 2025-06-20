import { useEffect, useRef } from 'react';
import { Howl } from 'howler';

export default function AudioPlayer({ enabled }) {
  const soundRef = useRef(null);

  useEffect(() => {
    if (enabled && !soundRef.current) {
      soundRef.current = new Howl({
        src: ['/assets/audio/ambient.mp3'],
        loop: true,
        volume: 0.3,
        onplayerror: function() {
          soundRef.current.once('unlock', function() {
            soundRef.current.play();
          });
        }
      });
      
      // Démarrage avec interaction utilisateur
      const handleFirstInteraction = () => {
        soundRef.current.play();
        document.removeEventListener('click', handleFirstInteraction);
      };
      
      document.addEventListener('click', handleFirstInteraction);
    }

    return () => {
      if (soundRef.current) {
        soundRef.current.stop();
        soundRef.current = null;
      }
    };
  }, [enabled]);

  return null;
} 