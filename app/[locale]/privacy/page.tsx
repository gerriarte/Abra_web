import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/lib/i18n/config';
import { generateSEOMetadata } from '@/lib/utils/seo';
import { privacyPolicy } from '@/content/legal';
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
  const doc = privacyPolicy[(locale as Locale)] ?? privacyPolicy.en;

  return generateSEOMetadata({
    title: doc.title,
    description:
      locale === 'es'
        ? 'Cómo A:BRA Latam recopila, usa y protege la información de los usuarios de su plataforma de gestión de redes sociales.'
        : 'How A:BRA Latam collects, uses, and protects the information of users of its social media management platform.',
    type: 'article',
    locale,
    url: `/${locale}/privacy`,
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const doc = privacyPolicy[(locale as Locale)] ?? privacyPolicy.en;

  return <LegalContent doc={doc} />;
}
