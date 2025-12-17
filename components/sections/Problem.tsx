'use client';

import { useTranslations } from 'next-intl';
import Card from '../ui/Card';
import useOnScreen from '@/hooks/useOnScreen';

  const icons = [
  (
    <svg className="w-10 h-10 text-accent" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-11a1 1 0 11-2 0 1 1 0 012 0zm-1 2a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clipRule="evenodd"
      />
    </svg>
  ),
  (
    <svg className="w-10 h-10 text-accent" fill="currentColor" viewBox="0 0 20 20">
      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
    </svg>
  ),
  (
    <svg className="w-10 h-10 text-accent" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M4 17a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zm3.293-6.707a1 1 0 011.414 0L10 11.586V4a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  ),
];

const problemKeys = [
  'problem.points.unstableBrand',
  'problem.points.erraticMarketing',
  'problem.points.webBottleneck',
];

export default function Problem() {
  const t = useTranslations();
  const [titleRef, isTitleVisible] = useOnScreen({ threshold: 0.2 });
  const [introRef, isIntroVisible] = useOnScreen({ threshold: 0.2 });
  const [cardsRef, areCardsVisible] = useOnScreen({ threshold: 0.1 });

  const getContent = (value: string) => {
    const [heading, ...rest] = value.split(':');
    return {
      heading,
      body: rest.join(':').trim(),
    };
  };

  return (
    <section id="problem" className="py-20 bg-white overflow-x-hidden">
      <div className="container mx-auto px-4 max-w-full">
        <div className="max-w-5xl mx-auto text-center w-full">
          <div ref={titleRef}>
            <h2
              className={`text-4xl md:text-5xl font-light text-primary tracking-tight transition-all duration-700 ${
                isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {t('problem.title')}
            </h2>
          </div>

          <div ref={introRef}>
            <p
              className={`text-lg md:text-xl text-text-secondary mt-6 mb-10 mx-auto max-w-3xl font-light leading-relaxed transition-all duration-700 delay-150 ${
                isIntroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {t('problem.intro')}
            </p>
          </div>

          <p className="text-base uppercase tracking-[0.3em] text-accent mb-16">
            {t('problem.subtitle')}
          </p>

          <div
            ref={cardsRef}
            className={`grid gap-6 md:grid-cols-3 transition-all duration-700 ease-out ${
              areCardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {problemKeys.map((key, index) => {
              const { heading, body } = getContent(t(key));

              return (
                <Card
                  key={key}
                  className="h-full rounded-3xl border border-primary-light/15 shadow-sm shadow-primary-light/10 flex flex-col items-start gap-4 text-left px-6 py-8 bg-white/90"
                >
                  <div className="flex items-center justify-between w-full text-primary">
                    <span className="text-sm font-light">{`0${index + 1}`}</span>
                    <span className="rounded-full bg-accent/10 p-3">{icons[index]}</span>
                  </div>
                  <h4 className="text-xl font-light text-primary leading-snug">{heading.trim()}</h4>
                  <p className="text-sm md:text-base text-text-secondary/80 font-light leading-relaxed">
                    {body}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

