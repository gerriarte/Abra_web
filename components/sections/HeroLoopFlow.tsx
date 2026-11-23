/**
 * Hero graphic: how the four phases of the A:BRA Loop connect. A single signal travels the
 * loop (Insight → Build → Launch → Learn → Insight), lighting each phase as it arrives, while
 * the Judgment Audit core stays at the center. Decorative and non-interactive (aria-hidden
 * via the parent role="img" label). With reduced motion it renders the static diagram.
 */

export type FlowPhase = { name: string; tag: string };
export type FlowLabels = { ariaLabel: string; coreLabel: string };

const LOOP_PATH =
  'M320 120 Q490 120 530 250 Q490 380 320 380 Q150 380 110 250 Q150 120 320 120 Z';

// Phase nodes, clockwise from the top: Insight, Build, Launch, Learn.
const NODES = [
  { x: 320, y: 120 },
  { x: 530, y: 250 },
  { x: 320, y: 380 },
  { x: 110, y: 250 },
];

// Connector labels sit on the midpoint of each arc between nodes.
const FLOW_POS = [
  { x: 462, y: 140 },
  { x: 462, y: 372 },
  { x: 178, y: 372 },
  { x: 178, y: 140 },
];

const CYCLE_S = 16; // una vuelta completa del Loop
const STEP_S = CYCLE_S / 4; // cada fase se enciende cuando llega el trazo

export default function HeroLoopFlow({
  phases,
  flows,
  labels,
}: {
  phases: FlowPhase[];
  flows: string[];
  labels: FlowLabels;
}) {
  const coreLines = labels.coreLabel.split(' ');

  return (
    <div className="relative w-full">
      <style>{`
        @keyframes hlf-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes hlf-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        @keyframes hlf-flow { to { stroke-dashoffset: -1; } }
        @keyframes hlf-glow {
          0% { opacity: 0; transform: scale(1); }
          2% { opacity: 0.85; transform: scale(1.12); }
          12% { opacity: 0; transform: scale(1.7); }
          100% { opacity: 0; transform: scale(1.7); }
        }
        @keyframes hlf-breathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.04); } }
        .hlf-root { animation: hlf-in 1.2s ease-out both; }
        .hlf-track { stroke-dasharray: 1; stroke-dashoffset: 1; animation: hlf-draw 2.4s cubic-bezier(0.16,1,0.3,1) 0.2s forwards; }
        .hlf-flow { animation: hlf-flow ${CYCLE_S}s linear infinite; }
        .hlf-glow { transform-box: fill-box; transform-origin: center; animation: hlf-glow ${CYCLE_S}s cubic-bezier(0.16,1,0.3,1) infinite; }
        .hlf-core { transform-box: fill-box; transform-origin: center; animation: hlf-breathe 5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .hlf-root, .hlf-track, .hlf-flow, .hlf-glow, .hlf-core { animation: none !important; }
          .hlf-track { stroke-dashoffset: 0; }
          .hlf-comet { display: none; }
        }
      `}</style>

      <svg
        className="hlf-root block h-auto w-full overflow-visible"
        viewBox="0 0 640 480"
        role="img"
        aria-label={labels.ariaLabel}
      >
        <defs>
          <radialGradient id="hlf-core-fill" cx="50%" cy="45%" r="50%">
            <stop offset="0" stopColor="#00C6BA" stopOpacity="0.28" />
            <stop offset="1" stopColor="#04213B" stopOpacity="0.92" />
          </radialGradient>
          <radialGradient id="hlf-ambient" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#00C6BA" stopOpacity="0.14" />
            <stop offset="1" stopColor="#00C6BA" stopOpacity="0" />
          </radialGradient>
          <filter id="hlf-blur" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <path id="hlf-loop" d={LOOP_PATH} />
        </defs>

        {/* Ambiente */}
        <ellipse cx="320" cy="250" rx="300" ry="230" fill="url(#hlf-ambient)" />

        {/* Trayectoria del Loop: se dibuja al entrar, luego fluye */}
        <path d={LOOP_PATH} fill="none" stroke="rgba(0,198,186,0.28)" strokeWidth="1.5" pathLength={1} className="hlf-track" />
        <path d={LOOP_PATH} fill="none" stroke="rgba(46,232,220,0.9)" strokeWidth="1.75" strokeLinecap="round" pathLength={1} strokeDasharray="0.025 0.075" className="hlf-flow" />

        {/* Conectores: qué pasa entre fase y fase */}
        {flows.map((text, i) => (
          <text
            key={text}
            x={FLOW_POS[i].x}
            y={FLOW_POS[i].y}
            textAnchor="middle"
            fill="rgba(255,255,255,0.5)"
            fontSize="11"
            letterSpacing="1.5"
            style={{ fontFamily: 'var(--abra-mono)', textTransform: 'uppercase' }}
          >
            {text}
          </text>
        ))}

        {/* Núcleo: el criterio */}
        <g className="hlf-core">
          <circle cx="320" cy="250" r="58" fill="url(#hlf-core-fill)" stroke="rgba(46,232,220,0.55)" strokeWidth="1" />
          <circle cx="320" cy="250" r="72" fill="none" stroke="rgba(0,198,186,0.18)" strokeWidth="1" strokeDasharray="2 6" />
          {coreLines.map((line, i) => (
            <text
              key={line}
              x="320"
              y={246 + i * 15}
              textAnchor="middle"
              fill="#2EE8DC"
              fontSize="10"
              letterSpacing="1.8"
              style={{ fontFamily: 'var(--abra-mono)', textTransform: 'uppercase' }}
            >
              {line}
            </text>
          ))}
        </g>

        {/* Fases: se encienden cuando el trazo llega a cada una */}
        {phases.map((p, i) => {
          const { x, y } = NODES[i];
          const labelPos =
            i === 0
              ? { tagX: x, tagY: 40, nameX: x, nameY: 66, anchor: 'middle' as const }
              : i === 1
                ? { tagX: 566, tagY: 238, nameX: 566, nameY: 266, anchor: 'start' as const }
                : i === 2
                  ? { tagX: x, tagY: 456, nameX: x, nameY: 432, anchor: 'middle' as const }
                  : { tagX: 74, tagY: 238, nameX: 74, nameY: 266, anchor: 'end' as const };
          return (
            <g key={p.name}>
              <circle
                cx={x}
                cy={y}
                r="34"
                fill="#2EE8DC"
                className="hlf-glow"
                style={{ animationDelay: `${i * STEP_S}s`, filter: 'url(#hlf-blur)' }}
              />
              <circle cx={x} cy={y} r="34" fill="#04213B" stroke="rgba(46,232,220,0.75)" strokeWidth="1.25" />
              <text
                x={x}
                y={y + 4}
                textAnchor="middle"
                fill="rgba(255,255,255,0.8)"
                fontSize="11"
                style={{ fontFamily: 'var(--abra-mono)' }}
              >
                0{i + 1}
              </text>
              <text
                x={labelPos.tagX}
                y={labelPos.tagY}
                textAnchor={labelPos.anchor}
                fill="#2EE8DC"
                fontSize="10"
                letterSpacing="2"
                style={{ fontFamily: 'var(--abra-mono)', textTransform: 'uppercase' }}
              >
                {p.tag}
              </text>
              <text
                x={labelPos.nameX}
                y={labelPos.nameY}
                textAnchor={labelPos.anchor}
                fill="#FFFFFF"
                fontSize="20"
                fontWeight="600"
                style={{ fontFamily: 'var(--abra-display)' }}
              >
                {p.name}
              </text>
            </g>
          );
        })}

        {/* Cometa: una señal que recorre el Loop, con su estela */}
        <g className="hlf-comet">
          <circle r="2.5" fill="#2EE8DC" opacity="0.25">
            <animateMotion dur={`${CYCLE_S}s`} begin="0.44s" repeatCount="indefinite">
              <mpath href="#hlf-loop" />
            </animateMotion>
          </circle>
          <circle r="3.5" fill="#2EE8DC" opacity="0.5">
            <animateMotion dur={`${CYCLE_S}s`} begin="0.22s" repeatCount="indefinite">
              <mpath href="#hlf-loop" />
            </animateMotion>
          </circle>
          <circle r="5" fill="#2EE8DC" filter="url(#hlf-blur)">
            <animateMotion dur={`${CYCLE_S}s`} begin="0s" repeatCount="indefinite">
              <mpath href="#hlf-loop" />
            </animateMotion>
          </circle>
        </g>
      </svg>
    </div>
  );
}
