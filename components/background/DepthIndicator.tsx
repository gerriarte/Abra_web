'use client';

import { ATMOSPHERE_ZONES, getActiveZone } from '@/lib/utils/atmosphere';

interface DepthIndicatorProps {
  scrollRatio: number;
}

/**
 * DepthIndicator
 *
 * Fixed right-side navigation with dots and depth label.
 * Shows the current atmospheric zone and allows scrolling to sections.
 */
export function DepthIndicator({ scrollRatio }: DepthIndicatorProps) {
  const activeZone = getActiveZone(scrollRatio);
  const activeIndex = ATMOSPHERE_ZONES.findIndex(z => z.id === activeZone.id);

  return (
    <div
      className="fixed z-[100] flex flex-col items-center gap-[0.45rem]"
      style={{
        right: '1.6rem',
        top: '50%',
        transform: 'translateY(-50%)',
      }}
    >
      {ATMOSPHERE_ZONES.map((zone, i) => (
        <div
          key={zone.id}
          aria-label={zone.label}
          className="transition-all duration-400 ease-out"
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: i === activeIndex
              ? 'rgba(255,255,255,0.92)'
              : 'rgba(255,255,255,0.28)',
            transform: i === activeIndex ? 'scale(1.7)' : 'scale(1)',
            boxShadow: i === activeIndex ? '0 0 10px rgba(255,255,255,0.5)' : 'none',
          }}
        />
      ))}

      <span
        className="select-none"
        style={{
          fontSize: '0.54rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.4)',
          writingMode: 'vertical-rl',
          marginTop: '0.6rem',
          fontWeight: 300,
        }}
      >
        {activeZone.label}
      </span>
    </div>
  );
}
