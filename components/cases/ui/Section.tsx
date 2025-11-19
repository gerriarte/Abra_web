'use client';

import React from 'react';
import { FadeIn } from './FadeIn';

interface SectionProps {
  id: string;
  category: string;
  title: string;
  description: string;
  image?: string;
  video?: string;
  align?: 'left' | 'right';
  theme?: 'light' | 'dark';
  hasDivider?: boolean;
}

export const Section: React.FC<SectionProps> = ({ 
  id, 
  category, 
  title, 
  description, 
  image, 
  video,
  align = 'left', 
  theme = 'light',
  hasDivider = false 
}) => {
  const isDark = theme === 'dark';
  // Abra colors: Primary (#04213B) for dark background, White for light
  const bgColor = isDark ? 'bg-[#04213B]' : 'bg-white';
  const textColor = isDark ? 'text-white' : 'text-[#04213B]';
  const mutedColor = isDark ? 'text-gray-400' : 'text-gray-500';

  return (
    <section id={id} className={`relative py-24 md:py-32 px-6 md:px-12 ${bgColor} overflow-hidden`}>
      {hasDivider && !isDark && (
        <div className="absolute top-0 left-12 right-12 h-px bg-gray-100" />
      )}
      
      <div className="max-w-7xl mx-auto">
        <div className={`flex flex-col lg:flex-row gap-16 lg:gap-24 items-center ${align === 'right' ? 'lg:flex-row-reverse' : ''}`}>
          
          {/* Text Content */}
          <div className="flex-1 space-y-8">
            <FadeIn>
              <div className="flex items-center gap-4 mb-6">
                <span className={`h-px w-12 ${isDark ? 'bg-white' : 'bg-[#04213B]'}`}></span>
                <span className={`text-xs font-bold tracking-[0.2em] uppercase ${mutedColor}`}>
                  {category}
                </span>
              </div>
              {/* Removed font-serif to match Abra style */}
              <h3 className={`text-4xl md:text-5xl font-light leading-tight ${textColor}`}>
                {title}
              </h3>
            </FadeIn>
            
            <FadeIn delay={200}>
              <p className={`text-lg md:text-xl leading-relaxed font-light ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {description}
              </p>
            </FadeIn>
          </div>

          {/* Visual Content (Image or Video) */}
          <div className="flex-1 w-full">
            {image || video ? (
              <FadeIn delay={400}>
                <div className={`relative group w-full ${video ? 'aspect-video' : 'aspect-[4/5]'}`}>
                  {/* Main Image/Video Container */}
                  <div className={`relative h-full w-full overflow-hidden shadow-sm transition-all duration-700 hover:shadow-2xl ${video ? 'bg-black' : 'bg-gray-100'}`}>
                    {video ? (
                       <iframe 
                         src={video} 
                         title={title}
                         className="w-full h-full"
                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                         allowFullScreen
                       />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-[#04213B]/10 group-hover:bg-transparent z-10 transition-colors duration-700 pointer-events-none" />
                        <img 
                          src={image} 
                          alt={title} 
                          className="w-full h-full object-cover transition-all duration-[1200ms] ease-out transform group-hover:scale-110 grayscale group-hover:grayscale-0"
                        />
                      </>
                    )}
                  </div>
                  
                  {/* Decorative element with Parallax effect */}
                  <div 
                    className={`absolute -bottom-6 -right-6 w-24 h-24 border border-gray-200 z-[-1] ${isDark ? 'opacity-10' : 'opacity-100'} transition-transform duration-700 ease-out group-hover:translate-x-3 group-hover:translate-y-3`} 
                  />
                </div>
              </FadeIn>
            ) : (
               <div className="hidden lg:block flex-1" />
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

