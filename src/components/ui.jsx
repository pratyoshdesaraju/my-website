import { FiArrowUpRight } from 'react-icons/fi';

export function PageHead({ eyebrow, title, lead }) {
  return (
    <header className="page-head">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1>{title}</h1>
      {lead && <p className="page-lead">{lead}</p>}
    </header>
  );
}

export function PanelHead({ title, intro }) {
  return (
    <header className="panel-head">
      <h2>{title}</h2>
      {intro && <p className="panel-intro">{intro}</p>}
    </header>
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
