import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Work from './pages/Work';
import Bio from './pages/Bio';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import FLAGS from './featureFlags';

// Loaded separately so the particle engine never delays the first paint.
const ParticlesBg = lazy(() => import('./components/ParticlesBg'));

const BASE_TITLE = 'Pratyosh Desaraju';
const PAGE_TITLES = { '/work': 'Work', '/bio': 'Bio', '/contact': 'Contact' };

const getInitialTheme = () =>
  document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';

// Particles are on by default unless the visitor turned them off or asks for reduced motion.
const getInitialParticles = () => {
  try {
    const saved = localStorage.getItem('particles');
    if (saved) return saved === 'on';
  } catch {
    // Storage unavailable; fall through to the default.
  }
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

function RouteEffects() {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = PAGE_TITLES[pathname];
    document.title = page ? `${page} | ${BASE_TITLE}` : `${BASE_TITLE} | Senior Software Engineer`;
  }, [pathname]);

  return null;
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('theme', next);
      } catch {
        // Storage can be unavailable (private mode); the theme still applies for this visit.
      }
      return next;
    });
  }, []);

  const [particles, setParticles] = useState(getInitialParticles);

  const toggleParticles = useCallback(() => {
    setParticles((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('particles', next ? 'on' : 'off');
      } catch {
        // Storage can be unavailable (private mode); the choice still applies for this visit.
      }
      return next;
    });
  }, []);

  const skipToContent = () => document.getElementById('main')?.focus();

  return (
    <HashRouter>
      <RouteEffects />
      <div className="app">
        <button type="button" className="skip-link" onClick={skipToContent}>
          Skip to content
        </button>
        {FLAGS.SHOW_PARTICLES && particles && (
          <Suspense fallback={null}>
            <ParticlesBg theme={theme} />
          </Suspense>
        )}
        <Header
          theme={theme}
          onToggleTheme={toggleTheme}
          particles={FLAGS.SHOW_PARTICLES ? particles : null}
          onToggleParticles={toggleParticles}
        />
        <main id="main" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/bio" element={<Bio />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}
