import { useTranslations } from 'next-intl';
import { Grid, Label, Muted, Section, SectionHead } from './ui';

type PathItem = { label: string; name: string; body: string };

export function Paths() {
  const t = useTranslations('JudgmentAudit.paths');
  const items = t.raw('items') as PathItem[];

  return (
    <Section id="caminos">
      <SectionHead eyebrow={t('eyebrow')} title={t.rich('title', { muted: (c) => <Muted>{c}</Muted> })} />
      <Grid min={280}>
        {items.map((p, i) => (
          <article key={p.label} className={`ja-card ja-reveal${i === 0 ? ' ja-card--accent' : ''}`}>
            <Label muted={i !== 0}>{p.label}</Label>
            <h3 className="ja-h3">{p.name}</h3>
            <p className="ja-text">{p.body}</p>
          </article>
        ))}
      </Grid>
    </Section>
  );
}
