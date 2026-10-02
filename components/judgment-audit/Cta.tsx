import { useTranslations } from 'next-intl';
import { CtaForm, type CtaFormCopy } from './CtaForm';
import { Eyebrow } from './ui';

export function Cta() {
  const t = useTranslations('JudgmentAudit.cta');
  // Strings are passed as props so the client form doesn't need the intl provider.
  const copy = t.raw('form') as CtaFormCopy;

  return (
    <section id="agendar" className="ja-cta">
      <div className="ja-wrap ja-cta__grid">
        <div className="ja-stack abra-reveal" style={{ ['--ja-gap' as string]: '24px' }}>
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <p className="ja-cta__title">
            {t.rich('title', { accent: (c) => <span className="ja-cta__accent">{c}</span> })}
          </p>
          <p className="abra-lead">{t('lead')}</p>
        </div>
        <CtaForm copy={copy} />
      </div>
    </section>
  );
}
