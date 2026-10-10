import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Eyebrow } from './ui';

/** Book cover (6:9). Set the path once the final cover is in /public; until then a placeholder renders. */
const BOOK_COVER: string | null = null;

/** Authority block closing the example section: the book behind the method. No links by design. */
export function Book() {
  const t = useTranslations('JudgmentAudit.book');
  const byline = t.raw('byline') as string[];

  return (
    <div className="abra-card ja-book">
      <div className="ja-book__cover">
        {BOOK_COVER ? (
          <Image src={BOOK_COVER} alt={t('imageAlt')} fill sizes="(max-width: 640px) 60vw, 220px" className="ja-book__img" />
        ) : (
          <div className="ja-book__placeholder" role="img" aria-label={t('imageAlt')}>
            <span aria-hidden="true">{t('title')}</span>
          </div>
        )}
      </div>
      <div className="ja-stack ja-book__copy" style={{ ['--ja-gap' as string]: '16px' }}>
        <Eyebrow>{t('eyebrow')}</Eyebrow>
        <h3 className="ja-book__title">{t('title')}</h3>
        <p className="abra-text">{t('body')}</p>
        <p className="abra-label abra-label--muted ja-book__byline">{byline.join(' · ')}</p>
      </div>
    </div>
  );
}
