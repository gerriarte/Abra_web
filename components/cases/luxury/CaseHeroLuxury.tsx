'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

interface CaseHeroLuxuryProps {
  title: string;
  client: string;
  category: string;
  metric: { label: string; value: string };
  backgroundImage: string;
}

export const CaseHeroLuxury: React.FC<CaseHeroLuxuryProps> = ({ title, client, category, metric, backgroundImage }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative h-[95vh] md:h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      {/* Ken Burns Background Layer */}
      <motion.div 
        style={{ y: useTransform(scrollY, [0, 1000], [mousePos.y, 400 + mousePos.y]), x: mousePos.x }}
        className="absolute inset-0 z-0"
      >
        <motion.img 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 3, ease: "easeOut" }}
          src={backgroundImage} 
          alt={title} 
          className="w-full h-full object-cover grayscale brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl pt-24">
        <div className="flex flex-col items-center text-center">
          {/* Eyebrow / Client */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-4">
              <span className="h-px w-8 bg-white/20" />
              <span className="text-[10px] font-mono tracking-[0.5em] uppercase text-text-muted">
                {client} — {category}
              </span>
              <span className="h-px w-8 bg-white/20" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-6xl md:text-8xl lg:text-[10rem] font-light tracking-tight leading-[0.8] max-w-6xl mb-16 text-white"
          >
            {title}
          </motion.h1>

          {/* Tactical Metric Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-white/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative px-12 py-8 rounded-[2.5rem] border border-white/10 bg-background/20 backdrop-blur-3xl flex items-center gap-10 shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
              <div className="flex flex-col items-start">
                 <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-text-muted mb-2">North Star Metric</span>
                 <div className="flex items-baseline gap-2">
                   <span className="text-5xl md:text-6xl font-light text-text-primary tracking-tighter">{metric.value}</span>
                   <span className="text-xs font-mono uppercase tracking-widest text-accent">{metric.label}</span>
                 </div>
              </div>
              <div className="w-px h-16 bg-white/10 hidden md:block" />
              <div className="hidden md:flex flex-col items-start text-left max-w-[220px]">
                 <p className="text-[11px] text-text-secondary leading-relaxed font-light">
                   Impacto estratégico verificado mediante el sistema <span className="text-white">A:BRA Loop</span> de ingeniería digital.
                 </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6"
      >
        <span className="text-[8px] font-mono tracking-[0.4em] uppercase text-text-muted rotate-90 origin-left translate-x-1">Scroll</span>
        <div className="w-px h-16 bg-gradient-to-b from-white/30 via-white/10 to-transparent" />
        <ArrowDown size={14} className="text-text-muted mb-2" strokeWidth={1} />
      </motion.div>
    </section>
  );
};
