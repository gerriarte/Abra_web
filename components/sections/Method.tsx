'use client';

import { useTranslations } from 'next-intl';
import Card from '../ui/Card';
import useOnScreen from '@/hooks/useOnScreen';

const pillarIcons = [
  (
    <svg className="w-9 h-9 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-6l3-2 3 2v6M9 17h6M9 9l3-2 3 2M9 9v8M15 9v8M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  (
    <svg className="w-9 h-9 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12m-12 3H12m-3.75 3h12m-12 3H12m-4.5-9l-3 3m0 0 3 3m-3-3H8.25" />
    </svg>
  ),
  (
    <svg className="w-9 h-9 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h8m-8 5h18" />
    </svg>
  ),
  (
    <svg className="w-9 h-9 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 5.25h15m-15 4.5h15m-15 4.5H12m-7.5 4.5H12" />
    </svg>
  ),
];

const pillarKeys = [
  'method.pillars.pillar1',
  'method.pillars.pillar2',
  'method.pillars.pillar3',
  'method.pillars.pillar4',
];

export default function Method() {
  const t = useTranslations();
  const [titleRef, isTitleVisible] = useOnScreen({ threshold: 0.2 });
  const [quoteRef, isQuoteVisible] = useOnScreen({ threshold: 0.15 });
  const [gridRef, isGridVisible] = useOnScreen({ threshold: 0.1 });

  return (
    <section id="method" className="py-20 bg-off">
      <div className="container mx-auto px-4 max-w-full">
        <div className="max-w-6xl mx-auto text-center w-full overflow-x-hidden">
          <div ref={titleRef}>
            <h2
              className={`text-4xl md:text-5xl font-light text-primary tracking-tight transition-all duration-700 ${
                isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {t('method.title')}
            </h2>
          </div>

          <div ref={quoteRef} className="mt-6 mb-12">
            <blockquote
              className={`text-lg md:text-xl text-text-secondary font-light leading-relaxed max-w-3xl mx-auto transition-all duration-700 delay-150 ${
                isQuoteVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              &ldquo;{t('method.quote')}&rdquo;
            </blockquote>
          </div>

          <div
            ref={gridRef}
            className={`grid gap-6 md:grid-cols-2 xl:grid-cols-4 text-left transition-all duration-700 ease-out ${
              isGridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {pillarKeys.map((key, index) => (
              <Card
                key={key}
                hover
                className="rounded-3xl border border-primary-light/15 shadow-sm shadow-primary-light/10 px-6 py-8 bg-white/90 flex flex-col gap-5"
              >
                <div className="flex items-center justify-between text-primary">
                  <span className="text-sm font-light">{`0${index + 1}`}</span>
                  <span className="rounded-full bg-accent/10 p-3">{pillarIcons[index]}</span>
                </div>
                <h3 className="text-xl font-light text-primary leading-snug">{t(`${key}.title`)}</h3>
                <p className="text-sm md:text-base text-text-secondary/80 font-light leading-relaxed">
                  {t(`${key}.focus`)}
                </p>
                <p className="text-xs md:text-sm text-text-muted/90 font-light border-t border-border pt-3">
                  {t(`${key}.dataConnection`)}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

