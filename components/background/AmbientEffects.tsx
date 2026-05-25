'use client';

import { useMemo } from 'react';

interface AmbientEffectsProps {
  scrollRatio: number;
}

// ─────────────────────────────────────
// CONFIGURATION
// ─────────────────────────────────────

const CLOUD_CONFIGS = [
  { top: '10%', w: 240, h: 50, dur: 44, delay: -9 },
  { top: '24%', w: 170, h: 36, dur: 58, delay: -24 },
  { top: '42%', w: 300, h: 58, dur: 36, delay: -15 },
  { top: '16%', w: 155, h: 32, dur: 68, delay: -38 },
  { top: '58%', w: 210, h: 42, dur: 50, delay: -6 },
];

const BIOLUM_COLORS = [
  'rgba(72,218,255,',
  'rgba(110,255,175,',
  'rgba(195,175,255,',
  'rgba(255,195,120,',
];

/**
 * AmbientEffects
 *
 * Renders three layers of atmospheric effects that respond to scroll:
 * 1. Clouds (sky zones) — wispy floating clouds
 * 2. Bubbles (water zones) — rising bubble particles
 * 3. Bioluminescence (abyss) — glowing particle dots
 */
export function AmbientEffects({ scrollRatio }: AmbientEffectsProps) {
  // Clouds fade out as we go deeper
  const cloudOpacity = Math.max(0, 1 - scrollRatio * 5.8);
  // Bubbles appear in water zones
  const bubbleOpacity = Math.max(0, Math.min(1, (scrollRatio - 0.30) * 5));
  // Bioluminescence in the abyss
  const biolumOpacity = Math.max(0, Math.min(1, (scrollRatio - 0.72) * 5));

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[2] pointer-events-none overflow-hidden"
    >
      <Clouds opacity={cloudOpacity} />
      <Bubbles opacity={bubbleOpacity} />
      <BiolumParticles opacity={biolumOpacity} />
    </div>
  );
}

// ─────────────────────────────────────
// CLOUDS
// ─────────────────────────────────────
function Clouds({ opacity }: { opacity: number }) {
  if (opacity <= 0.01) return null;

  return (
    <>
      {CLOUD_CONFIGS.map((c, i) => (
        <div
          key={`cloud-${i}`}
          style={{
            position: 'absolute',
            top: c.top,
            left: `${-(c.w + 50)}px`,
            width: c.w,
            height: c.h,
            borderRadius: 60,
            background: 'rgba(255,255,255,0.72)',
            filter: 'blur(12px)',
            opacity: opacity * 0.82,
            transition: 'opacity 1.6s ease',
            animation: `atmosphere-cloud-float ${c.dur}s linear ${c.delay}s infinite`,
            zIndex: 3,
          }}
        />
      ))}
    </>
  );
}

// ─────────────────────────────────────
// BUBBLES
// ─────────────────────────────────────
function Bubbles({ opacity }: { opacity: number }) {
  const configs = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => ({
      left: `${(i * 5.5 + (i * 3.7) % 8) % 96}%`,
      bottom: `${(i * 4.2) % 28}%`,
      size: 4 + (i % 5) * 4.5,
      dur: 6 + (i % 6) * 2.2,
      delay: -(i * 1.1),
    })), []);

  if (opacity <= 0.01) return null;

  return (
    <>
      {configs.map((b, i) => (
        <div
          key={`bubble-${i}`}
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
            animation: `atmosphere-bubble-rise ${b.dur}s linear ${b.delay}s infinite`,
            zIndex: 3,
          }}
        />
      ))}
    </>
  );
}

// ─────────────────────────────────────
// BIOLUMINESCENCE
// ─────────────────────────────────────
function BiolumParticles({ opacity }: { opacity: number }) {
  const configs = useMemo(() =>
    Array.from({ length: 28 }, (_, i) => ({
      left: `${(i * 3.4 + 1.2) % 95}%`,
      top: `${(i * 7.1 + 2.5) % 95}%`,
      size: 1.5 + (i % 5) * 1.1,
      color: BIOLUM_COLORS[i % BIOLUM_COLORS.length],
      blinkDur: 1.8 + (i % 5) * 0.75,
      driftDur: 5 + (i % 6) * 1.5,
      blinkDelay: -(i * 0.38),
      driftDelay: -(i * 0.55),
    })), []);

  if (opacity <= 0.01) return null;

  return (
    <>
      {configs.map((b, i) => (
        <div
          key={`biolum-${i}`}
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
            animation: `atmosphere-biolum-pulse ${b.blinkDur}s ease-in-out ${b.blinkDelay}s infinite,
                        atmosphere-biolum-drift ${b.driftDur}s ease-in-out ${b.driftDelay}s infinite`,
            zIndex: 3,
          }}
        />
      ))}
    </>
  );
}
