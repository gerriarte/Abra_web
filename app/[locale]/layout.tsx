import { Inter } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/lib/i18n/config';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
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

