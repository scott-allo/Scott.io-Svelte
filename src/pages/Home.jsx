import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import GlitchText from '../components/GlitchText';
import DistortionEffect from '../components/DistortionEffect';

export default function Home({ enableAudio }) {
  const linksRef = useRef([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // S'assurer que les références sont initialisées
    if (linksRef.current.every(link => link !== null)) {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (!isReady) return;

    // Animation d'entrée
    gsap.from(linksRef.current, {
      duration: 1.5,
      opacity: 0,
      y: 50,
      stagger: 0.2,
      ease: "back.out"
    });

    // Effets aléatoires de glitch
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7 && linksRef.current) {
        const randomLink = linksRef.current[Math.floor(Math.random() * linksRef.current.length)];
        if (randomLink) {
          gsap.to(randomLink, {
            duration: 0.1,
            x: (Math.random() - 0.5) * 20,
            y: (Math.random() - 0.5) * 20,
            color: ['#0ff', '#f0f', '#fff'][Math.floor(Math.random() * 3)],
            onComplete: () => {
              if (randomLink) {
                gsap.to(randomLink, {
                  duration: 0.3,
                  x: 0,
                  y: 0,
                  color: '#fff'
                });
              }
            }
          });
        }
      }
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, [isReady]);

  const handleMouseEnter = (index) => {
    if (linksRef.current[index]) {
      gsap.to(linksRef.current[index], {
        color: '#0ff',
        duration: 0.3,
        textShadow: '0 0 10px #0ff'
      });
    }
  };

  const handleMouseLeave = (index) => {
    if (linksRef.current[index]) {
      gsap.to(linksRef.current[index], {
        color: '#fff',
        duration: 0.3,
        textShadow: 'none'
      });
    }
  };

  const handleFooterMouseEnter = (e) => {
    gsap.to(e.target, {
      color: '#f0f',
      duration: 0.2
    });
  };

  const handleFooterMouseLeave = (e) => {
    gsap.to(e.target, {
      color: '#fff',
      duration: 0.5
    });
  };

  return (
    <div className="home-page" onClick={enableAudio}>
      <DistortionEffect intensity={0.5} />
      
      <div className="main-content">
        <GlitchText text="IC3PEAK" fontSize="6rem" className="main-title" />
        
        <div className="links-container">
          {['MUSIC', 'VIDEOS', 'TOUR', 'STORE'].map((link, i) => (
            <div 
              key={link}
              ref={el => {
                linksRef.current[i] = el;
                // Vérifier si toutes les références sont initialisées
                if (i === 3 && linksRef.current.every(link => link !== null)) {
                  setIsReady(true);
                }
              }}
              className="glitch-link"
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={() => handleMouseLeave(i)}
            >
              {link}
            </div>
          ))}
        </div>
      </div>
      
      <div className="footer">
        {['INSTAGRAM', 'TELEGRAM', 'YOUTUBE', 'CONTACT'].map(link => (
          <a 
            key={link} 
            href="#" 
            className="footer-link"
            onMouseEnter={handleFooterMouseEnter}
            onMouseLeave={handleFooterMouseLeave}
          >
            {link}
          </a>
        ))}
      </div>
    </div>
  );
} 