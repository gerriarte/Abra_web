import { ATMOSPHERE_ZONES, getActiveZone } from '../../utils/atmosphere';

/**
 * DepthMeter — fixed right-side navigation dots with depth label.
 * Clicking a dot scrolls to the corresponding section.
 */
export function DepthMeter({ scrollRatio, sectionRefs }) {
  const activeZone = getActiveZone(scrollRatio);
  const activeIndex = ATMOSPHERE_ZONES.findIndex(z => z.id === activeZone.id);

  const scrollToSection = (index) => {
    sectionRefs?.[index]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      style={{
        position: 'fixed',
        right: '1.6rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.45rem',
      }}
    >
      {ATMOSPHERE_ZONES.map((zone, i) => (
        <button
          key={zone.id}
          onClick={() => scrollToSection(i)}
          aria-label={`Ir a ${zone.label}`}
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            background: i === activeIndex
              ? 'rgba(255,255,255,0.92)'
              : 'rgba(255,255,255,0.28)',
            transform: i === activeIndex ? 'scale(1.7)' : 'scale(1)',
            boxShadow: i === activeIndex ? '0 0 10px rgba(255,255,255,0.5)' : 'none',
            transition: 'all 0.4s ease',
            padding: 0,
          }}
        />
      ))}

      <span
        style={{
          fontSize: '0.54rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.4)',
          writingMode: 'vertical-rl',
          marginTop: '0.6rem',
          fontWeight: 300,
          userSelect: 'none',
        }}
      >
        {activeZone.label}
      </span>
    </div>
  );
}
