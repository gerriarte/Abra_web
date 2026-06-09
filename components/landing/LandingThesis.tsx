'use client';

import { motion } from 'framer-motion';
import useOnScreen from '@/hooks/useOnScreen';
import { sectionContainerVariants, itemVariants } from '@/lib/animations/variants';
import WordReveal from './WordReveal';

export default function LandingThesis() {
  const [ref, isVisible] = useOnScreen({ threshold: 0.2 });

  return (
    <section id="tesis" className="py-28 md:py-36 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(10,45,77,0.18),transparent_70%)] pointer-events-none" aria-hidden />

      <motion.div
        ref={ref}
        variants={sectionContainerVariants}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        className="container mx-auto px-4 lg:px-8 relative z-10 max-w-4xl text-center"
      >
        <motion.span
          variants={itemVariants}
          className="text-[10px] font-mono tracking-[0.4em] uppercase text-text-muted mb-8 block"
        >
          Nuestra tesis
        </motion.span>

        <h2 className="text-balance text-3xl md:text-5xl font-light leading-[1.1] tracking-[-0.02em] text-text-primary mb-8">
          <WordReveal text="Creemos que el crecimiento se construye." />
        </h2>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl font-light leading-relaxed text-text-secondary max-w-2xl mx-auto"
        >
          Cuando la estrategia, la ejecución y la IA viven en un mismo equipo, las ideas se
          vuelven resultados rápido. A:BRA Latam existe para convertir la oportunidad que abre la IA
          en crecimiento <span className="text-text-primary">real, medible y sostenido</span> para tu marca.
        </motion.p>

        <motion.div variants={itemVariants} className="mt-12 flex justify-center">
          <span className="h-px w-16 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
