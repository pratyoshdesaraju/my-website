import { useCallback, useMemo } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

// Background particles that drift and move away from the cursor, carried over
// from the original site: purple in light mode, white in dark mode.
export default function ParticlesBg({ theme }) {
  const init = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const isDark = theme === 'dark';
  const small = typeof window !== 'undefined' && window.innerWidth < 760;

  const options = useMemo(
    () => ({
      fullScreen: { enable: true, zIndex: -1 },
      background: { color: { value: 'transparent' } },
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        number: { value: small ? 70 : 150 },
        color: { value: isDark ? '#ffffff' : '#8b5cf6' },
        shape: { type: 'circle' },
        size: { value: { min: 1, max: 3 } },
        opacity: { value: { min: 0.4, max: 0.9 } },
        move: { enable: true, speed: 0.5, outModes: { default: 'out' } },
      },
      interactivity: {
        detectsOn: 'window',
        events: {
          onHover: { enable: true, mode: 'repulse' },
          onClick: { enable: true, mode: 'push' },
          resize: true,
        },
        modes: {
          repulse: { distance: 80, duration: 0.4 },
          push: { quantity: 2 },
        },
      },
    }),
    [isDark, small],
  );

  return <Particles key={theme} id="tsparticles" init={init} options={options} />;
}
