import { useTranslations } from 'next-intl';
import { DELIVERABLE_GRAPHICS } from './graphics';
import { Grid, Label, Muted, Section, SectionHead } from './ui';

type Deliverable = { name: string; what: string; help: string };

export function Deliverables() {
  const t = useTranslations('JudgmentAudit.deliverables');
  const items = t.raw('items') as Deliverable[];

  return (
    <Section id="entregables" surface>
      <SectionHead eyebrow={t('eyebrow')} title={t.rich('title', { muted: (c) => <Muted>{c}</Muted> })} />
      <Grid min={320}>
        {items.map((item, i) => (
          <article key={item.name} className="abra-card abra-reveal">
            <div className="ja-graphic">{DELIVERABLE_GRAPHICS[i]}</div>
            <h3 className="abra-h3">{item.name}</h3>
            <p className="abra-text abra-text--strong">{item.what}</p>
            <Label>{t('helpLabel')}</Label>
            <p className="abra-text">{item.help}</p>
          </article>
        ))}
      </Grid>
    </Section>
  );
}
