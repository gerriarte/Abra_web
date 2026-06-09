'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { EASE_ENTRANCE } from '@/lib/animations/variants';

/**
 * Revelado tipográfico palabra por palabra: cada palabra "sube" desde una máscara,
 * escalonada. Es la señal de craft editorial de los sitios premiados.
 * Se dispara solo cuando entra en viewport y respeta prefers-reduced-motion.
 */
export default function WordReveal({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(' ');

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-12% 0px' }}
      variants={{
        visible: { transition: { staggerChildren: 0.06, delayChildren: delay } },
      }}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}
        >
          <motion.span
            style={{ display: 'inline-block', willChange: 'transform' }}
            variants={{
              hidden: { y: '115%' },
              visible: { y: 0, transition: { duration: 0.8, ease: EASE_ENTRANCE } },
            }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
