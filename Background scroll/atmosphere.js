/**
 * Atmospheric zones — scroll ratio [0..1] mapped to color stops.
 * Each zone defines the gradient top and bottom color.
 */
export const ATMOSPHERE_ZONES = [
  { id: 'sky-high',    range: [0.00, 0.18], t: '#ddf0fc', b: '#b2dcf5', label: 'Altitud 10.000 m' },
  { id: 'sky-mid',     range: [0.18, 0.33], t: '#7ec3ed', b: '#4298d0', label: 'Altitud 3.000 m'  },
  { id: 'horizon',     range: [0.33, 0.44], t: '#1a779a', b: '#0c5878', label: 'Nivel del mar'     },
  { id: 'shallow',     range: [0.44, 0.60], t: '#08697a', b: '#064e5e', label: '-200 m'            },
  { id: 'deep',        range: [0.60, 0.78], t: '#042438', b: '#021828', label: '-1.000 m'          },
  { id: 'abyss',       range: [0.78, 1.00], t: '#000c18', b: '#000306', label: '-4.000 m'          },
];

function hexToRgb(hex) {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

function lerp(a, b, t) { return a + (b - a) * t; }

export function interpolateColor(colorA, colorB, t) {
  const [r1, g1, b1] = hexToRgb(colorA);
  const [r2, g2, b2] = hexToRgb(colorB);
  return `rgb(${Math.round(lerp(r1,r2,t))},${Math.round(lerp(g1,g2,t))},${Math.round(lerp(b1,b2,t))})`;
}

/**
 * Returns the interpolated background gradient CSS string for a given scroll ratio.
 */
export function getBgGradient(ratio) {
  const zones = ATMOSPHERE_ZONES;
  const n = zones.length - 1;
  const f = ratio * n;
  const i = Math.min(Math.floor(f), n - 1);
  const t = f - i;
  const a = zones[i];
  const b = zones[Math.min(i + 1, n)];
  const top    = interpolateColor(a.t, b.t, t);
  const bottom = interpolateColor(a.b, b.b, t);
  return `linear-gradient(180deg, ${top} 0%, ${bottom} 100%)`;
}

/**
 * Returns opacity [0..1] for a creature given its zone range and current ratio.
 * fadeWidth controls how quickly it fades in/out at zone edges.
 */
export function getCreatureOpacity(ratio, zoneStart, zoneEnd, fadeWidth = 0.055) {
  if (ratio < zoneStart || ratio > zoneEnd) return 0;
  const inFade  = Math.min((ratio - zoneStart) / fadeWidth, 1);
  const outFade = Math.min((zoneEnd - ratio)   / fadeWidth, 1);
  return Math.min(inFade, outFade);
}

/**
 * Returns which atmosphere zone ID is currently active.
 */
export function getActiveZone(ratio) {
  return ATMOSPHERE_ZONES.find(z => ratio >= z.range[0] && ratio <= z.range[1])
    ?? ATMOSPHERE_ZONES[ATMOSPHERE_ZONES.length - 1];
}

/**
 * Returns the depth label for a given scroll ratio.
 */
export function getDepthLabel(ratio) {
  return getActiveZone(ratio).label;
}
