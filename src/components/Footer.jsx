import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaGithub, FaTelegram } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <span className="footer__logo-name">Shaxzodbek</span>
            </Link>
            <p className="footer__tagline">Frontend Developer</p>
          </div>

          <div className="footer__links">
            <h4>Quick Links</h4>
            <nav>
              <Link to="/">{t('nav.home')}</Link>
              <Link to="/about">{t('nav.about')}</Link>
              <Link to="/contact">{t('nav.contact')}</Link>
            </nav>
          </div>

          <div className="footer__social">
            <h4>Social</h4>
            <div className="footer__social-links">
              <a href="https://github.com/shagzodbek334-coder" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FaGithub size={20} />
              </a>
              <a href="https://t.me/S022F1" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                <FaTelegram size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
