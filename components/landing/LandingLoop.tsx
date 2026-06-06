'use client';

import { motion } from 'framer-motion';
import useOnScreen from '@/hooks/useOnScreen';
import { sectionContainerVariants, itemVariants } from '@/lib/animations/variants';

const PHASES = [
  {
    n: '01',
    name: 'Insight',
    description: 'Entendemos el negocio, los datos y la oportunidad.',
  },
  {
    n: '02',
    name: 'Build',
    description: 'Construimos: campañas, contenido, activos, automatización.',
  },
  {
    n: '03',
    name: 'Launch',
    description: 'Lanzamos y ejecutamos de verdad, no en un PDF.',
  },
  {
    n: '04',
    name: 'Learn',
    description: 'Medimos, aprendemos e iteramos. El ciclo vuelve a empezar.',
  },
] as const;

export default function LandingLoop() {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

  return (
    <section id="loop" className="py-28 md:py-36 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-7xl">
        <motion.div
          ref={ref}
          variants={sectionContainerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.span
              variants={itemVariants}
              className="text-[10px] font-mono tracking-[0.4em] uppercase text-text-muted mb-6 block"
            >
              El método · A:BRA Loop
            </motion.span>
            <motion.h2
              variants={itemVariants}
              className="text-balance text-3xl md:text-5xl font-light leading-[1.1] tracking-[-0.02em] text-text-primary mb-6"
            >
              Contratás un sistema que itera, no servicios sueltos.
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-text-secondary font-light leading-relaxed"
            >
              Cuatro fases que se alimentan entre sí. Cada vuelta del ciclo deja tu marca
              con más datos, más activos y más crecimiento.
            </motion.p>
          </div>

          {/* The Loop */}
          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2" aria-hidden />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {PHASES.map((phase) => (
                <motion.div key={phase.n} variants={itemVariants} className="group">
                  <div className="h-full p-8 rounded-3xl bg-surface/40 border border-white/5 hover:border-white/20 transition-all duration-500 flex flex-col items-center text-center backdrop-blur-sm">
                    <div className="mb-7 relative">
                      <div className="w-16 h-16 rounded-full bg-white/[0.04] border border-white/15 flex items-center justify-center text-text-primary font-mono text-lg group-hover:bg-white group-hover:text-background transition-all duration-500">
                        {phase.n}
                      </div>
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-background border border-white/10 rounded text-[10px] font-mono uppercase tracking-widest text-text-muted">
                        {phase.name}
                      </div>
                    </div>
                    <p className="text-sm text-text-secondary font-light leading-relaxed mt-2">
                      {phase.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div variants={itemVariants} className="mt-16 text-center">
            <p className="text-sm text-text-muted italic font-light leading-relaxed max-w-xl mx-auto">
              &ldquo;El ciclo vuelve a empezar — y cada vez arranca desde más arriba.&rdquo;
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Círculos decorativos */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/[0.03] rounded-full pointer-events-none" aria-hidden />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] border border-white/[0.03] rounded-full pointer-events-none" aria-hidden />
    </section>
  );
}
