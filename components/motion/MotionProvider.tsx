'use client';

import { MotionConfig, motion, useScroll, useSpring } from 'framer-motion';

/**
 * Provider de movimiento del sitio:
 *  1. reducedMotion="user" — respeta prefers-reduced-motion en TODAS las
 *     animaciones de framer-motion del árbol (transform/scale/rotate).
 *  2. Barra de progreso de scroll (1px, discreta) fija arriba de todo.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        aria-hidden
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 z-[60] h-px origin-left bg-gradient-to-r from-transparent via-white/70 to-transparent"
      />
      {children}
    </MotionConfig>
  );
}
