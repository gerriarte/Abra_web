'use client';

import React, { useCallback, useRef, useState } from 'react';

interface BeforeAfterSliderProps {
  before: React.ReactNode;
  after: React.ReactNode;
  beforeLabel?: string;
  afterLabel?: string;
}

/**
 * Slider interactivo "antes / después" para el caso INCAP.
 * Arrastrá (o usá flechas con teclado) para revelar el estado nuevo del sitio.
 */
export default function BeforeAfterSlider({
  before,
  after,
  beforeLabel = 'Antes',
  afterLabel = 'Después',
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    setFromClientX(e.clientX);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 4));
    if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 4));
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-[16/10] w-full select-none overflow-hidden rounded-[2.5rem] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.5)]"
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {/* AFTER (capa de fondo) */}
      <div className="absolute inset-0">{after}</div>
      <div className="absolute right-6 top-6 z-20 rounded-full border border-white/15 bg-background/40 px-4 py-1.5 text-[9px] font-mono uppercase tracking-[0.3em] text-white/80 backdrop-blur-xl">
        {afterLabel}
      </div>

      {/* BEFORE (recortado por clip-path, sin deformar el contenido) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {before}
        <div className="absolute left-6 top-6 z-20 rounded-full border border-white/15 bg-background/40 px-4 py-1.5 text-[9px] font-mono uppercase tracking-[0.3em] text-white/80 backdrop-blur-xl">
          {beforeLabel}
        </div>
      </div>

      {/* Handle */}
      <div
        role="slider"
        tabIndex={0}
        aria-label="Comparar antes y después"
        aria-valuenow={Math.round(pos)}
        aria-valuemin={0}
        aria-valuemax={100}
        onPointerDown={onPointerDown}
        onKeyDown={onKeyDown}
        className="absolute top-0 z-30 flex h-full w-10 -translate-x-1/2 cursor-ew-resize items-center justify-center focus:outline-none"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/70" />
        <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-background/60 text-white backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-transform duration-200 hover:scale-110">
          <span className="text-sm leading-none tracking-tighter">‹ ›</span>
        </div>
      </div>
    </div>
  );
}
