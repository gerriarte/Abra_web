import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ButtonLink, Eyebrow } from './ui';

const BOOK_COVER = '/libro/img/portada-la-ia-ejecuta.webp';
const BOOK_COVER_SIZE = { width: 960, height: 1355 };
const AMAZON_URL = 'https://www.amazon.com/dp/B0HQY3VHY8';

/** Authority block closing the example section: the book behind the method. */
export function Book() {
  const t = useTranslations('JudgmentAudit.book');
  const byline = t.raw('byline') as string[];

  return (
    <div className="abra-card ja-book">
      <div className="ja-book__cover">
        <Image
          src={BOOK_COVER}
          {...BOOK_COVER_SIZE}
          alt={t('imageAlt')}
          sizes="(max-width: 640px) 60vw, 220px"
          className="ja-book__img"
        />
      </div>
      <div className="ja-stack ja-book__copy" style={{ ['--ja-gap' as string]: '16px' }}>
        <Eyebrow>{t('eyebrow')}</Eyebrow>
        <h3 className="ja-book__title">{t('title')}</h3>
        <p className="abra-text">{t('body')}</p>
        <div className="ja-book__actions">
          <ButtonLink href={AMAZON_URL} external>{t('ctaAmazon')}</ButtonLink>
          <ButtonLink href="/es/libro" variant="ghost">{t('ctaDigital')}</ButtonLink>
        </div>
        <p className="abra-label abra-label--muted ja-book__byline">{byline.join(' · ')}</p>
      </div>
    </div>
  );
}
