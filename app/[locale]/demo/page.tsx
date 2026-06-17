import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/lib/i18n/config';
import { generateSEOMetadata } from '@/lib/utils/seo';
import AbraDemoPanel from '@/components/demo/AbraDemoPanel';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEnglish = locale === 'en';

  return generateSEOMetadata({
    title: isEnglish ? 'Sales Capture Panel — Live Demo' : 'Panel de Captación — Demo en Vivo',
    description: isEnglish
      ? 'Interactive demo: see how A:BRA turns your prospecting into meetings and new clients, tracked in real time.'
      : 'Demo interactiva: mirá cómo A:BRA convierte tu prospección en reuniones y clientes nuevos, medido en tiempo real.',
    type: 'website',
    locale,
    url: `/${locale}/demo`,
  });
}

export default async function DemoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const isEnglish = locale === 'en';

  return (
    <section className="relative z-10">
      <div className="container mx-auto max-w-6xl px-4 pt-32 pb-24 md:pt-40 md:pb-32">
        {/* Intro */}
        <header className="mb-12 md:mb-16 text-center">
          <span className="mb-5 block font-mono text-[10px] uppercase tracking-[0.5em] text-text-muted">
            {isEnglish ? 'Live Demo' : 'Demo en Vivo'}
          </span>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight text-text-primary leading-[1.05] text-balance">
            {isEnglish
              ? 'Your sales capture, in real time'
              : 'Tu captación de ventas, en tiempo real'}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-text-secondary">
            {isEnglish
              ? 'A working preview of the A:BRA capture panel: every company contacted, every reply and every meeting, tracked as it happens. Press “advance” to watch it grow week by week.'
              : 'Una vista previa funcional del panel de captación de A:BRA: cada empresa contactada, cada respuesta y cada reunión, medidas mientras ocurren. Tocá “avanzar” para verlo crecer semana a semana.'}
          </p>
        </header>

        {/* Demo */}
        <AbraDemoPanel />
      </div>
    </section>
  );
}
