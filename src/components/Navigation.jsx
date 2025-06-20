import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navigation.scss';

const Navigation = () => {
  const [activeLink, setActiveLink] = useState('');

  const handleMouseEnter = (link) => {
    setActiveLink(link);
  };

  const handleMouseLeave = () => {
    setActiveLink('');
  };

  return (
    <nav className="cyber-nav">
      <div className="nav-glitch-container">
        {['INSTAGRAM', 'TELEGRAM', 'YOUTUBE', 'CONTACT'].map((link) => (
          <Link
            key={link}
            to={`/${link.toLowerCase()}`}
            className={`nav-link ${activeLink === link ? 'active' : ''}`}
            onMouseEnter={() => handleMouseEnter(link)}
            onMouseLeave={handleMouseLeave}
            data-text={link}
          >
            {link}
            <div className="glitch-effect"></div>
          </Link>
        ))}
      </div>
      <div className="nav-scanner"></div>
    </nav>
  );
};

export default Navigation; 