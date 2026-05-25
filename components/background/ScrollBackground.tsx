'use client';

import { useScrollRatio } from '@/hooks/useScrollRatio';
import { AtmosphereBackground } from './AtmosphereBackground';
import { AmbientEffects } from './AmbientEffects';
import { CreatureLayer } from './CreatureLayer';
import { DepthIndicator } from './DepthIndicator';

/**
 * ScrollBackground
 *
 * Orchestrator component that combines the atmosphere background,
 * creature layer, ambient effects (clouds, bubbles, bioluminescence),
 * and the depth indicator.
 * 
 * This is a fixed-position layer that sits behind all page content.
 * Mount it once in the layout and it will respond to scroll across the entire page.
 */
export function ScrollBackground() {
  const scrollRatio = useScrollRatio();

  return (
    <>
      <AtmosphereBackground scrollRatio={scrollRatio} />
      <CreatureLayer scrollRatio={scrollRatio} />
      <AmbientEffects scrollRatio={scrollRatio} />
      <DepthIndicator scrollRatio={scrollRatio} />
      <ProgressBar scrollRatio={scrollRatio} />
    </>
  );
}

/**
 * Thin progress bar at the top of the viewport showing scroll progress.
 */
function ProgressBar({ scrollRatio }: { scrollRatio: number }) {
  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 z-[300]"
      style={{
        height: 2,
        width: `${scrollRatio * 100}%`,
        background: 'rgba(255,255,255,0.55)',
        boxShadow: '0 0 6px rgba(255,255,255,0.4)',
        transition: 'width 0.08s linear',
      }}
    />
  );
}
