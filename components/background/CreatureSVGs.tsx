'use client';

/**
 * CreatureSVGs
 *
 * Inline SVG silhouettes for each creature type.
 * Semi-transparent, stylized silhouettes that integrate with the atmosphere.
 * Can be replaced with Lottie assets later.
 */

interface SVGProps {
  className?: string;
}

export function BirdFlockSVG({ className }: SVGProps) {
  return (
    <svg viewBox="0 0 280 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* V-formation flock */}
      {[
        { x: 140, y: 30, s: 1 },
        { x: 115, y: 45, s: 0.85 },
        { x: 165, y: 45, s: 0.85 },
        { x: 90, y: 58, s: 0.7 },
        { x: 190, y: 58, s: 0.7 },
        { x: 68, y: 70, s: 0.6 },
        { x: 212, y: 70, s: 0.6 },
        { x: 48, y: 80, s: 0.5 },
        { x: 232, y: 80, s: 0.5 },
      ].map((bird, i) => (
        <g key={i} transform={`translate(${bird.x}, ${bird.y}) scale(${bird.s})`}>
          <path
            d="M-12 0 Q-6 -8 0 -2 Q6 -8 12 0"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            style={{
              animation: `creature-wing-flap ${0.8 + (i % 3) * 0.2}s ease-in-out ${i * 0.1}s infinite alternate`,
            }}
          />
        </g>
      ))}
    </svg>
  );
}

export function SeagullSVG({ className }: SVGProps) {
  return (
    <svg viewBox="0 0 60 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5 20 Q15 8 30 18 Q45 8 55 20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        style={{ animation: 'creature-wing-flap 2s ease-in-out infinite alternate' }}
      />
      <circle cx="30" cy="19" r="2" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

export function JellyfishSVG({ className }: SVGProps) {
  return (
    <svg viewBox="0 0 100 140" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Bell */}
      <ellipse
        cx="50" cy="35" rx="35" ry="30"
        fill="currentColor" opacity="0.15"
        stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.4"
        style={{ animation: 'creature-jellyfish-pulse 2s ease-in-out infinite' }}
      />
      {/* Internal structure */}
      <ellipse cx="50" cy="32" rx="18" ry="12" fill="currentColor" opacity="0.1" />
      {/* Tentacles */}
      {[30, 40, 50, 60, 70].map((x, i) => (
        <path
          key={i}
          d={`M${x} 60 Q${x + 5} 80 ${x - 3} 100 Q${x + 8} 115 ${x} 130`}
          stroke="currentColor"
          strokeWidth="0.8"
          strokeOpacity="0.3"
          fill="none"
          style={{
            animation: `creature-tentacle-sway ${2.5 + i * 0.3}s ease-in-out ${i * 0.2}s infinite alternate`,
          }}
        />
      ))}
      {/* Bioluminescent center */}
      <circle cx="50" cy="30" r="5" fill="currentColor" opacity="0.2">
        <animate attributeName="opacity" values="0.1;0.3;0.1" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export function FishSchoolSVG({ className }: SVGProps) {
  return (
    <svg viewBox="0 0 320 120" className={className} xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: 18 }, (_, i) => {
        const x = 30 + (i * 16) % 260;
        const y = 15 + ((i * 23 + 7) % 90);
        const s = 0.6 + (i % 4) * 0.15;
        return (
          <g key={i} transform={`translate(${x}, ${y}) scale(${s})`}>
            <path
              d="M0 0 Q8 -5 16 0 Q8 5 0 0 M16 0 L20 -3 L20 3 Z"
              fill="currentColor"
              opacity={0.25 + (i % 3) * 0.1}
              style={{
                animation: `creature-fish-wiggle ${0.5 + (i % 5) * 0.15}s ease-in-out ${i * 0.08}s infinite alternate`,
              }}
            />
          </g>
        );
      })}
    </svg>
  );
}

export function TurtleSVG({ className }: SVGProps) {
  return (
    <svg viewBox="0 0 140 100" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Shell */}
      <ellipse cx="70" cy="45" rx="38" ry="28" fill="currentColor" opacity="0.15"
        stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.3" />
      {/* Shell pattern */}
      <path d="M45 35 Q70 20 95 35" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.15" fill="none" />
      <path d="M42 45 Q70 30 98 45" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.15" fill="none" />
      {/* Head */}
      <ellipse cx="112" cy="42" rx="10" ry="7" fill="currentColor" opacity="0.2" />
      <circle cx="117" cy="40" r="1.5" fill="currentColor" opacity="0.4" />
      {/* Flippers */}
      <path d="M50 65 Q35 80 25 72" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.25" fill="none"
        style={{ animation: 'creature-flipper 2.5s ease-in-out infinite' }} />
      <path d="M90 65 Q75 80 65 72" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.25" fill="none"
        style={{ animation: 'creature-flipper 2.5s ease-in-out 0.3s infinite' }} />
      {/* Front flippers */}
      <path d="M95 30 Q115 18 125 28" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.25" fill="none"
        style={{ animation: 'creature-flipper 2.5s ease-in-out 0.6s infinite' }} />
    </svg>
  );
}

export function WhaleSVG({ className }: SVGProps) {
  return (
    <svg viewBox="0 0 480 180" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <path
        d="M60 90 Q100 30 200 40 Q300 35 380 60 Q420 70 440 90 Q420 110 380 120 Q300 145 200 140 Q100 150 60 90 Z"
        fill="currentColor" opacity="0.12"
        stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.2"
      />
      {/* Belly pleats */}
      <path d="M120 110 Q200 130 320 115" stroke="currentColor" strokeWidth="0.4" strokeOpacity="0.1" fill="none" />
      <path d="M130 120 Q210 135 310 125" stroke="currentColor" strokeWidth="0.4" strokeOpacity="0.08" fill="none" />
      {/* Eye */}
      <circle cx="140" cy="78" r="3" fill="currentColor" opacity="0.35" />
      {/* Tail flukes */}
      <path
        d="M440 90 Q460 65 475 55 M440 90 Q460 115 475 125"
        stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.2" fill="none"
        style={{ animation: 'creature-tail-sway 4s ease-in-out infinite' }}
      />
      {/* Pectoral fin */}
      <path d="M180 115 Q165 145 150 140" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.15" fill="none" />
      {/* Dorsal fin */}
      <path d="M340 58 Q345 45 352 60" fill="currentColor" opacity="0.15" />
      {/* Bioluminescent spots (deep water) */}
      {[
        { cx: 200, cy: 120 }, { cx: 240, cy: 125 }, { cx: 280, cy: 122 },
        { cx: 170, cy: 115 }, { cx: 310, cy: 118 },
      ].map((s, i) => (
        <circle key={i} cx={s.cx} cy={s.cy} r="1.5" fill="rgba(72,218,255,0.4)">
          <animate attributeName="opacity" values="0.1;0.5;0.1" dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}

export function MantaRaySVG({ className }: SVGProps) {
  return (
    <svg viewBox="0 0 260 160" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Wings/body */}
      <path
        d="M130 60 Q60 20 10 50 Q40 55 60 70 Q90 85 130 80 Q170 85 200 70 Q220 55 250 50 Q200 20 130 60 Z"
        fill="currentColor" opacity="0.12"
        stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.2"
        style={{ animation: 'creature-manta-wing 3s ease-in-out infinite' }}
      />
      {/* Cephalic horns */}
      <path d="M120 62 Q115 50 112 45" stroke="currentColor" strokeWidth="1" strokeOpacity="0.25" fill="none" />
      <path d="M140 62 Q145 50 148 45" stroke="currentColor" strokeWidth="1" strokeOpacity="0.25" fill="none" />
      {/* Tail */}
      <path d="M130 80 Q132 110 128 145" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.15" fill="none" />
      {/* Belly markings */}
      <ellipse cx="130" cy="68" rx="20" ry="8" fill="currentColor" opacity="0.06" />
    </svg>
  );
}

export function GiantSquidSVG({ className }: SVGProps) {
  return (
    <svg viewBox="0 0 120 220" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Mantle */}
      <path
        d="M60 10 Q80 15 85 50 Q88 80 80 100 Q60 110 40 100 Q32 80 35 50 Q38 15 60 10 Z"
        fill="currentColor" opacity="0.1"
        stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.2"
      />
      {/* Large eyes */}
      <ellipse cx="48" cy="60" rx="6" ry="8" fill="currentColor" opacity="0.2" />
      <ellipse cx="72" cy="60" rx="6" ry="8" fill="currentColor" opacity="0.2" />
      <circle cx="48" cy="58" r="2.5" fill="rgba(200,220,255,0.3)" />
      <circle cx="72" cy="58" r="2.5" fill="rgba(200,220,255,0.3)" />
      {/* Tentacles */}
      {[35, 45, 55, 65, 75, 85].map((x, i) => (
        <path
          key={i}
          d={`M${x - 10} 100 Q${x - 5} 140 ${x - 15} 175 Q${x} 195 ${x - 8} 215`}
          stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.2" fill="none"
          style={{
            animation: `creature-tentacle-sway ${2.5 + i * 0.4}s ease-in-out ${i * 0.15}s infinite alternate`,
          }}
        />
      ))}
      {/* Fins */}
      <path d="M35 30 Q15 40 30 55" fill="currentColor" opacity="0.08" />
      <path d="M85 30 Q105 40 90 55" fill="currentColor" opacity="0.08" />
    </svg>
  );
}

export function AnglerfishSVG({ className }: SVGProps) {
  return (
    <svg viewBox="0 0 200 150" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Body — almost invisible in the dark */}
      <path
        d="M60 75 Q80 40 130 50 Q160 55 170 75 Q165 100 130 105 Q80 110 60 75 Z"
        fill="currentColor" opacity="0.06"
        stroke="currentColor" strokeWidth="0.4" strokeOpacity="0.1"
      />
      {/* Teeth */}
      <path d="M65 72 L70 65 L75 74 L80 63 L85 73 L90 62 L95 74" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.15" fill="none" />
      <path d="M65 78 L70 85 L75 76 L80 87 L85 77 L90 88 L95 76" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.15" fill="none" />
      {/* Eye */}
      <circle cx="140" cy="68" r="4" fill="currentColor" opacity="0.15" />
      {/* Illicium (fishing rod) */}
      <path
        d="M90 50 Q70 20 55 15"
        stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.15" fill="none"
        style={{ animation: 'creature-lure-sway 4s ease-in-out infinite' }}
      />
      {/* Esca (bioluminescent lure) — THE KEY ELEMENT */}
      <circle cx="55" cy="15" r="6" fill="rgba(72,218,255,0.6)">
        <animate attributeName="r" values="5;7;5" dur="1.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0.9;0.4" dur="1.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="55" cy="15" r="15" fill="none" stroke="rgba(72,218,255,0.15)">
        <animate attributeName="r" values="12;20;12" dur="2s" repeatCount="indefinite" />
        <animate attributeName="stroke-opacity" values="0.2;0.05;0.2" dur="2s" repeatCount="indefinite" />
      </circle>
      {/* Pectoral fin */}
      <path d="M150 85 Q165 95 155 105" fill="currentColor" opacity="0.05" />
    </svg>
  );
}

export function DumboOctopusSVG({ className }: SVGProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <ellipse cx="60" cy="45" rx="28" ry="30" fill="currentColor" opacity="0.1"
        stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.15" />
      {/* Ear fins */}
      <path d="M32 35 Q12 20 15 45" fill="currentColor" opacity="0.08"
        stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.15"
        style={{ animation: 'creature-ear-flap 1.5s ease-in-out infinite alternate' }} />
      <path d="M88 35 Q108 20 105 45" fill="currentColor" opacity="0.08"
        stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.15"
        style={{ animation: 'creature-ear-flap 1.5s ease-in-out 0.75s infinite alternate' }} />
      {/* Eyes */}
      <circle cx="50" cy="40" r="3.5" fill="currentColor" opacity="0.2" />
      <circle cx="70" cy="40" r="3.5" fill="currentColor" opacity="0.2" />
      <circle cx="50" cy="39" r="1.5" fill="rgba(200,220,255,0.25)" />
      <circle cx="70" cy="39" r="1.5" fill="rgba(200,220,255,0.25)" />
      {/* Arms with webbing */}
      {[35, 45, 55, 65, 75, 85].map((x, i) => (
        <path
          key={i}
          d={`M${x - 10} 70 Q${x - 8} 90 ${x - 12} 110`}
          stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.12" fill="none"
          style={{
            animation: `creature-tentacle-sway ${2 + i * 0.25}s ease-in-out ${i * 0.1}s infinite alternate`,
          }}
        />
      ))}
      {/* Bioluminescent spots */}
      <circle cx="55" cy="55" r="1" fill="rgba(255,150,100,0.4)">
        <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="65" cy="58" r="1" fill="rgba(255,150,100,0.4)">
        <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3.5s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

/**
 * Maps creature IDs to their SVG components.
 */
export const CREATURE_SVG_MAP: Record<string, React.FC<SVGProps>> = {
  'bird-flock': BirdFlockSVG,
  'bird-flock-2': BirdFlockSVG,
  'seagull': SeagullSVG,
  'jellyfish-1': JellyfishSVG,
  'jellyfish-2': JellyfishSVG,
  'fish-school': FishSchoolSVG,
  'turtle': TurtleSVG,
  'whale': WhaleSVG,
  'manta-ray': MantaRaySVG,
  'giant-squid': GiantSquidSVG,
  'anglerfish': AnglerfishSVG,
  'dumbo-octopus': DumboOctopusSVG,
};
