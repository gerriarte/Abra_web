'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import useOnScreen from '@/hooks/useOnScreen';
import { SectionFlowLine } from '@/components/ui/SectionFlowLine';

export default function Hero() {
  const t = useTranslations('hero');
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.21, 0.47, 0.32, 0.98] as const,
      },
    },
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="spatial-grid opacity-[0.03]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 30% 50%, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)',
          }}
        />
        <div className="absolute top-[15%] left-[10%] w-[60%] h-[60%] bg-accent/5 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[5%] right-[5%] w-[45%] h-[45%] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="max-w-5xl"
        >
          <motion.div variants={itemVariants} className="mb-10">
            <span className="text-[9px] font-mono uppercase tracking-[0.6em] text-text-muted border-l border-white/20 pl-4 py-1">
              {t('eyebrow')}
            </span>
            <SectionFlowLine className="mt-8" variant="short" />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-8xl lg:text-9xl font-light leading-[0.9] tracking-tight mb-12"
            style={{ textShadow: '0 2px 28px rgba(0,0,0,0.3), 0 0 80px rgba(0,0,0,0.15)' }}
          >
            {t('title')}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl font-light leading-relaxed max-w-3xl mb-16"
            style={{ textShadow: '0 1px 12px rgba(0,0,0,0.3)', color: 'rgba(255,255,255,0.85)' }}
          >
            {t('subtitle')}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 items-start sm:items-center"
          >
            <a
              href="#loop-pdf"
              className="group relative px-10 py-5 bg-white text-background font-medium rounded-full overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] active:scale-95"
            >
              <span className="relative z-10">{t('ctaPrimary')}</span>
              <div className="absolute inset-0 bg-primary translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
            </a>

            <a
              href="#method"
              className="group flex items-center gap-3 px-10 py-5 text-text-primary font-light rounded-full border border-white/10 hover:bg-white/5 transition-all duration-300"
            >
              <span>{t('ctaSecondary')}</span>
              <span className="group-hover:translate-x-2 transition-transform duration-500">→</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
