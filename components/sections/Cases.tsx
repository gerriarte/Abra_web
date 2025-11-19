'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import useOnScreen from '@/hooks/useOnScreen';
import { useEffect, useState } from 'react';

interface ProjectCaseMetric {
  label: string;
  value: string;
  period?: string;
}

interface ProjectCaseResults {
  summary?: string;
  metrics?: ProjectCaseMetric[];
}

interface ProjectCase {
  id?: string | number;
  title: string;
  relatedServices?: string[];
  challenge?: string;
  solution?: string;
  resultsSummary?: string;
  results?: ProjectCaseResults;
  link?: string;
}

interface Project {
  id: number;
  title: string;
  category: string;
  description?: string;
  cases?: ProjectCase[];
}

interface FlattenedCase extends ProjectCase {
  projectId: number;
  projectTitle: string;
  projectCategory: string;
}

export default function Cases() {
  const t = useTranslations();
  const locale = useLocale();
  const [ref, isVisible] = useOnScreen({ threshold: 0.15 });
  const [cases, setCases] = useState<FlattenedCase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCases = async () => {
      try {
        const response = await fetch('/data/projects.json?t=' + Date.now());
        const data = await response.json();

        const flattened: FlattenedCase[] = (data.projects as Project[])
          .filter((project) => Array.isArray(project.cases) && project.cases.length > 0)
          .flatMap((project) =>
            (project.cases as ProjectCase[]).map((c) => ({
              ...c,
              projectId: project.id,
              projectTitle: project.title,
              projectCategory: project.category,
            }))
          );

        setCases(flattened);
      } catch (error) {
        console.error('Error loading cases:', error);
        setCases([]);
      } finally {
        setLoading(false);
      }
    };

    loadCases();
  }, []);

  if (loading) {
    return (
      <section id="cases" className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl text-center text-text-secondary">
            {t('cases.loading')}
          </div>
        </div>
      </section>
    );
  }

  if (cases.length === 0) {
    return (
      <section id="cases" className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl text-center text-text-secondary">
            <p>{t('cases.noCases', { defaultMessage: 'No hay casos disponibles en este momento.' })}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="cases" className="bg-white py-24">
      <div className="container mx-auto px-4">
        <div ref={ref} className="mx-auto max-w-6xl">
          {/* Title */}
          <div className="mb-12 text-center">
            <h2
              className={`text-4xl md:text-5xl font-light text-primary tracking-tight transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {t('cases.title')}
            </h2>
            <p
              className={`mt-4 text-lg font-light text-text-secondary transition-all duration-700 delay-150 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {t('cases.subtitle')}
            </p>
          </div>

          {/* Cases grid */}
          <div
            className={`grid gap-6 md:grid-cols-2 xl:grid-cols-3 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {cases.map((caseItem) => {
              const key = caseItem.id ?? `${caseItem.projectId}-${caseItem.title}`;
              const summary =
                caseItem.resultsSummary ??
                caseItem.results?.summary ??
                caseItem.challenge ??
                caseItem.solution;

              const cardContent = (
                <article
                  className={`flex h-full flex-col rounded-3xl border border-primary-light/15 bg-white/90 p-6 shadow-sm shadow-primary-light/10 transition-transform duration-300 hover:-translate-y-1 hover:shadow-md ${
                    caseItem.link ? 'cursor-pointer' : ''
                  }`}
                >
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="text-xs font-light uppercase tracking-[0.2em] text-primary-light">
                      {caseItem.projectCategory}
                    </span>
                    <span className="text-xs font-light text-text-muted">
                      {caseItem.projectTitle}
                    </span>
                  </div>

                  <h3 className="mb-3 text-lg font-medium text-primary">{caseItem.title}</h3>

                  {summary && (
                    <p className="mb-4 text-sm font-light leading-relaxed text-text-secondary">
                      {summary}
                    </p>
                  )}

                  {Array.isArray(caseItem.relatedServices) &&
                    caseItem.relatedServices.length > 0 && (
                      <div className="mb-3 flex flex-wrap gap-1.5">
                        {caseItem.relatedServices.map((service) => (
                          <span
                            key={`${key}-${service}`}
                            className="rounded-full bg-primary/5 px-2 py-0.5 text-[11px] font-light text-primary"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    )}

                  {Array.isArray(caseItem.results?.metrics) &&
                    caseItem.results?.metrics.length > 0 && (
                      <dl className="mt-auto grid grid-cols-2 gap-3 pt-3 border-t border-border-light/30">
                        {caseItem.results.metrics.slice(0, 2).map((metric, idx) => (
                          <div key={`${key}-metric-${idx}`} className="space-y-0.5">
                            <dt className="text-[11px] font-light uppercase tracking-wide text-text-muted">
                              {metric.label}
                            </dt>
                            <dd className="text-sm font-medium text-primary">
                              {metric.value}
                              {metric.period && (
                                <span className="ml-1 text-[11px] font-light text-text-muted">
                                  · {metric.period}
                                </span>
                              )}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    )}
                </article>
              );

              return (
                <div key={key} className="h-full">
                  {caseItem.link ? (
                    <Link href={`/${locale}${caseItem.link}`} className="block h-full">
                      {cardContent}
                    </Link>
                  ) : (
                    cardContent
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
