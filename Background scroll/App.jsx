import { useRef } from 'react';
import { useScrollRatio } from './hooks/useScrollRatio';
import { AtmosphereBackground } from './components/ui/AtmosphereBackground';
import { CreatureLayer } from './components/creatures/CreatureLayer';
import { DepthMeter } from './components/ui/DepthMeter';

// ─── Section data ───
const SECTIONS = [
  {
    id: 's0',
    badge: '☁️  Altitud: 10.000 m',
    tag: 'a:bra — Growth Marketing Agency',
    heading: <>Empezamos<br /><em>volando.</em></>,
    body: 'Las mejores ideas nacen arriba, donde el aire es fino y la perspectiva lo abarca todo. Desde acá diseñamos estrategias que otros ni imaginan.',
    cta: { label: 'Explorá nuestra profundidad', href: '#s5' },
    showScrollHint: true,
  },
  {
    id: 's1',
    badge: '✈️  Altitud: 3.000 m',
    tag: 'Estrategia & Visión',
    heading: <>Donde la<br />estrategia<br />toma forma.</>,
    body: 'Frameworks de Growth, análisis de mercado y roadmaps que transforman ideas difusas en vectores claros de crecimiento.',
  },
  {
    id: 's2',
    badge: '🌊  Nivel del mar',
    tag: 'Ejecución & Canales',
    heading: <>El horizonte<br />es donde<br />actuamos.</>,
    body: 'SEO, pauta paga, contenido, automatización. Cada canal orquestado para generar el Flywheel que escala tu negocio.',
  },
  {
    id: 's3',
    badge: '🐠  Profundidad: -200 m',
    tag: 'Data & Optimización',
    heading: <>Aquí viven<br />los patrones<br />ocultos.</>,
    body: 'Analytics avanzado, atribución, pruebas de hipótesis. Cada dato capturado acá alimenta decisiones que mueven el negocio.',
  },
  {
    id: 's4',
    badge: '🦑  Profundidad: -1.000 m',
    tag: 'IA & Automatización',
    heading: <>Más profundo<br />que la<br />competencia.</>,
    body: 'IA aplicada a procesos de negocio, automatización de marketing y desarrollo de producto. Llegamos donde otros no bajan.',
  },
  {
    id: 's5',
    badge: '🐋  Profundidad: -4.000 m',
    tag: 'Acá viven los grandes',
    heading: <>En las<br />profundidades<br />está el impacto<br />real.</>,
    body: 'Los grandes animales viven acá abajo: resultados comprobables, crecimientos sostenibles, negocios que escalan. Eso construimos con cada cliente.',
    cta: { label: 'Hablemos', href: '#contacto' },
  },
];

export default function App() {
  const scrollRatio = useScrollRatio();
  const sectionRefs = SECTIONS.map(() => useRef(null)); // eslint-disable-line

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: 'white', overflowX: 'hidden' }}>

      {/* ── FIXED LAYERS ── */}
      <AtmosphereBackground scrollRatio={scrollRatio} />
      <CreatureLayer scrollRatio={scrollRatio} />
      <DepthMeter scrollRatio={scrollRatio} sectionRefs={sectionRefs} />
      <ProgressBar scrollRatio={scrollRatio} />

      {/* ── NAVIGATION ── */}
      <Nav scrolled={window.scrollY > 55} />

      {/* ── SCROLL CONTENT ── */}
      <main style={{ position: 'relative', zIndex: 10 }}>
        {SECTIONS.map((section, i) => (
          <Section
            key={section.id}
            ref={sectionRefs[i]}
            {...section}
          />
        ))}
      </main>

    </div>
  );
}

// ─────────────────────────────────────
// MICRO COMPONENTS
// ─────────────────────────────────────

function ProgressBar({ scrollRatio }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: 2,
        width: `${scrollRatio * 100}%`,
        background: 'rgba(255,255,255,0.55)',
        boxShadow: '0 0 6px rgba(255,255,255,0.4)',
        zIndex: 300,
        transition: 'width 0.08s linear',
      }}
    />
  );
}

function Nav({ scrolled }) {
  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        padding: '1.5rem 3rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: scrolled ? 'rgba(0,0,0,0.18)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        transition: 'background 0.5s, backdrop-filter 0.5s',
      }}
    >
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.9rem', fontWeight: 700, textShadow: '0 2px 16px rgba(0,0,0,0.15)' }}>
        a<span style={{ fontStyle: 'italic', opacity: 0.6 }}>:</span>bra
      </div>
      <ul style={{ listStyle: 'none', display: 'flex', gap: '2.5rem', margin: 0, padding: 0 }}>
        {['Estrategia', 'Servicios', 'Casos', 'Contacto'].map(item => (
          <li key={item}>
            <a href="#" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const Section = ({ badge, tag, heading, body, cta, showScrollHint, id }, ref) => (
  // Note: forwardRef needed in actual implementation
  <section
    id={id}
    style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8rem 4rem', position: 'relative' }}
  >
    <div style={{ maxWidth: 860, textAlign: 'center' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.45rem 1.1rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 100, fontSize: '0.72rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(5px)', marginBottom: '2rem' }}>
        {badge}
      </div>
      <p style={{ fontSize: '0.68rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '1.1rem', fontWeight: 400 }}>
        {tag}
      </p>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem, 5vw, 4.2rem)', lineHeight: 1.08, marginBottom: '1.4rem', textShadow: '0 2px 28px rgba(0,0,0,0.12)' }}>
        {heading}
      </h2>
      <p style={{ fontSize: '1.08rem', lineHeight: 1.85, color: 'rgba(255,255,255,0.78)', maxWidth: 580, margin: '0 auto 2rem', fontWeight: 300 }}>
        {body}
      </p>
      {cta && (
        <a href={cta.href} style={{ display: 'inline-block', padding: '0.85rem 2.4rem', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.32)', borderRadius: 100, color: 'white', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', backdropFilter: 'blur(8px)' }}>
          {cta.label}
        </a>
      )}
    </div>
    {showScrollHint && (
      <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.35)', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
        <span>Scrolleá</span>
        <div style={{ width: 18, height: 18, borderRight: '1px solid rgba(255,255,255,0.35)', borderBottom: '1px solid rgba(255,255,255,0.35)', transform: 'rotate(45deg)', animation: 'bounce 1.6s ease-in-out infinite' }} />
      </div>
    )}
  </section>
);
