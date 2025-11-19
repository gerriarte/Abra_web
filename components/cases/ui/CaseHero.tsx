'use client';

import React from 'react';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  title: string;
  subtitle: string;
  category: string;
  backgroundImage: string;
}

export const CaseHero: React.FC<HeroProps> = ({ title, subtitle, category, backgroundImage }) => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#04213B]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={backgroundImage} 
          alt="Case Study Hero" 
          className="w-full h-full object-cover animate-zoom-out opacity-60"
        />
        <div className="absolute inset-0 bg-[#04213B]/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white mt-12">
        <span 
          className="inline-block mb-6 text-xs tracking-[0.25em] uppercase border border-white/30 px-4 py-2 rounded-full backdrop-blur-sm opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
        >
          {category}
        </span>
        <h2 
          className="text-xl md:text-2xl font-light mb-4 tracking-wide opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.4s' }}
        >
          {subtitle}
        </h2>
        <h1 
          className="text-5xl md:text-7xl lg:text-8xl font-light leading-tight mb-8 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.6s' }}
        >
          {title}
        </h1>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce text-white/70 opacity-0 animate-fade-in-up"
        style={{ animationDelay: '1.2s' }}
      >
        <ArrowDown size={24} strokeWidth={1} />
      </div>
    </section>
  );
};

