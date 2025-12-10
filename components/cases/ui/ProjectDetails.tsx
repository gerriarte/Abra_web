'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { FadeIn } from './FadeIn';
import { ProjectDetailsType } from '@/data/cases';

interface ProjectDetailsProps {
  details: ProjectDetailsType;
  clientName: string;
}

export const ProjectDetails: React.FC<ProjectDetailsProps> = ({ details, clientName }) => {
  const locale = useLocale();
  const isEnglish = locale === 'en';
  const hasAdditionalInfo = details.year || details.duration || (details.team && details.team.length > 0);
  
  const labels = {
    client: isEnglish ? 'Client' : 'Cliente',
    year: isEnglish ? 'Year' : 'Año',
    duration: isEnglish ? 'Duration' : 'Duración',
    team: isEnglish ? 'Team' : 'Equipo',
    services: isEnglish ? 'Services' : 'Servicios'
  };
  
  return (
    <section className="py-24 bg-gray-50 px-6 border-y border-gray-100">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
             {/* Client Identity */}
             <div className="lg:col-span-1 flex flex-col items-start">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-6 block">{labels.client}</span>
                
                {details.logo && (
                  <div className="mb-6 max-w-[200px]">
                    <img 
                      src={details.logo} 
                      alt={`${clientName} Logo`} 
                      className="w-full h-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                )}
                
                {/* Unified font */}
                <h3 className="text-3xl font-light italic text-[#04213B]">{clientName}</h3>
             </div>

             {/* Info Grid */}
             <div className={`lg:col-span-3 ${hasAdditionalInfo ? 'grid grid-cols-1 md:grid-cols-2 gap-12' : ''}`}>
                
                {/* Duration & Year - Only show if they exist */}
                {(details.year || details.duration) && (
                  <div className="space-y-8">
                     {details.year && (
                       <div>
                          <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-2 block">{labels.year}</span>
                          <p className="text-lg text-[#04213B] font-light">{details.year}</p>
                       </div>
                     )}
                     {details.duration && (
                       <div>
                          <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-2 block">{labels.duration}</span>
                          <p className="text-lg text-[#04213B] font-light">{details.duration}</p>
                       </div>
                     )}
                  </div>
                )}

                {/* Team - Only show if team exists and has members */}
                {details.team && details.team.length > 0 && (
                  <div>
                     <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-4 block">{labels.team}</span>
                     <ul className="space-y-4">
                        {details.team.map((member, i) => (
                          <li key={i} className="flex flex-col">
                             <span className="text-base font-medium text-[#04213B]">{member.name}</span>
                             <span className="text-xs text-gray-500 uppercase tracking-wider mt-1">{member.role}</span>
                          </li>
                        ))}
                     </ul>
                  </div>
                )}

                {/* Services */}
                 <div className={`${hasAdditionalInfo ? 'md:col-span-2 border-t border-gray-200 pt-8 mt-4' : ''}`}>
                   <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-4 block">{labels.services}</span>
                   <div className="flex flex-wrap gap-3">
                      {details.services.map((service, i) => (
                        <span key={i} className="px-4 py-2 bg-white border border-gray-200 text-xs uppercase tracking-widest text-gray-600 transition-colors hover:border-gray-400 cursor-default">
                          {service}
                        </span>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

