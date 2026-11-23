'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ButtonLink } from './ui';

const HERO_THRESHOLD_PX = 600;

/** CTA flotante al autodiagnóstico: aparece después del hero y se oculta en la sección de recursos (que ya lo enlaza). */
export function FloatingDiagnosticCta() {
  const t = useTranslations('JudgmentAudit.floatingCta');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let pastHero = false;
    let inResources = false;
    const update = () => setVisible(pastHero && !inResources);

    const onScroll = () => {
      pastHero = window.scrollY > HERO_THRESHOLD_PX;
      update();
    };

    const resources = document.getElementById('recursos');
    const observer = resources
      ? new IntersectionObserver(([entry]) => {
          inResources = entry.isIntersecting;
          update();
        })
      : null;
    if (resources && observer) observer.observe(resources);

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer?.disconnect();
    };
  }, []);

  return (
    <div className={`ja-float-cta${visible ? ' ja-float-cta--on' : ''}`} inert={!visible}>
      <ButtonLink href="/es/judgment-audit/autodiagnostico" className="ja-float-cta__btn">
        {t('label')}
      </ButtonLink>
    </div>
  );
}
