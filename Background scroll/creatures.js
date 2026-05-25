/**
 * CREATURE REGISTRY
 *
 * Each entry defines one creature and how it should behave across the scroll journey.
 *
 * Fields:
 *  id          — unique identifier (matches asset filename: /public/creatures/{id}.webp or {id}.json)
 *  zone        — [start, end] scroll ratio where creature is visible
 *  assetType   — 'lottie' | 'webp' | 'svg-inline' | 'spline'
 *  assetPath   — path inside /public/
 *  size        — { w, h } in px at 1x (scales with viewport via CSS)
 *  position    — { top: '%%', left: '%%' } CSS positioning
 *  animation   — animation config (see AnimationType enum below)
 *  zIndex      — stacking order
 *  parallax    — multiplier for scroll-driven Y offset (0 = no parallax, 0.15 = subtle)
 *  mouseReact  — if true, creature slightly follows cursor (max 12px)
 *  notes       — context for developers and illustrators
 */

export const CREATURES = [

  // ─────────────────────────────────────────
  // ZONE 0 — HIGH SKY (ratio 0.00 – 0.20)
  // ─────────────────────────────────────────
  {
    id: 'satellite',
    zone: [0.00, 0.18],
    assetType: 'lottie',
    assetPath: '/creatures/satellite.json',
    size: { w: 120, h: 60 },
    position: { top: '12%', left: null, right: null }, // traverses left→right
    animation: {
      type: 'traverse',        // moves across the full viewport width
      direction: 'ltr',        // left-to-right
      duration: 65,            // seconds for one full crossing
      delay: -14,
      easing: 'linear',
      yDrift: 8,               // px of gentle vertical oscillation
      yDriftDuration: 12,
    },
    zIndex: 6,
    parallax: 0,
    mouseReact: false,
    notes: 'Slow, majestic. Should read as an orbiting satellite. Lottie ideally shows rotating solar panels.',
  },

  // ─────────────────────────────────────────
  // ZONE 1 — MID SKY (ratio 0.05 – 0.32)
  // ─────────────────────────────────────────
  {
    id: 'airplane-1',
    zone: [0.05, 0.30],
    assetType: 'webp',
    assetPath: '/creatures/airplane.webp',
    size: { w: 220, h: 80 },
    position: { top: '22%' },
    animation: {
      type: 'traverse',
      direction: 'ltr',
      duration: 38,
      delay: -6,
      easing: 'linear',
      yDrift: 5,
      yDriftDuration: 18,
    },
    zIndex: 5,
    parallax: 0.05,
    mouseReact: false,
    notes: 'Commercial airliner, side view, left-to-right. Slight condensation trail (can be CSS pseudo-element).',
  },
  {
    id: 'airplane-2',
    zone: [0.08, 0.34],
    assetType: 'webp',
    assetPath: '/creatures/airplane.webp', // reuse same asset, flip via CSS scaleX(-1)
    size: { w: 160, h: 58 },
    position: { top: '55%' },
    animation: {
      type: 'traverse',
      direction: 'rtl',        // right-to-left, asset flipped
      duration: 55,
      delay: -28,
      easing: 'linear',
      yDrift: 4,
      yDriftDuration: 22,
    },
    zIndex: 5,
    parallax: 0.04,
    mouseReact: false,
    notes: 'Same airplane asset, smaller scale, opposite direction. Creates depth.',
  },
  {
    id: 'bird-flock',
    zone: [0.04, 0.36],
    assetType: 'lottie',
    assetPath: '/creatures/birds-flock.json',
    size: { w: 280, h: 120 },
    position: { top: '38%' },
    animation: {
      type: 'traverse',
      direction: 'ltr',
      duration: 36,
      delay: -10,
      easing: 'linear',
    },
    zIndex: 5,
    parallax: 0.08,
    mouseReact: false,
    notes: 'Flock of ~12 birds in classic V formation. Wings should flap. Lottie handles the flapping loop.',
  },

  // ─────────────────────────────────────────
  // ZONE 2 — HORIZON / TRANSITION (0.30–0.46)
  // ─────────────────────────────────────────
  {
    id: 'seagull',
    zone: [0.28, 0.44],
    assetType: 'lottie',
    assetPath: '/creatures/seagull.json',
    size: { w: 80, h: 55 },
    position: { top: '30%' },
    animation: {
      type: 'traverse',
      direction: 'rtl',
      duration: 28,
      delay: -5,
      easing: 'linear',
      yDrift: 12,
      yDriftDuration: 8,
    },
    zIndex: 5,
    parallax: 0.10,
    mouseReact: false,
    notes: 'Single seagull soaring. Transition creature — visible as sky meets sea. Slow wing beats.',
  },

  // ─────────────────────────────────────────
  // ZONE 3 — SHALLOW WATER (0.44 – 0.62)
  // ─────────────────────────────────────────
  {
    id: 'jellyfish-1',
    zone: [0.34, 0.65],
    assetType: 'lottie',
    assetPath: '/creatures/jellyfish-blue.json',
    size: { w: 140, h: 200 },
    position: { top: '15%', left: '72%' },
    animation: {
      type: 'float',           // gentle drift in place, no traversal
      xAmplitude: 22,
      yAmplitude: 18,
      duration: 14,
      delay: 0,
    },
    zIndex: 4,
    parallax: 0.12,
    mouseReact: true,
    notes: 'Blue jellyfish, bell pulsing animation. Tentacles trail behind with secondary motion. Translucent.',
  },
  {
    id: 'jellyfish-2',
    zone: [0.40, 0.70],
    assetType: 'lottie',
    assetPath: '/creatures/jellyfish-purple.json',
    size: { w: 100, h: 145 },
    position: { top: '58%', left: '18%' },
    animation: {
      type: 'float',
      xAmplitude: 18,
      yAmplitude: 14,
      duration: 17,
      delay: -6,
    },
    zIndex: 4,
    parallax: 0.10,
    mouseReact: true,
    notes: 'Purple/violet variant. Slightly smaller. Different timing so they never sync up.',
  },
  {
    id: 'fish-school',
    zone: [0.44, 0.76],
    assetType: 'lottie',
    assetPath: '/creatures/fish-school.json',
    size: { w: 380, h: 160 },
    position: { top: '30%' },
    animation: {
      type: 'traverse',
      direction: 'ltr',
      duration: 28,
      delay: -4,
      easing: 'linear',
      yDrift: 20,
      yDriftDuration: 12,
    },
    zIndex: 4,
    parallax: 0.06,
    mouseReact: false,
    notes: 'School of ~20 small tropical fish moving together. Lottie should show subtle individual movement within the group.',
  },
  {
    id: 'turtle',
    zone: [0.48, 0.72],
    assetType: 'lottie',
    assetPath: '/creatures/sea-turtle.json',
    size: { w: 180, h: 130 },
    position: { top: '62%' },
    animation: {
      type: 'traverse',
      direction: 'rtl',
      duration: 50,
      delay: -22,
      easing: 'linear',
      yDrift: 15,
      yDriftDuration: 20,
    },
    zIndex: 4,
    parallax: 0.08,
    mouseReact: false,
    notes: 'Green sea turtle, gentle flipper animation. Deliberate, serene pace.',
  },

  // ─────────────────────────────────────────
  // ZONE 4 — DEEP WATER (0.60 – 0.82)
  // ─────────────────────────────────────────
  {
    id: 'whale',
    zone: [0.60, 1.00],
    assetType: 'lottie',
    assetPath: '/creatures/blue-whale.json',
    size: { w: 580, h: 240 },
    position: { top: '40%' },
    animation: {
      type: 'traverse',
      direction: 'ltr',
      duration: 90,
      delay: -25,
      easing: 'linear',
      yDrift: 30,
      yDriftDuration: 25,
    },
    zIndex: 4,
    parallax: 0.04,
    mouseReact: false,
    notes: 'HERO creature. Blue whale, massive. Tail fluke should animate. Very slow — majesty over speed. Slight bioluminescent tint in deep zones.',
  },
  {
    id: 'giant-squid',
    zone: [0.70, 1.00],
    assetType: 'lottie',
    assetPath: '/creatures/giant-squid.json',
    size: { w: 180, h: 340 },
    position: { top: '18%', left: '15%' },
    animation: {
      type: 'float',
      xAmplitude: 20,
      yAmplitude: 28,
      duration: 18,
      delay: -8,
    },
    zIndex: 3,
    parallax: 0.15,
    mouseReact: true,
    notes: 'Architeuthis dux. Tentacles have independent secondary motion. Deep navy/indigo tones. Eyes should be large and detailed.',
  },
  {
    id: 'manta-ray',
    zone: [0.62, 0.84],
    assetType: 'lottie',
    assetPath: '/creatures/manta-ray.json',
    size: { w: 320, h: 200 },
    position: { top: '65%' },
    animation: {
      type: 'traverse',
      direction: 'rtl',
      duration: 45,
      delay: -18,
      easing: 'linear',
      yDrift: 22,
      yDriftDuration: 16,
    },
    zIndex: 4,
    parallax: 0.06,
    mouseReact: false,
    notes: 'Giant oceanic manta ray, wing flaps slowly like flying. Dark dorsally, white ventrally. Graceful.',
  },

  // ─────────────────────────────────────────
  // ZONE 5 — ABYSS (0.78 – 1.00)
  // ─────────────────────────────────────────
  {
    id: 'anglerfish',
    zone: [0.80, 1.00],
    assetType: 'lottie',
    assetPath: '/creatures/anglerfish.json',
    size: { w: 260, h: 200 },
    position: { top: '52%', left: '60%' },
    animation: {
      type: 'float',
      xAmplitude: 14,
      yAmplitude: 10,
      duration: 12,
      delay: -3,
    },
    zIndex: 5,
    parallax: 0.18,
    mouseReact: true,
    notes: 'Melanocetus johnsonii (black sea devil). The lure (esca) should pulse with cyan/green bioluminescence. Large fang teeth. Almost invisible body — just darkness and the glow.',
  },
  {
    id: 'dumbo-octopus',
    zone: [0.82, 1.00],
    assetType: 'lottie',
    assetPath: '/creatures/dumbo-octopus.json',
    size: { w: 160, h: 160 },
    position: { top: '25%', left: '80%' },
    animation: {
      type: 'float',
      xAmplitude: 16,
      yAmplitude: 20,
      duration: 15,
      delay: -5,
    },
    zIndex: 4,
    parallax: 0.20,
    mouseReact: true,
    notes: 'Grimpoteuthis. The "ear" fins should flap. Semi-transparent, deep red/purple with bioluminescent hints. One of the most beautiful deep sea creatures.',
  },
  {
    id: 'vampire-squid',
    zone: [0.84, 1.00],
    assetType: 'lottie',
    assetPath: '/creatures/vampire-squid.json',
    size: { w: 140, h: 120 },
    position: { top: '70%', left: '30%' },
    animation: {
      type: 'float',
      xAmplitude: 12,
      yAmplitude: 16,
      duration: 20,
      delay: -12,
    },
    zIndex: 4,
    parallax: 0.14,
    mouseReact: false,
    notes: 'Vampyroteuthis infernalis. Deep crimson/black. Webbing between arms. Two small photophores (light organs) visible. Eerie and beautiful.',
  },
];

/**
 * Returns creatures that should be mounted at a given scroll ratio.
 * Adds a small buffer to preload slightly before they become visible.
 */
export function getActiveCreatures(ratio, buffer = 0.04) {
  return CREATURES.filter(c =>
    ratio >= c.zone[0] - buffer && ratio <= c.zone[1] + buffer
  );
}
