/* Decorative, animated SVGs. Text next to each graphic carries the meaning,
   so every graphic is aria-hidden. Animation classes live in judgment-audit.css. */
import type { CSSProperties, ReactElement, ReactNode } from 'react';

const AQUA = '#00C6BA';
const APERTURA = '#0A2D4D';
const SURFACE = '#031525';
const delay = (s: number): CSSProperties => ({ animationDelay: `${s}s` });

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      className="ja-svg"
      aria-hidden="true"
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      stroke={AQUA}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

const codifyDots: [number, number][] = [
  [17, 17], [24, 17], [31, 17], [17, 24], [24, 24], [31, 24], [17, 31], [24, 31],
];

/** One icon per method phase, in order: prepare, expose, codify, prioritize, decide. */
export const PHASE_ICONS: ReactElement[] = [
  <Icon key="prepare">
    <path className="ja-layer" style={delay(0)} d="M24 7 L41 15.5 L24 24 L7 15.5 Z" />
    <path className="ja-layer" style={delay(0.25)} d="M7 24 L24 32.5 L41 24" />
    <path className="ja-layer" style={delay(0.5)} d="M7 32.5 L24 41 L41 32.5" />
  </Icon>,
  <Icon key="expose">
    <circle className="ja-pulse" cx="24" cy="24" r="5.5" fill={APERTURA} />
    {[[9, 9, 0], [39, 9, 0.6], [39, 39, 1.2], [9, 39, 1.8]].map(([x, y, d]) => (
      <circle key={`${x}-${y}`} className="ja-node" style={delay(d)} cx={x} cy={y} r="3" />
    ))}
    <path className="ja-flow" d="M11.5 11.5 L20 20 M36.5 11.5 L28 20 M11.5 36.5 L20 28 M36.5 36.5 L28 28" />
  </Icon>,
  <Icon key="codify">
    <path d="M15 7 H7 V41 H15" />
    <path d="M33 7 H41 V41 H33" />
    {codifyDots.map(([x, y], i) => (
      <circle key={`${x}-${y}`} className="ja-blink" style={delay(i * 0.18)} cx={x} cy={y} r="1.6" fill={AQUA} stroke="none" />
    ))}
    <circle className="ja-pulse" style={delay(1.5)} cx="31" cy="31" r="3.5" />
  </Icon>,
  <Icon key="prioritize">
    <path d="M7 41 H41" />
    <rect className="ja-grow-y" style={delay(0)} x="10" y="29" width="7" height="12" />
    <rect className="ja-grow-y" style={delay(0.2)} x="20.5" y="20" width="7" height="21" />
    <rect className="ja-grow-y" style={delay(0.4)} x="31" y="9" width="7" height="32" fill={APERTURA} />
  </Icon>,
  <Icon key="decide">
    <path className="ja-draw" pathLength={1} style={delay(0)} d="M6 9 C18 9 20 24 34 24" />
    <path className="ja-draw" pathLength={1} style={delay(0.2)} d="M6 24 H34" />
    <path className="ja-draw" pathLength={1} style={delay(0.4)} d="M6 39 C18 39 20 24 34 24" />
    <circle className="ja-pulse" style={delay(1.4)} cx="39" cy="24" r="4" fill={AQUA} />
  </Icon>,
];

function Wide({ children }: { children: ReactNode }) {
  return (
    <svg
      className="ja-svg"
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
      <circle key={i} className={on ? 'ja-pulse' : 'ja-node'} style={delay(i * 0.35)} cx={x} cy={y} r="7" fill={on ? AQUA : 'none'} />
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
          className={on ? 'ja-blink' : undefined}
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
        className="ja-draw"
        pathLength={1}
        style={delay(k * 0.3)}
        d={`M30 ${18 + k * 20} H${w}`}
        stroke={k % 2 ? 'rgba(255,255,255,0.35)' : AQUA}
      />
    ))}
    <path className="ja-pulse" style={delay(1.6)} d="M450 40 L462 55 L450 70 L438 55 Z" fill={AQUA} />
  </Wide>,
  // Comparative demo
  <Wide key="demo">
    <rect className="ja-grow-x" style={delay(0)} x="4" y="18" width="190" height="26" rx="6" stroke="rgba(255,255,255,0.35)" fill={APERTURA} />
    <rect className="ja-grow-x" style={delay(0.5)} x="4" y="66" width="440" height="26" rx="6" fill={AQUA} stroke="none" />
  </Wide>,
  // Judgment Blueprint
  <Wide key="blueprint">
    <path className="ja-draw" pathLength={1} d="M20 92 L130 72 L240 58 L350 34 L454 16" stroke="rgba(255,255,255,0.15)" />
    {blueprintNodes.map(([x, y, r], i) => (
      <circle key={i} className="ja-pop" style={delay(i * 0.35)} cx={x} cy={y} r={r} fill={r > 9 ? AQUA : SURFACE} />
    ))}
  </Wide>,
  // Next-step proposal
  <Wide key="paths">
    <path className="ja-draw" pathLength={1} d="M20 55 H180" />
    <path className="ja-draw" pathLength={1} style={delay(0.4)} d="M180 55 C260 55 280 18 420 18" />
    <path className="ja-draw" pathLength={1} style={delay(0.6)} d="M180 55 H420" />
    <path className="ja-draw" pathLength={1} style={delay(0.8)} d="M180 55 C260 55 280 92 420 92" />
    <circle className="ja-pop" style={delay(1.4)} cx="440" cy="18" r="10" fill={AQUA} />
    <circle className="ja-pop" style={delay(1.6)} cx="440" cy="55" r="10" />
    <circle className="ja-pop" style={delay(1.8)} cx="440" cy="92" r="10" />
    <circle className="ja-pulse" cx="20" cy="55" r="6" fill={AQUA} />
  </Wide>,
];
