import { useCallback, useRef } from 'react';

// Office-style ID badge for the home page. Tilts toward the pointer, the same
// effect as the profile card on the main branch (rotation = offset / 7 deg).
export default function Badge({ photo, name, title, mark }) {
  const cardRef = useRef(null);

  const onMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card || e.pointerType === 'touch') return;
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    card.style.setProperty('--rotate-x', `${(x - 50) / 7}deg`);
    card.style.setProperty('--rotate-y', `${(50 - y) / 7}deg`);
  }, []);

  const onLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--rotate-x', '0deg');
    card.style.setProperty('--rotate-y', '0deg');
  }, []);

  return (
    <figure className="badge-wrap">
      <div ref={cardRef} className="badge" onPointerMove={onMove} onPointerLeave={onLeave}>
        <div className="badge-top" aria-hidden="true">
          <span className="badge-slot" />
          <span className="badge-mark">{mark}</span>
        </div>
        <div className="badge-photo">
          <img src={photo} alt={`Portrait of ${name}`} width="320" height="320" />
        </div>
        <figcaption className="badge-id">
          <span className="badge-name">{name}</span>
          <span className="badge-title">{title}</span>
          <span className="badge-code" aria-hidden="true" />
        </figcaption>
      </div>
    </figure>
  );
}
