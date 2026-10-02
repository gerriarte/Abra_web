import { useTranslations } from 'next-intl';
import { Grid, Label, Muted, Section, SectionHead } from './ui';

type Answer = { who: string; decision: string; why: string; correct: boolean };

export function Example() {
  const t = useTranslations('JudgmentAudit.example');
  const answers = t.raw('answers') as Answer[];

  return (
    <Section id="ejemplo">
      <SectionHead eyebrow={t('eyebrow')} title={t.rich('title', { muted: (c) => <Muted>{c}</Muted> })} />
      <div className="abra-card ja-case abra-reveal">
        <div className="ja-case__meta">
          <Label>{t('tag')}</Label>
          <Label muted>{t('count')}</Label>
        </div>
        <h3 className="abra-h3 ja-case__question">{t('question')}</h3>
      </div>
      <Grid min={260}>
        {answers.map((a, i) => (
          <article key={a.who} className={`abra-card abra-reveal${i === 1 ? ' abra-card--accent' : ''}`}>
            <Label muted>{a.who}</Label>
            <p className="ja-answer__decision">{a.decision}</p>
            <p className="abra-text">{a.why}</p>
            <p className={`abra-label ja-answer__verdict${a.correct ? '' : ' ja-answer__verdict--wrong'}`}>
              {a.correct ? t('verdictCorrect') : t('verdictWrong')}
            </p>
          </article>
        ))}
      </Grid>
      <p className="ja-note">{t('note')}</p>
    </Section>
  );
}
