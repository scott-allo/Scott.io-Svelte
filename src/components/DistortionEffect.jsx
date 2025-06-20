import { useEffect, useRef } from 'react';

export default function DistortionEffect({ intensity = 0.5 }) {
  const canvasRef = useRef(null);
  const requestRef = useRef();
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const animate = (time) => {
      timeRef.current = time * 0.001; // Convertir en secondes
      
      // Effacer le canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Créer un effet de bruit
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        // Effet de scanlines
        const y = Math.floor(i / 4 / canvas.width);
        const scanline = Math.sin(y * 0.1 + timeRef.current * 2) * 0.1;
        
        // Effet de bruit
        const noise = Math.random() * intensity;
        const value = (noise + scanline) * 255;
        
        data[i] = value;     // R
        data[i + 1] = value; // G
        data[i + 2] = value; // B
        data[i + 3] = 15;    // A (très transparent)
      }
      
      ctx.putImageData(imageData, 0, 0);
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0.3,
        mixBlendMode: 'overlay'
      }}
    />
  );
} 