'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const SECTION_IDS = [
  'hero',
  'problem',
  'method',
  'services',
  'laboratory',
  'cases',
  'process',
  'founder',
  'partners',
  'result',
  'contact',
] as const;

type FlowPoint = {
  id: string;
  y: number;
};

export function HomeUnifiedFlow({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [points, setPoints] = useState<FlowPoint[]>([]);

  const updateGraph = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;

    const rootRect = root.getBoundingClientRect();
    const scrollTop = window.scrollY;
    const rootTop = rootRect.top + scrollTop;

    const nextPoints: FlowPoint[] = [];

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (!el) continue;

      const rect = el.getBoundingClientRect();
      const y = rect.top + scrollTop - rootTop + rect.height * 0.42;
      nextPoints.push({ id, y });
    }

    setPoints(nextPoints);
  }, []);

  useEffect(() => {
    updateGraph();

    const root = rootRef.current;
    if (!root) return;

    const observer = new ResizeObserver(() => updateGraph());
    observer.observe(root);

    window.addEventListener('resize', updateGraph);
    window.addEventListener('scroll', updateGraph, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateGraph);
      window.removeEventListener('scroll', updateGraph);
    };
  }, [updateGraph]);

  const spineTop = points[0]?.y ?? 0;
  const spineBottom = points[points.length - 1]?.y ?? 0;
  const spineHeight = Math.max(spineBottom - spineTop, 0);

  return (
    <div ref={rootRef} className="relative">
      <div className="pointer-events-none absolute inset-0 z-[1] hidden lg:block" aria-hidden="true">
        {spineHeight > 0 ? (
          <div
            className="absolute left-7 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent"
            style={{ top: spineTop, height: spineHeight }}
          />
        ) : null}

        {points.map((point) => (
          <div key={point.id} className="absolute left-7" style={{ top: point.y }}>
            <div className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full border border-white/30 bg-background" />
            <div className="ml-3 h-px w-20 bg-gradient-to-r from-white/20 to-transparent" />
          </div>
        ))}
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
