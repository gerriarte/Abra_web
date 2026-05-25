'use client';

import { getCreatureOpacity } from '@/lib/utils/atmosphere';
import type { CreatureConfig } from '@/lib/data/creatures';
import { CREATURE_SVG_MAP } from './CreatureSVGs';
import { CreatureLottie } from './CreatureLottie';

interface CreatureEntityProps {
  config: CreatureConfig;
  scrollRatio: number;
  mousePos: { x: number; y: number };
}

/**
 * CreatureEntity — renders a single creature with the correct animation type.
 * Uses SVG silhouettes as placeholders for Lottie assets.
 */
export function CreatureEntity({ config, scrollRatio, mousePos }: CreatureEntityProps) {
  const opacity = getCreatureOpacity(scrollRatio, config.zone[0], config.zone[1]);
  const finalOpacity = opacity * (config.opacity ?? 1);

  // Don't render if invisible
  if (finalOpacity <= 0.01) return null;

  // Scroll-driven Y parallax
  const parallaxY = config.parallax
    ? (scrollRatio - config.zone[0]) * config.parallax * -120
    : 0;

  // Mouse reaction offset
  let mouseOffsetX = 0;
  let mouseOffsetY = 0;
  if (config.mouseReact && mousePos) {
    mouseOffsetX = (mousePos.x - 0.5) * 12;
    mouseOffsetY = (mousePos.y - 0.5) * 12;
  }

  // Build animation CSS
  const animStyle = buildAnimationStyle(config);

  // Direction flip for RTL traversal
  const flipX = config.animation.direction === 'rtl' ? 'scaleX(-1)' : '';

  // Get the SVG component
  const SvgComponent = CREATURE_SVG_MAP[config.id];
  if (!SvgComponent && !config.lottieUrl) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: config.position.top ?? 'auto',
        left: config.position.left ?? (config.animation.type === 'traverse' ? '0' : undefined),
        right: config.position.right ?? undefined,
        width: config.size.w,
        height: config.size.h,
        zIndex: config.zIndex,
        opacity: finalOpacity,
        transition: 'opacity 1.4s ease',
        transform: `translateY(calc(${parallaxY}px + ${mouseOffsetY}px)) translateX(${mouseOffsetX}px) ${flipX}`,
        willChange: 'transform, opacity',
        pointerEvents: 'none',
        color: 'white',
        ...animStyle,
      }}
    >
      {config.lottieUrl ? (
        <CreatureLottie url={config.lottieUrl} />
      ) : (
        SvgComponent && <SvgComponent className="w-full h-full" />
      )}
    </div>
  );
}

/**
 * Generates the CSS animation properties for a given creature config.
 */
function buildAnimationStyle(config: CreatureConfig): React.CSSProperties {
  const { animation } = config;

  if (animation.type === 'traverse') {
    const kfName = animation.direction === 'ltr' ? 'creature-traverse-ltr' : 'creature-traverse-rtl';
    return {
      animation: `${kfName} ${animation.duration}s linear ${animation.delay}s infinite`,
    };
  }

  if (animation.type === 'float') {
    return {
      animation: `creature-float-drift ${animation.duration}s ease-in-out ${animation.delay}s infinite`,
      // @ts-expect-error CSS custom properties
      '--drift-x': `${animation.xAmplitude ?? 20}px`,
      '--drift-y': `${animation.yAmplitude ?? 15}px`,
    };
  }

  return {};
}
