'use client';

import React from 'react';
import { Metric } from '@/data/cases';
import { FadeIn } from './FadeIn';

interface StatsProps {
  stats: Metric[];
}

export const Stats: React.FC<StatsProps> = ({ stats }) => {
  // Abra Dark BG
  return (
    <section id="results" className="py-32 bg-[#04213B] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="text-center mb-20">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 block mb-4">
              Resultados
            </span>
            {/* Unified font */}
            <h2 className="text-4xl md:text-6xl font-light">Impacto Medible</h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 border-t border-white/10 pt-16">
          {stats.map((stat, index) => (
            <FadeIn key={index} delay={index * 150}>
              <div className="text-center group cursor-default">
                <div className="text-6xl md:text-7xl font-light mb-4 tracking-tight text-white group-hover:text-gray-300 transition-colors">
                  {stat.prefix}{stat.value}<span className="text-4xl text-gray-500 ml-1">{stat.suffix}</span>
                </div>
                <p className="text-sm font-medium tracking-widest uppercase text-gray-400 group-hover:text-white transition-colors">
                  {stat.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

