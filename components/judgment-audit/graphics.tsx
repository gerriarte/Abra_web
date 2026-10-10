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

function Wide({ children, height = 110 }: { children: ReactNode; height?: number }) {
  return (
    <svg
      className="abra-svg"
      aria-hidden="true"
      viewBox={`0 0 474 ${height}`}
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

const FAINT = 'rgba(255,255,255,0.15)';
const SOFT = 'rgba(255,255,255,0.35)';
const AMBER = '#FFB547';

const mentionRows = [18, 40, 62, 84, 106, 128];
const brandCurve: [number, number][] = [[20, 118], [90, 104], [160, 110], [230, 82], [300, 70], [370, 44], [454, 24]];
const leadScores = [300, 190, 110];
const kpiBars = [52, 84, 66, 104, 78];
const voiceBars = [18, 40, 62, 30, 72, 48, 24, 56, 36, 14];
const roles: [number, number][] = [[90, 34], [384, 34], [90, 116], [384, 116]];

/** One graphic per project, in order. */
export const PROJECT_GRAPHICS: ReactElement[] = [
  // Media monitoring: mentions pass a judgment filter and leave as respond / escalate / let pass
  <Wide key="media" height={150}>
    {mentionRows.map((y, i) => (
      <rect key={y} className="abra-blink" style={delay(i * 0.3)} x="10" y={y - 6} width={90 + (i % 3) * 22} height="10" rx="5" stroke="none" fill={APERTURA} />
    ))}
    <path className="abra-draw" pathLength={1} d="M170 75 H218" stroke={SOFT} />
    <path className="abra-pulse" d="M237 52 L260 75 L237 98 L214 75 Z" fill={AQUA} stroke="none" />
    <path className="abra-draw" pathLength={1} style={delay(0.5)} d="M262 75 C320 75 330 30 400 30" />
    <path className="abra-draw" pathLength={1} style={delay(0.7)} d="M262 75 H400" stroke={AMBER} />
    <path className="abra-draw" pathLength={1} style={delay(0.9)} d="M262 75 C320 75 330 120 400 120" stroke={FAINT} />
    <circle className="abra-pop" style={delay(1.3)} cx="420" cy="30" r="9" fill={AQUA} stroke="none" />
    <circle className="abra-pop" style={delay(1.5)} cx="420" cy="75" r="9" fill={AMBER} stroke="none" />
    <circle className="abra-pop" style={delay(1.7)} cx="420" cy="120" r="9" stroke={SOFT} />
  </Wide>,
  // Brand value metric: a curve that builds over time
  <Wide key="brand" height={150}>
    <path d="M20 130 H454" stroke={FAINT} />
    <path d="M20 90 H454" stroke={FAINT} strokeDasharray="4 8" />
    <path className="abra-draw" pathLength={1} d={`M${brandCurve.map(([x, y]) => `${x} ${y}`).join(' L')}`} />
    {brandCurve.map(([x, y], i) => (
      <circle key={x} className="abra-pop" style={delay(i * 0.3)} cx={x} cy={y} r={i === brandCurve.length - 1 ? 9 : 5} fill={i === brandCurve.length - 1 ? AQUA : SURFACE} />
    ))}
  </Wide>,
  // WhatsApp copilot: incoming leads, each with a score; the strongest goes first
  <Wide key="leads" height={150}>
    {leadScores.map((w, i) => {
      const y = 22 + i * 42;
      return (
        <g key={w}>
          <path d={`M14 ${y} h110 a10 10 0 0 1 10 10 v8 a10 10 0 0 1 -10 10 h-96 l-14 8 v-36 z`} fill={APERTURA} stroke="none" />
          <rect className="abra-grow-x" style={delay(i * 0.4)} x="160" y={y + 6} width={w} height="16" rx="8" stroke="none" fill={i === 0 ? AQUA : SOFT} />
        </g>
      );
    })}
    <circle className="abra-pulse" cx="460" cy="36" r="6" fill={AQUA} stroke="none" />
  </Wide>,
  // KPI platform with voice queries: bars on the left, a voice wave on the right
  <Wide key="voice" height={150}>
    <path d="M14 134 H220" stroke={FAINT} />
    {kpiBars.map((h, i) => (
      <rect key={i} className="abra-grow-y" style={delay(i * 0.25)} x={24 + i * 40} y={134 - h} width="26" height={h} rx="4" stroke="none" fill={i === 3 ? AQUA : APERTURA} />
    ))}
    {voiceBars.map((h, i) => (
      <path key={i} className="abra-grow-y" style={delay(i * 0.15)} d={`M${276 + i * 18} ${75 - h / 2} V${75 + h / 2}`} strokeWidth={6} stroke={i % 3 === 0 ? AQUA : SOFT} />
    ))}
  </Wide>,
  // AI adoption in an agency: one toolkit, configured for each role
  <Wide key="roles" height={150}>
    {roles.map(([x, y], i) => (
      <path key={`l${i}`} className="abra-draw" pathLength={1} style={delay(i * 0.3)} d={`M237 75 L${x} ${y}`} stroke={SOFT} />
    ))}
    <rect className="abra-pulse" x="212" y="52" width="50" height="46" rx="10" fill={AQUA} stroke="none" />
    {roles.map(([x, y], i) => (
      <g key={`r${i}`}>
        <circle className="abra-pop" style={delay(0.8 + i * 0.3)} cx={x} cy={y} r="18" fill={SURFACE} />
        <circle className="abra-node" style={delay(i * 0.4)} cx={x} cy={y} r="5" fill={AQUA} stroke="none" />
      </g>
    ))}
  </Wide>,
  // Transport training: 10 sessions along a transit line
  <Wide key="transit" height={150}>
    <path d="M20 75 H454" stroke={FAINT} strokeWidth={6} />
    <path className="abra-draw" pathLength={1} d="M20 75 H454" strokeWidth={6} />
    {Array.from({ length: 10 }, (_, i) => (
      <circle key={i} className="abra-pop" style={delay(i * 0.3)} cx={20 + i * 48.2} cy="75" r={i === 9 ? 11 : 8} fill={i === 9 ? AQUA : SURFACE} />
    ))}
  </Wide>,
];
