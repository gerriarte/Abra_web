import "../globals.css";
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import { locales } from '@/lib/i18n/config';
import { generateSEOMetadata, generateOrganizationSchema, generateWebSiteSchema, generateLocalBusinessSchemas } from '@/lib/utils/seo';
import { GoogleTagManagerNoscript } from '@/components/analytics/GoogleTagManager';
import GTMDebug from '@/components/analytics/GTMDebug';
import JsonLd from '@/components/seo/JsonLd';
import { SmoothScrollProvider } from '@/components/ui/SmoothScrollProvider';
import LocaleChrome from '@/components/layout/LocaleChrome';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: '#020C17',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home.meta' });
  const isEnglish = locale === 'en';

  return {
    ...generateSEOMetadata({
      title: t('title'),
      description: t('description'),
      keywords: isEnglish
        ? ['digital agency', 'branding', 'web development', 'digital marketing', 'growth strategy', 'UX design', 'strategic consulting', 'B2B marketing']
        : ['agencia digital', 'branding', 'desarrollo web', 'marketing digital', 'estrategia de crecimiento', 'diseño UX', 'consultoría estratégica', 'marketing B2B'],
      type: 'website',
      locale,
      url: `/${locale}`,
    }),
    icons: {
      icon: '/icon.png',
      apple: '/apple-touch-icon.png',
    },
    manifest: '/manifest.json',
  };
}

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
  // GTM ID - puede venir de variable de entorno o usar el valor por defecto
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-56J4SKMV';

  // <html> vive aquí para que lleve el idioma real de la ruta (lang="es" en /es/*).
  return (
    <html lang={locale} suppressHydrationWarning className={`overflow-x-hidden ${inter.variable}`}>
      <body className="antialiased overflow-x-hidden" suppressHydrationWarning>
        <JsonLd data={[generateOrganizationSchema(), generateWebSiteSchema(), ...generateLocalBusinessSchemas()]} />
        {/* Google Tag Manager (noscript) - Debe estar inmediatamente después del body */}
        <GoogleTagManagerNoscript gtmId={gtmId} />
        {/* Inicializar dataLayer antes de GTM */}
        <Script
          id="gtm-dataLayer-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
            `,
          }}
        />
        {/* Google Tag Manager Script */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `,
          }}
        />
        <NextIntlClientProvider messages={messages}>
          <SmoothScrollProvider>
            <LocaleChrome locale={locale}>
              {children}
            </LocaleChrome>
          </SmoothScrollProvider>
        </NextIntlClientProvider>
        <GTMDebug />
      </body>
    </html>
  );
}
