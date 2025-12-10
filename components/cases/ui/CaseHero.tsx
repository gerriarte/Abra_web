'use client';

import React from 'react';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  title: string;
  subtitle: string;
  category: string;
  backgroundImage: string;
  imageScale?: number;
}

export const CaseHero: React.FC<HeroProps> = ({ title, subtitle, category, backgroundImage, imageScale = 1 }) => {
  const scale = imageScale !== 1 ? imageScale : 1;
  
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#04213B] via-[#04213B] to-[#03182f] overflow-hidden">
      {/* Background Image with Material Design overlay */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <img 
          src={backgroundImage} 
          alt="Case Study Hero" 
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-[20000ms] ease-out"
          style={{ 
            transform: `scale(${scale})`,
            imageRendering: 'auto',
            maxWidth: scale < 1 ? `${scale * 100}%` : '100%',
            maxHeight: scale < 1 ? `${scale * 100}%` : '100%'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04213B]/80 via-[#04213B]/70 to-[#04213B]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#04213B/50_100%)]" />
      </div>

      {/* Content with Material Design typography */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white mt-12">
        <span 
          className="inline-block mb-8 text-xs tracking-[0.3em] uppercase border border-white/40 px-6 py-3 rounded-full backdrop-blur-md bg-white/5 hover:bg-white/10 transition-all duration-300 shadow-lg"
          style={{ 
            opacity: 0,
            animation: 'fadeInUp 0.8s ease-out 0.2s forwards'
          }}
        >
          {category}
        </span>
        <h1 
          className="text-6xl md:text-8xl lg:text-9xl font-light leading-[1.1] mb-4 tracking-tight"
          style={{ 
            opacity: 0,
            animation: 'fadeInUp 0.8s ease-out 0.4s forwards'
          }}
        >
          {title}
        </h1>
        <p 
          className="text-lg md:text-xl font-light tracking-wide"
          style={{ 
            opacity: 0,
            animation: 'fadeInUp 0.8s ease-out 0.6s forwards'
          }}
        >
          {subtitle === 'Monyte' ? 'Monyte.co' : subtitle}
        </p>
      </div>

      {/* Material Design Scroll Indicator */}
      <div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce text-white/80 opacity-0 animate-fade-in-up hover:text-white transition-colors duration-300"
        style={{ animationDelay: '1.2s' }}
      >
        <div className="flex flex-col items-center gap-2">
          <ArrowDown size={28} strokeWidth={1.5} className="drop-shadow-lg" />
          <div className="w-px h-8 bg-white/30 rounded-full" />
        </div>
      </div>
    </section>
  );
};

