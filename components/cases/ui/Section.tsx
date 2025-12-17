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
  floatingImage?: boolean;
  imageAspect?: string;
  imageMaxWidth?: string;
  imageLink?: string;
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
  hasDivider = false,
  floatingImage = false,
  imageAspect = 'aspect-[4/5]',
  imageMaxWidth = '75%',
  imageLink
}) => {
  const isDark = theme === 'dark';
  // Abra colors: Primary (#04213B) for dark background, White for light
  const bgColor = isDark ? 'bg-[#04213B]' : 'bg-white';
  const textColor = isDark ? 'text-white' : 'text-[#04213B]';
  const mutedColor = isDark ? 'text-gray-400' : 'text-gray-500';

  return (
    <section id={id} className={`relative py-24 md:py-32 px-6 md:px-12 ${bgColor}`}>
      {hasDivider && !isDark && (
        <div className="absolute top-0 left-12 right-12 h-px bg-gray-100" />
      )}
      
      <div className="max-w-7xl mx-auto">
        <div className={`flex flex-col lg:flex-row gap-16 lg:gap-24 ${floatingImage ? 'items-start' : 'items-center'} ${align === 'right' ? 'lg:flex-row-reverse' : ''}`}>
          
          {/* Text Content */}
          <div className={`flex-1 space-y-8 ${floatingImage ? 'lg:pt-8' : ''}`}>
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
          <div className={`flex-1 w-full ${floatingImage ? 'lg:pl-8' : ''}`}>
            {image || video ? (
              <FadeIn delay={400}>
                {floatingImage && image ? (
                  // Floating image without container - full quality, modern composition
                  <div className="relative group w-full flex justify-center">
                    <div className="relative overflow-visible" style={{ maxWidth: imageMaxWidth }}>
                      {imageLink ? (
                        <a 
                          href={imageLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block cursor-pointer"
                        >
                          <img 
                            src={image} 
                            alt={title} 
                            loading="eager"
                            decoding="async"
                            className="w-full h-auto object-contain transition-all duration-[1200ms] ease-out transform group-hover:scale-[1.01]"
                            style={{ 
                              imageRendering: 'auto',
                              filter: 'drop-shadow(0 35px 70px -12px rgba(0, 0, 0, 0.35))',
                              maxWidth: '100%',
                              height: 'auto',
                              willChange: 'transform'
                            }}
                          />
                        </a>
                      ) : (
                        <img 
                          src={image} 
                          alt={title} 
                          loading="eager"
                          decoding="async"
                          className="w-full h-auto object-contain transition-all duration-[1200ms] ease-out transform group-hover:scale-[1.01]"
                          style={{ 
                            imageRendering: 'auto',
                            filter: 'drop-shadow(0 35px 70px -12px rgba(0, 0, 0, 0.35))',
                            maxWidth: '100%',
                            height: 'auto',
                            willChange: 'transform'
                          }}
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <div className={`relative group w-full ${video ? 'aspect-video' : imageAspect}`}>
                    {/* Main Image/Video Container - Material Design Elevation */}
                    <div className={`relative h-full w-full overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-out ${video ? 'bg-black' : 'bg-gray-100'}`}>
                      {video ? (
                         <iframe 
                           src={video} 
                           title={title}
                           className="w-full h-full rounded-2xl"
                           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                           allowFullScreen
                         />
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-t from-[#04213B]/20 via-transparent to-transparent group-hover:from-transparent z-10 transition-all duration-700 pointer-events-none rounded-2xl" />
                          {imageLink ? (
                            <a 
                              href={imageLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="block w-full h-full cursor-pointer"
                            >
                              <img 
                                src={image} 
                                alt={title} 
                                loading="eager"
                                className="w-full h-full object-cover transition-all duration-[1200ms] ease-out transform group-hover:scale-105 rounded-2xl"
                                style={{ imageRendering: 'auto' }}
                              />
                            </a>
                          ) : (
                            <img 
                              src={image} 
                              alt={title} 
                              loading="eager"
                              className="w-full h-full object-cover transition-all duration-[1200ms] ease-out transform group-hover:scale-105 rounded-2xl"
                              style={{ imageRendering: 'auto' }}
                            />
                          )}
                        </>
                      )}
                    </div>
                    
                    {/* Material Design Decorative element */}
                    <div 
                      className={`absolute -bottom-4 -right-4 w-20 h-20 rounded-lg border-2 ${isDark ? 'border-white/20' : 'border-[#04213B]/20'} z-[-1] transition-all duration-500 ease-out group-hover:translate-x-2 group-hover:translate-y-2 group-hover:border-[#04213B]/40`} 
                    />
                  </div>
                )}
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

