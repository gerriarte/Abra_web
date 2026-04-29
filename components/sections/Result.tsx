'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import useOnScreen from '@/hooks/useOnScreen';

export default function Result() {
  const t = useTranslations('result');
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98] as const,
      },
    },
  };

  return (
    <section id="result" className="py-32 relative overflow-hidden border-t border-white/5">
      {/* 3D Spatial Grid Background */}
      <div className="absolute inset-x-0 bottom-0 top-0 z-0 pointer-events-none overflow-hidden mask-spatial-grid opacity-30">
        <div className="spatial-grid" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Section Title */}
          <motion.h2 
            variants={itemVariants}
            className="text-balance mb-8"
          >
            {t('title')}
          </motion.h2>

          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-text-secondary mb-12 leading-relaxed font-light"
          >
            {t('description')}
          </motion.p>

          {/* CTAs */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <a
              href="#loop-pdf"
              className="group relative px-10 py-5 bg-white text-background font-medium rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span className="relative z-10">{t('ctaPrimary')}</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
            </a>
            
            <a
              href="#contact"
              className="px-10 py-5 text-text-primary font-light rounded-full border border-white/10 hover:bg-white/5 transition-all duration-300 active:scale-95"
            >
              {t('ctaSecondary')}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
