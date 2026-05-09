import React, { useEffect, useState } from 'react';
import './Loader.css';

const NAME = 'Shaxzodbek';

export default function Loader({ onFinish }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Harflarni birma-bir chiqar
    if (visibleCount < NAME.length) {
      const t = setTimeout(() => setVisibleCount(v => v + 1), 120);
      return () => clearTimeout(t);
    } else {
      // Hammasi chiqdi — biroz kut, keyin fade out
      const t = setTimeout(() => {
        setDone(true);
        setTimeout(onFinish, 600);
      }, 800);
      return () => clearTimeout(t);
    }
  }, [visibleCount, onFinish]);

  return (
    <div className={`loader ${done ? 'loader--out' : ''}`}>
      <div className="loader__content">
        <div className="loader__name">
          {NAME.split('').map((char, i) => (
            <span
              key={i}
              className={`loader__char ${i < visibleCount ? 'loader__char--visible' : ''}`}
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              {char}
            </span>
          ))}
        </div>
        <div className="loader__line">
          <div
            className="loader__line-fill"
            style={{ width: `${(visibleCount / NAME.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
