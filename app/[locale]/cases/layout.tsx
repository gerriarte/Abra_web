import { getMessages } from 'next-intl/server';
import type { Metadata } from 'next';
import { generateSEOMetadata } from '@/lib/utils/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  
  const isEnglish = locale === 'en';
  const cases = messages.cases as any;
  
  const title = isEnglish 
    ? 'Case Studies - A:BRA'
    : 'Casos de Estudio - A:BRA';
  
  const description = cases?.subtitle || (isEnglish
    ? 'Explore our portfolio of successful digital transformation projects. See how we help businesses grow through strategic branding, web development, and digital marketing.'
    : 'Explora nuestro portafolio de proyectos exitosos de transformación digital. Descubre cómo ayudamos a las empresas a crecer mediante branding estratégico, desarrollo web y marketing digital.');

  return generateSEOMetadata({
    title,
    description,
    keywords: isEnglish
      ? ['case studies', 'portfolio', 'digital transformation', 'success stories', 'client projects', 'web development projects', 'branding examples']
      : ['casos de estudio', 'portafolio', 'transformación digital', 'historias de éxito', 'proyectos de clientes', 'proyectos de desarrollo web', 'ejemplos de branding'],
    type: 'website',
    locale,
    url: `/${locale}/cases`,
  });
}

export default function CasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

