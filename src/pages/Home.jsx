import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FaReact, FaGitAlt, FaNodeJs, FaEnvelope,
} from 'react-icons/fa';
import {
  SiJavascript, SiTypescript, SiNextdotjs, SiRedux,
} from 'react-icons/si';
import { IoClose } from 'react-icons/io5';
import Scene3D from '../components/Scene3D';
import './Home.css';

const techStack = [
  { name: 'React',      icon: <FaReact color="#61DAFB" /> },
  { name: 'JavaScript', icon: <SiJavascript color="#F7DF1E" /> },
  { name: 'TypeScript', icon: <SiTypescript color="#3178C6" /> },
  { name: 'CSS',        icon: <span style={{fontSize:'1rem', fontWeight:800, color:'#1572B6'}}>CSS</span> },
  { name: 'Next.js',    icon: <SiNextdotjs /> },
  { name: 'Git',        icon: <FaGitAlt color="#F05032" /> },
  { name: 'Node.js',    icon: <FaNodeJs color="#339933" /> },
  { name: 'Redux',      icon: <SiRedux color="#764ABC" /> },
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
  { value: '1', label: 'Years Experience' },
  { value: '10+', label: 'Happy Clients' },
  { value: '5K+', label: 'GitHub Commits' },
];

export default function Home() {
  const { t } = useTranslation();
  const typedText = useTyping(typingTexts);
  const [imgOpen, setImgOpen] = useState(false);

  return (
    <main className="home">
      {/* Image Modal */}
      {imgOpen && (
        <div className="avatar-modal" onClick={() => setImgOpen(false)}>
          <div className="avatar-modal__inner" onClick={e => e.stopPropagation()}>
            <button className="avatar-modal__close" onClick={() => setImgOpen(false)} aria-label="Close">
              <IoClose size={18} />
            </button>
            <img src="/avatar.jpg" alt="Shaxzodbek" />
          </div>
        </div>
      )}

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

        {/* 3D Model */}
        <div className="hero__3d" aria-hidden="true">
          <Scene3D />
        </div>

        <div className="container hero__content">
          <div className="hero__avatar" onClick={() => setImgOpen(true)}>
            <div className="hero__avatar-inner">
              <img src="/avatar.jpg" alt="Shaxzodbek" />
            </div>
            <div className="hero__avatar-ring" />
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
              <FaEnvelope size={15} />
              {t('hero.cta_contact')}
            </Link>
          </div>

          {/* Tech Stack */}
          <div className="hero__stack">
            {techStack.map(tech => (
              <div key={tech.name} className="hero__tech" title={tech.name}>
                <span className="hero__tech-icon">{tech.icon}</span>
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
