import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Eyebrow, Grid, Label, Muted, Section, SectionHead } from './ui';

/** Book cover (6:9). Set the path once the final cover is in /public; until then a placeholder renders. */
const BOOK_COVER: string | null = null;

type Answer = { who: string; decision: string; why: string; correct: boolean };

export function Example() {
  const t = useTranslations('JudgmentAudit.example');
  const answers = t.raw('answers') as Answer[];
  const hasMeta = t.has('tag');

  return (
    <Section id="ejemplo">
      <SectionHead
        eyebrow={t('eyebrow')}
        title={t.rich('title', { muted: (c) => <Muted>{c}</Muted> })}
        lead={t.has('lead') ? t('lead') : undefined}
      />
      <div className="abra-card ja-case abra-reveal">
        {hasMeta ? (
          <div className="ja-case__meta">
            <Label>{t('tag')}</Label>
            <Label muted>{t('count')}</Label>
          </div>
        ) : null}
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
      {t.has('book') ? <Book /> : null}
    </Section>
  );
}

/** Authority block: the book behind the method. No links by design. */
function Book() {
  const t = useTranslations('JudgmentAudit.example.book');
  const byline = t.raw('byline') as string[];

  return (
    <div className="ja-book abra-reveal">
      <div className="ja-book__cover">
        {BOOK_COVER ? (
          <Image src={BOOK_COVER} alt={t('imageAlt')} fill sizes="(max-width: 640px) 60vw, 240px" className="ja-book__img" />
        ) : (
          <div className="ja-book__placeholder" role="img" aria-label={t('imageAlt')}>
            <span aria-hidden="true">{t('title')}</span>
          </div>
        )}
      </div>
      <div className="ja-stack ja-book__copy" style={{ ['--ja-gap' as string]: '18px' }}>
        <Eyebrow>{t('eyebrow')}</Eyebrow>
        <h3 className="ja-book__title">{t('title')}</h3>
        <p className="abra-lead">{t('body')}</p>
        <p className="abra-label abra-label--muted ja-book__byline">{byline.join(' · ')}</p>
      </div>
    </div>
  );
}
