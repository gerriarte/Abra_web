import { useEffect, useRef, useState } from 'react';
import { getCreatureOpacity } from '../../utils/atmosphere';

/**
 * CreatureEntity — renders a single creature with the correct animation type.
 *
 * Props:
 *   config       — creature config object from creatures.js
 *   scrollRatio  — current scroll ratio [0..1]
 *   mousePos     — { x, y } normalized mouse position [0..1] (for mouseReact)
 */
export function CreatureEntity({ config, scrollRatio, mousePos }) {
  const containerRef = useRef(null);
  const [lottieAnim, setLottieAnim] = useState(null);

  const opacity = getCreatureOpacity(scrollRatio, config.zone[0], config.zone[1]);

  // ── Load Lottie dynamically (only when in zone) ──
  useEffect(() => {
    if (config.assetType !== 'lottie' || !containerRef.current) return;
    if (opacity === 0) return; // don't load if invisible

    let anim;
    import('lottie-web').then(({ default: lottie }) => {
      anim = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: config.assetPath,
      });
      setLottieAnim(anim);
    });

    return () => anim?.destroy();
  }, [config.assetPath, config.assetType, opacity]);

  // ── Compute scroll-driven Y parallax ──
  const parallaxY = config.parallax
    ? `${(scrollRatio - config.zone[0]) * config.parallax * -120}px`
    : '0px';

  // ── Compute mouse reaction offset ──
  let mouseOffsetX = 0;
  let mouseOffsetY = 0;
  if (config.mouseReact && mousePos) {
    mouseOffsetX = (mousePos.x - 0.5) * 12;
    mouseOffsetY = (mousePos.y - 0.5) * 12;
  }

  // ── Build animation CSS ──
  const animStyle = buildAnimationStyle(config);

  // ── Direction flip for RTL traversal ──
  const flipX = config.animation.direction === 'rtl' ? 'scaleX(-1)' : '';

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
        opacity,
        transition: 'opacity 1.4s ease',
        transform: `translateY(calc(${parallaxY} + ${mouseOffsetY}px)) translateX(${mouseOffsetX}px) ${flipX}`,
        willChange: 'transform, opacity',
        pointerEvents: 'none',
        ...animStyle,
      }}
    >
      {config.assetType === 'lottie' && (
        <div
          ref={containerRef}
          style={{ width: '100%', height: '100%' }}
        />
      )}

      {config.assetType === 'webp' && (
        <img
          src={config.assetPath}
          alt=""
          draggable={false}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      )}
    </div>
  );
}

/**
 * Generates the CSS animation string for a given creature config.
 */
function buildAnimationStyle(config) {
  const { animation } = config;

  if (animation.type === 'traverse') {
    const kfName = animation.direction === 'ltr' ? 'traverseLTR' : 'traverseRTL';
    return {
      animation: `${kfName} ${animation.duration}s linear ${animation.delay}s infinite`,
    };
  }

  if (animation.type === 'float') {
    return {
      animation: `floatDrift ${animation.duration}s ease-in-out ${animation.delay}s infinite`,
      '--drift-x': `${animation.xAmplitude ?? 20}px`,
      '--drift-y': `${animation.yAmplitude ?? 15}px`,
    };
  }

  return {};
}
