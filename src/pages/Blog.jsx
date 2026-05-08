import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { blogs } from '../data/blogs';
import './Blog.css';

export default function Blog() {
  const { t, i18n } = useTranslation();
  const [selected, setSelected] = useState(null);

  const getTitle = (blog) => {
    if (i18n.language === 'uz') return blog.title;
    if (i18n.language === 'ru') return blog.titleRu;
    return blog.titleEn;
  };

  const getDesc = (blog) => {
    if (i18n.language === 'uz') return blog.description;
    if (i18n.language === 'ru') return blog.descriptionRu;
    return blog.descriptionEn;
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(
      i18n.language === 'uz' ? 'uz-UZ' : i18n.language === 'ru' ? 'ru-RU' : 'en-US',
      { year: 'numeric', month: 'long', day: 'numeric' }
    );
  };

  if (selected) {
    return (
      <main className="blog-detail section">
        <div className="container blog-detail__inner">
          <button className="blog-detail__back" onClick={() => setSelected(null)}>
            ← {t('blog.title')}
          </button>
          <article className="blog-detail__article">
            <div className="blog-detail__meta">
              <span className="blog-detail__date">{formatDate(selected.date)}</span>
              <span className="blog-detail__read">{selected.readTime} {t('blog.min_read')}</span>
            </div>
            <h1>{getTitle(selected)}</h1>
            <div className="blog-detail__tags">
              {selected.tags.map(tag => (
                <span key={tag} className="blog-tag">{tag}</span>
              ))}
            </div>
            <div className="blog-detail__content">
              {selected.content.split('\n').map((line, i) => {
                if (line.startsWith('# ')) return <h1 key={i}>{line.slice(2)}</h1>;
                if (line.startsWith('## ')) return <h2 key={i}>{line.slice(3)}</h2>;
                if (line.startsWith('### ')) return <h3 key={i}>{line.slice(4)}</h3>;
                if (line.startsWith('`') && line.endsWith('`')) return <code key={i}>{line.slice(1, -1)}</code>;
                if (line === '') return <br key={i} />;
                return <p key={i}>{line}</p>;
              })}
            </div>
          </article>
        </div>
      </main>
    );
  }

  return (
    <main className="blog section">
      <div className="container">
        <div className="blog__header">
          <h1 className="section-title">{t('blog.title')}</h1>
          <p className="section-subtitle">{t('blog.subtitle')}</p>
        </div>

        <div className="blog__grid">
          {blogs.map(blog => (
            <article
              key={blog.id}
              className="blog-card"
              onClick={() => setSelected(blog)}
            >
              <div className="blog-card__top">
                <div className="blog-card__meta">
                  <span className="blog-card__date">{formatDate(blog.date)}</span>
                  <span className="blog-card__read">{blog.readTime} {t('blog.min_read')}</span>
                </div>
                <div className="blog-card__tags">
                  {blog.tags.map(tag => (
                    <span key={tag} className="blog-tag">{tag}</span>
                  ))}
                </div>
              </div>
              <h2 className="blog-card__title">{getTitle(blog)}</h2>
              <p className="blog-card__desc">{getDesc(blog)}</p>
              <button className="blog-card__read-more">
                {t('blog.read_more')} →
              </button>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
