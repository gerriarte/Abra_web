import { Inter } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/lib/i18n/config';
import type { Metadata } from 'next';
import { generateSEOMetadata } from '@/lib/utils/seo';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  
  const isEnglish = locale === 'en';
  const hero = messages.hero as any;
  
  const title = isEnglish 
    ? 'A:BRA - Strategic Digital Engineering Agency'
    : 'A:BRA - Agencia de Ingeniería Digital Estratégica';
  
  const description = hero?.subtitle || (isEnglish
    ? 'We transform complex data into predictable growth systems. From brand vision to web development, we build digital solutions that work, proven by metrics.'
    : 'Transformamos datos complejos en sistemas de crecimiento predecibles. De la visión de marca al desarrollo web, construimos soluciones digitales que funcionan, probadas por la métrica.');

  return generateSEOMetadata({
    title,
    description,
    keywords: isEnglish
      ? ['digital agency', 'branding', 'web development', 'digital marketing', 'growth strategy', 'UX design', 'strategic consulting', 'B2B marketing']
      : ['agencia digital', 'branding', 'desarrollo web', 'marketing digital', 'estrategia de crecimiento', 'diseño UX', 'consultoría estratégica', 'marketing B2B'],
    type: 'website',
    locale,
    url: `/${locale}`,
  });
}

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppFloating from '@/components/ui/WhatsAppFloating';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  try {
    const { locale } = await params;
    
    if (!locales.includes(locale as any)) {
      notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);
    
    const messages = await getMessages();

    return (
      <NextIntlClientProvider messages={messages}>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
        <WhatsAppFloating />
      </NextIntlClientProvider>
    );
  } catch (error) {
    console.error('Error in LocaleLayout:', error);
    return (
      <html lang="en">
        <body>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-light text-primary mb-4">Error Loading Page</h1>
              <p className="text-text-secondary">Please check the server logs for details.</p>
            </div>
          </div>
        </body>
      </html>
    );
  }
}

