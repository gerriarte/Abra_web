'use client';

import { motion } from 'framer-motion';
import useOnScreen from '@/hooks/useOnScreen';
import { heroContainerVariants, itemVariants } from '@/lib/animations/variants';
import WordReveal from './WordReveal';
import HeroRadar from './HeroRadar';
import { WHATSAPP_HREF } from './cta';
import { CAL_BOOKING_URL } from '@/lib/links';

const LOOP_PHASES = ['Insight', 'Build', 'Launch', 'Learn'] as const;

export default function LandingHero() {
  const [ref, isVisible] = useOnScreen({ threshold: 0.15 });

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[100svh] flex items-center pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden"
    >
      {/* Fondo técnico */}
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
                Growth × IA × Ingeniería
              </span>
              <span className="hidden sm:block h-3 w-px bg-white/10" />
              <span className="hidden sm:inline text-[10px] font-mono text-text-muted/80 tracking-widest">
                Bogotá <span className="text-text-secondary">·</span> Buenos Aires
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="mb-7">
              <WordReveal
                text="Construimos el crecimiento de tu marca."
                className="block text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[4.75rem] font-light leading-[0.98] tracking-[-0.03em] text-text-primary"
              />
              <motion.span variants={itemVariants} className="mt-5 flex items-center gap-3">
                <span className="h-px w-6 bg-white/20 shrink-0" />
                <span className="text-sm md:text-base font-mono tracking-[0.06em] text-text-muted uppercase">
                  Estrategia, ejecución e IA en un solo equipo
                </span>
              </motion.span>
            </h1>

            {/* Subhead */}
            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg font-light leading-relaxed text-text-secondary max-w-xl mb-9"
            >
              A:BRA Latam une estrategia, ejecución técnica e IA en un mismo equipo — el mismo
              que diseña la estrategia escribe el código y lee los datos.
            </motion.p>

            {/* Loop phases — mobile */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-x-5 gap-y-2 mb-9 lg:hidden">
              {LOOP_PHASES.map((phase, index) => (
                <span
                  key={phase}
                  className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted/70"
                >
                  <span className="text-white/25">{String(index + 1).padStart(2, '0')}</span>
                  {phase}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center"
            >
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-primary inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-background text-sm font-medium tracking-wide rounded-sm hover:bg-white/90"
              >
                Hablemos
              </a>
              <a
                href={CAL_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-ghost group inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-light text-text-primary rounded-sm border border-white/15 hover:border-white/30 hover:bg-white/[0.03]"
              >
                Agendá una reunión
                <span className="text-text-muted transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Radar de captación */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative hidden lg:flex items-center justify-center min-h-[420px]"
            aria-hidden
          >
            <HeroRadar />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
