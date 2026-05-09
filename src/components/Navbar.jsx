import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { HiSun, HiMoon } from 'react-icons/hi';
import { FaHome, FaUser, FaEnvelope } from 'react-icons/fa';
import './Navbar.css';

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'uz', label: 'UZ' },
  { code: 'ru', label: 'RU' },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [langOpen, setLangOpen] = useState(false);

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('portfolio-lang', code);
    setLangOpen(false);
  };

  const navLinks = [
    { path: '/',        label: t('nav.home'),    icon: <FaHome size={16} /> },
    { path: '/about',   label: t('nav.about'),   icon: <FaUser size={16} /> },
    { path: '/contact', label: t('nav.contact'), icon: <FaEnvelope size={16} /> },
  ];

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  return (
    <div className="sitebar">
      {/* Logo */}
      <Link to="/" className="sitebar__logo">
        <span className="sitebar__logo-name">Shaxzodbek</span>
      </Link>

      {/* Nav links */}
      <nav className="sitebar__nav">
        {navLinks.map(link => (
          <Link
            key={link.path}
            to={link.path}
            className={`sitebar__link ${location.pathname === link.path ? 'sitebar__link--active' : ''}`}
          >
            <span className="sitebar__link-icon">{link.icon}</span>
            <span className="sitebar__link-label">{link.label}</span>
            {location.pathname === link.path && <span className="sitebar__link-dot" />}
          </Link>
        ))}
      </nav>

      {/* Controls */}
      <div className="sitebar__controls">
        {/* Language */}
        <div className="sitebar__lang">
          <button
            className="sitebar__lang-btn"
            onClick={() => setLangOpen(p => !p)}
            aria-label="Language"
          >
            {currentLang.label}
          </button>
          {langOpen && (
            <div className="sitebar__lang-dropdown">
              {languages.map(lang => (
                <button
                  key={lang.code}
                  className={`sitebar__lang-item ${i18n.language === lang.code ? 'sitebar__lang-item--active' : ''}`}
                  onClick={() => changeLanguage(lang.code)}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Theme */}
        <button className="sitebar__theme" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? <HiSun size={17} /> : <HiMoon size={17} />}
        </button>
      </div>
    </div>
  );
}
