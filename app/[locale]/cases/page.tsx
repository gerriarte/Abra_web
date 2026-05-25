'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { CASES_DATA } from '@/data/cases';

export default function CasesPage() {
  const t = useTranslations('cases');
  const locale = useLocale();
  const [filter, setFilter] = useState('all');

  const categories = [
    { id: 'all', label: locale === 'es' ? 'Todos' : 'All' },
    { id: 'Growth', label: 'Growth' },
    { id: 'Branding', label: 'Branding' },
    { id: 'UX/UI', label: 'Engineering' },
    { id: 'Crypto', label: 'Web3' },
  ];

  const allCases = Object.entries(CASES_DATA)
    .filter(([slug]) => !['duvyclass', 'gea-beauty', 'praxis-school', 'message-boutique'].includes(slug))
    .map(([slug, data]) => ({
      slug,
      ...data,
    }));

  const filteredCases = filter === 'all' 
    ? allCases 
    : allCases.filter(c => 
        c.projectDetails.services.some(s => s.toLowerCase().includes(filter.toLowerCase())) ||
        c.client.toLowerCase().includes(filter.toLowerCase())
      );

  return (
    <div className="bg-background min-h-screen overflow-x-hidden pt-32 pb-40">
      {/* Aperture Background Layers */}
      <div className="nebula-glow opacity-20" />
      <div className="spatial-grid opacity-[0.03]" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header */}
        <header className="mb-24 text-center">
           <motion.span 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-[9px] font-mono tracking-[0.5em] uppercase text-text-muted mb-6 block"
           >
             {t('eyebrow')}
           </motion.span>
           <motion.h1 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-6xl md:text-8xl font-light tracking-tight mb-12"
           >
             {t('title')}
           </motion.h1>
           <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="text-xl text-text-secondary font-light max-w-3xl mx-auto leading-relaxed"
           >
             {t('subtitle')}
           </motion.p>
        </header>

        {/* Tactical Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-24">
           {categories.map((cat, idx) => (
             <motion.button
               key={cat.id}
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.3 + (idx * 0.05) }}
               onClick={() => setFilter(cat.id)}
               className={`px-8 py-3 rounded-full text-[10px] font-mono uppercase tracking-widest transition-all duration-500 border ${
                 filter === cat.id 
                 ? 'bg-white text-background border-white' 
                 : 'bg-white/5 text-text-muted border-white/10 hover:border-white/30'
               }`}
             >
               {cat.label}
             </motion.button>
           ))}
        </div>

        {/* Visual-First Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          <AnimatePresence mode="popLayout">
            {filteredCases.map((project, index) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                <Link href={`/${locale}/case-studies/${project.slug}`} className="group block">
                   <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden border border-white/5 mb-8 shadow-2xl transition-all duration-700 hover:border-white/20">
                      {/* Image Layer */}
                      <div className="absolute inset-0">
                         <img 
                           src={project.heroImage || ''} 
                           alt={project.client} 
                           className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out"
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                      </div>

                      {/* Overlays */}
                      <div className="absolute inset-0 p-10 flex flex-col justify-between z-10">
                         <div className="flex justify-between items-start">
                            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 group-hover:text-white transition-colors">
                              {project.projectDetails?.services[0]}
                            </span>
                            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                               <span className="text-white text-xl">→</span>
                            </div>
                         </div>
                         
                         <div>
                            <h3 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-2">
                               {project.client}
                            </h3>
                            <div className="flex gap-4">
                               {project.results?.slice(0, 2).map((m, i) => (
                                 <div key={i} className="flex flex-col">
                                    <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">{m.label}</span>
                                    <span className="text-xl font-light text-white tracking-tighter">{m.value}{m.suffix}</span>
                                 </div>
                               ))}
                            </div>
                         </div>
                      </div>
                   </div>
                   
                   {/* Description (tactical/short) */}
                   <p className="text-lg text-text-secondary font-light leading-relaxed px-2 line-clamp-2">
                      {locale === 'es' ? project.brandDescription : (project.brandDescriptionEn || project.brandDescription)}
                   </p>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
