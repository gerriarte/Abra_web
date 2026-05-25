'use client';

import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import useOnScreen from '@/hooks/useOnScreen';
import Image from 'next/image';
import Link from 'next/link';
import { SectionFlowLine } from '@/components/ui/SectionFlowLine';
import { CASES_DATA, type Metric } from '@/data/cases';

type CaseSize = 'large' | 'medium' | 'small';

const FEATURED_SLUGS: { slug: string; size: CaseSize }[] = [
  { slug: 'ruta-teatro', size: 'large' },
  { slug: 'monyte', size: 'medium' },
  { slug: 'securitas', size: 'medium' },
];

function formatMetricValue(metric: Metric): string {
  const value = metric.value.trim();
  const suffix = metric.suffix ?? '';
  const prefix = metric.prefix ?? '';
  if (value.startsWith('+') || value.startsWith('-')) {
    return `${prefix}${value}${suffix}`;
  }
  const numeric = Number.parseFloat(value);
  if (!Number.isNaN(numeric) && numeric > 0 && suffix === '%') {
    return `${prefix}+${value}${suffix}`;
  }
  return `${prefix}${value}${suffix}`;
}

function buildFeaturedCase(slug: string, size: CaseSize, locale: string) {
  const data = CASES_DATA[slug];
  if (!data?.heroImage) return null;

  const isEnglish = locale === 'en';
  const results = (isEnglish && data.resultsEn?.length ? data.resultsEn : data.results) ?? [];
  const primaryMetric = results[0];
  const services = data.projectDetails?.services ?? [];

  const excerptSource = isEnglish
    ? data.brandDescriptionEn ?? data.brandDescription
    : data.brandDescription;

  return {
    slug,
    size,
    title: data.client,
    category: services.slice(0, 2).join(' · ') || (isEnglish ? 'Case study' : 'Caso de estudio'),
    metric: primaryMetric
      ? {
          label: primaryMetric.label,
          value: formatMetricValue(primaryMetric),
        }
      : undefined,
    excerpt: excerptSource?.slice(0, 140).trim(),
    image: data.heroImage,
  };
}

export default function ClientCases() {
  const t = useTranslations('cases');
  const locale = useLocale();
  const [ref, isVisible] = useOnScreen({ threshold: 0.05 });

  const cases = FEATURED_SLUGS.map(({ slug, size }) => buildFeaturedCase(slug, size, locale)).filter(
    (item): item is NonNullable<ReturnType<typeof buildFeaturedCase>> => item !== null
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.21, 0.47, 0.32, 0.98] as const,
      },
    },
  };

  const sizeClasses: Record<CaseSize, string> = {
    large: 'md:col-span-8 md:row-span-2 min-h-[320px] md:min-h-0',
    medium: 'md:col-span-4 md:row-span-2 min-h-[280px] md:min-h-0',
    small: 'md:col-span-4 md:row-span-1 min-h-[240px]',
  };

  const imageSizes: Record<CaseSize, string> = {
    large: '(max-width: 768px) 100vw, 66vw',
    medium: '(max-width: 768px) 100vw, 33vw',
    small: '(max-width: 768px) 100vw, 33vw',
  };

  return (
    <section id="cases" className="py-40 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-7xl">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="max-w-6xl mx-auto"
        >
          <div className="mb-32 text-center max-w-3xl mx-auto">
            <motion.span
              variants={itemVariants}
              className="text-[9px] font-mono tracking-[0.5em] uppercase text-text-muted mb-6 block"
            >
              {t('eyebrow')}
            </motion.span>

            <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-light mb-8 tracking-tight">
              {t('title')}
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-text-secondary font-light leading-relaxed">
              {t('subtitle')}
            </motion.p>
            <motion.div variants={itemVariants} className="mt-10">
              <SectionFlowLine />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[280px]">
            {cases.map((c, index) => (
              <motion.div key={c.slug} variants={itemVariants} className={sizeClasses[c.size]}>
                <Link
                  href={`/${locale}/case-studies/${c.slug}`}
                  className={`group relative flex h-full w-full rounded-[2.5rem] overflow-hidden border border-white/10 bg-surface/20 shadow-[0_24px_80px_rgba(0,0,0,0.35)] transition-all duration-700 hover:border-white/25 hover:shadow-[0_32px_100px_rgba(0,0,0,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/40`}
                >
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={c.image}
                      alt={c.title}
                      fill
                      sizes={imageSizes[c.size]}
                      priority={index === 0}
                      className="object-cover object-center transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/10 transition-opacity duration-700 group-hover:via-background/45" />
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/5" />
                  </div>

                  <div className="relative z-10 flex h-full w-full flex-col justify-between p-8 md:p-10">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex flex-col gap-2">
                        <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-text-muted/90">
                          {c.category}
                        </span>
                        <h3
                          className={`${c.size === 'large' ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'} font-light text-text-primary tracking-tight`}
                        >
                          {c.title}
                        </h3>
                      </div>
                      {c.metric && (
                        <div className="shrink-0 rounded-2xl border border-white/15 bg-background/50 px-4 py-2 text-right backdrop-blur-md">
                          <p className="text-sm font-light text-text-primary">{c.metric.value}</p>
                          <p className="text-[8px] font-mono uppercase tracking-[0.25em] text-text-muted mt-0.5 max-w-[88px] leading-tight">
                            {c.metric.label}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      {c.excerpt && (
                        <p
                          className={`text-sm font-light leading-relaxed text-text-secondary/90 ${
                            c.size === 'small' ? 'line-clamp-2' : 'line-clamp-3'
                          }`}
                        >
                          {c.excerpt}
                          {c.excerpt.length >= 140 ? '…' : ''}
                        </p>
                      )}
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-[11px] text-text-muted font-light max-w-[260px]">{t('cardNote')}</p>
                        <span
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-background transition-transform duration-500 group-hover:scale-110 shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                          aria-hidden
                        >
                          →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="mt-32 text-center">
            <Link
              href={`/${locale}/cases`}
              className="inline-flex items-center gap-4 px-12 py-6 rounded-full border border-white/10 text-text-primary hover:bg-white/5 transition-all group font-light tracking-widest text-xs uppercase"
            >
              {t('ctaAll')}
              <span className="group-hover:translate-x-2 transition-transform duration-500">→</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
