'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import useOnScreen from '@/hooks/useOnScreen';
import type { StrategyPillar } from '@/data/cases';

interface SectionLuxuryProps {
  id?: string;
  category: string;
  title: string;
  description: string;
  image?: string;
  align?: 'left' | 'right' | 'full-image';
  theme?: 'dark' | 'deep';
  painPoint?: string;
  points?: string[];
  pillars?: StrategyPillar[];
  imagePosition?: string;
}

export const SectionLuxury: React.FC<SectionLuxuryProps> = ({
  id,
  category,
  title,
  description,
  image,
  align = 'left',
  theme = 'dark',
  painPoint,
  points,
  pillars,
  imagePosition = 'center',
}) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  const scrollRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1.2]);

  if (align === 'full-image' && image) {
    return (
      <section
        id={id}
        ref={scrollRef}
        className="relative min-h-[120vh] flex items-center overflow-hidden bg-background"
      >
        <motion.div style={{ y: springY, scale }} className="absolute inset-0 z-0">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover grayscale opacity-30 brightness-[0.3]" 
            style={{ objectPosition: imagePosition }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        </motion.div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="max-w-2xl"
          >
            <span className="text-[10px] font-mono tracking-[0.5em] uppercase text-text-muted mb-8 block">
              {category}
            </span>
            {painPoint && (
              <div className="mb-6">
                <span className="text-warning text-[10px] font-mono uppercase tracking-widest px-3 py-1 border border-warning/30 rounded-full bg-warning/5">
                  {painPoint}
                </span>
              </div>
            )}
            <h2 className="text-5xl md:text-8xl font-light tracking-tight mb-8 leading-[0.85]">{title}</h2>
            <p className="text-xl text-text-secondary font-light leading-relaxed max-w-xl">{description}</p>
            {points && points.length > 0 && (
              <ul className="mt-10 space-y-4 max-w-xl">
                {points.map((point, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-warning/70" />
                    <span className="text-base md:text-lg text-text-secondary font-light leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      id={id}
      ref={scrollRef}
      className={`py-32 md:py-56 relative overflow-hidden ${theme === 'deep' ? 'bg-background-off' : 'bg-background'}`}
    >
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-center ${align === 'right' ? 'lg:direction-rtl' : ''}`}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className={`lg:col-span-5 ${align === 'right' ? 'lg:order-2' : ''}`}
          >
            <div ref={ref}>
              <span className="text-[10px] font-mono tracking-[0.5em] uppercase text-text-muted mb-8 block">
                {category}
              </span>
              <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-10 leading-[1]">{title}</h2>
              <div className="prose prose-invert prose-lg">
                <p className="text-text-secondary font-light leading-relaxed whitespace-pre-wrap">{description}</p>
              </div>
            </div>
          </motion.div>

          {image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.21, 0.47, 0.32, 0.98] }}
              className={`lg:col-span-7 ${align === 'right' ? 'lg:order-1' : ''}`}
            >
              <div className="relative rounded-[3rem] overflow-hidden border border-white/5 bg-surface/30 backdrop-blur-sm group shadow-[0_60px_100px_-20px_rgba(0,0,0,0.6)]">
                <motion.div
                   whileHover={{ scale: 1.05 }}
                   transition={{ duration: 1.5, ease: "easeOut" }}
                   className="relative"
                >
                  <img
                    src={image}
                    alt={title}
                    className="w-full aspect-[4/5] md:aspect-[16/10] object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[2000ms]"
                    style={{ objectPosition: imagePosition }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                </motion.div>
                
                {/* Floating Element Over Image */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-10 right-10 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hidden md:block"
                >
                   <span className="text-[9px] font-mono uppercase tracking-widest text-text-muted">Design Context</span>
                   <div className="mt-2 h-0.5 w-12 bg-accent" />
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>

        {pillars && pillars.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-[2.5rem] overflow-hidden mt-20 lg:mt-28"
          >
            {pillars.map((pillar) => (
              <div
                key={pillar.number}
                className={`p-10 flex flex-col group transition-colors duration-500 hover:bg-surface/20 ${theme === 'deep' ? 'bg-background' : 'bg-background-off'}`}
              >
                <span className="text-3xl font-light tracking-tighter text-text-muted group-hover:text-accent transition-colors mb-6">
                  {pillar.number}
                </span>
                <h3 className="text-xl font-light tracking-tight text-text-primary mb-4">{pillar.title}</h3>
                <p className="text-sm text-text-secondary font-light leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};
