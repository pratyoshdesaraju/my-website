import React from 'react'
import MagicBento from '../components/MagicBento/MagicBento.jsx'
import FLAGS from '../featureFlags'
import '../components/MagicBento/MagicBento.css'

const Work = ({ theme }) => {
  const isDark = theme === 'dark'
  const glowColor = isDark ? '132, 0, 255' : '139, 92, 246'
  const showPatents = FLAGS.SHOW_HOME_HIGHLIGHTS && FLAGS.SHOW_PATENT_CARDS
  const showResearch = FLAGS.SHOW_HOME_HIGHLIGHTS && FLAGS.SHOW_RESEARCH_CARDS
  const showMemberships = FLAGS.SHOW_HOME_HIGHLIGHTS && FLAGS.SHOW_MEMBERSHIPS

  return (
    <div style={{
      padding: '0 8vw 140px', 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: isDark ? '#ffffff' : '#000000',
      background: 'transparent',
      width: '100vw',
      boxSizing: 'border-box',
      overflow: 'hidden'
    }}>
      <h1 style={{
        fontSize: '3.5rem',
        fontWeight: 700,
        marginBottom: '3rem',
        textAlign: 'center',
        color: isDark ? '#ffffff' : '#1a1a1a',
        zIndex: 10,
        position: 'relative',
        marginTop: '2rem'
      }}>
      </h1>
      <section style={{
        margin: 0,
        padding: 0,
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '1100px',
        height: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}>
        <MagicBento
          textAutoHide={true}
          enableStars={false}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={500}
          particleCount={12}
          glowColor={glowColor}
          showPatents={showPatents}
          showResearch={showResearch}
          showMemberships={showMemberships}
          data-theme={theme}
        />
      </section>
    </div>
  )
}

export default Work
