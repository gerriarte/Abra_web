'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import useOnScreen from '@/hooks/useOnScreen';
import { sectionContainerVariants, itemVariants } from '@/lib/animations/variants';
import WordReveal from './WordReveal';

// FAQ en el tono afirmativo del brief (docs/faq.md + sugerencias del mismo registro).
// Prohibido el encuadre comparativo/negativo: hablamos de lo que se puede lograr.
const FAQS = [
  {
    q: '¿Por qué debería confiarles mis redes si ustedes no tienen millones de seguidores?',
    a: 'Porque medimos lo que hace crecer un negocio —ventas, leads y retorno—, no seguidores. Un perfil puede tener millones de seguidores y no vender nada; la cantidad de seguidores es una métrica de vanidad, no de resultados. Nuestra energía va a los números de nuestros clientes. El número que nos importa es el de tu facturación, no el de nuestros likes.',
  },
  {
    q: 'Si son expertos en pauta, ¿por qué no se anuncian por todos lados?',
    a: 'Porque aplicamos a nosotros mismos la misma disciplina que aplicamos a tu marca: invertir cada peso en el canal que más retorno da. Para una agencia como la nuestra, ese canal son los resultados y las recomendaciones de nuestros clientes. Saber cuándo conviene pautar —y cuándo no— es parte del expertise: con nosotros, tu presupuesto va a anuncios que mueven el negocio, no a aparecer por aparecer.',
  },
  {
    q: '¿Y por qué no salen primeros en Google en todo?',
    a: 'Por la misma razón: priorizamos. El posicionamiento es una inversión de tiempo que dirigimos a donde genera negocio. Cuando trabajamos tu marca, definimos juntos qué búsquedas valen la pena para tu negocio y vamos por esas, en lugar de perseguir rankings que se ven bien pero no traen clientes.',
  },
  {
    q: 'Entonces, ¿cómo sé que son buenos?',
    a: 'Por los resultados de quienes ya confiaron en nosotros. La mejor prueba de una agencia de growth no es su propio perfil: son los números de sus clientes. Mirá los casos.',
  },
  // — Sugerencias adicionales, mismo tono afirmativo —
  {
    q: '¿Cómo es el primer paso para trabajar juntos?',
    a: 'Empezamos con una conversación. Entendemos tu negocio, tus números y tu oportunidad, y te mostramos cómo se vería el sistema de crecimiento aplicado a tu marca. De ahí sale un plan concreto, con prioridades claras y un punto de partida medible desde la primera semana.',
  },
  {
    q: '¿En cuánto tiempo se ven resultados?',
    a: 'Las primeras señales —pipeline en movimiento, datos limpios, campañas optimizándose— aparecen en las primeras semanas. El crecimiento sostenido se construye vuelta a vuelta del Loop: cada ciclo deja tu marca con más datos, más activos y más velocidad. Trabajamos para que cada mes arranque desde más arriba que el anterior.',
  },
  {
    q: '¿Trabajan con mi industria?',
    a: 'El sistema es el mismo; lo que cambia es cómo lo calibramos a tu mercado. Hemos aplicado el Loop en industrias muy distintas —de productos físicos a servicios B2B y e-commerce— porque medimos negocio, no vanidad. En la primera conversación validamos juntos cómo encaja en tu sector.',
  },
  {
    q: 'Ya tengo equipo o agencia de marketing. ¿Igual tiene sentido?',
    a: 'Sí. Nos integramos donde sumamos: estrategia, ejecución técnica, IA o la medición que cierra el Loop. Potenciamos lo que ya funciona y ponemos rigor donde hace falta. El objetivo no es reemplazar por reemplazar, sino que tus números crezcan.',
  },
];

export default function LandingFAQ() {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-28 md:py-36 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(10,45,77,0.15),transparent_65%)] pointer-events-none" aria-hidden />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-4xl">
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
              Preguntas frecuentes
            </motion.span>
            <h2 className="text-balance text-3xl md:text-5xl font-light leading-[1.1] tracking-[-0.02em] text-text-primary mb-6">
              <WordReveal text="Lo que solemos aclarar antes de empezar." />
            </h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-text-secondary font-light leading-relaxed"
            >
              Hablamos claro desde el primer día. Acá las preguntas que más nos hacen —
              y cómo las respondemos.
            </motion.p>
          </div>

          {/* Lista de FAQs */}
          <div className="divide-y divide-white/[0.06] border-t border-b border-white/[0.06]">
            {FAQS.map((item, i) => {
              const isOpen = open === i;
              return (
                <motion.div key={item.q} variants={itemVariants}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="group w-full flex items-start gap-5 py-7 text-left transition-colors duration-300 hover:bg-white/[0.015] -mx-4 px-4 rounded-sm"
                  >
                    <span className="text-xs font-mono text-text-muted/60 tabular-nums shrink-0 pt-1.5 w-8">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="flex-1 text-lg md:text-xl font-light text-text-primary tracking-tight">
                      {item.q}
                    </h3>
                    <Plus
                      size={20}
                      className={`shrink-0 mt-1 text-text-muted transition-transform duration-300 ${
                        isOpen ? 'rotate-45 text-text-primary' : 'group-hover:text-text-secondary'
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pl-[3.25rem] pr-10 pb-8 text-base text-text-secondary font-light leading-relaxed max-w-2xl">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
