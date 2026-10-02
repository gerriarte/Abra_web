import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { ButtonLink, Eyebrow, mutedTag } from '@/components/shared/motion';
import { CAL_BOOKING_URL } from '@/lib/links';

// TODO(ger): reemplazar el placeholder por la imagen final (1536×864, WebP calidad ~82).
const HERO_IMAGE = '/home/hero-loop.webp';

export default function Hero() {
  const t = useTranslations('home.hero');
  const locale = useLocale();
  const capabilities = t.raw('capabilities') as string[];

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-end overflow-hidden pt-28 pb-14 lg:items-center lg:pb-24"
    >
      {/* Full-bleed banner. Absolutely positioned, so it can't shift layout. */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Extra height leaves room for the float without uncovering the edges. */}
        <div className="abra-float absolute inset-x-0 -top-4 -bottom-4">
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[right_center]"
          />
        </div>
        {/* Mobile: dark from the bottom, where the copy sits. Desktop: dark from the left. */}
        <div className="absolute inset-0 bg-[linear-gradient(0deg,#020C17_38%,rgba(2,12,23,0.7)_62%,rgba(2,12,23,0)_88%)] lg:bg-[linear-gradient(90deg,#020C17_0%,rgba(2,12,23,0.85)_30%,rgba(2,12,23,0)_60%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
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
