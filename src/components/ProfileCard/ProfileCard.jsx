//ProfileCard.jsx
import React, { useEffect, useRef, useCallback, useState } from "react";
import "./ProfileCard.css";

const ProfileCardComponent = ({ avatarUrl, name = "PRATYOSH DESARAJU", title = "Senior Engineer", status = "Online" }) => {
  const wrapRef = useRef(null);
  const cardRef = useRef(null);
  const [isDark, setIsDark] = useState(document.body?.getAttribute('data-theme') === 'dark');

  // Listen for theme changes
  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.body?.getAttribute('data-theme') === 'dark');
    };

    // Check theme on mount
    updateTheme();

    // Listen for changes to data-theme attribute
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });

    return () => observer.disconnect();
  }, []);

  // 3D tilt logic
  const handlePointerMove = useCallback((event) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const offsetX = (event.clientX - rect.left) / rect.width * 100;
    const offsetY = (event.clientY - rect.top) / rect.height * 100;
    card.style.setProperty('--rotate-x', `${(offsetX - 50) / 7}deg`);
    card.style.setProperty('--rotate-y', `${(50 - offsetY) / 7}deg`);
  }, []);

  const handlePointerLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--rotate-x', '0deg');
    card.style.setProperty('--rotate-y', '0deg');
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    card.addEventListener('pointermove', handlePointerMove);
    card.addEventListener('pointerleave', handlePointerLeave);
    return () => {
      card.removeEventListener('pointermove', handlePointerMove);
      card.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [handlePointerMove, handlePointerLeave]);

  return (
    <div ref={wrapRef} className="pc-card-wrapper">
      <section ref={cardRef} className={`pc-card ${isDark ? 'pc-card-dark' : 'pc-card-light'}`}>
        <div 
          className="pc-card-full-bg" 
          style={{
            backgroundImage: `url(${avatarUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="pc-bottom-section">
          <div className="pc-details-bottom">
            <h3>{name}</h3>
            <p>{title}</p>
            <p className="pc-company">Liberty Mutual Insurance Group</p>
          </div>
          <div>
            <div className="pc-status-bottom">
              <span className="pc-status-dot"></span>
              <span>{status}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default React.memo(ProfileCardComponent);
