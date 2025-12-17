'use client';

import { useTranslations } from 'next-intl';
import useOnScreen from '@/hooks/useOnScreen';

export default function Result() {
  const t = useTranslations();
  const [ref, isVisible] = useOnScreen({ threshold: 0.2 });

  return (
    <section id="result" className="py-32 bg-primary overflow-x-hidden">
      <div className="container mx-auto px-4 max-w-full">
        <div ref={ref} className="max-w-4xl mx-auto text-center w-full">
          {/* Section Title */}
          <h2 className={`text-4xl md:text-5xl font-light text-white mb-8 tracking-tight transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {t('result.title')}
          </h2>

          {/* Description */}
          <p className={`text-xl md:text-2xl text-white/90 mb-12 leading-relaxed font-light transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {t('result.description')}
          </p>

          {/* CTA Button */}
          <div className={`flex justify-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <button className="bg-white text-primary hover:bg-accent hover:text-white transition-colors px-8 py-4 text-lg font-light">
              {t('result.cta')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

