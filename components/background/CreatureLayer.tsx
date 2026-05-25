'use client';

import { useState, useEffect, useCallback } from 'react';
import { CREATURES } from '@/lib/data/creatures';
import { CreatureEntity } from './CreatureEntity';

interface CreatureLayerProps {
  scrollRatio: number;
}

/**
 * CreatureLayer
 *
 * Positioned fixed, covers the full viewport. Renders all creature
 * silhouettes based on the current scrollRatio.
 * Creatures fade in/out as they enter/leave their designated zones.
 */
export function CreatureLayer({ scrollRatio }: CreatureLayerProps) {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[2] pointer-events-none overflow-hidden"
    >
      {CREATURES.map(creature => (
        <CreatureEntity
          key={creature.id}
          config={creature}
          scrollRatio={scrollRatio}
          mousePos={mousePos}
        />
      ))}
    </div>
  );
}
