'use client';

import { useEffect } from 'react';

const SELECTOR = '.abra-reveal:not(.is-visible)';

/**
 * Adds `is-visible` to every `.abra-reveal` element once it enters the viewport.
 * One observer per page keeps sections as server components. A MutationObserver
 * also picks up elements rendered later (client components, lazy sections).
 * With reduced motion (or no IntersectionObserver) everything shows at once.
 */
export function RevealObserver() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const collect = (root: ParentNode) => Array.from(root.querySelectorAll<HTMLElement>(SELECTOR));

    if (reduce || !('IntersectionObserver' in window)) {
      const showAll = () => collect(document).forEach((el) => el.classList.add('is-visible'));
      showAll();
      const mutations = new MutationObserver(showAll);
      mutations.observe(document.body, { childList: true, subtree: true });
      return () => mutations.disconnect();
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

    collect(document).forEach((el) => observer.observe(el));

    const mutations = new MutationObserver((records) => {
      records.forEach((record) =>
        record.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches(SELECTOR)) observer.observe(node);
          collect(node).forEach((el) => observer.observe(el));
        }),
      );
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);

  return null;
}
