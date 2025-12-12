import Hero from '@/components/sections/Hero';
import Problem from '@/components/sections/Problem';
import Method from '@/components/sections/Method';
import Projects from '@/components/sections/Projects';
import Result from '@/components/sections/Result';
import Contact from '@/components/sections/Contact';
import JsonLd from '@/components/seo/JsonLd';
import { generateServiceSchema } from '@/lib/utils/seo';
import { getLocale } from 'next-intl/server';

export default async function HomePage() {
  try {
    const locale = await getLocale();
    const isEnglish = locale === 'en';

    // Generate service schemas for main services
    const services = isEnglish
      ? [
          { name: 'Branding Development', description: 'Institutional Value Proposition and identity (visual/discursive). A strategic operations manual.' },
          { name: 'Institutional Communications', description: 'Design of institutional narrative and crisis management. Expert, formal, and clear tone projecting authority.' },
          { name: 'Digital Marketing & Growth', description: 'Strategies, Paid Media, Advanced Analytics. Investment with the certainty of a risk analyst: only where data guarantees ROI.' },
          { name: 'Web Design & Development', description: 'UX, UI, and Development services focused on B2B conversion. Your website is your best salesperson, logically structured and powerfully executed.' },
        ]
      : [
          { name: 'Desarrollo de Branding', description: 'Construcción de Propuesta de Valor Institucional e identidad visual/discursiva. Es un manual de operaciones estratégico.' },
          { name: 'Estrategias de Comunicación', description: 'Diseño de narrativa institucional y manejo de crisis. Tono experto, formal y claro que proyecta autoridad.' },
          { name: 'Marketing Digital y Crecimiento', description: 'Estrategias, Medios Pagos, Analítica Avanzada. Inversión solo donde los datos garantizan el Retorno de Inversión.' },
          { name: 'Diseño y Desarrollo Web', description: 'Servicios de Experiencia de Usuario, Interfaz de Usuario y Desarrollo con foco en la conversión entre empresas. Web como sistema de conversión.' },
        ];

    const serviceSchemas = services.map(service => generateServiceSchema(service.name, service.description));

    return (
      <>
        <JsonLd data={serviceSchemas} />
        <Hero />
        <Problem />
        <Method />
        <Projects />
        <Result />
        <Contact />
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
