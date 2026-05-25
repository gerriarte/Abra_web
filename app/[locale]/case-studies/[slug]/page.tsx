import React from 'react';
import { notFound } from 'next/navigation';
import { CASES_DATA } from '@/data/cases';
import { CaseHeroLuxury } from '@/components/cases/luxury/CaseHeroLuxury';
import { SectionLuxury } from '@/components/cases/luxury/SectionLuxury';
import { MetricsLuxury } from '@/components/cases/luxury/MetricsLuxury';
import { ImageGrid } from '@/components/cases/ui/ImageGrid';
import { ProjectDetails } from '@/components/cases/ui/ProjectDetails';
import { NextProjectNavigation } from '@/components/cases/ui/NextProjectNavigation';
import JsonLd from '@/components/seo/JsonLd';
import { generateSEOMetadata, generateArticleSchema, generateBreadcrumbSchema } from '@/lib/utils/seo';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const caseStudy = CASES_DATA[slug];

  if (!caseStudy) return { title: 'Case Study Not Found' };

  const isEnglish = locale === 'en';
  const title = isEnglish && caseStudy.titleEn ? caseStudy.titleEn : caseStudy.title;
  
  return generateSEOMetadata({
    title: `${title} | A:BRA`,
    description: (isEnglish ? caseStudy.brandDescriptionEn : caseStudy.brandDescription)?.substring(0, 160),
    image: caseStudy.heroImage || '/abra.png',
    url: `/${locale}/case-studies/${slug}`,
    type: 'article',
    locale,
  });
}

export function generateStaticParams() {
  return Object.keys(CASES_DATA).map((slug) => ({ slug }));
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const caseStudy = CASES_DATA[slug];

  if (!caseStudy) notFound();

  const isEnglish = locale === 'en';
  const title = isEnglish && caseStudy.titleEn ? caseStudy.titleEn : caseStudy.title;
  const client = caseStudy.client;
  const description = isEnglish && caseStudy.brandDescriptionEn ? caseStudy.brandDescriptionEn : caseStudy.brandDescription;
  const situation = isEnglish && caseStudy.situationEn ? caseStudy.situationEn : caseStudy.situation;
  const task = isEnglish && caseStudy.taskEn ? caseStudy.taskEn : caseStudy.task;
  const action = isEnglish && caseStudy.actionEn ? caseStudy.actionEn : caseStudy.action;
  const metrics = (isEnglish && caseStudy.resultsEn ? caseStudy.resultsEn : caseStudy.results) || [];
  
  const labels = {
    context: isEnglish ? 'Context' : 'Contexto',
    challenge: isEnglish ? 'The Challenge' : 'El Desafío',
    solution: isEnglish ? 'The Strategy' : 'La Estrategia',
    execution: isEnglish ? 'Execution' : 'Ejecución',
    results: isEnglish ? 'System Impact' : 'Impacto del Sistema',
    visuals: isEnglish ? 'Gallery' : 'Galería Editorial'
  };

  // Determine prev/next
  const hiddenSlugs = ['duvyclass', 'gea-beauty', 'praxis-school', 'message-boutique'];
  const slugs = Object.keys(CASES_DATA).filter(s => !hiddenSlugs.includes(s));
  const idx = slugs.indexOf(slug);
  const prevProject = idx > 0 ? { slug: slugs[idx-1], title: CASES_DATA[slugs[idx-1]].client } : undefined;
  const nextProject = idx < slugs.length - 1 ? { slug: slugs[idx+1], title: CASES_DATA[slugs[idx+1]].client } : undefined;

  return (
    <div className="min-h-screen bg-background text-text-primary overflow-x-hidden selection:bg-white selection:text-background">
      <JsonLd data={[
        generateArticleSchema({ title, description, image: caseStudy.heroImage || '', url: `/${locale}/case-studies/${slug}` }),
        generateBreadcrumbSchema([
          { name: isEnglish ? 'Home' : 'Inicio', url: `/${locale}` },
          { name: isEnglish ? 'Cases' : 'Casos', url: `/${locale}/cases` },
          { name: client, url: `/${locale}/case-studies/${slug}` }
        ])
      ]} />

      {/* Block 1: Hero Luxury */}
      <CaseHeroLuxury
        title={title}
        client={client}
        category={caseStudy.projectDetails?.services[0] || 'Digital Engineering'}
        metric={metrics[0] || { label: 'Impact', value: 'High' }}
        backgroundImage={caseStudy.heroImage || ''}
      />

      {/* Block 2: Context / Quick Info */}
      <section className="py-24 border-y border-white/5 bg-background-off">
        <div className="container mx-auto px-6 max-w-7xl">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
              <div className="space-y-4">
                 <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-text-muted">{isEnglish ? 'Sector' : 'Sector'}</span>
                 <p className="text-lg font-light tracking-tight">{caseStudy.projectDetails?.services[0]}</p>
              </div>
              <div className="space-y-4">
                 <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-text-muted">{isEnglish ? 'Role' : 'Rol'}</span>
                 <p className="text-lg font-light tracking-tight">{isEnglish ? 'Digital Strategy & Dev' : 'Estrategia Digital y Dev'}</p>
              </div>
              <div className="space-y-4">
                 <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-text-muted">{isEnglish ? 'Year' : 'Año'}</span>
                 <p className="text-lg font-light tracking-tight">{caseStudy.projectDetails?.year || '2025'}</p>
              </div>
           </div>
        </div>
      </section>

      {/* Block 3: The Challenge (Description) - Visual First */}
      <SectionLuxury
        category={labels.challenge}
        title={isEnglish ? 'The Critical Pain' : 'El Dolor Crítico'}
        description={situation}
        image={caseStudy.images?.[0]}
        align="full-image"
        painPoint={isEnglish ? 'Operational Inefficiency' : 'Ineficiencia Operativa'}
      />

      {/* Block 4: The Strategy (Task) - Direct */}
      <SectionLuxury
        category={labels.solution}
        title={isEnglish ? 'Tactical Engineering' : 'Ingeniería Táctica'}
        description={task}
        theme="deep"
      />


      {/* Block 5: Execution (Action) */}
      <SectionLuxury
        category={labels.execution}
        title={isEnglish ? 'Applying the A:BRA Loop' : 'Aplicando el A:BRA Loop'}
        description={action}
        image={caseStudy.images?.[0]}
        align="left"
        imagePosition="top"
      />

      {/* Block 6: Metrics Dashboard */}
      <MetricsLuxury 
        metrics={metrics}
        title={labels.results}
      />

      {/* Block 7: Gallery */}
      <div className="py-32 bg-background">
        <ImageGrid 
          images={caseStudy.images || []} 
          title={labels.visuals}
        />
      </div>

      {/* Block 8: Project Details (Credits) */}
      <ProjectDetails
        details={caseStudy.projectDetails}
        clientName={client}
      />

      {/* Navigation */}
      <NextProjectNavigation
        prev={prevProject}
        next={nextProject}
        locale={locale}
      />
    </div>
  );
}
