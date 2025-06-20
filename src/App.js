import React, { useState, memo } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Terminal from './components/Terminal';
import GlitchLogo from './components/GlitchLogo';
import NoiseOverlay from './components/NoiseOverlay';
import AudioPlayer from './components/AudioPlayer';
import CustomCursor from './components/CustomCursor';
import VideoOverlay from './VideoOverlay';
import '../src/styles/main.scss';

const skills = [
  { name: 'HTML', svg: <svg width="60" height="60" viewBox="0 0 128 128"><path fill="#E44D26" d="M19.5 114.7L8.1 0h111.8l-11.4 114.6-44.6 12.4z"/><path fill="#F16529" d="M64 117.6l36-10 9.8-109.7H64z"/><path fill="#EBEBEB" d="M64 66.7H44.2l-1.4-15.7H64V36.1H28.7l.4 4.2 4.1 46.2H64zM64 98.2h-.1l-15.1-4.1-.9-10.2H36.7l1.7 19.2 25.5 7.1h.1z"/><path fill="#FFF" d="M63.9 66.7v14.9h13.6l-1.3 14.5-12.3 3.3v12.1l25.5-7.1.2-2.1 2.9-32.2.3-4.2H63.9zm0-30.6v14.9h27.2l.3-3.2.7-7.7.4-4z"/></svg> },
  { name: 'CSS', svg: <svg width="60" height="60" viewBox="0 0 128 128"><path fill="#1572B6" d="M19.5 114.7L8.1 0h111.8l-11.4 114.6-44.6 12.4z"/><path fill="#33A9DC" d="M64 117.6l36-10 9.8-109.7H64z"/><path fill="#fff" d="M64 66.7H44.2l-1.4-15.7H64V36.1H28.7l.4 4.2 4.1 46.2H64z"/><path fill="#EBEBEB" d="M64 98.2h-.1l-15.1-4.1-.9-10.2H36.7l1.7 19.2 25.5 7.1h.1z"/><path fill="#fff" d="M63.9 66.7v14.9h13.6l-1.3 14.5-12.3 3.3v12.1l25.5-7.1.2-2.1 2.9-32.2.3-4.2H63.9z"/><path fill="#EBEBEB" d="M63.9 36.1v14.9h27.2l.3-3.2.7-7.7.4-4z"/></svg> },
  { name: 'JavaScript', svg: <svg width="60" height="60" viewBox="0 0 128 128"><path fill="#F7DF1E" d="M1.408 1.408h125.184v125.185H1.408z"/><path d="M116.042 116.042H11.958V11.958h104.084z" fill="#F7DF1E"/><path d="M89.464 104.96c2.184 3.57 5.01 6.184 10.02 6.184 4.21 0 6.89-2.104 6.89-5.01 0-3.48-2.77-4.71-7.44-6.74l-2.56-1.1c-7.39-3.15-12.29-7.1-12.29-15.43 0-7.68 5.86-13.52 15.02-13.52 6.52 0 11.21 2.27 14.57 8.22l-7.97 5.12c-1.75-3.12-3.64-4.34-6.6-4.34-3.01 0-4.93 1.92-4.93 4.34 0 3.04 1.92 4.27 6.36 6.14l2.56 1.1c8.72 3.73 13.62 7.44 13.62 15.89 0 9.1-7.15 14.08-16.77 14.08-9.39 0-15.47-4.48-18.42-10.36zm-36.36.85c1.6 2.84 3.06 5.24 6.6 5.24 3.37 0 5.5-1.32 5.5-6.46V66.7h10.24v37.98c0 10.6-6.22 15.43-15.3 15.43-8.2 0-12.98-4.25-15.43-9.39z"/></svg> },
  { name: 'React', svg: <svg width="60" height="60" viewBox="0 0 128 128"><g fill="none"><circle cx="64" cy="64" r="11" fill="#61DAFB"/><g stroke="#61DAFB" strokeWidth="4"><ellipse rx="56" ry="22" cx="64" cy="64"/><ellipse rx="56" ry="22" cx="64" cy="64" transform="rotate(60 64 64)"/><ellipse rx="56" ry="22" cx="64" cy="64" transform="rotate(120 64 64)"/></g></g></svg> },
  { name: 'NodeJS', svg: <svg width="60" height="60" viewBox="0 0 128 128"><path fill="#8CC84B" d="M64 8.1l54.6 31.5v48.8L64 119.9 9.4 88.4V39.6z"/><path fill="#fff" d="M64 16.6l47.1 27.2v40.4L64 111.4 16.9 84.2V43.8z"/><path fill="#8CC84B" d="M64 24.1l39.6 22.9v34.1L64 103.9 24.4 81.1V47z"/><path fill="#fff" d="M64 32.1l32.1 18.6v27.2L64 96.1 31.9 77.9V50.7z"/><path fill="#8CC84B" d="M64 40.1l24.6 14.2v20.2L64 88.1 39.4 74.3V54.3z"/></svg> },
  { name: 'PHP', svg: <svg width="60" height="60" viewBox="0 0 128 128"><ellipse fill="#777BB4" cx="64" cy="64" rx="56" ry="32"/><path fill="#fff" d="M40.7 80.2h-7.2l-1.2 6.2h-6.2l7.2-32.6h7.2l7.2 32.6h-6.2zm-6.2-5.2h5.2l-2.6-13.2-2.6 13.2zm23.2 11.4h-6.2l-1.2-6.2h-7.2l-1.2 6.2h-6.2l7.2-32.6h7.2l7.2 32.6zm-7.2-11.4h5.2l-2.6-13.2-2.6 13.2zm23.2 11.4h-6.2l-1.2-6.2h-7.2l-1.2 6.2h-6.2l7.2-32.6h7.2l7.2 32.6zm-7.2-11.4h5.2l-2.6-13.2-2.6 13.2zm23.2 11.4h-6.2l-1.2-6.2h-7.2l-1.2 6.2h-6.2l7.2-32.6h7.2l7.2 32.6zm-7.2-11.4h5.2l-2.6-13.2-2.6 13.2z"/></svg> },
  { name: 'MySQL', svg: <svg width="60" height="60" viewBox="0 0 128 128"><path fill="#00758F" d="M64 8.1l54.6 31.5v48.8L64 119.9 9.4 88.4V39.6z"/><path fill="#fff" d="M64 16.6l47.1 27.2v40.4L64 111.4 16.9 84.2V43.8z"/><path fill="#00758F" d="M64 24.1l39.6 22.9v34.1L64 103.9 24.4 81.1V47z"/><path fill="#fff" d="M64 32.1l32.1 18.6v27.2L64 96.1 31.9 77.9V50.7z"/><path fill="#00758F" d="M64 40.1l24.6 14.2v20.2L64 88.1 39.4 74.3V54.3z"/></svg> },
  { name: 'NoSQL', svg: <svg width="60" height="60" viewBox="0 0 128 128"><path fill="#47A248" d="M64 8.1l54.6 31.5v48.8L64 119.9 9.4 88.4V39.6z"/><path fill="#fff" d="M64 16.6l47.1 27.2v40.4L64 111.4 16.9 84.2V43.8z"/><path fill="#47A248" d="M64 24.1l39.6 22.9v34.1L64 103.9 24.4 81.1V47z"/><path fill="#fff" d="M64 32.1l32.1 18.6v27.2L64 96.1 31.9 77.9V50.7z"/><path fill="#47A248" d="M64 40.1l24.6 14.2v20.2L64 88.1 39.4 74.3V54.3z"/></svg> },
  { name: 'Python', svg: <svg width="60" height="60" viewBox="0 0 128 128"><linearGradient id="python0" gradientUnits="userSpaceOnUse" x1="70.252" y1="1237.476" x2="170.659" y2="1151.089" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)"><stop offset="0" stopColor="#5A9FD4"/><stop offset="1" stopColor="#306998"/></linearGradient><path fill="url(#python0)" d="M63.9 1.6c-4.2.02-8.3.38-12.3 1.06-10.9 1.8-12.9 5.57-12.9 12.53v9.18h25.8v3.06H38.7c-7.2 0-13.1 4.32-15 12.53-2.2 9.1-2.3 14.8 0 24.2 1.8 7.5 6.1 12.5 13.3 12.5h8.6v-11.5c0-8.3 7.2-15.5 15.5-15.5h25.8c6.9 0 12.5-5.6 12.5-12.5v-23.1c0-6.7-5.6-11.3-12.5-12.5-4.3-.7-8.7-1.04-13.1-1.06zm-13.7 8.7c2.1 0 3.8 1.7 3.8 3.8 0 2.1-1.7 3.8-3.8 3.8-2.1 0-3.8-1.7-3.8-3.8 0-2.1 1.7-3.8 3.8-3.8z"/><linearGradient id="python1" gradientUnits="userSpaceOnUse" x1="209.474" y1="1098.811" x2="173.62" y2="1150.49" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)"><stop offset="0" stopColor="#FFD43B"/><stop offset="1" stopColor="#FFE873"/></linearGradient><path fill="url(#python1)" d="M102.2 27.4v10.2c0 8.5-7.2 15.7-15.7 15.7H60.7c-6.8 0-12.5 5.7-12.5 12.5v23.1c0 6.7 5.7 10.7 12.5 12.5 8.1 2.3 15.9 2.7 25.8 0 7.1-1.8 12.5-5.4 12.5-12.5v-9.2H72.2v-3.1h25.8c7.2 0 10.5-5.1 12.5-12.5 2.2-9.1 2.1-14.8 0-24.2-1.7-7.5-5.3-12.5-12.3-12.5zm-13.2 61.2c2.1 0 3.8 1.7 3.8 3.8 0 2.1-1.7 3.8-3.8 3.8-2.1 0-3.8-1.7-3.8-3.8 0-2.1 1.7-3.8 3.8-3.8z"/></svg> },
];

const SkillsLogosBar = memo(() => {
  const radius = 200;
  const center = 240;
  const logos = skills.length;
  return (
    <div className="skills-circle-bar">
      <svg width={center * 2} height={center * 2} style={{ overflow: 'visible' }}>
        <g>
          {skills.map((skill, i) => {
            const angle = (2 * Math.PI * i) / logos - Math.PI / 2;
            const x = center + radius * Math.cos(angle) - 30;
            const y = center + radius * Math.sin(angle) - 30;
            return (
              <foreignObject key={skill.name} x={x} y={y} width={60} height={60} style={{ filter: 'drop-shadow(0 0 6px #0ff)' }}>
                {skill.svg}
              </foreignObject>
            );
          })}
        </g>
      </svg>
    </div>
  );
});

SkillsLogosBar.displayName = 'SkillsLogosBar';

function App() {
  const [glitchMode, setGlitchMode] = useState(false);
  const [showVideoOverlay, setShowVideoOverlay] = useState(false);
  const [showSkillsLogos, setShowSkillsLogos] = useState(false);

  return (
    <div className={`app${glitchMode ? ' glitch-mode' : ''}`}>
      <div className="noise-bg" />
      <CustomCursor />
      <GlitchLogo />
      <Navigation />
      <NoiseOverlay />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/music" element={<Music />} />
          <Route path="/videos" element={<Videos />} />
        </Routes>
      </div>
      {showSkillsLogos && <SkillsLogosBar />}
      <Terminal onSkillsCommand={(show = true) => setShowSkillsLogos(show !== false)} />
      <AudioPlayer />
      <VideoOverlay show={showVideoOverlay} onClose={() => setShowVideoOverlay(false)} />
      <button
        className={`wings-toggle${glitchMode ? ' active' : ''}`}
        onClick={() => setShowVideoOverlay(true)}
        aria-pressed={glitchMode}
        title={glitchMode ? 'Désactiver Glitch Mode' : 'Activer Glitch Mode'}
      >
        <span className="wing left">{'<'}</span>
        <span style={{ width: '24px', display: 'inline-block' }}></span>
        <span className="wing right">{'>'}</span>
      </button>
    </div>
  );
}

const Home = () => (
  <div className="home-container">
    <div className="cyber-grid"></div>
  </div>
);

const Music = () => (
  <div className="music-container">
    <h2 className="section-title">MUSIC</h2>
    {/* Add your music content here */}
  </div>
);

const Videos = () => (
  <div className="videos-container">
    <h2 className="section-title">VIDEOS</h2>
    {/* Add your videos content here */}
  </div>
);

export default App; 