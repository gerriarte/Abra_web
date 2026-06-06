'use client';

import { motion } from 'framer-motion';
import useOnScreen from '@/hooks/useOnScreen';
import { sectionContainerVariants, itemVariants } from '@/lib/animations/variants';
import { CASES_DATA } from '@/data/cases';

// Casos del brief. Métricas tomadas de data/cases.ts (fuente del equipo) — no inventadas.
// Cada caso referencia un slug de cases.ts (metric = primer resultado) o trae datos inline.
type CaseEntry =
  | { slug: keyof typeof CASES_DATA; action: string }
  | { client: string; action: string; metricValue: string; metricLabel: string; href?: string };

const SHORT_ACTION: Record<string, string> = {
  duvyclass: 'Rediseño del flujo de conversión y automatización del ciclo de recompra vía CRM.',
  'praxis-school': 'Tracking full-funnel y rediseño de la landing de ventas, optimizada para móvil.',
  invia: 'Diseño de experiencia de compra y e-commerce en WordPress para +1500 productos en toda Europa.',
};

const CASE_ENTRIES: CaseEntry[] = [
  { slug: 'duvyclass', action: SHORT_ACTION.duvyclass },
  { slug: 'praxis-school', action: SHORT_ACTION['praxis-school'] },
  {
    // INCAP — métrica cualitativa (reemplazar por número real cuando se confirme).
    client: 'Incap',
    action:
      'Modernización y rediseño de identidad, comunicación y estrategia comercial. Junto a MTM Marca tu Marca.',
    metricValue: 'Rebrand',
    metricLabel: 'Identidad + estrategia comercial',
    href: '/es/case-studies/incap',
  },
  { slug: 'invia', action: SHORT_ACTION.invia },
];

const cases = CASE_ENTRIES.map((entry) => {
  if ('slug' in entry) {
    const c = CASES_DATA[entry.slug];
    const headline = c.results[0];
    return {
      key: entry.slug,
      client: c.client,
      action: entry.action,
      metricValue: `${headline.prefix ?? ''}${headline.value}${headline.suffix ?? ''}`,
      metricLabel: headline.label,
      href: undefined as string | undefined,
    };
  }
  return { key: entry.client, ...entry };
});

export default function LandingCases() {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

  return (
    <section id="casos" className="py-28 md:py-36 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(10,45,77,0.15),transparent_65%)] pointer-events-none" aria-hidden />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-6xl">
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
              La prueba
            </motion.span>
            <motion.h2
              variants={itemVariants}
              className="text-balance text-3xl md:text-5xl font-light leading-[1.1] tracking-[-0.02em] text-text-primary mb-6"
            >
              Marcas que ya están creciendo con el Loop.
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-text-secondary font-light leading-relaxed"
            >
              Resultados concretos en industrias distintas — el mismo sistema, aplicado de punta a punta.
            </motion.p>
          </div>

          {/* Grid de casos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cases.map((c) => (
              <motion.article
                key={c.key}
                variants={itemVariants}
                className="group relative p-8 md:p-10 rounded-3xl bg-surface/40 border border-white/5 hover:border-white/20 transition-all duration-500 backdrop-blur-sm flex flex-col"
              >
                <h3 className="text-xl font-medium text-text-primary tracking-tight mb-3">
                  {c.href ? (
                    (() => {
                      const external = c.href.startsWith('http');
                      return (
                        <a
                          href={c.href}
                          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          className="inline-flex items-center gap-2 hover:text-white transition-colors duration-300"
                        >
                          {c.client}
                          <span className="text-text-muted text-sm">{external ? '↗' : '→'}</span>
                        </a>
                      );
                    })()
                  ) : (
                    c.client
                  )}
                </h3>
                <p className="text-sm text-text-secondary font-light leading-relaxed mb-8 flex-1">
                  {c.action}
                </p>
                <div className="flex items-end gap-3 pt-6 border-t border-white/[0.06]">
                  <span className="text-4xl md:text-5xl font-light tracking-tight text-text-primary tabular-nums">
                    {c.metricValue}
                  </span>
                  <span className="text-xs font-mono uppercase tracking-widest text-text-muted pb-2">
                    {c.metricLabel}
                  </span>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.p
            variants={itemVariants}
            className="mt-10 text-xs font-mono text-text-muted/60 tracking-wide"
          >
            Más casos disponibles en una conversación.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
