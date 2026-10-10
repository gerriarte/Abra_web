import { useTranslations } from 'next-intl';
import { Grid, Label, Muted, Section, SectionHead } from './ui';

type Column = { label: string; items: string[] };

export function Fit() {
  const t = useTranslations('JudgmentAudit.fit');
  const columns = [t.raw('yes') as Column, t.raw('no') as Column];

  return (
    <Section id="para-quien">
      <SectionHead eyebrow={t('eyebrow')} title={t.rich('title', { muted: (c) => <Muted>{c}</Muted> })} />
      <Grid min={320}>
        {columns.map((col, i) => {
          const yes = i === 0;
          return (
            <article key={col.label} className={`abra-card abra-reveal${yes ? ' abra-card--accent' : ''}`}>
              <Label muted={!yes}>{col.label}</Label>
              <ul className="ja-fit__list">
                {col.items.map((item) => (
                  <li key={item} className="ja-fit__item">
                    <span className={`ja-fit__mark${yes ? '' : ' ja-fit__mark--no'}`} aria-hidden="true">
                      {yes ? '✓' : '✗'}
                    </span>
                    <span className="abra-text">{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </Grid>
    </Section>
  );
}
