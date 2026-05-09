import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FaMapMarkerAlt, FaBriefcase, FaGraduationCap,
  FaHandshake, FaComments, FaPuzzlePiece, FaClock,
  FaBook, FaBullseye,
} from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import './About.css';

const skills = [
  { name: 'HTML',        level: 95, color: '#E34F26' },
  { name: 'React',       level: 92, color: '#61DAFB' },
  { name: 'JavaScript',  level: 90, color: '#F7DF1E' },
  { name: 'CSS / SCSS',  level: 92, color: '#1572B6' },
];

const softSkills = [
  { icon: <FaHandshake />,   label: 'Teamwork' },
  { icon: <FaComments />,    label: 'Communication' },
  { icon: <FaPuzzlePiece />, label: 'Problem Solving' },
  { icon: <FaClock />,       label: 'Time Management' },
  { icon: <FaBook />,        label: 'Fast Learning' },
  { icon: <FaBullseye />,    label: 'Attention to Detail' },
];

const workProcess = [
  { step: '01', title: 'Discovery',    desc: 'Understanding requirements and goals' },
  { step: '02', title: 'Design',       desc: 'Planning architecture and UI/UX' },
  { step: '03', title: 'Development',  desc: 'Writing clean, efficient code' },
  { step: '04', title: 'Testing',      desc: 'Ensuring quality and performance' },
  { step: '05', title: 'Deploy',       desc: 'Launching and monitoring' },
];

export default function About() {
  const { t } = useTranslation();
  const [imgOpen, setImgOpen] = useState(false);

  return (
    <main className="about section">
      <div className="container">

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

        {/* Header */}
        <div className="about__header">
          <h1 className="section-title">{t('about.title')}</h1>
          <p className="section-subtitle">{t('about.subtitle')}</p>
        </div>

        {/* Bio + Stats */}
        <div className="about__top">
          <div className="about__bio-wrap">
            <div className="about__avatar" onClick={() => setImgOpen(true)}>
              <div className="about__avatar-inner">
                <img src="/avatar.jpg" alt="Shaxzodbek" />
              </div>
              <div className="about__avatar-ring" />
            </div>
            <div className="about__bio-text">
              <h2>Shaxzodbek <span className="gradient-text">Developer</span></h2>
              <p className="about__bio">{t('about.bio')}</p>
              <div className="about__meta">
                <span><FaMapMarkerAlt /> Fargona, Uzbekistan</span>
                <span><FaBriefcase /> {t('about.years')}</span>
              </div>
            </div>
          </div>

          <div className="about__stats">
            <div className="about__stat">
              <span className="about__stat-value">1</span>
              <span className="about__stat-label">{t('about.years')}</span>
            </div>
            <div className="about__stat">
              <span className="about__stat-value">10+</span>
              <span className="about__stat-label">{t('about.clients')}</span>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="about__section">
          <h3 className="about__section-title">{t('about.skills_title')}</h3>
          <div className="skills-grid">
            {skills.map(skill => (
              <div key={skill.name} className="skill-item">
                <div className="skill-item__header">
                  <span className="skill-item__name">{skill.name}</span>
                  <span className="skill-item__level">{skill.level}%</span>
                </div>
                <div className="skill-item__bar">
                  <div
                    className="skill-item__fill"
                    style={{ width: `${skill.level}%`, background: skill.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div className="about__section">
          <h3 className="about__section-title">{t('about.soft_skills')}</h3>
          <div className="soft-skills">
            {softSkills.map(s => (
              <div key={s.label} className="soft-skill">
                <span className="soft-skill__icon">{s.icon}</span>
                <span className="soft-skill__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Work Process */}
        <div className="about__section">
          <h3 className="about__section-title">{t('about.work_process')}</h3>
          <div className="work-process">
            {workProcess.map((step, i) => (
              <div key={i} className="work-step">
                <div className="work-step__num">{step.step}</div>
                <div className="work-step__content">
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
                {i < workProcess.length - 1 && <div className="work-step__line" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
