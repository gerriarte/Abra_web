import { useTranslations } from 'next-intl';
import { Grid, Muted, Section, SectionHead } from './ui';

type Signal = { title: string; body: string };

export function Signals() {
  const t = useTranslations('JudgmentAudit.signals');
  const items = t.raw('items') as Signal[];

  return (
    <Section id="problema">
      <SectionHead
        eyebrow={t('eyebrow')}
        title={t.rich('title', { muted: (c) => <Muted>{c}</Muted> })}
        lead={t('lead')}
      />
      <Grid min={240}>
        {items.map((item, i) => (
          <article key={item.title} className="ja-card ja-reveal">
            <p className="ja-signal__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</p>
            <span className="ja-dot" aria-hidden="true" />
            <h3 className="ja-h3">{item.title}</h3>
            <p className="ja-text">{item.body}</p>
          </article>
        ))}
      </Grid>
    </Section>
  );
}
