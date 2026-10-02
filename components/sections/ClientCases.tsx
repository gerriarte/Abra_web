import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ButtonLink, Label, SectionHead, mutedTag } from '@/components/shared/motion';
import { CASES_DATA } from '@/data/cases';

type CaseCopy = { tags: string; body: string; metric: string };

// The image optimizer rejects paths with non-ASCII characters ("Bogotá"); those are served as-is.
const NON_ASCII = /[^\x20-\x7E]/;

/** Home 2×2 grid. Copy lives in messages (home.cases.items.<slug>); images come from data/cases. */
const HOME_CASES: { slug: string; image?: string; position?: string }[] = [
  // TODO(ger): validar el período del "+200% tráfico web" de Ruta Teatro.
  // La captura es una página completa (1920×4410): se muestra desde arriba.
  { slug: 'ruta-teatro', position: 'object-top' },
  // /incap/incap-hero.webp (heroImage en data/cases) no existe en /public; usamos la captura del sitio nuevo.
  { slug: 'incap', image: '/incap/incap-despues.webp' },
  // TODO(ger): el "+15% crecimiento mensual" de Differente, ¿es de ventas o de tráfico?
  { slug: 'different-coffee' },
  // TODO(ger): definir la métrica de Bestune (hoy la tarjeta va sin métrica).
  { slug: 'bestune' },
];

export default function ClientCases() {
  const t = useTranslations('home.cases');
  const locale = useLocale();

  return (
    <section id="cases" className="relative border-t border-white/5 py-24 md:py-32">
      <div className="container mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHead eyebrow={t('eyebrow')} title={t.rich('title', mutedTag)} lead={t('lead')} />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {HOME_CASES.map(({ slug, image, position = 'object-center' }) => {
            const data = CASES_DATA[slug];
            if (!data) return null;
            const copy = t.raw(`items.${slug}`) as CaseCopy;
            const src = image ?? data.heroImage;

            return (
              <Link
                key={slug}
                href={`/${locale}/case-studies/${slug}`}
                className="abra-card abra-card--flush abra-reveal group"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-surface">
                  {src ? (
                    <Image
                      src={src}
                      alt={data.client}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      unoptimized={NON_ASCII.test(src)}
                      className={`abra-zoom object-cover ${position}`}
                    />
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col gap-3 p-7 md:p-8">
                  <Label muted>{copy.tags}</Label>
                  <h3 className="abra-h3 text-2xl">{data.client}</h3>
                  <p className="abra-text">{copy.body}</p>
                  <div className="mt-auto flex items-end justify-between gap-4 pt-4">
                    {copy.metric ? (
                      <div className="flex flex-col gap-1.5">
                        <Label muted>{t('metricLabel')}</Label>
                        <p className="text-base font-medium text-aqua">{copy.metric}</p>
                      </div>
                    ) : (
                      <span />
                    )}
                    <span
                      aria-hidden="true"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition-colors duration-300 group-hover:border-aqua group-hover:text-aqua"
                    >
                      →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="abra-reveal mt-12 flex justify-center">
          <ButtonLink href={`/${locale}/cases`} variant="ghost">
            {t('cta')}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
