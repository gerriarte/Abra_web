import { getBgGradient } from '../../utils/atmosphere';

/**
 * AtmosphereBackground
 *
 * Fixed full-viewport background that interpolates through the
 * sky-to-abyss color gradient based on scrollRatio.
 * Also renders the sun and water surface shimmer line.
 */
export function AtmosphereBackground({ scrollRatio }) {
  const gradient = getBgGradient(scrollRatio);

  // Sun: fades and lifts as we enter the water
  const sunOpacity   = Math.max(0, 1 - scrollRatio * 4.2);
  const sunTranslateY = scrollRatio * -55;

  // Water surface: appears briefly around the horizon zone
  const waterCenter  = 0.34;
  const waterDist    = Math.abs(scrollRatio - waterCenter);
  const waterOpacity = Math.max(0, 1 - waterDist / 0.09) * 0.72;

  return (
    <>
      {/* ── GRADIENT BACKGROUND ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          background: gradient,
        }}
      />

      {/* ── SUN ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: '11%',
          right: '13%',
          width: 88,
          height: 88,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #fffde0 0%, #ffe566 40%, rgba(255,200,0,0) 100%)',
          boxShadow: '0 0 70px 28px rgba(255,230,80,0.28)',
          opacity: sunOpacity,
          transform: `translateY(${sunTranslateY}px)`,
          transition: 'opacity 0.1s linear',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* ── WATER SURFACE SHIMMER ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: '38%',
          left: 0,
          right: 0,
          height: 2,
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 30%, rgba(255,255,255,0.28) 70%, transparent 100%)',
          opacity: waterOpacity,
          zIndex: 3,
          pointerEvents: 'none',
          animation: 'shimmer 3s ease-in-out infinite',
        }}
      />

      {/* ── SHIMMER KEYFRAME ── */}
      <style>{`
        @keyframes shimmer {
          0%, 100% { opacity: ${waterOpacity * 0.8}; }
          50%       { opacity: ${waterOpacity}; }
        }
      `}</style>
    </>
  );
}
