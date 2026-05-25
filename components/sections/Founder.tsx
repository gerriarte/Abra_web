'use client';

import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import useOnScreen from '@/hooks/useOnScreen';
import Link from 'next/link';

export default function Founder() {
  const t = useTranslations('founder');
  const locale = useLocale();
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
    <section id="founder" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-7xl">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.span
            variants={itemVariants}
            className="text-[9px] font-mono tracking-[0.5em] uppercase text-text-muted mb-6 block"
          >
            {t('eyebrow')}
          </motion.span>

          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-light tracking-tight mb-8">
            {t('title')}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg text-text-secondary font-light leading-relaxed mb-10"
          >
            {t('body')}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={`/${locale}/gerardo-riarte`}
              className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-background transition hover:bg-white/90"
            >
              {t('ctaPersonal')}
            </Link>
            <a
              href="https://www.linkedin.com/in/gerardoriarte/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 px-8 py-3.5 text-sm font-medium text-white/90 transition hover:bg-white/10"
            >
              {t('ctaLinkedin')}
            </a>
            <a
              href="https://instagram.com/gerardoriarte"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 px-8 py-3.5 text-sm font-medium text-white/90 transition hover:bg-white/10"
            >
              {t('ctaInstagram')}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
