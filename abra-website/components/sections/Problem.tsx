'use client';

import { useTranslations } from 'next-intl';
import Card from '../ui/Card';
import useOnScreen from '@/hooks/useOnScreen';

export default function Problem() {
  const t = useTranslations();
  const [titleRef, isTitleVisible] = useOnScreen({ threshold: 0.2 });
  const [introRef, isIntroVisible] = useOnScreen({ threshold: 0.2 });
  const [cardsRef, isCardsVisible] = useOnScreen({ threshold: 0.1 });

  return (
    <section id="problem" className="py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div ref={titleRef}>
            <h2 className={`text-4xl md:text-5xl font-light text-primary mb-8 text-center tracking-tight transition-all duration-1000 ${isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {t('problem.title')}
            </h2>
          </div>

          {/* Intro Paragraph */}
          <div ref={introRef}>
            <p className={`text-xl text-text-secondary mb-20 text-center max-w-3xl mx-auto font-light leading-relaxed transition-all duration-1000 delay-200 ${isIntroVisible ? 'opacity-100' : 'opacity-0'}`}>
              {t('problem.intro')}
            </p>
          </div>

          {/* Subtitle */}
          <h3 className="text-2xl font-light text-primary mb-20 text-center">
            {t('problem.subtitle')}
          </h3>

          {/* Pain Points Vertical Layout */}
          <div ref={cardsRef} className="space-y-16">
            {/* Problem 1: Unstable Brand */}
            <div className={`flex flex-col md:flex-row items-center gap-8 transition-all duration-1000 ${isCardsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              {/* Visual - Using gradient as placeholder for image */}
              <div className="flex-shrink-0 w-full md:w-80 h-64 bg-gradient-to-br from-primary-light/20 to-primary-light/5 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-48 h-48 text-primary-light" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="text-sm text-primary-light mb-3 font-light">01</div>
                <h4 className="text-2xl font-light text-primary mb-4">
                  {t('problem.points.unstableBrand').split(':')[0]}
                </h4>
                <p className="text-lg text-text-secondary leading-relaxed font-light">
                  {t('problem.points.unstableBrand').split(':')[1].trim()}
                </p>
              </div>
            </div>

            {/* Problem 2: Erratic Marketing */}
            <div className={`flex flex-col md:flex-row-reverse items-center gap-8 transition-all duration-1000 delay-200 ${isCardsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              {/* Visual */}
              <div className="flex-shrink-0 w-full md:w-80 h-64 bg-gradient-to-bl from-primary-light/20 to-primary-light/5 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-48 h-48 text-primary-light" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
              </div>
              
              <div className="flex-1 text-right md:text-left">
                <div className="text-sm text-primary-light mb-3 font-light">02</div>
                <h4 className="text-2xl font-light text-primary mb-4">
                  {t('problem.points.erraticMarketing').split(':')[0]}
                </h4>
                <p className="text-lg text-text-secondary leading-relaxed font-light">
                  {t('problem.points.erraticMarketing').split(':')[1].trim()}
                </p>
              </div>
            </div>

            {/* Problem 3: Web Bottleneck */}
            <div className={`flex flex-col md:flex-row items-center gap-8 transition-all duration-1000 delay-400 ${isCardsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              {/* Visual */}
              <div className="flex-shrink-0 w-full md:w-80 h-64 bg-gradient-to-br from-primary-light/20 to-primary-light/5 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-48 h-48 text-primary-light" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="text-sm text-primary-light mb-3 font-light">03</div>
                <h4 className="text-2xl font-light text-primary mb-4">
                  {t('problem.points.webBottleneck').split(':')[0]}
                </h4>
                <p className="text-lg text-text-secondary leading-relaxed font-light">
                  {t('problem.points.webBottleneck').split(':')[1].trim()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

