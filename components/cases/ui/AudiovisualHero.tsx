'use client';

import React from 'react';
import { ArrowDown } from 'lucide-react';
import { FadeIn } from './FadeIn';

interface AudiovisualHeroProps {
    title: string;
    category: string;
    backgroundImage: string;
    partnerLogo?: string;
    partnerName?: string;
}

export const AudiovisualHero: React.FC<AudiovisualHeroProps> = ({
    title,
    category,
    backgroundImage,
    partnerLogo,
    partnerName
}) => {
    return (
        <section className="relative h-screen w-full flex items-center justify-center bg-black overflow-hidden">
            {/* Cinematic Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src={backgroundImage}
                    alt={title}
                    className="w-full h-full object-cover opacity-60 scale-105 animate-slow-zoom"
                    style={{
                        filter: 'contrast(1.1) brightness(0.8)',
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                <FadeIn delay={200}>
                    <div className="flex flex-col items-center">
                        <span className="text-white/60 text-[10px] tracking-[0.4em] uppercase mb-6 font-medium border border-white/20 px-4 py-1.5 rounded-full backdrop-blur-sm">
                            {category}
                        </span>

                        <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-extralight text-white leading-none tracking-tighter mb-8 bg-clip-text">
                            {title}
                        </h1>

                        {partnerLogo && (
                            <div className="flex items-center gap-4 mt-8 py-4 px-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                                <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-medium">Produced with</p>
                                <img src={partnerLogo} alt={partnerName} className="h-8 md:h-10 w-auto object-contain opacity-80" />
                            </div>
                        )}
                    </div>
                </FadeIn>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/30 animate-pulse">
                <span className="text-[10px] uppercase tracking-[0.5em] rotate-90 mb-8 origin-left translate-x-1/2">Scroll</span>
                <ArrowDown size={20} strokeWidth={1} />
            </div>

            <style jsx global>{`
        @keyframes slowZoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
        .animate-slow-zoom {
          animation: slowZoom 20s ease-out forwards;
        }
      `}</style>
        </section>
    );
};
