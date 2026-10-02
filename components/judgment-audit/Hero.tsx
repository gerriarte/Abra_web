import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ButtonLink, Eyebrow } from './ui';

type Stat = { value: string; label: string };

export function Hero() {
  const t = useTranslations('JudgmentAudit.hero');
  const stats = t.raw('stats') as Stat[];

  return (
    <section id="top" className="ja-hero">
      <div className="ja-wrap ja-hero__grid">
        <div className="ja-hero__copy">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <h1 className="abra-h1">
            {t.rich('title', { muted: (chunks) => <span className="abra-muted-text">{chunks}</span> })}
          </h1>
          <p className="abra-lead abra-lead--lg">{t('lead')}</p>
          <div className="abra-actions">
            <ButtonLink href="#agendar">{t('ctaPrimary')}</ButtonLink>
            <ButtonLink href="#metodo" variant="ghost" arrow={false}>
              {t('ctaSecondary')}
            </ButtonLink>
          </div>
          <div className="ja-stats">
            {stats.map((stat, i) => (
              <div key={stat.label} className="ja-stat">
                <p className={`ja-stat__value${i === 0 ? ' ja-stat__value--accent' : ''}`}>{stat.value}</p>
                <p className="abra-label abra-label--muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="ja-hero__media">
          <Image
            src="/judgment-audit/hero-ballena.webp"
            alt={t('imageAlt')}
            width={832}
            height={1024}
            priority
            sizes="(max-width: 900px) 90vw, 560px"
            className="ja-hero__img abra-float"
          />
        </div>
      </div>
    </section>
  );
}
