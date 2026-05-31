'use client';

import { useScrollRatio } from '@/hooks/useScrollRatio';
import { AtmosphereBackground } from './AtmosphereBackground';
import { DepthIndicator } from './DepthIndicator';

export function ScrollBackground() {
  const scrollRatio = useScrollRatio();

  return (
    <>
      <AtmosphereBackground scrollRatio={scrollRatio} />
      <DepthIndicator scrollRatio={scrollRatio} />
      <ProgressBar scrollRatio={scrollRatio} />
    </>
  );
}

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
