'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

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
  image?: string; // Added specific case image
}

interface Project {
  id: number;
  title: string;
  category: string;
  description?: string;
  image?: string; // Project level image
  cases?: ProjectCase[];
}

interface FlattenedCase extends ProjectCase {
  projectId: number;
  projectTitle: string;
  projectCategory: string;
  projectImage?: string;
}

export default function CasesPage() {
  const t = useTranslations();
  const locale = useLocale();
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
              projectImage: project.image
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

  // Generate a deterministic gradient based on string
  const getGradient = (str: string) => {
    const hash = str.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
    const hue = Math.abs(hash % 360);
    return `linear-gradient(135deg, hsl(${hue}, 25%, 20%) 0%, hsl(${hue}, 30%, 10%) 100%)`;
  };

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="pt-40 pb-32 px-6 md:px-12 bg-[#04213B] text-white rounded-b-[3rem] md:rounded-b-[5rem] relative overflow-hidden max-w-full">
        {/* Abstract background element */}
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-white blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-6xl md:text-8xl font-light mb-8 tracking-tight animate-fade-in-up">
            {t('cases.title')}
          </h1>
          <p 
            className="text-xl md:text-2xl font-light text-white/80 max-w-3xl leading-relaxed animate-fade-in-up" 
            style={{ animationDelay: '0.2s' }}
          >
            {t('cases.subtitle')}
          </p>
        </div>
      </section>

      {/* Cases Grid */}
      <section className="px-6 md:px-12 pb-24 -mt-20 relative z-20">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="bg-white rounded-3xl p-12 shadow-xl min-h-[400px] flex items-center justify-center">
              <div className="text-text-secondary font-light animate-pulse">{t('cases.loading')}</div>
            </div>
          ) : cases.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 shadow-xl text-center">
              <p className="text-text-secondary">{t('cases.noCases', { defaultMessage: 'No hay casos disponibles.' })}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {cases.map((caseItem, index) => {
                const key = caseItem.id ?? `${caseItem.projectId}-${caseItem.title}`;
                const summary =
                  caseItem.resultsSummary ??
                  caseItem.results?.summary ??
                  caseItem.challenge ??
                  caseItem.solution;
                
                const imageSrc = caseItem.image || caseItem.projectImage;
                const hasLink = !!caseItem.link;

                const CardWrapper = ({ children }: { children: React.ReactNode }) => (
                  hasLink ? (
                    <Link href={`/${locale}${caseItem.link}`} className="block h-full group">
                      {children}
                    </Link>
                  ) : (
                    <div className="h-full cursor-default">{children}</div>
                  )
                );

                return (
                  <div 
                    key={key}
                    className={`animate-fade-in-up ${index % 2 === 1 ? 'md:mt-12' : ''}`}
                    style={{ animationDelay: `${0.2 + (index * 0.1)}s` }}
                  >
                    <CardWrapper>
                      <article className="bg-white h-full flex flex-col overflow-hidden transition-transform duration-500 hover:-translate-y-2">
                        
                        {/* Visual / Image Area */}
                        <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl relative shadow-lg mb-8 group-hover:shadow-2xl transition-all duration-500">
                          {imageSrc ? (
                            <img 
                              src={imageSrc} 
                              alt={caseItem.title} 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          ) : (
                            <div 
                              className="w-full h-full flex items-center justify-center p-8 transition-transform duration-700 group-hover:scale-105"
                              style={{ background: getGradient(caseItem.title) }}
                            >
                               <span className="text-white/20 font-serif text-9xl italic select-none opacity-50">
                                 {caseItem.title.charAt(0)}
                               </span>
                            </div>
                          )}
                          
                          {/* Overlay for Link Indication */}
                          {hasLink && (
                            <div className="absolute top-4 right-4 w-12 h-12 bg-accent/90 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg">
                               <ArrowUpRight className="text-white w-6 h-6" />
                            </div>
                          )}
                          
                          {/* Category Badge */}
                          <div className="absolute top-4 left-4 px-4 py-2 bg-[#04213B]/80 backdrop-blur-sm rounded-full border border-white/10">
                             <span className="text-xs font-bold uppercase tracking-[0.15em] text-accent">
                                {caseItem.projectCategory}
                             </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 flex flex-col px-2">
                          <h3 className="text-2xl md:text-3xl font-light text-[#04213B] mb-4 leading-tight group-hover:text-accent transition-colors duration-300">
                            {caseItem.title}
                          </h3>
                          
                          {summary && (
                            <p className="text-text-secondary font-light text-lg leading-relaxed mb-6 line-clamp-3">
                              {summary}
                            </p>
                          )}

                          {/* Tags */}
                          {Array.isArray(caseItem.relatedServices) && caseItem.relatedServices.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-8">
                              {caseItem.relatedServices.map((service) => (
                                <span
                                  key={`${key}-${service}`}
                                  className="px-3 py-1 text-[11px] uppercase tracking-widest border border-[#04213B]/10 rounded-full text-text-muted bg-gray-50"
                                >
                                  {service}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Metrics Grid - Compact */}
                          {Array.isArray(caseItem.results?.metrics) && caseItem.results?.metrics.length > 0 && (
                            <div className="mt-auto grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                               {caseItem.results.metrics.slice(0, 2).map((metric, i) => (
                                 <div key={i}>
                                    <div className="text-2xl font-light text-[#04213B]">{metric.value}</div>
                                    <div className="text-[10px] uppercase tracking-widest text-text-muted mt-1">{metric.label}</div>
                                 </div>
                               ))}
                            </div>
                          )}
                        </div>
                      </article>
                    </CardWrapper>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
