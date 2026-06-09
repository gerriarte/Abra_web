'use client';

import { motion, useReducedMotion } from 'framer-motion';

// Radar de captación: el haz barre y los blips (oportunidades) se "detectan"
// justo cuando el haz pasa sobre ellos. Algunos quedan marcados como cliente.
// Ata visualmente con el lenguaje de datos del Panel (acento teal).

const ACCENT = '61,214,196'; // teal — rgba sin alpha
const PERIOD = 6; // segundos por vuelta del haz

// Bearing medido desde arriba, en sentido horario (coincide con el giro del haz).
// r = radio relativo (0–1). El delay de detección = (bearing/360)·PERIOD.
// client: ya es cliente (blanco fijo). converting: prospecto que el haz convierte
// a cliente cada vez que lo detecta (teal → flash blanco + etiqueta → eco).
type Blip = { bearing: number; r: number; client?: boolean; converting?: boolean; label?: string };
const BLIPS: Blip[] = [
  { bearing: 34, r: 0.66 },
  { bearing: 78, r: 0.4, client: true, label: 'Cliente' },
  { bearing: 124, r: 0.82, converting: true, label: '→ Cliente' },
  { bearing: 158, r: 0.52 },
  { bearing: 203, r: 0.72, client: true, label: 'Cliente' },
  { bearing: 246, r: 0.34, converting: true, label: '→ Cliente' },
  { bearing: 292, r: 0.6 },
  { bearing: 327, r: 0.86 },
];

const RINGS = [0.32, 0.58, 0.84, 1]; // radios relativos de los anillos de rango
const TICKS = Array.from({ length: 24 }); // marcas de rumbo

function pos(bearing: number, r: number) {
  const rad = (bearing * Math.PI) / 180;
  const R = r * 46; // % desde el centro
  return { x: 50 + R * Math.sin(rad), y: 50 - R * Math.cos(rad) };
}

export default function HeroRadar() {
  const reduce = useReducedMotion();

  return (
    <div className="relative w-full max-w-md aspect-square">
      {/* Resplandor de base del radar */}
      <div
        className="absolute inset-[6%] rounded-full"
        style={{ background: `radial-gradient(circle, rgba(${ACCENT},0.06), transparent 70%)` }}
      />

      {/* Anillos de rango */}
      {RINGS.map((r) => (
        <div
          key={r}
          className="absolute rounded-full border"
          style={{
            inset: `${(1 - r) * 50}%`,
            borderColor: `rgba(${ACCENT},${r === 1 ? 0.16 : 0.08})`,
          }}
        />
      ))}

      {/* Cruz de rumbo */}
      <div className="absolute top-1/2 left-[4%] right-[4%] h-px" style={{ background: `rgba(${ACCENT},0.07)` }} />
      <div className="absolute left-1/2 top-[4%] bottom-[4%] w-px" style={{ background: `rgba(${ACCENT},0.07)` }} />

      {/* Marcas de rumbo en el borde */}
      {TICKS.map((_, i) => {
        const major = i % 6 === 0;
        return (
          <div key={i} className="absolute inset-0" style={{ transform: `rotate(${i * 15}deg)` }} aria-hidden>
            <div
              className="absolute left-1/2 top-0 -translate-x-1/2"
              style={{
                height: major ? '7px' : '3px',
                width: '1px',
                background: `rgba(${ACCENT},${major ? 0.32 : 0.16})`,
              }}
            />
          </div>
        );
      })}

      {/* Haz de barrido (gira; se detiene con reduced-motion) */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          WebkitMaskImage: 'radial-gradient(circle, black 70%, transparent 100%)',
          maskImage: 'radial-gradient(circle, black 70%, transparent 100%)',
        }}
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: PERIOD, repeat: Infinity, ease: 'linear' }}
        aria-hidden
      >
        {/* Estela cónica detrás del haz */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(from 0deg, rgba(${ACCENT},0) 0deg, rgba(${ACCENT},0) 280deg, rgba(${ACCENT},0.14) 352deg, rgba(${ACCENT},0.28) 360deg)`,
          }}
        />
        {/* Línea del haz (borde de ataque) */}
        <div
          className="absolute left-1/2 top-0 h-1/2 w-px -translate-x-1/2 origin-bottom"
          style={{ background: `linear-gradient(to top, rgba(${ACCENT},0), rgba(${ACCENT},0.9))` }}
        />
      </motion.div>

      {/* Blips detectados */}
      {BLIPS.map((b, i) => {
        const { x, y } = pos(b.bearing, b.r);
        const delay = (b.bearing / 360) * PERIOD;
        const pingColor = b.client || b.converting ? '255,255,255' : ACCENT;
        const labeled = b.client || b.converting;
        return (
          <div
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            {/* Ping de detección */}
            {!reduce && (
              <motion.span
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ width: 10, height: 10, border: `1px solid rgba(${pingColor},0.8)` }}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: [0.7, 0], scale: [0.4, 2.6] }}
                transition={{ duration: 1.3, repeat: Infinity, repeatDelay: PERIOD - 1.3, delay, ease: 'easeOut' }}
              />
            )}
            {/* Punto */}
            <motion.span
              className="block rounded-full"
              style={{
                width: b.client || b.converting ? 7 : 5,
                height: b.client || b.converting ? 7 : 5,
                boxShadow: `0 0 10px 1px rgba(${pingColor},0.6)`,
              }}
              initial={{
                opacity: 0.14,
                backgroundColor: b.client ? 'rgb(255,255,255)' : `rgb(${ACCENT})`,
              }}
              animate={
                reduce
                  ? { opacity: 0.5, backgroundColor: b.converting || b.client ? 'rgb(255,255,255)' : `rgb(${ACCENT})` }
                  : b.converting
                    ? {
                        // prospecto → cliente: al detectar, flash blanco y se queda
                        // como cliente casi toda la vuelta; resetea a teal justo antes.
                        backgroundColor: ['rgb(255,255,255)', 'rgb(255,255,255)', `rgba(${ACCENT},0.6)`],
                        opacity: [1, 0.92, 0.18],
                        scale: [1.9, 1.1, 1],
                      }
                    : {
                        backgroundColor: b.client ? 'rgb(255,255,255)' : `rgb(${ACCENT})`,
                        opacity: [1, 0.55, 0.16, 0.16],
                      }
              }
              transition={
                reduce
                  ? undefined
                  : b.converting
                    ? { duration: PERIOD, times: [0, 0.9, 1], repeat: Infinity, delay, ease: 'easeOut' }
                    : { duration: PERIOD, times: [0, 0.12, 0.4, 1], repeat: Infinity, delay, ease: 'easeOut' }
              }
            />
            {/* Etiqueta de cliente */}
            {labeled && (
              <motion.span
                className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-full border px-1.5 py-0.5 text-[8px] font-mono uppercase tracking-[0.12em]"
                style={{ borderColor: 'rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.85)', background: 'rgba(2,12,23,0.7)' }}
                initial={{ opacity: 0, y: -2 }}
                animate={
                  reduce
                    ? { opacity: 0.85, y: 0 }
                    : b.converting
                      ? { opacity: [0, 1, 1, 0], y: 0 }
                      : { opacity: [1, 1, 0.35, 0.35], y: 0 }
                }
                transition={
                  reduce
                    ? undefined
                    : b.converting
                      ? { duration: PERIOD, times: [0, 0.08, 0.85, 1], repeat: Infinity, delay, ease: 'easeOut' }
                      : { duration: PERIOD, times: [0, 0.3, 0.55, 1], repeat: Infinity, delay, ease: 'easeOut' }
                }
              >
                {b.label}
              </motion.span>
            )}
          </div>
        );
      })}

      {/* Origen del radar */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="block h-1.5 w-1.5 rounded-full" style={{ background: `rgb(${ACCENT})`, boxShadow: `0 0 12px 2px rgba(${ACCENT},0.8)` }} />
      </div>

      {/* HUD */}
      <div className="absolute left-0 top-0 flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-[0.25em]" style={{ color: `rgba(${ACCENT},0.85)` }}>
        <span className="relative flex h-1.5 w-1.5">
          {!reduce && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full" style={{ background: `rgba(${ACCENT},0.6)` }} />
          )}
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: `rgb(${ACCENT})` }} />
        </span>
        Detectando
      </div>
      <div className="absolute right-0 bottom-0 text-[9px] font-mono uppercase tracking-[0.2em] text-text-muted">
        A:BRA · Radar
      </div>
    </div>
  );
}
