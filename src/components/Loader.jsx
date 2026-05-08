import React, { useEffect, useState } from 'react';
import './Loader.css';

export default function Loader({ onFinish }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="loader">
      <div className="loader__content">
        <div className="loader__logo">
          <span className="loader__logo-bracket">&lt;</span>
          <span className="loader__logo-text">Dev</span>
          <span className="loader__logo-bracket">/&gt;</span>
        </div>
        <div className="loader__bar-wrap">
          <div className="loader__bar" style={{ width: `${progress}%` }} />
        </div>
        <p className="loader__percent">{progress}%</p>
      </div>
    </div>
  );
}
