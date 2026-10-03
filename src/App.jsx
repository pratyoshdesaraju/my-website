import { useCallback, useEffect, useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Work from './pages/Work';
import Bio from './pages/Bio';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

const BASE_TITLE = 'Pratyosh Desaraju';
const PAGE_TITLES = { '/work': 'Work', '/bio': 'Bio', '/contact': 'Contact' };

const getInitialTheme = () =>
  document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';

function RouteEffects() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
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

  const skipToContent = () => document.getElementById('main')?.focus();

  return (
    <HashRouter>
      <RouteEffects />
      <button type="button" className="skip-link" onClick={skipToContent}>
        Skip to content
      </button>
      <Header theme={theme} onToggleTheme={toggleTheme} />
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
    </HashRouter>
  );
}
