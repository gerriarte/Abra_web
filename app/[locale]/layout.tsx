import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/lib/i18n/config';
import type { Metadata } from 'next';
import { generateSEOMetadata } from '@/lib/utils/seo';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home.meta' });
  const isEnglish = locale === 'en';

  return generateSEOMetadata({
    title: t('title'),
    description: t('description'),
    keywords: isEnglish
      ? ['digital agency', 'branding', 'web development', 'digital marketing', 'growth strategy', 'UX design', 'strategic consulting', 'B2B marketing']
      : ['agencia digital', 'branding', 'desarrollo web', 'marketing digital', 'estrategia de crecimiento', 'diseño UX', 'consultoría estratégica', 'marketing B2B'],
    type: 'website',
    locale,
    url: `/${locale}`,
  });
}

import { SmoothScrollProvider } from '@/components/ui/SmoothScrollProvider';
import LocaleChrome from '@/components/layout/LocaleChrome';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <SmoothScrollProvider>
        <LocaleChrome locale={locale}>
          {children}
        </LocaleChrome>
      </SmoothScrollProvider>
    </NextIntlClientProvider>
  );
}

