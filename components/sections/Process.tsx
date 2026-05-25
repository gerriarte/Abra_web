'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import useOnScreen from '@/hooks/useOnScreen';

const steps = ['01', '02', '03', '04'] as const;

export default function Process() {
  const t = useTranslations('process');
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
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
    <section id="process" className="py-32 relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-7xl">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[9px] font-mono tracking-[0.5em] uppercase text-text-muted mb-6 block">
              {t('eyebrow')}
            </span>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight">{t('title')}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((key, index) => (
              <motion.div
                key={key}
                variants={itemVariants}
                transition={{ delay: index * 0.08 }}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
              >
                <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary mb-3">
                  {t(`steps.${key}.period`)}
                </p>
                <h3 className="text-xl font-medium text-text-primary mb-3">{t(`steps.${key}.title`)}</h3>
                <p className="text-sm text-text-secondary font-light leading-relaxed">
                  {t(`steps.${key}.description`)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
