import { HomePageFlow } from '@/components/background/HomePageFlow';
import { ScrollBackground } from '@/components/background/ScrollBackground';
import Hero from '@/components/sections/Hero';
import Problem from '@/components/sections/Problem';
import Method from '@/components/sections/Method';
import Services from '@/components/sections/Services';
import Laboratory from '@/components/sections/Laboratory';
import ClientCases from '@/components/sections/ClientCases';
import Process from '@/components/sections/Process';
import Founder from '@/components/sections/Founder';
import Result from '@/components/sections/Result';
import { PartnerShowcase } from '@/components/sections/PartnerShowcase';
import Contact from '@/components/sections/Contact';
import JsonLd from '@/components/seo/JsonLd';
import { generateServiceSchema } from '@/lib/utils/seo';
import { getLocale } from 'next-intl/server';

export default async function HomePage() {
  try {
    const locale = await getLocale();
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
        <ScrollBackground />
        <HomePageFlow>
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
        </HomePageFlow>
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
