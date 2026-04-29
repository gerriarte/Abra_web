'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import useOnScreen from '@/hooks/useOnScreen';

export default function Laboratory() {
  const t = useTranslations('lab');
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const productKeys = ['nougram', 'product2', 'incubating'];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'live': return 'text-primary bg-primary/10 border-primary/20';
      case 'beta': return 'text-accent bg-accent/10 border-accent/20';
      default: return 'text-warning bg-warning/10 border-warning/20';
    }
  };

  return (
    <section id="laboratory" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-7xl">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24 items-end">
            <div>
              <motion.span 
                variants={itemVariants}
                className="text-xs font-mono tracking-[0.3em] uppercase text-text-muted mb-4 block"
              >
                {t('eyebrow')}
              </motion.span>
              <motion.h2 
                variants={itemVariants}
                className="text-balance"
              >
                {t('title')}
              </motion.h2>
            </div>
            <motion.div variants={itemVariants}>
              <p className="text-lg text-text-secondary font-light leading-relaxed max-w-xl">
                {t('body')}
              </p>
            </motion.div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {productKeys.map((key) => (
              <motion.div
                key={key}
                variants={itemVariants}
                className="group p-8 rounded-3xl bg-background border border-white/5 hover:border-primary/30 transition-all duration-500 flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-12">
                   <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-500">
                      <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(0,122,255,0.5)]" />
                   </div>
                   <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded border ${getStatusColor(t(`products.${key}.status`))}`}>
                     {t(`products.${key}.status`)}
                   </span>
                </div>

                <div className="flex-1 space-y-4">
                  <h3 className="text-2xl font-medium text-text-primary tracking-tight group-hover:text-primary transition-colors">
                    {t(`products.${key}.title`)}
                  </h3>
                  <p className="text-sm text-text-secondary font-light leading-relaxed">
                    {t(`products.${key}.description`)}
                  </p>
                </div>

                <div className="pt-8">
                  {/* Robust check for translation existence */}
                  {t.raw(`products.${key}.cta`) && typeof t.raw(`products.${key}.cta`) === 'string' ? (
                    <a href="#" className="inline-flex items-center gap-2 text-xs font-medium text-text-primary hover:text-primary transition-colors">
                      {t(`products.${key}.cta`)}
                    </a>
                  ) : (
                    <div className="h-4" /> 
                  )}
                </div>

              </motion.div>
            ))}
          </div>

          {/* Microcopy / Closing footer */}
          <motion.div 
            variants={itemVariants}
            className="mt-20 pt-12 border-t border-white/5"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <p className="text-xs text-text-muted italic max-w-2xl">
                {t('microcopy')}
              </p>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-mono text-primary uppercase tracking-[0.2em]">Validated by AI</span>
                <div className="w-px h-4 bg-white/10" />
                <span className="text-[10px] font-mono text-accent uppercase tracking-[0.2em]">Handcrafted</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
