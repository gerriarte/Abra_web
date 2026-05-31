import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero';
import Problem from '@/components/sections/Problem';
import Method from '@/components/sections/Method';
import Services from '@/components/sections/Services';
import JsonLd from '@/components/seo/JsonLd';

const Laboratory = dynamic(() => import('@/components/sections/Laboratory'));
const ClientCases = dynamic(() => import('@/components/sections/ClientCases'));
const Process = dynamic(() => import('@/components/sections/Process'));
const Founder = dynamic(() => import('@/components/sections/Founder'));
const PartnerShowcase = dynamic(() =>
  import('@/components/sections/PartnerShowcase').then(m => ({ default: m.PartnerShowcase }))
);
const Result = dynamic(() => import('@/components/sections/Result'));
const Contact = dynamic(() => import('@/components/sections/Contact'));
import { generateServiceSchema } from '@/lib/utils/seo';
import { setRequestLocale } from 'next-intl/server';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  try {
    const { locale } = await params;
    setRequestLocale(locale);
    const isEnglish = locale === 'en';

    const servicesData = isEnglish
      ? [
          { name: 'Data-Driven Branding', description: 'Identity and value proposition built on real perception analysis, not focus group intuitions.' },
          { name: 'Conversion-Focused Communication', description: 'Institutional narrative calibrated by the topics and messages that your data says convert.' },
          { name: 'Growth Marketing with applied AI', description: 'Paid media, SEO, automation, and advanced analytics. CAC down, LTV up, clear attribution.' },
          { name: 'Product and Web Development', description: 'Web, landings, and micro-products designed as conversion systems. Built fast, without breaking.' },
        ]
      : [
          { name: 'Branding con base en datos', description: 'Identidad y propuesta de valor construidas sobre análisis de percepción real, no intuiciones de focus group.' },
          { name: 'Comunicación con foco en conversión', description: 'Narrativa institucional calibrada por los temas y mensajes que tus datos dicen que convierten.' },
          { name: 'Growth Marketing con IA aplicada', description: 'Pauta, SEO, automatización y analítica avanzada. CAC en baja, LTV en alza, atribución clara.' },
          { name: 'Producto y desarrollo web', description: 'Web, landings y micro-productos diseñados como sistemas de conversión. Construidos rápido, sin romperse.' },
        ];

    const serviceSchemas = servicesData.map((service) =>
      generateServiceSchema(service.name, service.description)
    );

    return (
      <>
        <JsonLd data={serviceSchemas} />
        <main className="relative z-10">
          <Hero />
          <Problem />
          <Method />
          <Services />
          <Laboratory />
          <ClientCases />
          <Process />
          <Founder />
          <PartnerShowcase locale={locale} />
          <Result />
          <Contact />
        </main>
      </>
    );
  } catch (error) {
    console.error('Error rendering HomePage:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light text-primary mb-4">Error Loading Page</h1>
          <p className="text-text-secondary">Please check the console for details.</p>
        </div>
      </div>
    );
  }
}
