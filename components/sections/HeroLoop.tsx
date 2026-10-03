/**
 * Hero graphic: the A:BRA Loop as a rising spiral. Each turn passes through the four
 * phases and ends higher and wider than the last — every cycle improves the system.
 * Decorative (aria-hidden); the hero copy carries the meaning.
 */

const TURNS = 3;
const STEPS_PER_TURN = 96;
const CX = 320;
const DOT_SECONDS = 12;

/** Spiral geometry: t goes 0 → TURNS; each turn rises and opens up. */
const point = (t: number) => {
  const angle = 2 * Math.PI * t;
  const rx = 100 + 50 * t;
  const ry = rx * 0.3;
  const cy = 545 - 140 * t;
  return { x: CX + rx * Math.cos(angle), y: cy + ry * Math.sin(angle), front: Math.sin(angle) >= 0 };
};

const round = (n: number) => Math.round(n * 10) / 10;

// Sample the spiral once (at module load) and keep cumulative length for node timing.
const samples = Array.from({ length: TURNS * STEPS_PER_TURN + 1 }, (_, i) => point(i / STEPS_PER_TURN));
const cumulative = samples.reduce<number[]>((acc, p, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + Math.hypot(p.x - samples[i - 1].x, p.y - samples[i - 1].y));
  return acc;
}, []);
const totalLength = cumulative[cumulative.length - 1];

const toPath = (from: number, to: number) =>
  samples
    .slice(from, to + 1)
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${round(p.x)} ${round(p.y)}`)
    .join(' ');

const FULL_PATH = toPath(0, samples.length - 1);

// Half-turn segments: the front half (closer to the viewer) is brighter than the back.
const HALF = STEPS_PER_TURN / 2;
const SEGMENTS = Array.from({ length: TURNS * 2 }, (_, k) => ({
  d: toPath(k * HALF, (k + 1) * HALF),
  front: k % 2 === 0,
}));

// Phase nodes every quarter turn, starting a quarter in (front-center of the first turn).
const QUARTER = STEPS_PER_TURN / 4;
const NODES = Array.from({ length: TURNS * 4 }, (_, j) => {
  const index = (j + 1) * QUARTER;
  const p = samples[index];
  return { ...p, phase: j % 4, delay: (cumulative[index] / totalLength) * DOT_SECONDS, top: j >= (TURNS - 1) * 4 };
});

export default function HeroLoop({ phases }: { phases: string[] }) {
  return (
    <svg
      viewBox="0 0 640 640"
      className="abra-hero-loop h-full w-full overflow-visible"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="hero-loop-glow" cx="50%" cy="45%" r="50%">
          <stop offset="0" stopColor="#00C6BA" stopOpacity="0.22" />
          <stop offset="1" stopColor="#00C6BA" stopOpacity="0" />
        </radialGradient>
        <path id="hero-loop-path" d={FULL_PATH} />
      </defs>

      <ellipse cx={CX} cy="330" rx="300" ry="300" fill="url(#hero-loop-glow)" />

      {/* Growth axis */}
      <path d={`M${CX} 560 V40`} stroke="rgba(255,255,255,0.08)" strokeDasharray="2 8" />
      <path d={`M${CX - 6} 50 L${CX} 38 L${CX + 6} 50`} stroke="rgba(0,198,186,0.5)" strokeWidth={1.5} strokeLinecap="round" />

      {/* Spiral: back halves dim, front halves bright; drawn in once on load */}
      {SEGMENTS.filter((s) => !s.front).map((s) => (
        <path key={s.d} d={s.d} stroke="rgba(0,198,186,0.22)" strokeWidth={1.25} />
      ))}
      <path className="abra-draw-once" pathLength={1} d={FULL_PATH} stroke="rgba(0,198,186,0.12)" strokeWidth={6} />
      {SEGMENTS.filter((s) => s.front).map((s) => (
        <path key={s.d} d={s.d} stroke="#00C6BA" strokeOpacity={0.85} strokeWidth={1.75} strokeLinecap="round" />
      ))}

      {/* Phase nodes light up in sequence as the dot passes */}
      {NODES.map((n, j) => (
        <circle
          key={j}
          className="abra-ping"
          style={{ animationDelay: `${n.delay.toFixed(2)}s`, animationDuration: `${DOT_SECONDS}s` }}
          cx={round(n.x)}
          cy={round(n.y)}
          r={n.top ? 5 : 3.5}
          fill={n.front ? '#00C6BA' : '#04213B'}
          stroke="#00C6BA"
          strokeWidth={1.25}
        />
      ))}

      {/* Phase labels on the latest (top) turn */}
      {NODES.filter((n) => n.top).map((n) => {
        const dx = n.x - CX;
        const anchor = Math.abs(dx) < 20 ? 'middle' : dx > 0 ? 'start' : 'end';
        const offsetX = anchor === 'middle' ? 0 : dx > 0 ? 14 : -14;
        const offsetY = anchor === 'middle' ? (n.front ? 24 : -14) : 4;
        return (
          <text
            key={n.phase}
            x={round(n.x + offsetX)}
            y={round(n.y + offsetY)}
            textAnchor={anchor}
            fill="rgba(255,255,255,0.75)"
            fontSize="11"
            letterSpacing="2.5"
            style={{ fontFamily: 'var(--abra-mono)', textTransform: 'uppercase' }}
          >
            {phases[n.phase]}
          </text>
        );
      })}

      {/* Dot travelling up the spiral */}
      <g className="abra-hero-dot">
        <circle r="5" fill="#2EE8DC" style={{ filter: 'drop-shadow(0 0 8px rgba(46,232,220,0.9))' }}>
          <animateMotion dur={`${DOT_SECONDS}s`} repeatCount="indefinite" rotate="auto">
            <mpath href="#hero-loop-path" />
          </animateMotion>
        </circle>
      </g>
    </svg>
  );
}
