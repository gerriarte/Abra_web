'use client';

import { useTranslations } from 'next-intl';
import useOnScreen from '@/hooks/useOnScreen';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

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
  description: string;
  category: string;
  image?: string;
  url?: string;
  cases?: ProjectCase[];
}

export default function Projects() {
  const t = useTranslations();
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  // Auto-rotation effect
  useEffect(() => {
    if (loading || isPaused || projects.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [loading, isPaused, projects.length]);

  const loadProjects = async () => {
    try {
      const response = await fetch('/data/projects.json?t=' + Date.now());
      const data = await response.json();
      setProjects(data.projects);
    } catch (error) {
      console.error('Error loading projects:', error);
      // Fallback to basic data if fetch fails
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
    setIsPaused(true);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    setIsPaused(true);
  };

  if (loading) {
    return (
      <section id="projects" className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto text-center text-text-secondary">
            Cargando proyectos...
          </div>
        </div>
      </section>
    );
  }

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section id="projects" className="py-32 bg-white overflow-x-hidden">
      <div className="container mx-auto px-4 max-w-full">
        <div className="max-w-7xl mx-auto w-full">
          {/* Header */}
          <div ref={ref} className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h2 className="text-4xl md:text-6xl font-light text-primary mb-4 tracking-tight">
                {t('projects.title')}
              </h2>
              <p className="text-lg text-text-secondary font-light max-w-xl">
                {t('projects.subtitle')}
              </p>
            </div>
            
            {/* Controls */}
            {projects.length > 1 && (
              <div className="flex items-center gap-4">
                <button 
                  onClick={prevSlide}
                  className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 group"
                  aria-label="Previous project"
                >
                  <ArrowRight className="w-5 h-5 rotate-180" />
                </button>
                <button 
                  onClick={nextSlide}
                  className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 group"
                  aria-label="Next project"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Project Slider */}
          <div className="relative min-h-[600px]">
            {projects.map((project, index) => {
              const isActive = index === currentIndex;
              const isPrev = index === (currentIndex - 1 + projects.length) % projects.length;
              const isNext = index === (currentIndex + 1) % projects.length;
              
              // Determine visibility state
              let positionClass = 'opacity-0 pointer-events-none absolute inset-0 z-0 scale-95';
              if (isActive) positionClass = 'opacity-100 z-20 relative scale-100';
              
              return (
                <div 
                  key={project.id}
                  className={`transition-all duration-700 ease-in-out ${positionClass}`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                    
                    {/* Visual Side (7 cols) */}
                    <div className="lg:col-span-7 order-2 lg:order-1">
                      {project.cases && project.cases.length > 0 && project.cases[0].link ? (
                        <Link href={project.cases[0].link} className="block">
                          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
                            {project.image ? (
                              <img 
                                src={project.image} 
                                alt={project.title}
                                className={`h-full transition-transform duration-1000 group-hover:scale-105 ${
                                  project.id === 5 || project.title === 'Invia 1912' 
                                    ? 'object-contain w-[80%] mx-auto' 
                                    : 'object-cover w-full'
                                }`}
                              />
                            ) : (
                              <div className="w-full h-full bg-primary-dark flex items-center justify-center">
                                <span className="text-white/10 text-9xl font-serif italic">{project.title.charAt(0)}</span>
                              </div>
                            )}
                            
                            {/* Overlay Content */}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-60 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500" />
                            
                            <div className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full flex items-center gap-3 hover:bg-white hover:text-primary transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
                              <span className="text-sm tracking-widest uppercase">Ver Caso</span>
                              <ArrowUpRight className="w-4 h-4" />
                            </div>
                          </div>
                        </Link>
                      ) : (
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group">
                          {project.image ? (
                            <img 
                              src={project.image} 
                              alt={project.title}
                              className={`h-full transition-transform duration-1000 group-hover:scale-105 ${
                                project.id === 5 || project.title === 'Invia 1912' 
                                  ? 'object-contain w-[80%] mx-auto' 
                                  : 'object-cover w-full'
                              }`}
                            />
                          ) : (
                              <div className="w-full h-full bg-primary-dark flex items-center justify-center">
                                <span className="text-white/10 text-9xl font-serif italic">{project.title.charAt(0)}</span>
                              </div>
                            )}
                          
                          {/* Overlay Content */}
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-60 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500" />
                          
                          {project.url && (
                            <a 
                              href={project.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full flex items-center gap-3 hover:bg-white hover:text-primary transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0"
                            >
                              <span className="text-sm tracking-widest uppercase">Visitar Sitio</span>
                              <ArrowUpRight className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Info Side (5 cols) */}
                    <div className="lg:col-span-5 order-1 lg:order-2 space-y-8">
                      {project.cases && project.cases.length > 0 && project.cases[0].link ? (
                        <Link href={project.cases[0].link} className="block group">
                          <div>
                            <div className="flex items-center gap-4 mb-6">
                              <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent">
                                {project.category}
                              </span>
                              <div className="h-px flex-1 bg-primary/10" />
                              <span className="text-xs font-light text-text-muted">
                                {(currentIndex + 1).toString().padStart(2, '0')} / {projects.length.toString().padStart(2, '0')}
                              </span>
                            </div>
                            
                            <h3 className="text-4xl md:text-5xl font-light text-primary leading-tight mb-6 group-hover:text-accent transition-colors">
                              {project.title}
                            </h3>
                            
                            <p className="text-lg text-text-secondary font-light leading-relaxed mb-8">
                              {project.description}
                            </p>
                          </div>
                        </Link>
                      ) : (
                        <div>
                          <div className="flex items-center gap-4 mb-6">
                            <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent">
                              {project.category}
                            </span>
                            <div className="h-px flex-1 bg-primary/10" />
                            <span className="text-xs font-light text-text-muted">
                              {(currentIndex + 1).toString().padStart(2, '0')} / {projects.length.toString().padStart(2, '0')}
                            </span>
                          </div>
                          
                          <h3 className="text-4xl md:text-5xl font-light text-primary leading-tight mb-6">
                            {project.title}
                          </h3>
                          
                          <p className="text-lg text-text-secondary font-light leading-relaxed mb-8">
                            {project.description}
                          </p>
                        </div>
                      )}

                      {/* Mini Cases List - Minimalist */}
                      {Array.isArray(project.cases) && project.cases.length > 0 && (
                        <div className="border-t border-primary/10 pt-8">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-6">
                            Casos Destacados
                          </h4>
                          <div className="space-y-4">
                            {project.cases.slice(0, 2).map((caseItem) => (
                              caseItem.link ? (
                                <Link key={caseItem.id} href={caseItem.link} className="block group cursor-pointer">
                                  <div className="flex items-baseline justify-between mb-2">
                                    <h5 className="text-lg font-medium text-primary group-hover:text-accent transition-colors">
                                      {caseItem.title}
                                    </h5>
                                    <ArrowUpRight className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                                  </div>
                                  <div className="flex gap-4 text-sm font-light text-text-secondary">
                                    {caseItem.results?.metrics?.slice(0, 2).map((metric, idx) => (
                                      <div key={idx} className="flex items-center gap-2">
                                        <span className="w-1 h-1 rounded-full bg-accent" />
                                        <span>{metric.label}: <strong className="font-medium text-primary">{metric.value}</strong></span>
                                      </div>
                                    ))}
                                  </div>
                                </Link>
                              ) : (
                                <div key={caseItem.id} className="group cursor-default">
                                  <div className="flex items-baseline justify-between mb-2">
                                    <h5 className="text-lg font-medium text-primary group-hover:text-accent transition-colors">
                                      {caseItem.title}
                                    </h5>
                                  </div>
                                  <div className="flex gap-4 text-sm font-light text-text-secondary">
                                    {caseItem.results?.metrics?.slice(0, 2).map((metric, idx) => (
                                      <div key={idx} className="flex items-center gap-2">
                                        <span className="w-1 h-1 rounded-full bg-accent" />
                                        <span>{metric.label}: <strong className="font-medium text-primary">{metric.value}</strong></span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Progress Bar */}
          <div className="mt-16 h-1 w-full bg-primary/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent transition-all duration-500 ease-out"
              style={{ width: `${((currentIndex + 1) / projects.length) * 100}%` }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
