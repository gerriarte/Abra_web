'use client';

import { useTranslations } from 'next-intl';
import Card from '../ui/Card';
import useOnScreen from '@/hooks/useOnScreen';

export default function Method() {
  const t = useTranslations();
  const [titleRef, isTitleVisible] = useOnScreen({ threshold: 0.2 });
  const [p1Ref, isP1Visible] = useOnScreen({ threshold: 0.1 });
  const [p2Ref, isP2Visible] = useOnScreen({ threshold: 0.1 });
  const [p3Ref, isP3Visible] = useOnScreen({ threshold: 0.1 });
  const [p4Ref, isP4Visible] = useOnScreen({ threshold: 0.1 });

  return (
    <section id="method" className="py-32 bg-off">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div ref={titleRef}>
            <h2 className={`text-4xl md:text-5xl font-light text-primary mb-8 text-center tracking-tight transition-all duration-1000 ${isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {t('method.title')}
            </h2>
          </div>

          {/* Quote */}
          <div className="max-w-4xl mx-auto mb-20">
            <blockquote className="text-xl md:text-2xl text-center text-text-secondary font-light leading-relaxed">
              &ldquo;{t('method.quote')}&rdquo;
            </blockquote>
          </div>

          {/* Four Pillars Grid */}
          <div className="grid md:grid-cols-2 gap-12">
            {/* Pillar 1: Branding */}
            <Card hover ref={p1Ref} className={`transition-all duration-700 ${isP1Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="text-sm text-primary-light mb-3 font-light">01</div>
              <h3 className="text-2xl font-light text-primary mb-6">
                {t('method.pillars.pillar1.title')}
              </h3>
              <p className="text-text-secondary mb-6 leading-relaxed font-light">
                {t('method.pillars.pillar1.focus')}
              </p>
              <div className="border-t border-border pt-4">
                <p className="text-sm text-text-muted font-light">
                  {t('method.pillars.pillar1.dataConnection')}
                </p>
              </div>
            </Card>

            {/* Pillar 2: Communications */}
            <Card hover ref={p2Ref} className={`transition-all duration-700 delay-100 ${isP2Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="text-sm text-primary-light mb-3 font-light">02</div>
              <h3 className="text-2xl font-light text-primary mb-6">
                {t('method.pillars.pillar2.title')}
              </h3>
              <p className="text-text-secondary mb-6 leading-relaxed font-light">
                {t('method.pillars.pillar2.focus')}
              </p>
              <div className="border-t border-border pt-4">
                <p className="text-sm text-text-muted font-light">
                  {t('method.pillars.pillar2.dataConnection')}
                </p>
              </div>
            </Card>

            {/* Pillar 3: Digital Marketing */}
            <Card hover ref={p3Ref} className={`transition-all duration-700 delay-200 ${isP3Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="text-sm text-primary-light mb-3 font-light">03</div>
              <h3 className="text-2xl font-light text-primary mb-6">
                {t('method.pillars.pillar3.title')}
              </h3>
              <p className="text-text-secondary mb-6 leading-relaxed font-light">
                {t('method.pillars.pillar3.focus')}
              </p>
              <div className="border-t border-border pt-4">
                <p className="text-sm text-text-muted font-light">
                  {t('method.pillars.pillar3.dataConnection')}
                </p>
              </div>
            </Card>

            {/* Pillar 4: Web Development */}
            <Card hover ref={p4Ref} className={`transition-all duration-700 delay-300 ${isP4Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="text-sm text-primary-light mb-3 font-light">04</div>
              <h3 className="text-2xl font-light text-primary mb-6">
                {t('method.pillars.pillar4.title')}
              </h3>
              <p className="text-text-secondary mb-6 leading-relaxed font-light">
                {t('method.pillars.pillar4.focus')}
              </p>
              <div className="border-t border-border pt-4">
                <p className="text-sm text-text-muted font-light">
                  {t('method.pillars.pillar4.dataConnection')}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

