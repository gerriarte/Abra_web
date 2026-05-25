'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import useOnScreen from '@/hooks/useOnScreen';
import { SectionFlowLine } from '@/components/ui/SectionFlowLine';

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
      <div className="absolute inset-x-0 bottom-0 top-0 z-0 pointer-events-none overflow-hidden mask-spatial-grid opacity-30">
        <div className="spatial-grid" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2 variants={itemVariants} className="text-balance mb-8">
            {t('title')}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-text-secondary mb-12 leading-relaxed font-light"
          >
            {t('description')}
          </motion.p>

          <motion.div variants={itemVariants} className="mb-12">
            <SectionFlowLine variant="short" />
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-10 py-5 bg-white text-background text-sm font-medium tracking-wide rounded-sm transition-all duration-300 hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98]"
            >
              {t('ctaPrimary')}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
