'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Returns a normalized scroll ratio [0..1] across the full page height.
 * Compatible with Lenis smooth scroll — reads from native scroll position
 * which Lenis updates via its wrapper.
 * Uses requestAnimationFrame throttling for 60fps performance.
 */
export function useScrollRatio(): number {
  const [ratio, setRatio] = useState(0);

  const handleScroll = useCallback(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (max <= 0) return;
    setRatio(Math.min(Math.max(window.scrollY / max, 0), 1));
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll(); // init
    return () => window.removeEventListener('scroll', onScroll);
  }, [handleScroll]);

  return ratio;
}
