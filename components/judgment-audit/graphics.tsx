/* Decorative, animated SVGs. Text next to each graphic carries the meaning,
   so every graphic is aria-hidden. Animation classes live in components/shared/motion/abra.css. */
import type { ReactElement, ReactNode } from 'react';
import { APERTURA, AQUA, METHOD_ICONS, SURFACE, delay } from '@/components/shared/motion';

/** One icon per method phase, in order: prepare, expose, codify, prioritize, decide. */
export const PHASE_ICONS: ReactElement[] = [
  METHOD_ICONS.prepare,
  METHOD_ICONS.expose,
  METHOD_ICONS.codify,
  METHOD_ICONS.prioritize,
  METHOD_ICONS.decide,
];

function Wide({ children }: { children: ReactNode }) {
  return (
    <svg
      className="abra-svg"
      aria-hidden="true"
      viewBox="0 0 474 110"
      fill="none"
      stroke={AQUA}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

const mapDots: [number, number, boolean][] = [
  [90, 30, false], [150, 38, true], [320, 28, false], [380, 40, false], [110, 78, false],
  [170, 84, true], [300, 76, true], [400, 82, true], [350, 70, false],
];
const criteriaLines = [400, 320, 430, 260, 360];
const blueprintNodes: [number, number, number][] = [[20, 92, 7], [130, 72, 8], [240, 58, 9], [350, 34, 10], [454, 16, 12]];

/** One graphic per deliverable, in order. */
export const DELIVERABLE_GRAPHICS: ReactElement[] = [
  // Decision Map
  <Wide key="map">
    <rect x="1" y="1" width="472" height="108" rx="12" stroke="rgba(255,255,255,0.12)" />
    <path d="M237 10 V100 M20 55 H454" stroke="rgba(255,255,255,0.12)" />
    {mapDots.map(([x, y, on], i) => (
      <circle key={i} className={on ? 'abra-pulse' : 'abra-node'} style={delay(i * 0.35)} cx={x} cy={y} r="7" fill={on ? AQUA : 'none'} />
    ))}
  </Wide>,
  // Golden Set
  <Wide key="golden">
    {Array.from({ length: 30 }, (_, n) => {
      const i = Math.floor(n / 3);
      const j = n % 3;
      const on = (i * 3 + j) % 4 === 0;
      return (
        <rect
          key={n}
          className={on ? 'abra-blink' : undefined}
          style={on ? delay((i * 3 + j) * 0.12) : undefined}
          x={12 + i * 46}
          y={12 + j * 32}
          width="34"
          height="22"
          rx="4"
          stroke="none"
          fill={on ? AQUA : APERTURA}
        />
      );
    })}
  </Wide>,
  // Judgment document
  <Wide key="criteria">
    <path d="M14 10 H4 V100 H14" />
    {criteriaLines.map((w, k) => (
      <path
        key={k}
        className="abra-draw"
        pathLength={1}
        style={delay(k * 0.3)}
        d={`M30 ${18 + k * 20} H${w}`}
        stroke={k % 2 ? 'rgba(255,255,255,0.35)' : AQUA}
      />
    ))}
    <path className="abra-pulse" style={delay(1.6)} d="M450 40 L462 55 L450 70 L438 55 Z" fill={AQUA} />
  </Wide>,
  // Comparative demo
  <Wide key="demo">
    <rect className="abra-grow-x" style={delay(0)} x="4" y="18" width="190" height="26" rx="6" stroke="rgba(255,255,255,0.35)" fill={APERTURA} />
    <rect className="abra-grow-x" style={delay(0.5)} x="4" y="66" width="440" height="26" rx="6" fill={AQUA} stroke="none" />
  </Wide>,
  // Judgment Blueprint
  <Wide key="blueprint">
    <path className="abra-draw" pathLength={1} d="M20 92 L130 72 L240 58 L350 34 L454 16" stroke="rgba(255,255,255,0.15)" />
    {blueprintNodes.map(([x, y, r], i) => (
      <circle key={i} className="abra-pop" style={delay(i * 0.35)} cx={x} cy={y} r={r} fill={r > 9 ? AQUA : SURFACE} />
    ))}
  </Wide>,
  // Next-step proposal
  <Wide key="paths">
    <path className="abra-draw" pathLength={1} d="M20 55 H180" />
    <path className="abra-draw" pathLength={1} style={delay(0.4)} d="M180 55 C260 55 280 18 420 18" />
    <path className="abra-draw" pathLength={1} style={delay(0.6)} d="M180 55 H420" />
    <path className="abra-draw" pathLength={1} style={delay(0.8)} d="M180 55 C260 55 280 92 420 92" />
    <circle className="abra-pop" style={delay(1.4)} cx="440" cy="18" r="10" fill={AQUA} />
    <circle className="abra-pop" style={delay(1.6)} cx="440" cy="55" r="10" />
    <circle className="abra-pop" style={delay(1.8)} cx="440" cy="92" r="10" />
    <circle className="abra-pulse" cx="20" cy="55" r="6" fill={AQUA} />
  </Wide>,
];
