import { FiArrowUpRight } from 'react-icons/fi';

export function Section({ id, eyebrow, title, intro, children }) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`} tabIndex={-1}>
      <header className="section-head">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 id={`${id}-title`}>{title}</h2>
        {intro && <p className="section-intro">{intro}</p>}
      </header>
      {children}
    </section>
  );
}

export function ExtLink({ href, children, className = '' }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`ext-link ${className}`.trim()}>
      {children}
      <FiArrowUpRight aria-hidden="true" className="ext-icon" />
    </a>
  );
}

export function Metrics({ items, note }) {
  return (
    <div className="metrics">
      <ul className="metrics-row">
        {items.map((m) => (
          <li key={m.label} className="metric">
            <span className="metric-value">{m.value}</span>
            <span className="metric-label">{m.label}</span>
          </li>
        ))}
      </ul>
      {note && <p className="metrics-note">{note}</p>}
    </div>
  );
}
