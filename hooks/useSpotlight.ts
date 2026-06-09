'use client';

import { useMotionValue, useMotionTemplate } from 'framer-motion';

/**
 * Glow radial que sigue el cursor dentro de una card (estilo Linear/Vercel).
 * Devuelve el handler de mousemove y un `background` animado para el overlay.
 * Cada card necesita su propia instancia (un componente por card).
 */
export default function useSpotlight(
  size = 420,
  color = 'rgba(255,255,255,0.06)',
) {
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  const background = useMotionTemplate`radial-gradient(${size}px circle at ${x}px ${y}px, ${color}, transparent 65%)`;

  return { onMouseMove, background };
}
