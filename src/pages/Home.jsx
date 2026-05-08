import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Home.css';

const techStack = [
  { name: 'React', icon: '⚛️' },
  { name: 'JavaScript', icon: '🟨' },
  { name: 'TypeScript', icon: '🔷' },
  { name: 'CSS', icon: '🎨' },
  { name: 'Next.js', icon: '▲' },
  { name: 'Git', icon: '🔀' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Redux', icon: '🔮' },
];

const typingTexts = [
  'Frontend Developer',
  'React Specialist',
  'UI/UX Enthusiast',
  'Open Source Contributor',
];

function useTyping(texts, speed = 80, pause = 2000) {
  const [display, setDisplay] = useState('');
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIdx];
    let timeout;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setTextIdx(i => (i + 1) % texts.length);
    }

    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, textIdx, texts, speed, pause]);

  return display;
}

const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '20+', label: 'Projects Done' },
  { value: '10+', label: 'Happy Clients' },
  { value: '5K+', label: 'GitHub Commits' },
];

export default function Home() {
  const { t } = useTranslation();
  const typedText = useTyping(typingTexts);

  return (
    <main className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__bg" aria-hidden="true">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="hero__particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
              }}
            />
          ))}
        </div>

        <div className="container hero__content">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            {t('hero.available')}
          </div>

          <h1 className="hero__title">
            <span className="hero__greeting">{t('hero.greeting')}</span>
            <span className="hero__name">{t('hero.name')}</span>
          </h1>

          <div className="hero__typing">
            <span className="hero__typed">{typedText}</span>
            <span className="hero__cursor" aria-hidden="true">|</span>
          </div>

          <p className="hero__bio">{t('hero.bio')}</p>

          <div className="hero__cta">
            <Link to="/contact" className="btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              {t('hero.cta_contact')}
            </Link>
            <Link to="/projects" className="btn-outline">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
              {t('hero.cta_projects')}
            </Link>
          </div>

          {/* Tech Stack */}
          <div className="hero__stack">
            {techStack.map(tech => (
              <div key={tech.name} className="hero__tech" title={tech.name}>
                <span>{tech.icon}</span>
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero__scroll" aria-hidden="true">
          <div className="hero__scroll-mouse">
            <div className="hero__scroll-wheel" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container stats__grid">
          {stats.map((stat, i) => (
            <div key={i} className="stats__card">
              <div className="stats__value">{stat.value}</div>
              <div className="stats__label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
