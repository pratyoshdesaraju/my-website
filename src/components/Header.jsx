import { Link, NavLink } from 'react-router-dom';
import { FiMoon, FiSun } from 'react-icons/fi';
import { HiOutlineSparkles, HiSparkles } from 'react-icons/hi2';
import { person } from '../data/profile';
import './Header.css';

const NAV = [
  { to: '/work', label: 'Work' },
  { to: '/bio', label: 'Bio' },
  { to: '/contact', label: 'Contact' },
];

export default function Header({ theme, onToggleTheme, particles, onToggleParticles }) {
  const isDark = theme === 'dark';
  const nextLabel = `Switch to ${isDark ? 'light' : 'dark'} mode`;
  const particlesLabel = particles ? 'Turn off background particles' : 'Turn on background particles';

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
        <div className="header-toggles">
        {particles !== null && (
          <button
            type="button"
            className="theme-toggle"
            onClick={onToggleParticles}
            aria-pressed={particles}
            aria-label={particlesLabel}
            title={particlesLabel}
          >
            {particles ? <HiSparkles aria-hidden="true" /> : <HiOutlineSparkles aria-hidden="true" />}
          </button>
        )}
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
      </div>
    </header>
  );
}
