'use client';

import { motion } from 'framer-motion';
import useOnScreen from '@/hooks/useOnScreen';
import { sectionContainerVariants, itemVariants } from '@/lib/animations/variants';

const CAPABILITIES = [
  {
    title: 'Estrategia & Growth',
    role: 'El plan y el sistema de crecimiento.',
  },
  {
    title: 'Paid Media',
    role: 'Pauta optimizada con datos, no por corazonada.',
  },
  {
    title: 'Social & Contenido',
    role: 'Presencia que construye demanda.',
  },
  {
    title: 'Analítica avanzada',
    role: 'La medición que cierra el Loop.',
  },
  {
    title: 'Captación B2B (outbound)',
    role: 'El motor de pipeline.',
  },
] as const;

export default function LandingCapabilities() {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

  return (
    <section id="capacidades" className="py-28 md:py-36 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-5xl">
        <motion.div
          ref={ref}
          variants={sectionContainerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <div className="max-w-3xl mb-16">
            <motion.span
              variants={itemVariants}
              className="text-[10px] font-mono tracking-[0.4em] uppercase text-text-muted mb-6 block"
            >
              Qué hacemos
            </motion.span>
            <motion.h2
              variants={itemVariants}
              className="text-balance text-3xl md:text-5xl font-light leading-[1.1] tracking-[-0.02em] text-text-primary mb-6"
            >
              Capacidades que cuelgan del Loop.
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-text-secondary font-light leading-relaxed"
            >
              Cada pieza encaja en el sistema. Activás las que tu marca necesita hoy y
              sumás el resto a medida que el ciclo gana velocidad.
            </motion.p>
          </div>

          {/* Lista */}
          <div className="divide-y divide-white/[0.06] border-t border-b border-white/[0.06]">
            {CAPABILITIES.map((cap, i) => (
              <motion.div
                key={cap.title}
                variants={itemVariants}
                className="group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8 py-7 transition-colors duration-300 hover:bg-white/[0.015] -mx-4 px-4 rounded-sm"
              >
                <span className="text-xs font-mono text-text-muted/60 tabular-nums shrink-0 w-8">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-xl md:text-2xl font-light text-text-primary tracking-tight group-hover:translate-x-1 transition-transform duration-300 sm:w-72 shrink-0">
                  {cap.title}
                </h3>
                <p className="text-base text-text-secondary font-light leading-relaxed">
                  {cap.role}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
