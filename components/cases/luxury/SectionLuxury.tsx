'use client';

import React from 'react';
import { motion } from 'framer-motion';
import useOnScreen from '@/hooks/useOnScreen';

interface SectionLuxuryProps {
  id?: string;
  category: string;
  title: string;
  description: string;
  image?: string;
  align?: 'left' | 'right' | 'full-image';
  theme?: 'dark' | 'deep';
  painPoint?: string;
}

export const SectionLuxury: React.FC<SectionLuxuryProps> = ({ 
  id, 
  category, 
  title, 
  description, 
  image, 
  align = 'left',
  theme = 'dark',
  painPoint
}) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

  if (align === 'full-image' && image) {
    return (
      <section 
        id={id}
        ref={ref}
        className="relative min-h-screen flex items-center overflow-hidden bg-background"
      >
        <div className="absolute inset-0 z-0">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover grayscale opacity-40 brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
            className="max-w-2xl"
          >
             <span className="text-[10px] font-mono tracking-[0.5em] uppercase text-text-muted mb-8 block">
               {category}
             </span>
             {painPoint && (
               <div className="mb-6">
                 <span className="text-warning text-[10px] font-mono uppercase tracking-widest px-3 py-1 border border-warning/30 rounded-full bg-warning/5">
                   Dolor: {painPoint}
                 </span>
               </div>
             )}
             <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-8 leading-[0.9]">
               {title}
             </h2>
             <p className="text-xl text-text-secondary font-light leading-relaxed max-w-xl">
               {description}
             </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id={id}
      ref={ref}
      className={`py-32 md:py-48 relative overflow-hidden ${theme === 'deep' ? 'bg-background-off' : 'bg-background'}`}
    >

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center ${align === 'right' ? 'lg:direction-rtl' : ''}`}>
          
          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className={`lg:col-span-6 ${align === 'right' ? 'lg:order-2' : ''}`}
          >
            <span className="text-[10px] font-mono tracking-[0.5em] uppercase text-text-muted mb-8 block">
              {category}
            </span>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-10 leading-[1.1]">
              {title}
            </h2>
            <div className="prose prose-invert prose-lg">
              <p className="text-text-secondary font-light leading-relaxed whitespace-pre-wrap">
                {description}
              </p>
            </div>
          </motion.div>

          {/* Image / Visual */}
          {image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] as const }}
              className={`lg:col-span-6 ${align === 'right' ? 'lg:order-1' : ''}`}
            >
              <div className="relative rounded-[2rem] overflow-hidden border border-white/5 bg-surface/30 backdrop-blur-sm group">
                 <img 
                   src={image} 
                   alt={title} 
                   className="w-full aspect-[4/5] md:aspect-[16/10] object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
