'use client';

import { useEffect } from 'react';

/**
 * Adds `is-visible` to every `.ja-reveal` element once it enters the viewport.
 * One observer for the whole page keeps sections as server components.
 * With reduced motion (or no IntersectionObserver) everything shows at once.
 */
export function RevealObserver() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>('.ja-root .ja-reveal'));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
