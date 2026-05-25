'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

interface CaseHeroLuxuryProps {
  title: string;
  client: string;
  category: string;
  metric: { label: string; value: string };
  backgroundImage: string;
}

export const CaseHeroLuxury: React.FC<CaseHeroLuxuryProps> = ({ title, client, category, metric, backgroundImage }) => {
  return (
    <section className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden bg-background">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src={backgroundImage} 
          alt={title} 
          className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-[3000ms]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl pt-20">
        <div className="flex flex-col items-center text-center">
          {/* Eyebrow / Client */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="text-[10px] font-mono tracking-[0.5em] uppercase text-text-muted">
              {client} — {category}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tight leading-[0.85] max-w-5xl mb-12"
          >
            {title}
          </motion.h1>

          {/* North Star Metric - Tactical */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="px-10 py-6 rounded-full border border-white/10 bg-background/40 backdrop-blur-3xl flex items-center gap-8 shadow-[0_0_80px_rgba(255,255,255,0.05)]"
          >
            <div className="flex flex-col items-start">
               <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted mb-1">{metric.label}</span>
               <span className="text-4xl font-light text-text-primary tracking-tighter">{metric.value}</span>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="flex flex-col items-start text-left max-w-[200px]">
               <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-warning mb-1">Target Achievement</span>
               <p className="text-[10px] text-text-secondary leading-tight font-light italic">
                 Impacto directo en el core del negocio mediante ingeniería digital.
               </p>
            </div>
          </motion.div>
        </div>
      </div>


      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
        <ArrowDown size={16} className="text-text-muted" strokeWidth={1} />
      </motion.div>
    </section>
  );
};
