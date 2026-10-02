import { useTranslations } from 'next-intl';
import { ButtonLink, Eyebrow } from './ui';

export function Objective() {
  const t = useTranslations('JudgmentAudit.objective');
  return (
    <section id="objetivo" className="ja-section ja-section--surface">
      <div className="ja-wrap">
        <div className="abra-card ja-objective abra-reveal">
          <div className="ja-stack" style={{ maxWidth: 720 }}>
            <Eyebrow>{t('eyebrow')}</Eyebrow>
            <p className="ja-objective__title">{t.rich('title', { strong: (c) => <strong>{c}</strong> })}</p>
            <p className="abra-lead">{t('lead')}</p>
          </div>
          <ButtonLink href="#agendar">{t('cta')}</ButtonLink>
        </div>
      </div>
    </section>
  );
}
