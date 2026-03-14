// App.jsx
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
import FLAGS from './featureFlags';
import './App.css';
import './index.css';
import pratyoshPic from './assets/pratyosh_desaraju.png';


// ─── Styled Components ────────────────────────────────────────────────────────

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

const StatBar = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 32px;
  padding: 10px 0;
  flex-shrink: 0;
  margin-bottom: 0.75rem; /* ✅ ADD THIS */
`;


const StatDivider = styled.div`
  width: 1px;
  height: 32px;
  background: ${({ isDark }) => isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'};
`;

const StatItem = styled.div`
  text-align: center;
  .stat-value {
    font-size: 1.1rem;
    font-weight: 700;
    color: #FDB515;
  }
  .stat-label {
    font-size: 0.72rem;
    color: ${({ isDark }) => isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)'};
    margin-top: 2px;
  }
`;

const TabBar = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-start;
  padding: 8px 0;
  flex-shrink: 0;
  flex-wrap: wrap;
`;

const TabButton = styled.button`
  background: ${({ active, isDark }) =>
    active ? 'rgba(253, 181, 21, 0.18)' : isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'};
  color: ${({ active, isDark }) =>
    active ? '#FDB515' : isDark ? '#ffffff' : '#1a1a1a'};
  border: 1px solid ${({ active }) => active ? 'rgba(253,181,21,0.6)' : 'transparent'};
  padding: 7px 18px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 0.88rem;
  font-weight: ${({ active }) => active ? '600' : '400'};
  transition: all 0.25s ease;
  &:hover {
    background: rgba(253, 181, 21, 0.15);
    color: #FDB515;
  }
`;

const TabContent = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 12px 0 0;
  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb {
    background: rgba(253, 181, 21, 0.4);
    border-radius: 3px;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  padding-right: 8px;
`;

const Card = styled.div`
  background: ${({ isDark }) => isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'};
  border: 1px solid ${({ isDark }) => isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.09)'};
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: all 0.3s ease;
  &:hover {
    border-color: rgba(253, 181, 21, 0.5);
    transform: translateY(-2px);
  }
`;

const CardTitle = styled.h3`
  font-size: 0.95rem;
  font-weight: 600;
  color: ${({ isDark }) => isDark ? '#ffffff' : '#1a1a1a'};
  margin: 0;
  line-height: 1.4;
`;

const CardMeta = styled.p`
  font-size: 0.78rem;
  color: ${({ isDark }) => isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)'};
  margin: 0;
`;

const CardBody = styled.p`
  font-size: 0.83rem;
  color: ${({ isDark }) => isDark ? 'rgba(255,255,255,0.68)' : 'rgba(0,0,0,0.65)'};
  margin: 4px 0 0;
  line-height: 1.55;
`;

const CardLink = styled.a`
  color: #FDB515;
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 500;
  margin-top: auto;
  padding-top: 6px;
  &:hover { text-decoration: underline; }
`;

const SectionLink = styled(Link)`
  display: block;
  text-align: right;
  color: #FDB515;
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 500;
  margin-top: 10px;
  &:hover { text-decoration: underline; }
`;

const Tag = styled.span`
  background: transparent;
  color: ${({ isDark }) => isDark ? '#ffffff' : '#1a1a1a'};
  border: 1px solid ${({ isDark }) => isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'};
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 500;
  display: inline-block;
  cursor: default;
  transition: all 0.2s ease;
  &:hover {
    background: rgba(253, 181, 21, 0.15);
    border-color: #FDB515;
    color: #FDB515;
  }
`;

const MentorBanner = styled.div`
  background: ${({ isDark }) => isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'};
  border: 1px solid ${({ isDark }) => isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.09)'};
  border-radius: 20px;
  padding: 28px 40px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  transition: all 0.2s ease;
  &:hover {
    border-color: rgba(253, 181, 21, 0.5);
    background: ${({ isDark }) => isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)'};
  }
`;


// ─── Home Component ───────────────────────────────────────────────────────────

function Home({ theme }) {
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState('about');

  const allTabs = [
    { id: 'about',      label: '👤 About',      enabled: FLAGS.SHOW_HOME_HIGHLIGHTS && FLAGS.TABS.ABOUT      },
    { id: 'patents',    label: '📄 Patents',    enabled: FLAGS.SHOW_HOME_HIGHLIGHTS && FLAGS.TABS.PATENTS    },
    { id: 'research',   label: '📰 Research',   enabled: FLAGS.SHOW_HOME_HIGHLIGHTS && FLAGS.TABS.RESEARCH   },
    { id: 'mentorship', label: '🎯 Mentorship', enabled: FLAGS.SHOW_HOME_HIGHLIGHTS && FLAGS.TABS.MENTORSHIP },
  ];
  const tabs = allTabs.filter(t => t.enabled);

  useEffect(() => {
    if (!tabs.find(t => t.id === activeTab) && tabs.length > 0) {
      setActiveTab(tabs[0].id);
    }
  }, [tabs, activeTab]);

  const renderContent = () => {
    switch (activeTab) {

      case 'about':
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.09)'}`,
              borderRadius: '20px',
              padding: '20px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(253, 181, 21, 0.5)';
              e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.09)';
              e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)';
            }}
          >
            <p style={{
              fontSize: '0.95rem', lineHeight: '1.75',
              color: isDark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.78)',
              margin: 0,
            }}>
              Senior AI/ML Engineer specializing in deep learning and intelligent anomaly detection
              systems. Recognized among the <strong>Top 1%</strong> of AI mentors globally on
              ADPList — a community of over 35,000 experts — advising engineers and founders on
              cutting-edge AI architecture and fraud detection.
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Tag isDark={isDark}>AI / ML Engineering</Tag>
              <Tag isDark={isDark}>InsurTech Systems</Tag>
              <Tag isDark={isDark}>Anomaly Detection</Tag>
              <Tag isDark={isDark}>Deep Learning</Tag>
              <Tag isDark={isDark}>Enterprise Architecture</Tag>
            </div>
            <SectionLink to="/bio">Read Full Bio → /bio</SectionLink>
          </div>
        );

      case 'patents':
        return FLAGS.SHOW_PATENT_CARDS ? (
          <div>
            <CardGrid>
              <Card isDark={isDark}>
                <div style={{ fontSize: '1.4rem' }}>📄</div>
                <CardTitle isDark={isDark}>Deep Learning Driven Performance Anomaly Detection</CardTitle>
                <CardMeta isDark={isDark}>Patent No: DE 20 2025 102 432 U1</CardMeta>
                <CardMeta isDark={isDark}>Germany · 2025</CardMeta>
                <CardBody isDark={isDark}>
                  Architectural foundation for enterprise InsurTech products tackling large-scale
                  fraud detection in the U.S. market.
                </CardBody>
              </Card>
              <Card isDark={isDark}>
                <div style={{ fontSize: '1.4rem' }}>📄</div>
                <CardTitle isDark={isDark}>Adaptive AI-Driven Automated Legacy Enhancement System</CardTitle>
                <CardMeta isDark={isDark}>Patent No: DE 20 2025 102 431</CardMeta>
                <CardMeta isDark={isDark}>Germany · 2025</CardMeta>
                <CardBody isDark={isDark}>
                  AI-driven system for automated modernization and enhancement of legacy enterprise
                  software infrastructure.
                </CardBody>
              </Card>
            </CardGrid>
            <SectionLink to="/work" style={{ marginTop: '16px' }}>Full Patent Details → /work</SectionLink>
          </div>
        ) : (
          <p style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)', fontSize: '0.9rem' }}>
            Coming soon.
          </p>
        );

      case 'research':
        return FLAGS.SHOW_RESEARCH_CARDS ? (
          <div>
            <CardGrid>
              <Card isDark={isDark}>
                <div style={{ fontSize: '1.4rem' }}>📰</div>
                <CardTitle isDark={isDark}>Pioneering Excellence in Enterprise Technology</CardTitle>
                <CardMeta isDark={isDark}>HackerNoon · Oct 2025</CardMeta>
                <CardBody isDark={isDark}>
                  The vision and strategy behind building cutting-edge enterprise AI/ML systems at scale.
                </CardBody>
                <CardLink
                  href="https://hackernoon.com/pioneering-excellence-in-enterprise-technology-the-vision-of-pratyosh-desaraju"
                  target="_blank" rel="noopener noreferrer"
                >Read Article →</CardLink>
              </Card>
              <Card isDark={isDark}>
                <div style={{ fontSize: '1.4rem' }}>📑</div>
                <CardTitle isDark={isDark}>Modernizing Legacy Software in U.S. Enterprises Through AI</CardTitle>
                <CardMeta isDark={isDark}>IJSRA · Aug 2025</CardMeta>
                <CardBody isDark={isDark}>
                  Cost-effective AI-driven optimization strategies for legacy system modernization.
                </CardBody>
                <CardLink
                  href="https://ijsra.net/content/modernizing-legacy-software-us-enterprises-through-cost-effective-ai-driven-optimization"
                  target="_blank" rel="noopener noreferrer"
                >Read Paper →</CardLink>
              </Card>
            </CardGrid>
            <SectionLink to="/work" style={{ marginTop: '16px' }}>All Publications → /work</SectionLink>
          </div>
        ) : (
          <p style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)', fontSize: '0.9rem' }}>
            Coming soon.
          </p>
        );

      case 'mentorship':
        return (
          <MentorBanner isDark={isDark}>
            <div style={{ fontSize: '2.8rem' }}>🎯</div>
            <h2 style={{ margin: 0, fontSize: '1.3rem', color: isDark ? '#ffffff' : '#1a1a1a', fontWeight: 600 }}>
              I mentor engineers &amp; founders on AI architecture
            </h2>
            <p style={{ margin: 0, color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.65)', fontSize: '0.93rem' }}>
              ⭐ Rated <strong>Top 1%</strong> of 35,000+ mentors globally on ADPList
            </p>
            {FLAGS.SHOW_ADPLIST_BADGE && (
              <a href="https://adplist.org/mentors/pratyosh-d" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://adplist.org/api/badge/?session=mentorship&src=pratyosh-d"
                  alt="ADPList Top 1% Mentor Badge"
                  style={{ height: '48px', marginTop: '4px' }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </a>
            )}
            <p style={{ margin: 0, color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.5)', fontSize: '0.83rem' }}>
              Topics: Fraud Detection · AI Architecture · Deep Learning · InsurTech
            </p>
            <CardLink
              href="https://adplist.org/mentors/pratyosh-d"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '0.95rem',
                fontWeight: 600,
                background: 'transparent',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'}`,
                borderRadius: '20px',
                padding: '8px 20px',
                color: isDark ? '#ffffff' : '#1a1a1a',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(253, 181, 21, 0.15)';
                e.currentTarget.style.borderColor = '#FDB515';
                e.currentTarget.style.color = '#FDB515';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';
                e.currentTarget.style.color = isDark ? '#ffffff' : '#1a1a1a';
              }}
            >Book a Free Session on ADPList →</CardLink>
          </MentorBanner>
        );

      default:
        return null;
    }
  };

  return (
    <div className="home-container">

      {/* ── LEFT COLUMN ── */}
      <div className="home-left-column">

        {/* Hero */}
        <div className="home-hero">
  <div className={`home-message-content ${isDark ? 'dark' : 'light'}`}>

    {/* Hi there + wave */}
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 0, lineHeight: 1 }}>
      <BlurText
        text="Hi there,"
        delay={40}
        stepDuration={0.18}
        animateBy="words"
        direction="top"
        className="text-2xl"
      />
      <span className="wave-emoji" style={{ fontSize: '2em', marginLeft: '0.5em' }}>👋</span>
    </div>

    {/* I am Pratyosh Desaraju */}
    <div className="text-2xl" style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', marginTop: 0, lineHeight: 1 }}>
      <span style={{ fontWeight: 400 }}>
        <BlurText text="I am" delay={40} stepDuration={0.18} animateBy="words" direction="top" />
      </span>
      <span style={{ color: '#FDB515', marginLeft: '0.5em', fontWeight: 700 }}>
        <BlurText text="Pratyosh Desaraju" delay={40} stepDuration={0.18} animateBy="words" direction="top" />
      </span>
    </div>

    {/* TextType */}
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <TextType
        text={["Engineer...", "Programmer...", "Team Player...", "AI Enthusiast.."]}
        typingSpeed={100}
        deletingSpeed={60}
        pauseDuration={1500}
        className="text-2xl"
        isDark={isDark}
      />
    </div>

  </div>
</div>


        {/* Stats + Tabs + Content */}
        <div className="home-tabs-section">

          {/* Stats Bar */}
          {FLAGS.SHOW_HOME_HIGHLIGHTS && FLAGS.SHOW_STATS_BAR && (
            <StatBar>
              <StatItem isDark={isDark}>
                <div className="stat-value">🏆 Top 1%</div>
                <div className="stat-label">Mentor · ADPList</div>
              </StatItem>
              <StatDivider isDark={isDark} />
              <StatItem isDark={isDark}>
                <div className="stat-value">📄 2</div>
                <div className="stat-label">Patents · Germany</div>
              </StatItem>
              <StatDivider isDark={isDark} />
              <StatItem isDark={isDark}>
                <div className="stat-value">⏱ 10+</div>
                <div className="stat-label">Years · AI/ML Eng</div>
              </StatItem>
            </StatBar>
          )}

          {/* Tab Bar */}
          {tabs.length > 0 && (
            <TabBar>
              {tabs.map(tab => (
                <TabButton
                  key={tab.id}
                  active={activeTab === tab.id}
                  isDark={isDark}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </TabButton>
              ))}
            </TabBar>
          )}

          {/* Tab Content */}
          {tabs.length > 0 && (
            <TabContent>
              {renderContent()}
            </TabContent>
          )}

        </div>
      </div>

      {/* ── RIGHT COLUMN ── */}
      <div className="home-right-column">
        <ProfileCard
          avatarUrl={pratyoshPic}
          name="Pratyosh Desaraju"
          title="Senior Engineer"
          status="Online"
          showStatus={FLAGS.PROFILE.SHOW_STATUS}
          showCompany={FLAGS.PROFILE.SHOW_COMPANY}
          showTitle={FLAGS.PROFILE.SHOW_TITLE}
        />
      </div>

    </div>
  );
}


// ─── App Component ────────────────────────────────────────────────────────────

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.setAttribute('data-theme', savedTheme);
  }, []);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const newTheme = prev === 'dark' ? 'light' : 'dark';
      document.body.setAttribute('data-theme', newTheme);
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
      <div
        className="particles-container"
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
      >
        <Particles
          key={theme}
          id="tsparticles"
          init={particlesInit}
          options={{
            background: { color: { value: 'transparent' } },
            fpsLimit: 60,
            particles: {
              number: { value: 150 },
              color: { value: isDark ? '#ffffff' : '#8B5CF6' },
              shape: { type: 'circle' },
              size: { value: { min: 1, max: 3 } },
              opacity: { value: { min: 0.4, max: 0.9 } },
              animation: { enable: true, speed: 1 },
              move: { enable: true, speed: 0.5 },
            },
            interactivity: {
              events: {
                onHover: { enable: true, mode: 'repulse' },
                onClick: { enable: true, mode: 'push' },
              },
              modes: {
                repulse: { distance: 80 },
                push: { quantity: 2 },
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
        <div style={{ width: '1px', background: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)', margin: '0 8px' }} />
        <ThemeToggleButton onClick={toggleTheme} title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}>
          <ToggleLabel isDark={isDark}>{theme === 'dark' ? 'Dark' : 'Light'}</ToggleLabel>
          <ToggleTrack isDark={theme === 'dark'}>
            <ToggleThumb isDark={theme === 'dark'} />
          </ToggleTrack>
        </ThemeToggleButton>
      </DockContainer>

      <main style={{
        position: 'relative',
        zIndex: 5,
        padding: '100px 0 120px',
        minHeight: '100vh',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Routes>
          <Route path="/"        element={<Home    theme={theme} />} />
          <Route path="/work"    element={<Work    theme={theme} />} />
          <Route path="/bio"     element={<Bio     theme={theme} />} />
          <Route path="/contact" element={<Contact theme={theme} />} />
          <Route path="*"        element={<NotFound theme={theme} />} />
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
