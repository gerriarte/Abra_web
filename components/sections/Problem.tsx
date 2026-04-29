'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import useOnScreen from '@/hooks/useOnScreen';

export default function Problem() {
  const t = useTranslations('problem');
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

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

  const cards = ['01', '02', '03'];

  return (
    <section id="problem" className="py-32 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-7xl">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="max-w-4xl mb-24">
            <motion.span 
              variants={itemVariants}
              className="text-xs font-mono tracking-[0.3em] uppercase text-text-muted mb-4 block"
            >
              {t('eyebrow')}
            </motion.span>
            <motion.h2 
              variants={itemVariants}
              className="text-balance mb-8"
            >
              {t('title')}
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-text-secondary font-light leading-relaxed max-w-3xl"
            >
              {t('body')}
            </motion.p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cards.map((key) => (
              <motion.div
                key={key}
                variants={itemVariants}
                className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.08] hover:border-primary/30 transition-all duration-500"
              >
                {/* Status Indicator */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 rounded-full bg-warning animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-warning/80">Pain Point</span>
                </div>

                <h3 className="text-xl font-medium text-text-primary mb-4 group-hover:text-primary transition-colors duration-300">
                  {t(`cards.${key}.title`)}
                </h3>
                
                <p className="text-sm text-text-secondary font-light leading-relaxed">
                  {t(`cards.${key}.description`)}
                </p>

                {/* Decorative background number */}
                <span className="absolute bottom-4 right-6 text-6xl font-bold text-white/[0.02] select-none group-hover:text-primary/10 transition-colors duration-500">
                  {key}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Bottom Callout */}
          <motion.div 
            variants={itemVariants}
            className="mt-20 flex justify-center"
          >
            <div className="px-6 py-3 rounded-full border border-primary/10 bg-primary/5 backdrop-blur-sm">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary">
                Análisis de Cuello de Botella Detectado
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
