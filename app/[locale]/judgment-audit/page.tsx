import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/lib/i18n/config';
import { generateSEOMetadata } from '@/lib/utils/seo';
import {
  Areas,
  Cta,
  Deliverables,
  Example,
  Hero,
  Method,
  Objective,
  Paths,
  Projects,
  RevealObserver,
  Signals,
  Thesis,
} from '@/components/judgment-audit';
import '@/components/judgment-audit/judgment-audit.css';

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'JudgmentAudit.meta' });

  return generateSEOMetadata({
    title: t('title'),
    description: t('description'),
    image: '/judgment-audit/og.jpg',
    type: 'website',
    locale,
    url: `/${locale}/judgment-audit`,
  });
}

export default async function JudgmentAuditPage({ params }: Props) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  // LocaleChrome already renders <main>; this is the page's scoped root.
  return (
    <div className="ja-root">
      <Hero />
      <Signals />
      <Thesis />
      <Method />
      <Deliverables />
      <Example />
      <Areas />
      <Projects />
      <Paths />
      <Objective />
      <Cta />
      <RevealObserver />
    </div>
  );
}
