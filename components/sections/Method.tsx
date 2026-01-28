'use client';

import { useTranslations } from 'next-intl';
import useOnScreen from '@/hooks/useOnScreen';
import { FadeIn } from '../cases/ui/FadeIn';

const pillarIcons = [
  // Branding - Blueprint icon
  <svg key="p1" viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 3h18v18H3V3z" strokeDasharray="2 2" />
    <path d="M12 3v18M3 12h18" />
    <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.1" />
  </svg>,
  // Strategy - Flow icon
  <svg key="p2" viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 4h6v6H4V4zM14 14h6v6h-6v-6z" />
    <path d="M10 7h2a2 2 0 012 2v5" />
    <circle cx="20" cy="20" r="1" fill="currentColor" />
  </svg>,
  // Marketing - Rocket/Growth icon (Geometric)
  <svg key="p3" viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 3l9 18H3L12 3z" />
    <path d="M12 3v18" />
    <path d="M7 14h10" />
  </svg>,
  // Web - Terminal icon
  <svg key="p4" viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 5h18v14H3V5z" />
    <path d="M7 12l2 2-2 2M11 15h6" />
  </svg>,
];

const pillarKeys = [
  'method.pillars.pillar1',
  'method.pillars.pillar2',
  'method.pillars.pillar3',
  'method.pillars.pillar4',
];

export default function Method() {
  const t = useTranslations();
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

  return (
    <section id="method" className="pt-20 pb-[100px] bg-off overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div ref={ref} className="max-w-4xl mx-auto text-center mb-20">
          <FadeIn>
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-accent mb-4 block">
              {t('nav.method')}
            </span>
            <h2 className="text-4xl md:text-6xl font-light text-[#04213B] tracking-tight mb-8">
              {t('method.title')}
            </h2>
            <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed">
              {t('method.quote')}
            </p>
          </FadeIn>
        </div>

        {/* Framework Grid */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[40px] left-0 w-full h-px bg-gray-200 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {pillarKeys.map((key, index) => (
              <FadeIn key={key} delay={index * 150}>
                <div className="group h-full flex flex-col bg-white border border-gray-100 rounded-2xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden">

                  {/* Step Indicator & Icon */}
                  <div className="p-8 pb-4 flex items-center justify-between">
                    <div className="w-10 h-10 rounded-full bg-[#04213B] text-white flex items-center justify-center text-xs font-bold ring-8 ring-off">
                      {`0${index + 1}`}
                    </div>
                    <div className="text-accent transition-transform duration-500 group-hover:scale-110">
                      {pillarIcons[index]}
                    </div>
                  </div>

                  {/* Core Content */}
                  <div className="p-8 pt-4 flex-1">
                    <h3 className="text-xl font-medium text-[#04213B] mb-4 group-hover:text-accent transition-colors">
                      {t(`${key}.title`)}
                    </h3>
                    <p className="text-sm text-gray-500 font-light leading-relaxed mb-6">
                      {t(`${key}.focus`)}
                    </p>
                  </div>

                  {/* Technical/Data Layer (The "Framework" Output) */}
                  <div className="bg-[#F8F9FA] p-6 border-t border-gray-50">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">
                        Data Validation Layer
                      </span>
                    </div>
                    <p className="text-xs text-[#04213B]/70 font-light leading-relaxed font-mono">
                      {t(`${key}.dataConnection`)}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
