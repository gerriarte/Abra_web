import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Grid, Label, Muted, Section, SectionHead } from './ui';

type Area = { name: string; body: string; imageAlt: string };

const AREA_IMAGES = [
  '/judgment-audit/area-comercial.webp',
  '/judgment-audit/area-marketing.webp',
  '/judgment-audit/area-operaciones.webp',
  '/judgment-audit/area-reputacion.webp',
];

export function Areas() {
  const t = useTranslations('JudgmentAudit.areas');
  const items = t.raw('items') as Area[];
  const also = t.raw('also') as string[];

  return (
    <Section id="areas">
      <SectionHead
        eyebrow={t('eyebrow')}
        title={t.rich('title', { muted: (c) => <Muted>{c}</Muted> })}
        lead={t('lead')}
      />
      <Grid min={240}>
        {items.map((area, i) => (
          <article key={area.name} className="ja-card ja-card--flush ja-reveal">
            <div className="ja-area__media">
              <Image src={AREA_IMAGES[i]} alt={area.imageAlt} fill sizes="(max-width: 640px) 100vw, 320px" className="ja-area__img" />
            </div>
            <div className="ja-area__body">
              <h3 className="ja-h3 ja-area__name">{area.name}</h3>
              <p className="ja-text">{area.body}</p>
            </div>
          </article>
        ))}
      </Grid>
      <div className="ja-also">
        <Label muted>{t('alsoLabel')}</Label>
        {also.map((item) => (
          <span key={item} className="ja-pill">
            {item}
          </span>
        ))}
      </div>
    </Section>
  );
}
