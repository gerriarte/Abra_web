'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { ProjectDetailsType } from '@/data/cases';

interface ProjectDetailsProps {
  details: ProjectDetailsType;
  clientName: string;
  clientUrl?: string;
  industry?: string;
}

export const ProjectDetails: React.FC<ProjectDetailsProps> = ({ details, clientName, clientUrl, industry }) => {
  const locale = useLocale();
  const isEnglish = locale === 'en';

  const labels = {
    client: isEnglish ? 'Client' : 'Cliente',
    year: isEnglish ? 'Year' : 'Año',
    duration: isEnglish ? 'Duration' : 'Duración',
    team: isEnglish ? 'Team' : 'Equipo',
    services: isEnglish ? 'Services' : 'Servicios',
    industry: isEnglish ? 'Industry' : 'Industria',
    visitSite: isEnglish ? 'Visit site' : 'Visitar sitio'
  };
  
  return (
    <section className="py-32 bg-background-off px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 lg:gap-8">
             {/* Client Identity */}
             <div className="lg:col-span-1 flex flex-col items-start">
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-text-muted mb-8 block">{labels.client}</span>
                
                {details.logo && (
                  <div className="mb-8 max-w-[200px]">
                    <img 
                      src={details.logo} 
                      alt={`${clientName} Logo`} 
                      className="w-full h-auto object-contain filter grayscale brightness-200 contrast-150"
                    />
                  </div>
                )}
                
                <h3 className="text-4xl font-light tracking-tight text-text-primary">{clientName}</h3>

                {clientUrl && (
                  <a
                    href={clientUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-text-muted hover:text-text-primary transition-colors"
                  >
                    {labels.visitSite}
                    <span aria-hidden="true">↗</span>
                  </a>
                )}

                {industry && (
                  <div className="mt-10">
                    <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-text-muted mb-3 block">{labels.industry}</span>
                    <p className="text-lg font-light tracking-tight text-text-primary">{industry}</p>
                  </div>
                )}
             </div>

             {/* Info Grid */}
             <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-16">
                
                {/* Team */}
                {details.team && details.team.length > 0 && (
                  <div>
                     <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-text-muted mb-8 block">{labels.team}</span>
                     <ul className="space-y-6">
                        {details.team.map((member, i) => (
                          <li key={i} className="flex flex-col">
                             <span className="text-lg font-light text-text-primary tracking-tight">{member.name}</span>
                             <span className="text-[10px] text-text-muted uppercase tracking-widest mt-1">{member.role}</span>
                          </li>
                        ))}
                     </ul>
                  </div>
                )}

                {/* Services */}
                 <div>
                   <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-text-muted mb-8 block">{labels.services}</span>
                   <div className="flex flex-wrap gap-2">
                      {details.services.map((service, i) => (
                        <span key={i} className="px-5 py-2.5 bg-white/5 border border-white/10 text-[9px] uppercase tracking-[0.2em] text-text-secondary rounded-full hover:bg-white/10 transition-colors">
                          {service}
                        </span>
                      ))}
                   </div>
                </div>
             </div>
          </div>
      </div>
    </section>
  );
};
