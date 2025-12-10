import React from 'react';
import { notFound } from 'next/navigation';
import { CaseHero } from '@/components/cases/ui/CaseHero';
import { Section } from '@/components/cases/ui/Section';
import { ImageGrid } from '@/components/cases/ui/ImageGrid';
import { TableOfContents } from '@/components/cases/ui/TableOfContents';
import { ProjectDetails } from '@/components/cases/ui/ProjectDetails';
import { CASES_DATA } from '@/data/cases';

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug, locale } = await params;
  const caseStudy = CASES_DATA[slug];

  if (!caseStudy) {
    return {
      title: locale === 'en' ? 'Case Study Not Found | Abra' : 'Caso de Estudio No Encontrado | Abra',
    };
  }

  const isEnglish = locale === 'en';
  const title = isEnglish && caseStudy.titleEn ? caseStudy.titleEn : caseStudy.title;
  const description = isEnglish && caseStudy.brandDescriptionEn ? caseStudy.brandDescriptionEn : caseStudy.brandDescription;

  const pageTitle = slug === 'monyte' 
    ? `${title} | Monyte.co`
    : slug === 'securitas'
    ? `${title} | Securitas`
    : slug === 'rac'
    ? `${title} | RealArt Crypto`
    : `${title} | ${isEnglish ? 'Abra Case Study' : 'Caso de Estudio Abra'}`;

  return {
    title: pageTitle,
    description,
  };
}

export function generateStaticParams() {
  return Object.keys(CASES_DATA).map((slug) => ({
    slug,
  }));
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const caseStudy = CASES_DATA[slug];

  if (!caseStudy) {
    notFound();
  }

  // Get localized content
  const isEnglish = locale === 'en';
  const title = isEnglish && caseStudy.titleEn ? caseStudy.titleEn : caseStudy.title;
  const brandDescription = isEnglish && caseStudy.brandDescriptionEn ? caseStudy.brandDescriptionEn : caseStudy.brandDescription;
  const situation = isEnglish && caseStudy.situationEn ? caseStudy.situationEn : caseStudy.situation;
  const task = isEnglish && caseStudy.taskEn ? caseStudy.taskEn : caseStudy.task;
  const action = isEnglish && caseStudy.actionEn ? caseStudy.actionEn : caseStudy.action;
  const results = isEnglish && caseStudy.resultsEn ? caseStudy.resultsEn : caseStudy.results;
  const projectDetails = isEnglish && caseStudy.projectDetailsEn ? caseStudy.projectDetailsEn : caseStudy.projectDetails;

  // Localized labels
  const labels = {
    brand: isEnglish ? 'Brand' : 'Marca',
    situation: isEnglish ? 'Situation' : 'Situación',
    situationTitle: isEnglish ? 'The Challenge' : 'El Desafío',
    task: isEnglish ? 'Task' : 'Tarea',
    taskTitle: isEnglish ? 'Clear Objectives' : 'Objetivos Claros',
    action: isEnglish ? 'Action' : 'Acción',
    actionTitle: isEnglish ? 'Strategic Execution' : 'Ejecución Estratégica',
    visuals: isEnglish ? 'Project Visuals' : 'Visuales del Proyecto'
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <TableOfContents />
      
      <CaseHero 
        title={title}
        subtitle={caseStudy.client}
        backgroundImage={caseStudy.heroImage || "https://picsum.photos/1920/1080?grayscale"}
        category={
          slug === 'monyte' 
            ? (isEnglish ? 'Branding' : 'Branding')
            : slug === 'securitas'
            ? (isEnglish ? 'User Experience' : 'Experiencia de Usuario')
            : slug === 'rac'
            ? (isEnglish ? 'User Experience' : 'Experiencia de Usuario')
            : (projectDetails.services[0] || (isEnglish ? 'Case Study' : 'Caso de Estudio'))
        }
        imageScale={slug === 'monyte' || slug === 'securitas' || slug === 'rac' ? 0.7 : 1}
      />

      {/* Marca / Intro */}
      <Section 
        id="brand"
        category={labels.brand}
        title={caseStudy.client}
        description={brandDescription}
        align="left"
      />

      {/* Situación */}
      <Section 
        id="situation"
        category={labels.situation}
        title={labels.situationTitle}
        description={situation}
        image={slug === 'monyte' ? '/monyte/monyte-dashboard.png' : slug === 'securitas' ? '/Securitas/Dashboard.png' : slug === 'rac' ? '/RAC/Dashboard.png' : "https://picsum.photos/800/1000?random=1"}
        align="right"
        hasDivider
        floatingImage={slug === 'monyte' || slug === 'securitas' || slug === 'rac'}
        imageAspect="auto"
      />

      {/* Tarea */}
      <Section 
        id="task"
        category={labels.task}
        title={labels.taskTitle}
        description={task}
        align="left"
        theme="dark"
      />

      {/* Acción */}
      <Section 
        id="action"
        category={labels.action}
        title={labels.actionTitle}
        description={action}
        image={slug === 'monyte' ? '/monyte/monyte-marca.png' : slug === 'securitas' ? '/Securitas/Log securitas.png' : slug === 'rac' ? '/RAC/Logo.png' : "https://picsum.photos/800/1000?random=2"} 
        align="right"
        floatingImage={slug === 'monyte' || slug === 'securitas' || slug === 'rac'}
        imageAspect="auto"
        imageMaxWidth={slug === 'rac' ? '60%' : '75%'}
      />

      <ProjectDetails 
        details={projectDetails} 
        clientName={caseStudy.client} 
      />

      <ImageGrid images={caseStudy.images} title={labels.visuals} />
      
    </div>
  );
}

