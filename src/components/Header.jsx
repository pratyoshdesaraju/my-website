import { Link, NavLink } from 'react-router-dom';
import { FiMoon, FiSun } from 'react-icons/fi';
import { person } from '../data/profile';

const NAV = [
  { to: '/work', label: 'Work' },
  { to: '/bio', label: 'Bio' },
  { to: '/contact', label: 'Contact' },
];

export default function Header({ theme, onToggleTheme }) {
  const isDark = theme === 'dark';
  const nextLabel = `Switch to ${isDark ? 'light' : 'dark'} mode`;

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="wordmark" aria-label={`${person.name}, home`}>
          <span className="wordmark-mark" aria-hidden="true">PD</span>
          <span className="wordmark-name">{person.name}</span>
        </Link>
        <nav aria-label="Primary">
          <ul className="nav-list">
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={nextLabel}
          title={nextLabel}
        >
          {isDark ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}
