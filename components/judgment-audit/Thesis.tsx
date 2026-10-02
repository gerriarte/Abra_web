import { useTranslations } from 'next-intl';
import { Eyebrow } from './ui';

export function Thesis() {
  const t = useTranslations('JudgmentAudit.thesis');
  return (
    <section className="ja-thesis">
      <div className="ja-wrap ja-thesis__inner ja-reveal">
        <Eyebrow tone="deep">{t('eyebrow')}</Eyebrow>
        <p className="ja-thesis__title">
          {t('line1')}
          <br />
          <strong>{t('line2')}</strong>
        </p>
        <p className="ja-thesis__lead">{t('lead')}</p>
      </div>
    </section>
  );
}
