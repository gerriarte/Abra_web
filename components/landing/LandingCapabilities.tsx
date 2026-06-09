'use client';

import { motion } from 'framer-motion';
import useOnScreen from '@/hooks/useOnScreen';
import { sectionContainerVariants, itemVariants } from '@/lib/animations/variants';
import WordReveal from './WordReveal';
import useSpotlight from '@/hooks/useSpotlight';

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

function CapabilityRow({ cap, i }: { cap: (typeof CAPABILITIES)[number]; i: number }) {
  const { onMouseMove, background } = useSpotlight(380, 'rgba(255,255,255,0.05)');
  return (
    <motion.div
      variants={itemVariants}
      onMouseMove={onMouseMove}
      className="group relative flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8 py-7 -mx-4 px-4 rounded-sm overflow-hidden"
    >
      <motion.span
        aria-hidden
        style={{ background }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <span className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 h-0 w-px bg-white/50 transition-all duration-500 group-hover:h-2/3" />
      <span className="relative text-xs font-mono text-text-muted/60 tabular-nums shrink-0 w-8">
        {String(i + 1).padStart(2, '0')}
      </span>
      <h3 className="relative text-xl md:text-2xl font-light text-text-primary tracking-tight transition-transform duration-300 group-hover:translate-x-1 sm:w-72 shrink-0">
        {cap.title}
      </h3>
      <p className="relative text-base text-text-secondary font-light leading-relaxed">
        {cap.role}
      </p>
    </motion.div>
  );
}

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
            <h2 className="text-balance text-3xl md:text-5xl font-light leading-[1.1] tracking-[-0.02em] text-text-primary mb-6">
              <WordReveal text="Capacidades que cuelgan del Loop." />
            </h2>
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
              <CapabilityRow key={cap.title} cap={cap} i={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
