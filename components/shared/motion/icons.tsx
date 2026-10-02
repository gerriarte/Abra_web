/* Decorative, animated SVG icons shared by the home and the Judgment Audit landing.
   The text next to each icon carries the meaning, so every icon is aria-hidden.
   Animation classes live in abra.css. */
import type { CSSProperties, ReactElement, ReactNode } from 'react';

export const AQUA = '#00C6BA';
export const APERTURA = '#0A2D4D';
export const SURFACE = '#031525';
export const delay = (s: number): CSSProperties => ({ animationDelay: `${s}s` });

export function Icon({ children, size = 48 }: { children: ReactNode; size?: number }) {
  return (
    <svg
      className="abra-svg"
      aria-hidden="true"
      width={size}
      height={size}
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

/** Judgment Audit method icons. The home reuses them for the A:BRA Loop phases. */
export const METHOD_ICONS = {
  /** Stacked layers. */
  prepare: (
    <Icon>
      <path className="abra-layer" style={delay(0)} d="M24 7 L41 15.5 L24 24 L7 15.5 Z" />
      <path className="abra-layer" style={delay(0.25)} d="M7 24 L24 32.5 L41 24" />
      <path className="abra-layer" style={delay(0.5)} d="M7 32.5 L24 41 L41 32.5" />
    </Icon>
  ),
  /** Node network around a pulsing core. */
  expose: (
    <Icon>
      <circle className="abra-pulse" cx="24" cy="24" r="5.5" fill={APERTURA} />
      {[[9, 9, 0], [39, 9, 0.6], [39, 39, 1.2], [9, 39, 1.8]].map(([x, y, d]) => (
        <circle key={`${x}-${y}`} className="abra-node" style={delay(d)} cx={x} cy={y} r="3" />
      ))}
      <path className="abra-flow" d="M11.5 11.5 L20 20 M36.5 11.5 L28 20 M11.5 36.5 L20 28 M36.5 36.5 L28 28" />
    </Icon>
  ),
  /** Brackets around blinking data points. */
  codify: (
    <Icon>
      <path d="M15 7 H7 V41 H15" />
      <path d="M33 7 H41 V41 H33" />
      {codifyDots.map(([x, y], i) => (
        <circle key={`${x}-${y}`} className="abra-blink" style={delay(i * 0.18)} cx={x} cy={y} r="1.6" fill={AQUA} stroke="none" />
      ))}
      <circle className="abra-pulse" style={delay(1.5)} cx="31" cy="31" r="3.5" />
    </Icon>
  ),
  /** Growing bars. */
  prioritize: (
    <Icon>
      <path d="M7 41 H41" />
      <rect className="abra-grow-y" style={delay(0)} x="10" y="29" width="7" height="12" />
      <rect className="abra-grow-y" style={delay(0.2)} x="20.5" y="20" width="7" height="21" />
      <rect className="abra-grow-y" style={delay(0.4)} x="31" y="9" width="7" height="32" fill={APERTURA} />
    </Icon>
  ),
  /** Three paths converging on one point. */
  decide: (
    <Icon>
      <path className="abra-draw" pathLength={1} style={delay(0)} d="M6 9 C18 9 20 24 34 24" />
      <path className="abra-draw" pathLength={1} style={delay(0.2)} d="M6 24 H34" />
      <path className="abra-draw" pathLength={1} style={delay(0.4)} d="M6 39 C18 39 20 24 34 24" />
      <circle className="abra-pulse" style={delay(1.4)} cx="39" cy="24" r="4" fill={AQUA} />
    </Icon>
  ),
} satisfies Record<string, ReactElement>;

const devBlocks: [number, number][] = [
  [15.5, 15.5], [21.5, 15.5], [27.5, 15.5],
  [15.5, 21.5], [21.5, 21.5], [27.5, 21.5],
  [15.5, 27.5], [21.5, 27.5], [27.5, 27.5],
];

/** One icon per home service, in order: strategy, development, data & AI, growth. */
export const SERVICE_ICONS: ReactElement[] = [
  // Strategy — diamond with axes and a pulsing center
  <Icon key="strategy">
    <path d="M24 6 L42 24 L24 42 L6 24 Z" />
    <path d="M24 6 V42 M6 24 H42" stroke="rgba(0,198,186,0.35)" />
    <circle className="abra-pulse" cx="24" cy="24" r="3.5" fill={AQUA} />
  </Icon>,
  // Development — brackets with blocks that light up in sequence
  <Icon key="development">
    <path d="M13 8 H7 V40 H13" />
    <path d="M35 8 H41 V40 H35" />
    {devBlocks.map(([x, y], i) => (
      <rect key={`${x}-${y}`} className="abra-blink" style={delay(i * 0.22)} x={x} y={y} width="5" height="5" rx="1" fill={AQUA} stroke="none" />
    ))}
  </Icon>,
  // Data & AI — growing bars with a trend line drawn on top
  <Icon key="data">
    <path d="M7 41 H41" />
    <rect className="abra-grow-y" style={delay(0)} x="10" y="31" width="6" height="10" fill={APERTURA} />
    <rect className="abra-grow-y" style={delay(0.2)} x="21" y="24" width="6" height="17" fill={APERTURA} />
    <rect className="abra-grow-y" style={delay(0.4)} x="32" y="16" width="6" height="25" fill={APERTURA} />
    <path className="abra-draw" pathLength={1} style={delay(0.6)} d="M8 26 L18 20 L28 14 L40 7" />
  </Icon>,
  // Growth — a flywheel arc that draws itself, with a dot running along it
  <Icon key="growth">
    <circle cx="24" cy="24" r="15" stroke="rgba(0,198,186,0.2)" />
    <path className="abra-draw" pathLength={1} d="M24 9 A15 15 0 1 1 9 24" />
    <g className="abra-orbit">
      <circle cx="24" cy="9" r="3" fill={AQUA} stroke="none" />
    </g>
  </Icon>,
];
