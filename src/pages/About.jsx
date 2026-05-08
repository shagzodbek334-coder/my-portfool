import React from 'react';
import { useTranslation } from 'react-i18next';
import './About.css';

const skills = [
  { name: 'HTML', level: 95, color: '#E34F26' },
  { name: 'CSS / SCSS', level: 92, color: '#1572B6' },
  { name: 'JavaScript', level: 90, color: '#F7DF1E' },
  { name: 'TypeScript', level: 80, color: '#3178C6' },
  { name: 'React', level: 92, color: '#61DAFB' },
  { name: 'Next.js', level: 78, color: '#ffffff' },
  { name: 'Redux', level: 82, color: '#764ABC' },
  { name: 'Git', level: 88, color: '#F05032' },
  { name: 'REST API', level: 85, color: '#00D4AA' },
];

const softSkills = [
  { icon: '🤝', label: 'Teamwork' },
  { icon: '💬', label: 'Communication' },
  { icon: '🧩', label: 'Problem Solving' },
  { icon: '⏰', label: 'Time Management' },
  { icon: '📚', label: 'Fast Learning' },
  { icon: '🎯', label: 'Attention to Detail' },
];

const workProcess = [
  { step: '01', title: 'Discovery', desc: 'Understanding requirements and goals' },
  { step: '02', title: 'Design', desc: 'Planning architecture and UI/UX' },
  { step: '03', title: 'Development', desc: 'Writing clean, efficient code' },
  { step: '04', title: 'Testing', desc: 'Ensuring quality and performance' },
  { step: '05', title: 'Deploy', desc: 'Launching and monitoring' },
];

export default function About() {
  const { t } = useTranslation();

  return (
    <main className="about section">
      <div className="container">
        {/* Header */}
        <div className="about__header">
          <h1 className="section-title">{t('about.title')}</h1>
          <p className="section-subtitle">{t('about.subtitle')}</p>
        </div>

        {/* Bio + Stats */}
        <div className="about__top">
          <div className="about__bio-wrap">
            <div className="about__avatar">
              <div className="about__avatar-inner">
                <span>👨‍💻</span>
              </div>
              <div className="about__avatar-ring" />
            </div>
            <div className="about__bio-text">
              <h2>Shaxzod <span className="gradient-text">Developer</span></h2>
              <p className="about__bio">{t('about.bio')}</p>
              <div className="about__meta">
                <span>📍 Tashkent, Uzbekistan</span>
                <span>💼 {t('about.years')}</span>
                <span>🎓 {t('about.education_degree')}</span>
              </div>
            </div>
          </div>

          <div className="about__stats">
            <div className="about__stat">
              <span className="about__stat-value">3+</span>
              <span className="about__stat-label">{t('about.years')}</span>
            </div>
            <div className="about__stat">
              <span className="about__stat-value">20+</span>
              <span className="about__stat-label">{t('about.projects_done')}</span>
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

        {/* Education */}
        <div className="about__section">
          <h3 className="about__section-title">{t('about.education_title')}</h3>
          <div className="education-card">
            <div className="education-card__icon">🎓</div>
            <div>
              <h4>{t('about.education_degree')}</h4>
              <p>{t('about.education_school')}</p>
              <span className="education-card__year">{t('about.education_year')}</span>
            </div>
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
