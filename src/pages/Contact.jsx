import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FaGithub, FaTelegram,
  FaEnvelope, FaCopy, FaCheck, FaExternalLinkAlt,
} from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';
import './Contact.css';

const TG_TOKEN   = '8680939785:AAEwqnk4LlhGDDzPadT-vXcpScyVsJZBdXw';
const TG_CHAT_ID = '7401184140';

const EMAIL = 'shagzodbek334@gmail.com';

const socialLinks = [
  { name: 'GitHub',   url: 'https://github.com/shagzodbek334-coder', icon: <FaGithub size={20} /> },
  { name: 'Telegram', url: 'https://t.me/S022F1',                    icon: <FaTelegram size={20} /> },
];

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm]     = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const text =
      `📩 Yangi xabar!\n\n` +
      `👤 Ism: ${form.name}\n` +
      `📧 Email: ${form.email}\n\n` +
      `💬 Xabar:\n${form.message}`;

    try {
      const res = await fetch(
        `https://api.telegram.org/bot${TG_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: TG_CHAT_ID, text }),
        }
      );
      const data = await res.json();
      if (data.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="contact section">
      <div className="container">
        <div className="contact__header">
          <h1 className="section-title">{t('contact.title')}</h1>
          <p className="section-subtitle">{t('contact.subtitle')}</p>
        </div>

        <div className="contact__grid">
          {/* Info */}
          <div className="contact__info">
            <div className="contact__email-card">
              <div className="contact__email-icon">
                <FaEnvelope size={22} />
              </div>
              <div>
                <p className="contact__email-label">Email</p>
                <p className="contact__email-value">{EMAIL}</p>
              </div>
              <button
                className={`contact__copy-btn ${copied ? 'contact__copy-btn--copied' : ''}`}
                onClick={copyEmail}
                aria-label="Copy email"
              >
                {copied ? <FaCheck size={13} /> : <FaCopy size={13} />}
                <span>{copied ? t('contact.copied') : t('contact.copy_email')}</span>
              </button>
            </div>

            <div className="contact__social">
              <h3>Social Links</h3>
              <div className="contact__social-links">
                {socialLinks.map(link => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__social-link"
                  >
                    {link.icon}
                    <span>{link.name}</span>
                    <FaExternalLinkAlt size={11} className="contact__social-arrow" />
                  </a>
                ))}
              </div>
            </div>

            <div className="contact__availability">
              <div className="contact__avail-dot" />
              <div>
                <p className="contact__avail-title">Available for work</p>
                <p className="contact__avail-desc">Open to freelance & full-time opportunities</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form className="contact__form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="name">{t('contact.name')}</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder={t('contact.name')}
                required
                autoComplete="name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">{t('contact.email')}</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder={t('contact.email')}
                required
                autoComplete="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">{t('contact.message')}</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder={t('contact.message')}
                rows={6}
                required
              />
            </div>

            {status === 'success' && (
              <div className="form-success">{t('contact.success')}</div>
            )}
            {status === 'error' && (
              <div className="form-error">{t('contact.error')}</div>
            )}

            <button
              type="submit"
              className="btn-primary contact__submit"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? (
                <>
                  <span className="contact__spinner" />
                  {t('contact.sending')}
                </>
              ) : (
                <>
                  <IoSend size={15} />
                  {t('contact.send')}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
