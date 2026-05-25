'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import useOnScreen from '@/hooks/useOnScreen';
import { SectionFlowLine } from '@/components/ui/SectionFlowLine';

const NOUGRAM_URL = 'https://nougram.co';

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

  const highlights = ['01', '02', '03'] as const;

  return (
    <section id="laboratory" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-7xl">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-end">
            <div>
              <motion.span
                variants={itemVariants}
                className="text-xs font-mono tracking-[0.3em] uppercase text-text-muted mb-4 block"
              >
                {t('eyebrow')}
              </motion.span>
              <motion.h2 variants={itemVariants} className="text-balance">
                {t('title')}
              </motion.h2>
            </div>
            <motion.div variants={itemVariants}>
              <p className="text-lg text-text-secondary font-light leading-relaxed max-w-xl">
                {t('body')}
              </p>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="mb-12">
            <SectionFlowLine />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="rounded-[2rem] border border-[#E54D00]/25 bg-[#262537] p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-white/50 mb-3">
                  {t('products.nougram.eyebrow')}
                </p>
                <h3 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
                  {t('products.nougram.title')}
                </h3>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full border border-[#E54D00]/40 bg-[#E54D00]/10 text-[#FFB48A]">
                {t('products.nougram.status')}
              </span>
            </div>

            <p className="text-xl md:text-2xl font-medium leading-snug text-white mb-4">
              {t('products.nougram.headline')}
            </p>
            <p className="text-base text-white/75 font-light leading-relaxed max-w-3xl mb-8">
              {t('products.nougram.description')}
            </p>

            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              {highlights.map((key) => (
                <li
                  key={key}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-white/80 font-light leading-relaxed"
                >
                  {t(`products.nougram.highlights.${key}`)}
                </li>
              ))}
            </ul>

            <a
              href={NOUGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#E54D00] px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-[#f05f18]"
            >
              {t('products.nougram.cta')}
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-12 pt-8 border-t border-white/5">
            <p className="text-xs text-text-muted italic max-w-3xl font-light leading-relaxed">
              {t('microcopy')}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
