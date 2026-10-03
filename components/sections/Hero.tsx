import { useLocale, useTranslations } from 'next-intl';
import { ButtonLink, Eyebrow, mutedTag } from '@/components/shared/motion';
import { CAL_BOOKING_URL } from '@/lib/links';
import HeroLoop from './HeroLoop';

export default function Hero() {
  const t = useTranslations('home.hero');
  const locale = useLocale();
  const capabilities = t.raw('capabilities') as string[];
  const phases = (useTranslations('home.method').raw('phases') as { name: string }[]).map((p) => p.name);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-end overflow-hidden pt-28 pb-14 lg:items-center lg:pb-24"
    >
      {/* Loop spiral on the right (desktop only: on mobile the copy fills the screen).
          Absolutely positioned, so it can't shift layout. */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="abra-float absolute right-[2%] top-1/2 hidden w-[min(46vw,640px)] -translate-y-1/2 lg:block">
          <HeroLoop phases={phases} />
        </div>
        {/* Mobile: dark from the bottom, where the copy sits. Desktop: dark from the left. */}
        <div className="absolute inset-0 bg-[linear-gradient(0deg,#020C17_42%,rgba(2,12,23,0.6)_64%,rgba(2,12,23,0)_85%)] lg:bg-[linear-gradient(90deg,#020C17_0%,rgba(2,12,23,0.7)_32%,rgba(2,12,23,0)_55%)]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex max-w-2xl flex-col gap-7">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <h1 className="abra-h1">{t.rich('title', mutedTag)}</h1>
          <p className="abra-lead abra-lead--lg">{t('lead')}</p>
          <div className="abra-actions">
            <ButtonLink href={CAL_BOOKING_URL} external>
              {t('ctaPrimary')}
            </ButtonLink>
            <ButtonLink href={`/${locale}/judgment-audit`} variant="ghost">
              {t('ctaSecondary')}
            </ButtonLink>
          </div>
          <ul
            aria-label={t('capabilitiesLabel')}
            className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60"
          >
            {capabilities.map((item, i) => (
              <li key={item} className="flex items-center gap-3">
                {i > 0 ? <span aria-hidden="true" className="text-white/25">·</span> : null}
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
