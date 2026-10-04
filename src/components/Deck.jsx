import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// Deck shows one panel at a time. Wide screens get a tab bar; narrow screens
// get a compact picker with previous and next buttons, so nothing has to scroll.

export default function Deck({ panels, active, onChange, label, idPrefix }) {
  const idx = Math.max(0, panels.findIndex((p) => p.id === active));
  const current = panels[idx];
  if (!current) return null;
  const tabId = (p) => `${idPrefix}-tab-${p.id}`;
  const panelId = (p) => `${idPrefix}-panel-${p.id}`;

  const select = (i) => onChange(panels[(i + panels.length) % panels.length].id);

  const onTabKey = (e) => {
    let next = null;
    if (e.key === 'ArrowRight') next = idx + 1;
    else if (e.key === 'ArrowLeft') next = idx - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = panels.length - 1;
    if (next === null) return;
    e.preventDefault();
    const target = panels[(next + panels.length) % panels.length];
    onChange(target.id);
    requestAnimationFrame(() => document.getElementById(tabId(target))?.focus());
  };

  return (
    <div className="deck">
      <div className="deck-nav">
        <div role="tablist" aria-label={label} className="deck-tabs">
          {panels.map((p, i) => (
            <button
              key={p.id}
              id={tabId(p)}
              type="button"
              role="tab"
              className="deck-tab"
              aria-selected={i === idx}
              aria-controls={panelId(p)}
              tabIndex={i === idx ? 0 : -1}
              onClick={() => onChange(p.id)}
              onKeyDown={onTabKey}
            >
              {p.label}
            </button>
          ))}
        </div>
        <div className="deck-select">
          <button type="button" className="icon-btn" onClick={() => select(idx - 1)} aria-label="Previous section">
            <FiChevronLeft aria-hidden="true" />
          </button>
          <label className="visually-hidden" htmlFor={`${idPrefix}-select`}>
            {label}
          </label>
          <select id={`${idPrefix}-select`} value={current.id} onChange={(e) => onChange(e.target.value)}>
            {panels.map((p, i) => (
              <option key={p.id} value={p.id}>
                {String(i + 1).padStart(2, '0')} · {p.label}
              </option>
            ))}
          </select>
          <span className="deck-count mono muted small">
            {idx + 1}/{panels.length}
          </span>
          <button type="button" className="icon-btn" onClick={() => select(idx + 1)} aria-label="Next section">
            <FiChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>
      <section
        key={current.id}
        id={panelId(current)}
        role="tabpanel"
        aria-labelledby={tabId(current)}
        className="deck-panel"
      >
        {current.render()}
      </section>
    </div>
  );
}
