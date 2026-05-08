import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { projects } from '../data/projects';
import './Projects.css';

const categories = ['All', 'React', 'Landing', 'UI/UX', 'Responsive'];

export default function Projects() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('All');
  const [modal, setModal] = useState(null);

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <main className="projects section">
      <div className="container">
        <div className="projects__header">
          <h1 className="section-title">{t('projects.title')}</h1>
          <p className="section-subtitle">{t('projects.subtitle')}</p>
        </div>

        {/* Filters */}
        <div className="projects__filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${activeFilter === cat ? 'filter-btn--active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="projects__grid">
          {filtered.map(project => (
            <div
              key={project.id}
              className="project-card"
              onClick={() => setModal(project)}
            >
              <div className="project-card__image">
                <img src={project.image} alt={project.title} loading="lazy" />
                <div className="project-card__overlay">
                  <span className="project-card__view">View Details</span>
                </div>
                <span className={`project-card__status project-card__status--${project.status === 'Completed' ? 'done' : 'progress'}`}>
                  {project.status}
                </span>
              </div>
              <div className="project-card__body">
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__desc">{project.description}</p>
                <div className="project-card__tags">
                  {project.technologies.slice(0, 3).map(tech => (
                    <span key={tech} className="project-card__tag">{tech}</span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="project-card__tag">+{project.technologies.length - 3}</span>
                  )}
                </div>
                <div className="project-card__links">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="project-card__link"
                    aria-label="GitHub"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="project-card__link project-card__link--primary"
                    aria-label="Live Demo"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                    Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {modal && (
          <div className="modal-overlay" onClick={() => setModal(null)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <button className="modal__close" onClick={() => setModal(null)} aria-label="Close">✕</button>
              <img src={modal.image} alt={modal.title} className="modal__image" />
              <div className="modal__body">
                <div className="modal__header">
                  <h2>{modal.title}</h2>
                  <span className={`project-card__status project-card__status--${modal.status === 'Completed' ? 'done' : 'progress'}`}>
                    {modal.status}
                  </span>
                </div>
                <p className="modal__desc">{modal.description}</p>
                <div className="modal__tech">
                  <h4>Technologies</h4>
                  <div className="project-card__tags">
                    {modal.technologies.map(tech => (
                      <span key={tech} className="project-card__tag">{tech}</span>
                    ))}
                  </div>
                </div>
                <div className="modal__links">
                  <a href={modal.github} target="_blank" rel="noopener noreferrer" className="btn-outline">
                    GitHub
                  </a>
                  <a href={modal.demo} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
