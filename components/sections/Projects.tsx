'use client';

import { useTranslations } from 'next-intl';
import useOnScreen from '@/hooks/useOnScreen';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  image?: string;
  url?: string;
  cases?: any[];
}

export default function Projects() {
  const t = useTranslations();
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

  if (loading || !projects.length) return null;

  return (
    <section id="projects" className="bg-off overflow-hidden">
      <div className="pt-0">
        {/* Header - Contained for readability */}
        <div ref={ref} className="pt-0 mb-8 container mx-auto px-6">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl md:text-7xl font-light text-[#04213B] mb-6 tracking-tight">
              {t('projects.title')}
            </h2>
            <p className="text-lg md:text-xl text-gray-500 font-light max-w-2xl leading-relaxed">
              {t('projects.subtitle')}
            </p>
          </div>
        </div>

        {/* Persiana Americana (Accordion Slats) - FULL WIDTH */}
        <div className="flex flex-col md:flex-row h-[750px] w-full gap-0 overflow-hidden">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`relative h-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group cursor-pointer overflow-hidden ${hoveredIndex === index
                ? 'flex-[4] md:flex-[6]'
                : hoveredIndex !== null
                  ? 'flex-[0.3] md:flex-[0.5] opacity-40'
                  : 'flex-1'
                }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Background Image / Fallback */}
              <div className="absolute inset-0 bg-[#04213B]">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#04213B] to-[#0A3D6B]" />
                )}
              </div>

              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#04213B]/95 via-[#04213B]/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />

              {/* Vertical Title (when collapsed) */}
              <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-500 ${hoveredIndex === index ? 'opacity-0 scale-90' : 'opacity-100'
                }`}>
                <span className="text-white text-lg md:text-xl font-light tracking-[0.4em] uppercase whitespace-nowrap md:-rotate-90">
                  {project.title}
                </span>
              </div>

              {/* Content (when expanded) */}
              <div className={`absolute bottom-0 left-0 p-12 md:p-24 lg:p-32 w-full transition-all duration-700 delay-100 ${hoveredIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                <div className="space-y-8 max-w-2xl">
                  <div className="flex items-center gap-4">
                    <span className="h-px w-8 bg-accent"></span>
                    <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-6xl font-light text-white leading-none tracking-tighter">
                    {project.title}
                  </h3>

                  <p className="text-white/60 text-sm md:text-lg font-light leading-relaxed max-w-md">
                    {project.description}
                  </p>

                  <div className="pt-4">
                    {project.cases && project.cases[0]?.link && (
                      <Link
                        href={project.cases[0].link}
                        className="inline-flex items-center gap-4 bg-white text-[#04213B] px-8 py-4 rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-accent hover:text-white transition-all duration-500 group/btn"
                      >
                        Ver Proyecto
                        <ArrowUpRight size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Index Number */}
              <div className="absolute top-10 left-10 text-white/10 font-light text-4xl">
                {(index + 1).toString().padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          #projects div.flex-col {
            height: auto;
          }
          #projects div.relative {
            height: 100px;
          }
          #projects div.relative.flex-[4] {
            height: 480px;
          }
        }
      `}</style>
    </section>
  );
}
