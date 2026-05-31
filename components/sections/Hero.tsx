'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import useOnScreen from '@/hooks/useOnScreen';
import { heroContainerVariants, itemVariants } from '@/lib/animations/variants';

const LOOP_PHASES = ['metric01', 'metric02', 'metric03', 'metric04'] as const;

export default function Hero() {
  const t = useTranslations('hero');
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[100svh] flex items-center pt-24 pb-16 md:pt-28 md:pb-20 overflow-hidden"
    >
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
        <div className="hero-tech-grid absolute inset-0 opacity-[0.35]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(255,255,255,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_100%_50%,rgba(10,45,77,0.25),transparent_70%)]" />
        <div className="absolute left-0 right-0 top-[42%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="absolute top-28 left-6 md:left-12 w-8 h-8 border-l border-t border-white/15 pointer-events-none hidden md:block" aria-hidden />
      <div className="absolute bottom-16 right-6 md:right-12 w-8 h-8 border-r border-b border-white/15 pointer-events-none hidden md:block" aria-hidden />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-12 items-center">
          <motion.div
            variants={heroContainerVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            className="max-w-3xl"
          >
            {/* Eyebrow */}
            <motion.div variants={itemVariants} className="mb-6 flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-2.5 text-[10px] font-mono uppercase tracking-[0.45em] text-text-muted">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/40 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
                </span>
                {t('eyebrow')}
              </span>
              <span className="hidden sm:block h-3 w-px bg-white/10" />
              <span className="hidden sm:inline text-[10px] font-mono text-text-muted/80 tracking-widest">
                {t('statusLabel')} · <span className="text-text-secondary">{t('statusValue')}</span>
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={itemVariants} className="mb-6">
              <span className="block text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.25rem] font-light leading-[0.95] tracking-[-0.03em] text-text-primary mb-4">
                {t('titleLine1')}
              </span>
              <span className="flex items-center gap-3">
                <span className="h-px w-6 bg-white/20 shrink-0" />
                <span className="text-sm md:text-base font-mono tracking-[0.06em] text-text-muted uppercase">
                  {t('titleLine2')}
                </span>
              </span>
            </motion.h1>

            {/* Subtitle — short, no border treatment */}
            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg font-light leading-relaxed text-text-secondary max-w-md mb-8"
            >
              {t('subtitle')}
            </motion.p>

            {/* Loop phases — solo mobile, en desktop están en el diagrama */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-x-5 gap-y-2 mb-8 lg:hidden">
              {LOOP_PHASES.map((key, index) => (
                <span key={key} className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted/60">
                  <span className="text-white/20">{String(index + 1).padStart(2, '0')}</span>
                  {t(key)}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center"
            >
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-background text-sm font-medium tracking-wide rounded-sm transition-all duration-300 hover:bg-white/90 active:scale-[0.98]"
              >
                {t('ctaPrimary')}
              </a>
              <a
                href="#method"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-light text-text-primary rounded-sm border border-white/15 hover:border-white/30 hover:bg-white/[0.03] transition-all duration-300"
              >
                {t('ctaSecondary')}
                <span className="text-text-muted">→</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Diagrama derecho */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative hidden lg:flex items-center justify-center min-h-[420px]"
            aria-hidden
          >
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 rounded-full border border-white/[0.06]" />
              <div className="absolute inset-[12%] rounded-full border border-dashed border-white/[0.08]" />
              <div className="absolute inset-[24%] rounded-full border border-white/[0.04]" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <p className="text-[10px] font-mono uppercase tracking-[0.5em] text-text-muted">A:BRA Loop</p>
                  <p className="text-4xl font-light tracking-tight text-text-primary/90">360°</p>
                  <p className="text-[10px] font-mono text-text-muted/70">growth × engineering</p>
                </div>
              </div>

              {LOOP_PHASES.map((key, i) => {
                const angle = (i * 90 - 90) * (Math.PI / 180);
                const radius = 46;
                const x = 50 + radius * Math.cos(angle);
                const y = 50 + radius * Math.sin(angle);
                return (
                  <div
                    key={key}
                    className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <div className="rounded-full border border-white/10 bg-background/80 backdrop-blur-sm px-3 py-1.5 text-[9px] font-mono uppercase tracking-wider text-text-secondary whitespace-nowrap">
                      {t(key)}
                    </div>
                  </div>
                );
              })}

              <div className="absolute top-1/2 left-0 right-0 h-px bg-white/[0.06]" />
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/[0.06]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
