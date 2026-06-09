'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { EASE_EXPRESSIVE } from '@/lib/animations/variants';

/**
 * Número que cuenta hacia arriba al entrar en viewport, y vuelve a rodar
 * (desde el valor anterior) cada vez que `value` cambia — comunica "growth"
 * de forma visceral. Respeta prefers-reduced-motion (salta al valor final).
 */
export default function CountUp({
  value,
  format = (n) => Math.round(n).toLocaleString('es-CO'),
  duration = 1.1,
  className,
}: {
  value: number;
  format?: (n: number) => string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const reduce = useReducedMotion();
  const fromRef = useRef(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (reduce) {
      setDisplay(value);
      fromRef.current = value;
      return;
    }
    if (!inView) return;

    const controls = animate(fromRef.current, value, {
      duration,
      ease: EASE_EXPRESSIVE,
      onUpdate: (v) => setDisplay(v),
    });
    fromRef.current = value;
    return () => controls.stop();
  }, [inView, value, reduce, duration]);

  return (
    <span ref={ref} className={className}>
      {format(reduce ? value : display)}
    </span>
  );
}
