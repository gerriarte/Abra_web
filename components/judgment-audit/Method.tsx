import { useTranslations } from 'next-intl';
import { PHASE_ICONS } from './graphics';
import { Grid, Label, Muted, Section, SectionHead } from './ui';

type Phase = { when: string; name: string; body: string; gate: string };
type Day = { day: string; phase: string };

export function Method() {
  const t = useTranslations('JudgmentAudit.method');
  const phases = t.raw('phases') as Phase[];
  const week = t.raw('week') as Day[];

  return (
    <Section id="metodo">
      <SectionHead
        eyebrow={t('eyebrow')}
        title={t.rich('title', { muted: (c) => <Muted>{c}</Muted> })}
        lead={t('lead')}
      />
      <Grid min={210}>
        {phases.map((phase, i) => (
          <article key={phase.name} className="ja-card ja-card--flush ja-reveal">
            <div className="ja-phase__body">
              {PHASE_ICONS[i]}
              <Label muted>{phase.when}</Label>
              <h3 className="ja-h3">{phase.name}</h3>
              <p className="ja-text">{phase.body}</p>
            </div>
            <div className="ja-phase__gate">
              <span className="ja-dot ja-dot--sm" aria-hidden="true" />
              <Label>
                {t('gatePrefix')} {phase.gate}
              </Label>
            </div>
          </article>
        ))}
      </Grid>
      <div className="ja-week" aria-hidden="true">
        {week.map((d, i) => (
          <div key={`${d.day}-${i}`} className="ja-week__day">
            <div className="ja-week__track">
              <div className="ja-week__fill" style={{ animationDelay: `${i * 0.7}s` }} />
            </div>
            <div className="ja-week__labels">
              <p className="ja-label" style={{ color: '#fff' }}>{d.day}</p>
              <p className="ja-label ja-label--muted">{d.phase}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
