/**
 * CREATURE REGISTRY
 *
 * Each entry defines one creature and how it behaves across the scroll journey.
 * Uses inline SVG silhouettes as placeholders — can be swapped for Lottie assets later.
 */

export type AnimationType = 'traverse' | 'float';
export type TraverseDirection = 'ltr' | 'rtl';

export interface CreatureAnimation {
  type: AnimationType;
  direction?: TraverseDirection;
  duration: number;
  delay: number;
  easing?: string;
  xAmplitude?: number;
  yAmplitude?: number;
  yDrift?: number;
  yDriftDuration?: number;
}

export interface CreatureConfig {
  id: string;
  zone: [number, number];
  size: { w: number; h: number };
  position: { top?: string; left?: string; right?: string };
  animation: CreatureAnimation;
  zIndex: number;
  parallax: number;
  mouseReact: boolean;
  opacity?: number;
  lottieUrl?: string;
}

export const CREATURES: CreatureConfig[] = [

  // ─────────────────────────────────────────
  // ZONE: HIGH SKY (ratio 0.00 – 0.16)
  // ─────────────────────────────────────────
  {
    id: 'bird-flock',
    zone: [0.00, 0.28],
    size: { w: 280, h: 100 },
    position: { top: '25%' },
    animation: {
      type: 'traverse',
      direction: 'ltr',
      duration: 42,
      delay: -10,
      easing: 'linear',
    },
    zIndex: 6,
    parallax: 0.08,
    mouseReact: false,
  },
  {
    id: 'bird-flock-2',
    zone: [0.02, 0.22],
    size: { w: 180, h: 70 },
    position: { top: '55%' },
    animation: {
      type: 'traverse',
      direction: 'rtl',
      duration: 55,
      delay: -22,
      easing: 'linear',
    },
    zIndex: 5,
    parallax: 0.05,
    mouseReact: false,
    opacity: 0.5,
  },

  // ─────────────────────────────────────────
  // ZONE: WARM SKY / HORIZON (0.14 – 0.46)
  // ─────────────────────────────────────────
  {
    id: 'seagull',
    zone: [0.20, 0.42],
    size: { w: 60, h: 40 },
    position: { top: '30%' },
    animation: {
      type: 'traverse',
      direction: 'rtl',
      duration: 30,
      delay: -5,
      easing: 'linear',
    },
    zIndex: 5,
    parallax: 0.10,
    mouseReact: false,
  },

  // ─────────────────────────────────────────
  // ZONE: SHALLOW WATER (0.35 – 0.65)
  // ─────────────────────────────────────────
  {
    id: 'jellyfish-1',
    zone: [0.32, 0.60],
    size: { w: 100, h: 140 },
    position: { top: '20%', left: '75%' },
    animation: {
      type: 'float',
      xAmplitude: 20,
      yAmplitude: 25,
      duration: 14,
      delay: 0,
    },
    zIndex: 4,
    parallax: 0.12,
    mouseReact: true,
  },
  {
    id: 'jellyfish-2',
    zone: [0.38, 0.65],
    size: { w: 70, h: 100 },
    position: { top: '60%', left: '15%' },
    animation: {
      type: 'float',
      xAmplitude: 15,
      yAmplitude: 18,
      duration: 17,
      delay: -6,
    },
    zIndex: 4,
    parallax: 0.10,
    mouseReact: true,
    opacity: 0.7,
  },
  {
    id: 'fish-school',
    zone: [0.40, 0.70],
    size: { w: 320, h: 120 },
    position: { top: '35%' },
    animation: {
      type: 'traverse',
      direction: 'ltr',
      duration: 32,
      delay: -8,
      easing: 'linear',
    },
    zIndex: 4,
    parallax: 0.06,
    mouseReact: false,
  },
  {
    id: 'turtle',
    zone: [0.44, 0.68],
    size: { w: 140, h: 100 },
    position: { top: '65%' },
    animation: {
      type: 'traverse',
      direction: 'rtl',
      duration: 55,
      delay: -20,
      easing: 'linear',
    },
    zIndex: 4,
    parallax: 0.08,
    mouseReact: false,
  },

  // ─────────────────────────────────────────
  // ZONE: DEEP WATER (0.60 – 0.82)
  // ─────────────────────────────────────────
  {
    id: 'whale',
    zone: [0.55, 0.90],
    size: { w: 480, h: 180 },
    position: { top: '40%' },
    animation: {
      type: 'traverse',
      direction: 'ltr',
      duration: 95,
      delay: -30,
      easing: 'linear',
    },
    zIndex: 4,
    parallax: 0.04,
    mouseReact: false,
    lottieUrl: '/Lottie/ballena.json',
  },
  {
    id: 'manta-ray',
    zone: [0.58, 0.82],
    size: { w: 260, h: 160 },
    position: { top: '68%' },
    animation: {
      type: 'traverse',
      direction: 'rtl',
      duration: 48,
      delay: -18,
      easing: 'linear',
    },
    zIndex: 4,
    parallax: 0.06,
    mouseReact: false,
  },
  {
    id: 'giant-squid',
    zone: [0.65, 0.95],
    size: { w: 120, h: 220 },
    position: { top: '15%', left: '12%' },
    animation: {
      type: 'float',
      xAmplitude: 18,
      yAmplitude: 25,
      duration: 18,
      delay: -8,
    },
    zIndex: 3,
    parallax: 0.15,
    mouseReact: true,
  },

  // ─────────────────────────────────────────
  // ZONE: ABYSS (0.78 – 1.00)
  // ─────────────────────────────────────────
  {
    id: 'anglerfish',
    zone: [0.78, 1.00],
    size: { w: 200, h: 150 },
    position: { top: '50%', left: '60%' },
    animation: {
      type: 'float',
      xAmplitude: 12,
      yAmplitude: 10,
      duration: 12,
      delay: -3,
    },
    zIndex: 5,
    parallax: 0.18,
    mouseReact: true,
  },
  {
    id: 'dumbo-octopus',
    zone: [0.82, 1.00],
    size: { w: 120, h: 120 },
    position: { top: '22%', left: '80%' },
    animation: {
      type: 'float',
      xAmplitude: 14,
      yAmplitude: 18,
      duration: 15,
      delay: -5,
    },
    zIndex: 4,
    parallax: 0.20,
    mouseReact: true,
    opacity: 0.8,
  },
];

/**
 * Returns creatures that should be mounted at a given scroll ratio.
 */
export function getActiveCreatures(ratio: number, buffer: number = 0.04): CreatureConfig[] {
  return CREATURES.filter(c =>
    ratio >= c.zone[0] - buffer && ratio <= c.zone[1] + buffer
  );
}
