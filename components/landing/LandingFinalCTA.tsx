'use client';

import { motion } from 'framer-motion';
import useOnScreen from '@/hooks/useOnScreen';
import { sectionContainerVariants, itemVariants } from '@/lib/animations/variants';
import WordReveal from './WordReveal';
import { WHATSAPP_HREF, WHATSAPP_NUMBER } from './cta';

export default function LandingFinalCTA() {
  const [ref, isVisible] = useOnScreen({ threshold: 0.25 });

  return (
    <section id="contacto" className="py-32 md:py-44 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
        <div className="hero-tech-grid absolute inset-0 opacity-[0.3]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(10,45,77,0.3),transparent_70%)]" />
      </div>

      <motion.div
        ref={ref}
        variants={sectionContainerVariants}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        className="container mx-auto px-4 lg:px-8 relative z-10 max-w-3xl text-center"
      >
        <motion.span
          variants={itemVariants}
          className="text-[10px] font-mono tracking-[0.4em] uppercase text-text-muted mb-8 block"
        >
          El siguiente paso
        </motion.span>

        <h2 className="text-balance text-4xl md:text-6xl font-light leading-[1.05] tracking-[-0.03em] text-text-primary mb-10">
          <WordReveal text="¿Hablamos de cómo hacer crecer tu marca?" />
        </h2>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-center"
        >
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-primary inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-background text-sm font-medium tracking-wide rounded-sm hover:bg-white/90"
          >
            Hablemos por WhatsApp
          </a>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="mt-6 text-xs font-mono text-text-muted tracking-widest"
        >
          {WHATSAPP_NUMBER} · Bogotá · Buenos Aires
        </motion.p>
      </motion.div>
    </section>
  );
}
