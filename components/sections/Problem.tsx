'use client';

import { useTranslations } from 'next-intl';
import useOnScreen from '@/hooks/useOnScreen';
import { FadeIn } from '../cases/ui/FadeIn';

const problemKeys = [
  'problem.points.unstableBrand',
  'problem.points.erraticMarketing',
  'problem.points.webBottleneck',
];

export default function Problem() {
  const t = useTranslations();
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

  const getContent = (value: string) => {
    const [heading, ...rest] = value.split(':');
    return {
      heading: heading.trim(),
      body: rest.join(':').trim(),
    };
  };

  return (
    <section id="problem" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-light text-[#04213B] tracking-tight mb-8">
              {t('problem.title')}
            </h2>
            <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed mb-12">
              {t('problem.intro')}
            </p>
            <div className="flex flex-col items-center gap-4">
              <span className="text-xs font-bold tracking-[0.4em] uppercase text-accent">
                {t('problem.subtitle')}
              </span>
              <div className="w-px h-16 bg-gradient-to-b from-accent to-transparent" />
            </div>
          </FadeIn>
        </div>

        {/* Modern Flow Map */}
        <div ref={ref} className="relative">
          {/* Background Decoration - Logic Lines */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-gray-100 -translate-y-1/2 hidden lg:block" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
            {problemKeys.map((key, index) => {
              const { heading, body } = getContent(t(key));

              return (
                <FadeIn key={key} delay={index * 200}>
                  <div className="relative group">
                    {/* Flow Connector (Desktop) */}
                    {index < 2 && (
                      <div className="hidden lg:block absolute top-12 -right-10 w-20 h-px bg-accent/20 z-0">
                        <div className="absolute right-0 -top-1 w-2 h-2 rounded-full bg-accent/20" />
                      </div>
                    )}

                    {/* Node Number */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0">
                      <span className="text-[60px] font-bold text-gray-50/80 select-none leading-none">
                        {`0${index + 1}`}
                      </span>
                    </div>

                    {/* Card Content */}
                    <div className="relative z-10 pt-4">
                      <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
                        {/* Status Light */}
                        <div className="w-3 h-3 rounded-full bg-accent shadow-[0_0_10px_rgba(var(--accent-rgb),0.5)] animate-pulse" />

                        <h4 className="text-2xl font-medium text-[#04213B] tracking-tight leading-tight group-hover:text-accent transition-colors duration-300">
                          {heading}
                        </h4>

                        <p className="text-gray-500 font-light leading-relaxed">
                          {body}
                        </p>

                        {/* Decorative Flow Detail */}
                        <div className="pt-4 flex items-center gap-2">
                          <div className="h-px w-8 bg-gray-200" />
                          <div className="w-2 h-2 rounded-full border border-gray-200" />
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          {/* Bottom Logic Path */}
          <div className="mt-20 flex justify-center">
            <FadeIn delay={800}>
              <div className="px-8 py-3 rounded-full border border-accent/10 bg-accent/5 text-accent text-xs font-bold tracking-[0.2em] uppercase">
                Análisis de Cuello de Botella Detectado
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
