import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
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

        {/* Header */}
        <div className="projects__header">
          <p className="projects__header-tag">// my work</p>
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
              {activeFilter === cat && <span className="filter-btn__dot" />}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="projects__grid">
          {filtered.map((project, i) => (
            <div
              key={project.id}
              className="pcard"
              style={{ animationDelay: `${i * 0.08}s` }}
              onClick={() => setModal(project)}
            >
              {/* Image */}
              <div className="pcard__img-wrap">
                <img src={project.image} alt={project.title} loading="lazy" />
                <div className="pcard__img-overlay">
                  <span className="pcard__open-btn">
                    <FaExternalLinkAlt size={14} />
                    View Project
                  </span>
                </div>
                <span className={`pcard__badge pcard__badge--${project.status === 'Completed' ? 'done' : 'wip'}`}>
                  {project.status === 'Completed' ? '✓ Done' : '⚡ WIP'}
                </span>
                <span className="pcard__num">0{i + 1}</span>
              </div>

              {/* Body */}
              <div className="pcard__body">
                <div className="pcard__category">{project.category}</div>
                <h3 className="pcard__title">{project.title}</h3>
                <p className="pcard__desc">{project.description}</p>

                <div className="pcard__footer">
                  <div className="pcard__tags">
                    {project.technologies.slice(0, 3).map(tech => (
                      <span key={tech} className="pcard__tag">{tech}</span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="pcard__tag pcard__tag--more">+{project.technologies.length - 3}</span>
                    )}
                  </div>
                  <div className="pcard__links">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="pcard__icon-btn"
                      aria-label="GitHub"
                    >
                      <FaGithub size={16} />
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="pcard__icon-btn pcard__icon-btn--primary"
                      aria-label="Live Demo"
                    >
                      <FaExternalLinkAlt size={13} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Glow border on hover */}
              <div className="pcard__glow" />
            </div>
          ))}
        </div>

        {/* Modal */}
        {modal && (
          <div className="pmodal-overlay" onClick={() => setModal(null)}>
            <div className="pmodal" onClick={e => e.stopPropagation()}>
              <button className="pmodal__close" onClick={() => setModal(null)} aria-label="Close">
                <IoClose size={20} />
              </button>

              <div className="pmodal__img-wrap">
                <img src={modal.image} alt={modal.title} />
                <div className="pmodal__img-overlay" />
              </div>

              <div className="pmodal__body">
                <div className="pmodal__top">
                  <div>
                    <p className="pmodal__category">{modal.category}</p>
                    <h2 className="pmodal__title">{modal.title}</h2>
                  </div>
                  <span className={`pcard__badge pcard__badge--${modal.status === 'Completed' ? 'done' : 'wip'}`}>
                    {modal.status === 'Completed' ? '✓ Done' : '⚡ WIP'}
                  </span>
                </div>

                <p className="pmodal__desc">{modal.description}</p>

                <div className="pmodal__tech">
                  <p className="pmodal__tech-label">Tech Stack</p>
                  <div className="pcard__tags">
                    {modal.technologies.map(tech => (
                      <span key={tech} className="pcard__tag">{tech}</span>
                    ))}
                  </div>
                </div>

                <div className="pmodal__links">
                  <a href={modal.github} target="_blank" rel="noopener noreferrer" className="pmodal__btn pmodal__btn--outline">
                    <FaGithub size={16} /> GitHub
                  </a>
                  <a href={modal.demo} target="_blank" rel="noopener noreferrer" className="pmodal__btn pmodal__btn--primary">
                    <FaExternalLinkAlt size={13} /> Live Demo
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
