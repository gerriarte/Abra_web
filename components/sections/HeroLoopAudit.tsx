'use client';

/**
 * Hero graphic: the A:BRA Loop as a 3D orbit of four phases around the Judgment Audit core.
 * Each phase card shows what it delivers (result), the tools it implements and the role of AI.
 * The orbit turns to bring the selected phase to the front. It cycles on its own until the
 * visitor interacts. Cards always face the viewer; depth is projected with perspective.
 */

import { useEffect, useState } from 'react';

export type LoopPhase = { name: string; result: string; tools: string; ai: string };
export type LoopLabels = {
  ariaLabel: string;
  coreLabel: string;
  coreSub: string;
  resultLabel: string;
  toolsLabel: string;
  aiLabel: string;
};

const RADIUS = 190; // px: distancia de cada fase al centro de la órbita
const TILT_DEG = 34; // inclinación de la órbita vista desde arriba (grados)
const PERSPECTIVE = 900; // px: distancia de la cámara
const CARD_W = 188;
const CARD_H = 104;
const SCENE_H = 380;
const STEP_MS = 4500;

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Position of a phase on the tilted orbit, projected to screen with perspective. */
function project(angleRad: number) {
  const x = RADIUS * Math.sin(angleRad);
  const z = RADIUS * Math.cos(angleRad); // + hacia el espectador
  const t = (TILT_DEG * Math.PI) / 180;
  const yT = -z * Math.sin(t);
  const zT = z * Math.cos(t);
  const f = PERSPECTIVE / (PERSPECTIVE - zT);
  return { x: x * f, y: yT * f, scale: f, depth: (zT + RADIUS) / (2 * RADIUS), z: zT };
}

export default function HeroLoopAudit({
  phases,
  labels,
}: {
  phases: LoopPhase[];
  labels: LoopLabels;
}) {
  const n = phases.length;
  // `step` crece sin límite para que la órbita siempre gire hacia adelante.
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = ((step % n) + n) % n;
  const phase = phases[active];

  // Recorrido automático hasta que el visitante interactúa.
  useEffect(() => {
    if (paused || reducedMotion()) return;
    const id = window.setInterval(() => setStep((s) => s + 1), STEP_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  const select = (i: number) => {
    setStep((s) => s + ((((i - (s % n)) % n) + n) % n));
  };

  const ry = RADIUS * Math.sin((TILT_DEG * Math.PI) / 180);

  return (
    <div
      className="pointer-events-auto relative w-full select-none"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
      }}
    >
      <style>{`
        @keyframes hla-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) { .hla-panel { animation: none !important; } }
      `}</style>

      <div className="relative mx-auto w-full" style={{ height: SCENE_H }}>
        {/* Resplandor de ambiente */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-[340px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: 'radial-gradient(closest-side, rgba(0,198,186,0.2), rgba(0,198,186,0))' }}
        />

        {/* Trayectoria del Loop: la órbita vista con la misma inclinación */}
        <svg
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 overflow-visible"
          width={RADIUS * 2 + 40}
          height={ry * 2 + 40}
          style={{ transform: 'translate(-50%,-50%)' }}
          viewBox={`${-RADIUS - 20} ${-ry - 20} ${RADIUS * 2 + 40} ${ry * 2 + 40}`}
        >
          <ellipse
            cx={0}
            cy={0}
            rx={RADIUS}
            ry={ry}
            fill="none"
            stroke="rgba(0,198,186,0.38)"
            strokeWidth={1.25}
            strokeDasharray="3 7"
          />
        </svg>

        {/* Núcleo: el criterio, en el centro */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 flex h-[112px] w-[112px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-[rgba(46,232,220,0.55)] text-center"
          style={{
            background: 'radial-gradient(circle, rgba(0,198,186,0.22), rgba(4,33,59,0.9))',
            boxShadow: '0 0 40px rgba(0,198,186,0.35)',
          }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--abra-aqua-bright)]">
            {labels.coreLabel}
          </span>
          <span className="mt-1 px-3 text-[11px] leading-tight text-white/70">{labels.coreSub}</span>
        </div>

        {/* Fases del Loop sobre la órbita */}
        {phases.map((p, i) => {
          const pos = project(((i - step) * 2 * Math.PI) / n);
          const isActive = i === active;
          return (
            <button
              key={p.name}
              type="button"
              aria-pressed={isActive}
              onFocus={() => select(i)}
              onClick={() => select(i)}
              className="absolute left-1/2 top-1/2 flex cursor-pointer flex-col justify-between rounded-[14px] border p-4 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--abra-aqua-bright)]"
              style={{
                width: CARD_W,
                height: CARD_H,
                transform: `translate(calc(-50% + ${pos.x.toFixed(1)}px), calc(-50% + ${pos.y.toFixed(1)}px)) scale(${pos.scale.toFixed(3)})`,
                zIndex: Math.round(pos.z + RADIUS),
                transition:
                  'transform 900ms cubic-bezier(0.16,1,0.3,1), opacity 600ms ease, box-shadow 500ms ease, border-color 500ms ease, background-color 500ms ease',
                background: isActive ? 'rgba(4,33,59,0.95)' : 'rgba(4,33,59,0.78)',
                borderColor: isActive ? 'rgba(46,232,220,0.8)' : 'rgba(0,198,186,0.3)',
                boxShadow: isActive
                  ? '0 0 0 1px rgba(46,232,220,0.35), 0 20px 46px rgba(0,198,186,0.3)'
                  : '0 12px 28px rgba(0,0,0,0.35)',
                opacity: 0.45 + 0.55 * pos.depth,
              }}
            >
              <span
                className="font-mono text-[11px] uppercase tracking-[0.22em]"
                style={{ color: isActive ? 'var(--abra-aqua-bright)' : 'rgba(255,255,255,0.5)' }}
              >
                0{i + 1}
              </span>
              <span
                className="font-semibold leading-tight text-white"
                style={{ fontFamily: 'var(--abra-display)', fontSize: 24 }}
              >
                {p.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selector accesible: las cuatro fases siempre disponibles */}
      <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label={labels.ariaLabel}>
        {phases.map((p, i) => (
          <button
            key={p.name}
            type="button"
            aria-pressed={i === active}
            onClick={() => select(i)}
            className="rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--abra-aqua-bright)]"
            style={{
              borderColor: i === active ? 'rgba(46,232,220,0.8)' : 'rgba(255,255,255,0.14)',
              color: i === active ? 'var(--abra-aqua-bright)' : 'rgba(255,255,255,0.6)',
              background: i === active ? 'rgba(0,198,186,0.1)' : 'transparent',
            }}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Detalle de la fase activa: resultado, herramientas e IA */}
      <div className="relative mt-4 min-h-[210px]" aria-live="polite">
        <div key={active} className="hla-panel" style={{ animation: 'hla-in 500ms cubic-bezier(0.16,1,0.3,1)' }}>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--abra-aqua)]">
            0{active + 1} · {phase.name}
          </p>
          <dl className="mt-3 grid gap-3">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">{labels.resultLabel}</dt>
              <dd className="mt-1 text-[15px] leading-relaxed text-white/85">{phase.result}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">{labels.toolsLabel}</dt>
              <dd className="mt-1 text-[14px] leading-relaxed text-white/70">{phase.tools}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">{labels.aiLabel}</dt>
              <dd className="mt-1 text-[14px] leading-relaxed text-white/70">{phase.ai}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
