'use client';

import { useTranslations } from 'next-intl';
import useOnScreen from '@/hooks/useOnScreen';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

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
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await fetch('/data/projects.json?t=' + Date.now());
      const data = await response.json();
      setProjects(data.projects);
    } catch (error) {
      console.error('Error loading projects:', error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    goToSlide((currentIndex + 1) % projects.length);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    goToSlide((currentIndex - 1 + projects.length) % projects.length);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Scroll to current slide on mobile
  useEffect(() => {
    if (scrollContainerRef.current && window.innerWidth < 768) {
      const slideElement = scrollContainerRef.current.children[currentIndex] as HTMLElement;
      if (slideElement) {
        slideElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      }
    }
  }, [currentIndex]);


  if (loading) {
    return (
      <section id="projects" className="py-20 bg-white">
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
    <section id="projects" className="py-20 bg-white overflow-x-hidden">
      <div className="container mx-auto px-4 max-w-full">
        <div className="max-w-7xl mx-auto w-full">
          {/* Header */}
          <div ref={ref} className="mb-12 md:mb-16">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h2 className="text-3xl md:text-6xl font-light text-primary mb-2 md:mb-4 tracking-tight">
                {t('projects.title')}
              </h2>
              <p className="text-base md:text-lg text-text-secondary font-light max-w-xl">
                {t('projects.subtitle')}
              </p>
            </div>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Desktop Navigation Arrows */}
            {projects.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  disabled={isTransitioning}
                  className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-20 w-12 h-12 rounded-full bg-white border border-primary/10 shadow-lg hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Previous project"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  disabled={isTransitioning}
                  className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-20 w-12 h-12 rounded-full bg-white border border-primary/10 shadow-lg hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Next project"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Mobile Scroll Container */}
            <div 
              ref={scrollContainerRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="md:hidden flex gap-4 overflow-x-auto scrollbar-hide pb-4"
              style={{
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {projects.map((project, index) => (
                <div 
                  key={project.id}
                  className="flex-shrink-0 w-[85vw]"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <ProjectCard project={project} index={index} total={projects.length} isMobile={true} />
                </div>
              ))}
            </div>

            {/* Desktop Carousel */}
            <div className="hidden md:block relative overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {projects.map((project, index) => (
                  <div key={project.id} className="w-full flex-shrink-0 px-2">
                    <ProjectCard project={project} index={index} total={projects.length} isMobile={false} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Indicators */}
          {projects.length > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8 md:mt-12">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    goToSlide(index);
                    // Scroll to slide on mobile
                    if (scrollContainerRef.current && window.innerWidth < 768) {
                      const slideElement = scrollContainerRef.current.children[index] as HTMLElement;
                      if (slideElement) {
                        slideElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
                      }
                    }
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? 'w-8 h-2 bg-accent'
                      : 'w-2 h-2 bg-primary/20 hover:bg-primary/40'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Project Card Component
function ProjectCard({ 
  project, 
  index, 
  total, 
  isMobile 
}: { 
  project: Project; 
  index: number; 
  total: number; 
  isMobile: boolean;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
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
              
              <div className="absolute bottom-6 md:bottom-8 right-6 md:right-8 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 md:px-6 py-2 md:py-3 rounded-full flex items-center gap-2 md:gap-3 hover:bg-white hover:text-primary transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
                <span className="text-xs md:text-sm tracking-widest uppercase">Ver Caso</span>
                <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4" />
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
                className="absolute bottom-6 md:bottom-8 right-6 md:right-8 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 md:px-6 py-2 md:py-3 rounded-full flex items-center gap-2 md:gap-3 hover:bg-white hover:text-primary transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0"
              >
                <span className="text-xs md:text-sm tracking-widest uppercase">Visitar Sitio</span>
                <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4" />
              </a>
            )}
          </div>
        )}
      </div>

      {/* Info Side (5 cols) */}
      <div className="lg:col-span-5 order-1 lg:order-2 space-y-4 md:space-y-6">
        {project.cases && project.cases.length > 0 && project.cases[0].link ? (
          <Link href={project.cases[0].link} className="block group">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent">
                  {project.category}
                </span>
                <div className="h-px flex-1 bg-primary/10" />
                <span className="text-xs font-light text-text-muted">
                  {(index + 1).toString().padStart(2, '0')} / {total.toString().padStart(2, '0')}
                </span>
              </div>
              
              <h3 className="text-2xl md:text-4xl lg:text-5xl font-light text-primary leading-tight mb-4 group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              
              <p className="text-base md:text-lg text-text-secondary font-light leading-relaxed mb-4">
                {project.description}
              </p>
            </div>
          </Link>
        ) : (
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent">
                {project.category}
              </span>
              <div className="h-px flex-1 bg-primary/10" />
              <span className="text-xs font-light text-text-muted">
                {(index + 1).toString().padStart(2, '0')} / {total.toString().padStart(2, '0')}
              </span>
            </div>
            
            <h3 className="text-2xl md:text-4xl lg:text-5xl font-light text-primary leading-tight mb-4">
              {project.title}
            </h3>
            
            <p className="text-base md:text-lg text-text-secondary font-light leading-relaxed mb-4">
              {project.description}
            </p>
          </div>
        )}

        {/* Mini Cases List - Minimalist */}
        {Array.isArray(project.cases) && project.cases.length > 0 && (
          <div className="border-t border-primary/10 pt-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4">
              Casos Destacados
            </h4>
            <div className="space-y-3">
              {project.cases.slice(0, 2).map((caseItem) => (
                caseItem.link ? (
                  <Link key={caseItem.id} href={caseItem.link} className="block group cursor-pointer">
                    <div className="flex items-baseline justify-between mb-1">
                      <h5 className="text-base font-medium text-primary group-hover:text-accent transition-colors">
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
                    <div className="flex items-baseline justify-between mb-1">
                      <h5 className="text-base font-medium text-primary group-hover:text-accent transition-colors">
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
  );
}
