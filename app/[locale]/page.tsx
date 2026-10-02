import { getTranslations, setRequestLocale } from 'next-intl/server';
import Hero from '@/components/sections/Hero';
import Problem from '@/components/sections/Problem';
import Services from '@/components/sections/Services';
import Method from '@/components/sections/Method';
import ClientCases from '@/components/sections/ClientCases';
import HowToStart from '@/components/sections/HowToStart';
import Founder from '@/components/sections/Founder';
import Laboratory from '@/components/sections/Laboratory';
import { PartnerShowcase } from '@/components/sections/PartnerShowcase';
import Contact from '@/components/sections/Contact';
import { RevealObserver } from '@/components/shared/motion';
import JsonLd from '@/components/seo/JsonLd';
import { generateServiceSchema } from '@/lib/utils/seo';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'home.services' });
  const services = t.raw('items') as { title: string; body: string }[];
  const serviceSchemas = services.map((service) => generateServiceSchema(service.title, service.body));

  return (
    <>
      <JsonLd data={serviceSchemas} />
      <div className="relative z-10">
        <Hero />
        <Problem />
        <Services />
        <Method />
        <ClientCases />
        <HowToStart />
        <Founder />
        <Laboratory />
        <PartnerShowcase />
        <Contact />
      </div>
      <RevealObserver />
    </>
  );
}
