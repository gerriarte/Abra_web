'use client';

import { getBgGradient } from '@/lib/utils/atmosphere';

interface AtmosphereBackgroundProps {
  scrollRatio: number;
}

/**
 * AtmosphereBackground
 *
 * Fixed full-viewport background that interpolates through the
 * sky-to-abyss color gradient based on scrollRatio.
 * Also renders the sun and water surface shimmer line.
 */
export function AtmosphereBackground({ scrollRatio }: AtmosphereBackgroundProps) {
  const gradient = getBgGradient(scrollRatio);

  // Water surface: appears briefly around the horizon zone
  const waterCenter = 0.34;
  const waterDist = Math.abs(scrollRatio - waterCenter);
  const waterOpacity = Math.max(0, 1 - waterDist / 0.09) * 0.72;

  return (
    <>
      {/* ── GRADIENT BACKGROUND ── */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 transition-none"
        style={{ background: gradient }}
      />

      {/* ── WATER SURFACE SHIMMER ── */}
      <div
        aria-hidden="true"
        className="fixed left-0 right-0 z-[3] pointer-events-none"
        style={{
          top: '38%',
          height: 2,
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 30%, rgba(255,255,255,0.28) 70%, transparent 100%)',
          opacity: waterOpacity,
          animation: waterOpacity > 0 ? 'shimmer 3s ease-in-out infinite' : 'none',
        }}
      />
    </>
  );
}
