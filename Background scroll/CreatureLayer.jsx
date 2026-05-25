import { useState, useEffect, useCallback } from 'react';
import { CREATURES } from '../../utils/creatures';
import { CreatureEntity } from './CreatureEntity';

/**
 * Injects the global CSS keyframes needed by creatures.
 * Called once on mount.
 */
function injectKeyframes() {
  if (document.getElementById('creature-keyframes')) return;
  const style = document.createElement('style');
  style.id = 'creature-keyframes';
  style.textContent = `
    @keyframes traverseLTR {
      from { transform: translateX(-25vw); }
      to   { transform: translateX(115vw); }
    }
    @keyframes traverseRTL {
      from { transform: translateX(115vw) scaleX(-1); }
      to   { transform: translateX(-25vw) scaleX(-1); }
    }
    @keyframes floatDrift {
      0%   { transform: translate(0px, 0px); }
      25%  { transform: translate(var(--drift-x, 20px), calc(var(--drift-y, 15px) * 0.5)); }
      50%  { transform: translate(0px, var(--drift-y, 15px)); }
      75%  { transform: translate(calc(var(--drift-x, 20px) * -0.6), calc(var(--drift-y, 15px) * 0.3)); }
      100% { transform: translate(0px, 0px); }
    }
    @keyframes bubbleRise {
      0%   { transform: translateY(0)    translateX(0);  opacity: 0.5; }
      50%  { transform: translateY(-50vh) translateX(12px); opacity: 0.3; }
      100% { transform: translateY(-110vh) translateX(-8px); opacity: 0;   }
    }
    @keyframes cloudFloat {
      from { transform: translateX(-350px); }
      to   { transform: translateX(calc(100vw + 350px)); }
    }
    @keyframes biolumPulse {
      0%, 100% { opacity: 0.85; transform: scale(1); }
      50%       { opacity: 0.12; transform: scale(0.55); }
    }
    @keyframes biolumDrift {
      0%, 100% { margin-left: 0; }
      50%       { margin-left: 22px; }
    }
  `;
  document.head.appendChild(style);
}

/**
 * CreatureLayer
 *
 * Positioned fixed, covers the full viewport. Renders all creatures
 * and ambient effects (clouds, bubbles, bioluminescence) based on scrollRatio.
 *
 * Props:
 *   scrollRatio — current scroll ratio [0..1]
 */
export function CreatureLayer({ scrollRatio }) {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    injectKeyframes();
  }, []);

  const handleMouseMove = useCallback((e) => {
    setMousePos({
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // ── Cloud opacity (sky only) ──
  const cloudOpacity = Math.max(0, 1 - scrollRatio * 5.8);

  // ── Bubble opacity (water zones) ──
  const bubbleOpacity = Math.max(0, Math.min(1, (scrollRatio - 0.30) * 5));

  // ── Bioluminescence opacity (abyss) ──
  const biolumOpacity = Math.max(0, Math.min(1, (scrollRatio - 0.72) * 5));

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* ── CLOUDS ── */}
      <Clouds opacity={cloudOpacity} />

      {/* ── BUBBLES ── */}
      <Bubbles opacity={bubbleOpacity} />

      {/* ── BIOLUMINESCENT PARTICLES ── */}
      <BiolumParticles opacity={biolumOpacity} />

      {/* ── CREATURES ── */}
      {CREATURES.map(creature => (
        <CreatureEntity
          key={creature.id}
          config={creature}
          scrollRatio={scrollRatio}
          mousePos={mousePos}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────

const CLOUD_CONFIGS = [
  { top: '10%', w: 240, h: 50, dur: 44, delay: -9  },
  { top: '24%', w: 170, h: 36, dur: 58, delay: -24 },
  { top: '42%', w: 300, h: 58, dur: 36, delay: -15 },
  { top: '16%', w: 155, h: 32, dur: 68, delay: -38 },
  { top: '58%', w: 210, h: 42, dur: 50, delay: -6  },
];

function Clouds({ opacity }) {
  return (
    <>
      {CLOUD_CONFIGS.map((c, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: c.top,
            left: `-${c.w + 50}px`,
            width: c.w,
            height: c.h,
            borderRadius: 60,
            background: 'rgba(255,255,255,0.72)',
            filter: 'blur(12px)',
            opacity: opacity * 0.82,
            transition: 'opacity 1.6s ease',
            animation: `cloudFloat ${c.dur}s linear ${c.delay}s infinite`,
            zIndex: 3,
          }}
        />
      ))}
    </>
  );
}

const BUBBLE_CONFIGS = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 5.5 + Math.random() * 8) % 96}%`,
  bottom: `${Math.random() * 28}%`,
  size: 4 + (i % 5) * 4.5,
  dur: 6 + (i % 6) * 2.2,
  delay: -(i * 1.1),
}));

function Bubbles({ opacity }) {
  return (
    <>
      {BUBBLE_CONFIGS.map((b, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            bottom: b.bottom,
            left: b.left,
            width: b.size,
            height: b.size,
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.22)',
            background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.15), rgba(255,255,255,0.02))',
            opacity: opacity * 0.68,
            transition: 'opacity 1.2s ease',
            animation: `bubbleRise ${b.dur}s linear ${b.delay}s infinite`,
            zIndex: 3,
          }}
        />
      ))}
    </>
  );
}

const BIOLUM_COLORS = [
  'rgba(72,218,255,',
  'rgba(110,255,175,',
  'rgba(195,175,255,',
  'rgba(255,195,120,',
];

const BIOLUM_CONFIGS = Array.from({ length: 28 }, (_, i) => ({
  left: `${(i * 3.4 + 1.2) % 95}%`,
  top:  `${(i * 7.1 + 2.5) % 95}%`,
  size: 1.5 + (i % 5) * 1.1,
  color: BIOLUM_COLORS[i % BIOLUM_COLORS.length],
  blinkDur: 1.8 + (i % 5) * 0.75,
  driftDur: 5 + (i % 6) * 1.5,
  blinkDelay: -(i * 0.38),
  driftDelay: -(i * 0.55),
}));

function BiolumParticles({ opacity }) {
  return (
    <>
      {BIOLUM_CONFIGS.map((b, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: b.top,
            left: b.left,
            width: b.size,
            height: b.size,
            borderRadius: '50%',
            background: `${b.color}0.72)`,
            boxShadow: `0 0 ${b.size * 3}px ${b.size * 1.2}px ${b.color}0.28)`,
            opacity,
            transition: 'opacity 2s ease',
            animation: `biolumPulse ${b.blinkDur}s ease-in-out ${b.blinkDelay}s infinite,
                        biolumDrift  ${b.driftDur}s ease-in-out ${b.driftDelay}s infinite`,
            zIndex: 3,
          }}
        />
      ))}
    </>
  );
}
