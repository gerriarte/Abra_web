'use client';

/**
 * Hero graphic: the four capabilities as stacked 3D layers. The stack follows the pointer
 * with a soft tilt; hovering, focusing or tapping a layer lifts it and opens its detail
 * (where A:BRA helps). Without interaction the stack cycles through the layers.
 */

import { useEffect, useRef, useState } from 'react';

export type HeroLayer = { title: string; body: string; includes: string[] };

const BASE_X = 48; // inclinación de la pila (grados): más plana = capas más legibles y menos solapadas
const BASE_Z = -30; // giro sobre el eje vertical (grados)
const MAX_TILT = 9; // grados extra que suma el puntero
const SPACING = 130; // separación entre capas (px en Z)
const LIFT = 50; // cuánto se eleva la capa activa (px en Z)
const CYCLE_MS = 4200;
const LAYER_W = 400;
const LAYER_H = 170;

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function HeroLayers({ layers, includesLabel }: { layers: HeroLayer[]; includesLabel: string }) {
  const n = layers.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const sceneRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });

  // Recorrido automático hasta que el usuario interactúa con la pila.
  useEffect(() => {
    if (paused || reducedMotion()) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % n), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [paused, n]);

  // Inclinación suave que sigue al puntero (interpolada en cada frame, sin re-render).
  useEffect(() => {
    const el = sceneRef.current;
    if (!el || reducedMotion()) return;
    const cur = { x: 0, y: 0 };
    let raf = 0;
    const tick = () => {
      cur.x += (target.current.x - cur.x) * 0.08;
      cur.y += (target.current.y - cur.y) * 0.08;
      el.style.transform = `rotateX(${BASE_X + cur.y * MAX_TILT}deg) rotateZ(${BASE_Z + cur.x * MAX_TILT}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const layer = layers[active];

  return (
    <div
      className="pointer-events-auto relative w-full select-none"
      onPointerEnter={() => setPaused(true)}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        target.current = {
          x: ((e.clientX - r.left) / r.width) * 2 - 1,
          y: -(((e.clientY - r.top) / r.height) * 2 - 1),
        };
      }}
      onPointerLeave={() => {
        target.current = { x: 0, y: 0 };
        setPaused(false);
      }}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
      }}
    >
      <style>{`
        @keyframes hl-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) { .hl-panel { animation: none !important; } }
      `}</style>

      {/* Escena 3D: la pila de capas */}
      <div className="relative mx-auto h-[400px] w-full" style={{ perspective: '1400px' }}>
        {/* Sombra en el piso, bajo la pila */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-[300px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: 'radial-gradient(closest-side, rgba(0,198,186,0.22), rgba(0,198,186,0))' }}
        />

        <div
          ref={sceneRef}
          className="absolute left-1/2 top-1/2 h-0 w-0"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${BASE_X}deg) rotateZ(${BASE_Z}deg)`,
          }}
        >
          {layers.map((item, i) => {
            const isActive = i === active;
            const z = (n - 1 - i) * SPACING - ((n - 1) * SPACING) / 2 + (isActive ? LIFT : 0);
            return (
              <button
                key={item.title}
                type="button"
                aria-pressed={isActive}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className="absolute left-0 top-0 flex cursor-pointer flex-col justify-between rounded-[14px] border p-5 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--abra-aqua-bright)]"
                style={{
                  width: LAYER_W,
                  height: LAYER_H,
                  marginLeft: -LAYER_W / 2,
                  marginTop: -LAYER_H / 2,
                  transform: `translate3d(0,0,${z}px)`,
                  transition:
                    'transform 700ms cubic-bezier(0.16,1,0.3,1), box-shadow 500ms ease, border-color 500ms ease, background-color 500ms ease, opacity 500ms ease',
                  background: isActive ? 'rgba(4,33,59,0.92)' : 'rgba(4,33,59,0.7)',
                  borderColor: isActive ? 'rgba(46,232,220,0.75)' : 'rgba(0,198,186,0.28)',
                  boxShadow: isActive
                    ? '0 0 0 1px rgba(46,232,220,0.35), 0 26px 60px rgba(0,198,186,0.28)'
                    : '0 14px 34px rgba(0,0,0,0.35)',
                  opacity: isActive ? 1 : 0.62,
                  backgroundImage:
                    'linear-gradient(rgba(0,198,186,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,198,186,0.07) 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
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
                  style={{ fontFamily: 'var(--abra-display)', fontSize: 26 }}
                >
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detalle de la capa activa: dónde ayuda A:BRA */}
      <div className="relative mt-4 min-h-[230px]" aria-live="polite">
        <div key={active} className="hl-panel" style={{ animation: 'hl-in 500ms cubic-bezier(0.16,1,0.3,1)' }}>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--abra-aqua)]">
            0{active + 1} · {layer.title}
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-white/75">{layer.body}</p>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">{includesLabel}</p>
          <ul className="mt-2 grid grid-cols-2 gap-x-5 gap-y-1.5 text-sm text-white/80">
            {layer.includes.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span aria-hidden="true" className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[var(--abra-aqua)]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
