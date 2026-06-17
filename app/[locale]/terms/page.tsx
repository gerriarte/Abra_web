import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/lib/i18n/config';
import { generateSEOMetadata } from '@/lib/utils/seo';
import { termsOfService } from '@/content/legal';
import LegalContent from '@/components/legal/LegalContent';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const doc = termsOfService[(locale as Locale)] ?? termsOfService.en;

  return generateSEOMetadata({
    title: doc.title,
    description:
      locale === 'es'
        ? 'Términos y condiciones de uso de la plataforma de automatización de redes sociales de A:BRA Latam.'
        : 'Terms and conditions for using A:BRA Latam’s social media automation platform.',
    type: 'article',
    locale,
    url: `/${locale}/terms`,
  });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const doc = termsOfService[(locale as Locale)] ?? termsOfService.en;

  return <LegalContent doc={doc} />;
}
