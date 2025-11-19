import React from 'react';
import { notFound } from 'next/navigation';
import { CaseHero } from '@/components/cases/ui/CaseHero';
import { Section } from '@/components/cases/ui/Section';
import { Stats } from '@/components/cases/ui/Stats';
import { ImageGrid } from '@/components/cases/ui/ImageGrid';
import { TableOfContents } from '@/components/cases/ui/TableOfContents';
import { ProjectDetails } from '@/components/cases/ui/ProjectDetails';
import { CASES_DATA } from '@/data/cases';

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = CASES_DATA[slug];

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found | Abra',
    };
  }

  return {
    title: `${caseStudy.title} | Abra Case Study`,
    description: caseStudy.brandDescription,
  };
}

export function generateStaticParams() {
  return Object.keys(CASES_DATA).map((slug) => ({
    slug,
  }));
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = CASES_DATA[slug];

  if (!caseStudy) {
    notFound();
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white">
      <TableOfContents />
      
      <CaseHero 
        title={caseStudy.title}
        subtitle={caseStudy.client}
        backgroundImage="https://picsum.photos/1920/1080?grayscale"
        category={caseStudy.projectDetails.services[0] || 'Case Study'}
      />

      {/* Marca / Intro */}
      <Section 
        id="brand"
        category="Marca"
        title={caseStudy.client}
        description={caseStudy.brandDescription}
        align="left"
      />

      {/* Situación */}
      <Section 
        id="situation"
        category="Situación"
        title="El Desafío"
        description={caseStudy.situation}
        image="https://picsum.photos/800/1000?random=1"
        align="right"
        hasDivider
      />

      {/* Tarea */}
      <Section 
        id="task"
        category="Tarea"
        title="Objetivos Claros"
        description={caseStudy.task}
        align="left"
        theme="dark"
      />

      {/* Acción */}
      <Section 
        id="action"
        category="Acción"
        title="Ejecución Estratégica"
        description={caseStudy.action}
        // Solo mostramos video si existe (placeholder por ahora usa imagen en Section si no hay video)
        // Para este ejemplo dinamico, usaremos imagen a menos que definamos video en data
        image="https://picsum.photos/800/1000?random=2" 
        align="right"
      />

      <ProjectDetails 
        details={caseStudy.projectDetails} 
        clientName={caseStudy.client} 
      />

      <ImageGrid />

      {/* Resultado */}
      <Stats stats={caseStudy.results} />
      
    </div>
  );
}

