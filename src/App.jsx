import React, { useCallback, useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import styled from 'styled-components';
import { TiSocialLinkedinCircular } from 'react-icons/ti';
import { AiFillMediumCircle } from 'react-icons/ai';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import Footer from './components/Footer';
import ProfileCard from './components/ProfileCard/ProfileCard.jsx';
import BlurText from './components/BlurText.jsx';
import TextType from './components/TextType';
import Work from './pages/Work';
import Bio from './pages/Bio';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import './App.css';
import './index.css';
import pratyoshPic from './assets/pratyosh_desaraju.png';

const DockContainer = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
  padding: 12px 24px;
  background: ${({ isDark }) => (isDark ? "rgba(0, 0, 0, 0.85)" : "rgba(255, 255, 255, 0.85)")};
  backdrop-filter: blur(10px);
  border-radius: 50px;
  z-index: 50;
`;

const DockItem = styled(Link)`
  color: ${({ isDark }) => (isDark ? "#ffffff" : "#1a1a1a")};
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 25px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(253, 181, 21, 0.2);
    color: #FDB515;
    transform: scale(1.1);
  }
`;

const ThemeToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 8px;
`;

const ToggleTrack = styled.div`
  width: 44px;
  height: 24px;
  background: ${({ isDark }) => (isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)")};
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid ${({ isDark }) => (isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)")};
`;

const ToggleThumb = styled.div`
  width: 20px;
  height: 20px;
  background: ${({ isDark }) => (isDark ? "#ffffff" : "#1a1a1a")};
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: ${({ isDark }) => (isDark ? "2px" : "22px")};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  border: 2px solid ${({ isDark }) => (isDark ? "#FDB515" : "#8B5CF6")};
`;

const ToggleLabel = styled.span`
  font-size: 0.85rem;
  font-weight: 500;
  opacity: 0.9;
  white-space: nowrap;
  color: ${({ isDark }) => (isDark ? "#ffffff" : "#1a1a1a")};
`;

const BottomDockContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
  padding: 12px 24px;
  background: ${({ isDark }) => (isDark ? "rgba(0, 0, 0, 0.85)" : "rgba(255, 255, 255, 0.85)")};
  backdrop-filter: blur(10px);
  border-radius: 50px;
  z-index: 50;
`;

const SocialIcon = styled.a`
  font-size: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ isDark }) => (isDark ? "#ffffff" : "#000000")};
  text-decoration: none;
  
  &:hover {
    color: #FDB515;
    transform: scale(1.15);
  }
`;

const EmailButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: ${({ isDark }) => (isDark ? "#ffffff" : "#000000")};
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #FDB515;
    transform: scale(1.15);
  }
`;

function Home({ theme }) {
  const isDark = theme === 'dark';
  const messageContentClass = isDark ? 'home-message-content dark' : 'home-message-content light';

  return (
    <div className="home-2column" style={{ paddingBottom: '120px' }}>
      <div className="home-message">
        <div className={messageContentClass}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <BlurText
              text="Hi there,"
              delay={40}
              stepDuration={0.18}
              animateBy="words"
              direction="top"
              className="text-2xl mb-6"
            >
              <span className="wave-emoji" style={{ fontSize: '2em', marginLeft: '0.4em' }}>
                👋
              </span>
            </BlurText>
          </div>

          <div className="text-2xl" style={{ display: 'flex', alignItems: 'center', marginBottom: '-0.5rem' }}>
            <span style={{ fontWeight: 400 }}>
              <BlurText text="I am " delay={40} stepDuration={0.18} animateBy="words" direction="top" />
            </span>
            <span style={{ color: '#FDB515', marginLeft: '0.5em', fontWeight: 600 }}>
              <BlurText text="Pratyosh Desaraju" delay={40} stepDuration={0.18} animateBy="words" direction="top" />
            </span>
          </div>

          <div className="text-2xl mb-6" style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
            <TextType
              text={["Engineer...", "Programmer...", "Team Player..."]}
              typingSpeed={100}
              deletingSpeed={60}
              pauseDuration={1500}
              className="text-2xl"
              isDark={isDark}
            />
          </div>
        </div>
      </div>

      <div className="home-profilecard">
        <ProfileCard
          avatarUrl={pratyoshPic}
          name="Pratyosh Desaraju"
          title="Senior Engineer"
          status="Online"
        />
      </div>
    </div>
  );
}

function App() {
  // Changed from 'dark' to 'light' - light mode is now the default
  const [theme, setTheme] = useState('light');

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.setAttribute('data-theme', savedTheme);
  }, []);

  // Update body attribute when theme changes
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const newTheme = prev === 'dark' ? 'light' : 'dark';
      // Update body attribute immediately
      document.body.setAttribute('data-theme', newTheme);
      // Save to localStorage
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  }, []);

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const isDark = theme === 'dark';

  return (
    <Router>
      <div className="particles-container" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
        <Particles
          key={theme}
          id="tsparticles"
          init={particlesInit}
          options={{
            background: {
              color: {
                value: 'transparent',
              },
            },
            fpsLimit: 60,
            particles: {
              number: {
                value: 150,
              },
              color: {
                value: isDark ? '#ffffff' : '#8B5CF6',
              },
              shape: {
                type: 'circle',
              },
              size: {
                value: { min: 1, max: 3 },
              },
              opacity: {
                value: { min: 0.4, max: 0.9 },
              },
              animation: {
                enable: true,
                speed: 1,
              },
              move: {
                enable: true,
                speed: 0.5,
              },
            },
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: 'repulse',
                },
                onClick: {
                  enable: true,
                  mode: 'push',
                },
              },
              modes: {
                repulse: {
                  distance: 80,
                },
                push: {
                  quantity: 2,
                },
              },
            },
          }}
        />
      </div>

      <DockContainer isDark={isDark}>
        <DockItem isDark={isDark} to="/">Home</DockItem>
        <DockItem isDark={isDark} to="/work">Work</DockItem>
        <DockItem isDark={isDark} to="/bio">Bio</DockItem>
        <DockItem isDark={isDark} to="/contact">Contact</DockItem>
        <div style={{ width: '1px', background: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)', margin: '0 8px' }}></div>
        <ThemeToggleButton onClick={toggleTheme} title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}>
          <ToggleLabel isDark={isDark}>{theme === 'dark' ? 'Dark' : 'Light'}</ToggleLabel>
          <ToggleTrack isDark={theme === 'dark'}>
            <ToggleThumb isDark={theme === 'dark'} />
          </ToggleTrack>
        </ThemeToggleButton>
      </DockContainer>

      <main style={{ position: 'relative', zIndex: 5, padding: '120px 0 140px', minHeight: '100vh', boxSizing: 'border-box' }}>
        <Routes>
          <Route path="/" element={<Home theme={theme} />} />
          <Route path="/work" element={<Work theme={theme} />} />
          <Route path="/bio" element={<Bio theme={theme} />} />
          <Route path="/contact" element={<Contact theme={theme} />} />
          <Route path="*" element={<NotFound theme={theme} />} />
        </Routes>
      </main>

      <BottomDockContainer isDark={isDark}>
        <SocialIcon 
          isDark={isDark}
          href="https://linkedin.com/in/pratyosh" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
        >
          <TiSocialLinkedinCircular />
        </SocialIcon>
        <SocialIcon 
          isDark={isDark}
          href="https://medium.com/@pratyosh.desaraju" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Medium Profile"
        >
          <AiFillMediumCircle />
        </SocialIcon>
        <EmailButton 
          isDark={isDark}
          onClick={() => {
            navigator.clipboard.writeText("your-email@example.com");
            alert("Email copied to clipboard!");
          }}
          aria-label="Copy Email"
        >
          <MdOutlineAlternateEmail />
        </EmailButton>
      </BottomDockContainer>
    </Router>
  );
}

export default App;
