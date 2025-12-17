'use client';

import React from 'react';
import { FadeIn } from './FadeIn';

interface ImageGridProps {
  images?: string[];
  title?: string;
  imageLink?: string;
}

export const ImageGrid: React.FC<ImageGridProps> = ({ 
  images = [
    'https://picsum.photos/600/800?random=10',
    'https://picsum.photos/600/800?random=11',
    'https://picsum.photos/600/800?random=12'
  ],
  title = 'Visuales de Campaña',
  imageLink
}) => {
  const displayImages = images.slice(0, 3);
  const isSingleImage = displayImages.length === 1;
  const isTwoImages = displayImages.length === 2;
  
  return (
    <section className="pt-24 pb-0 bg-gradient-to-b from-gray-50 via-white to-transparent px-6 overflow-x-hidden relative" style={{ zIndex: 1 }}>
      <div className={`mx-auto ${isTwoImages ? 'max-w-full' : isSingleImage ? 'max-w-7xl' : 'max-w-5xl'} w-full`}>
        <FadeIn>
          <h3 className="text-center text-gray-500 text-xs tracking-[0.2em] uppercase mb-16 font-medium">
            {title}
          </h3>
        </FadeIn>
        {isSingleImage ? (
          // Single image layout - increased 150% (from 80% to 120% of container width)
          <div className="relative flex justify-center items-center" style={{ paddingBottom: '150px', marginBottom: '-150px', width: '100%', maxWidth: '100vw' }}>
            <FadeIn delay={0}>
              <div className="w-full overflow-visible group relative" style={{ maxWidth: 'min(120%, 100vw)', width: '100%' }}>
                {imageLink ? (
                  <a 
                    href={imageLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block cursor-pointer"
                  >
                    <img 
                      src={displayImages[0]} 
                      alt="Project Visual" 
                      loading="eager"
                      decoding="async"
                      className="w-full h-auto object-contain transform group-hover:scale-[1.02] transition-transform duration-[1500ms] ease-out"
                      style={{ 
                        imageRendering: 'auto',
                        filter: 'drop-shadow(0 20px 40px -12px rgba(0, 0, 0, 0.25))',
                        maxWidth: '100%',
                        height: 'auto'
                      }}
                    />
                  </a>
                ) : (
                  <img 
                    src={displayImages[0]} 
                    alt="Project Visual" 
                    loading="eager"
                    decoding="async"
                    className="w-full h-auto object-contain transform group-hover:scale-[1.02] transition-transform duration-[1500ms] ease-out"
                    style={{ 
                      imageRendering: 'auto',
                      filter: 'drop-shadow(0 20px 40px -12px rgba(0, 0, 0, 0.25))',
                      maxWidth: '100%',
                      height: 'auto'
                    }}
                  />
                )}
              </div>
            </FadeIn>
          </div>
        ) : isTwoImages ? (
          // Two images layout - dynamic composition with elegant overlap (reduced 20% - scale from 2.4 to 1.92)
          <div className="relative flex items-center justify-center gap-4 overflow-visible" style={{ paddingBottom: '120px', marginBottom: '-120px' }}>
            <FadeIn delay={0}>
              <div className="relative overflow-visible group" style={{ transform: 'translateX(4%) rotate(-1.5deg) scale(1.92)', width: '50%', zIndex: 1 }}>
                {imageLink ? (
                  <a 
                    href={imageLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block cursor-pointer"
                  >
                    <img 
                      src={displayImages[0]} 
                      alt="Project Visual 1" 
                      loading="eager"
                      decoding="async"
                      className="w-full h-auto object-contain transform group-hover:scale-[1.02] group-hover:rotate-0 transition-all duration-[1500ms] ease-out"
                      style={{ 
                        imageRendering: 'auto',
                        filter: 'drop-shadow(0 30px 60px -15px rgba(0, 0, 0, 0.35))',
                        maxWidth: '100%',
                        height: 'auto'
                      }}
                    />
                  </a>
                ) : (
                  <img 
                    src={displayImages[0]} 
                    alt="Project Visual 1" 
                    loading="eager"
                    decoding="async"
                    className="w-full h-auto object-contain transform group-hover:scale-[1.02] group-hover:rotate-0 transition-all duration-[1500ms] ease-out"
                    style={{ 
                      imageRendering: 'auto',
                      filter: 'drop-shadow(0 30px 60px -15px rgba(0, 0, 0, 0.35))',
                      maxWidth: '100%',
                      height: 'auto'
                    }}
                  />
                )}
              </div>
            </FadeIn>
            <FadeIn delay={200}>
              <div className="relative overflow-visible group" style={{ transform: 'translateX(-4%) rotate(1.5deg) scale(1.92)', width: '50%', zIndex: 2 }}>
                {imageLink ? (
                  <a 
                    href={imageLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block cursor-pointer"
                  >
                    <img 
                      src={displayImages[1]} 
                      alt="Project Visual 2" 
                      loading="eager"
                      decoding="async"
                      className="w-full h-auto object-contain transform group-hover:scale-[1.02] group-hover:rotate-0 transition-all duration-[1500ms] ease-out"
                      style={{ 
                        imageRendering: 'auto',
                        filter: 'drop-shadow(0 30px 60px -15px rgba(0, 0, 0, 0.35))',
                        maxWidth: '100%',
                        height: 'auto'
                      }}
                    />
                  </a>
                ) : (
                  <img 
                    src={displayImages[1]} 
                    alt="Project Visual 2" 
                    loading="eager"
                    decoding="async"
                    className="w-full h-auto object-contain transform group-hover:scale-[1.02] group-hover:rotate-0 transition-all duration-[1500ms] ease-out"
                    style={{ 
                      imageRendering: 'auto',
                      filter: 'drop-shadow(0 30px 60px -15px rgba(0, 0, 0, 0.35))',
                      maxWidth: '100%',
                      height: 'auto'
                    }}
                  />
                )}
              </div>
            </FadeIn>
          </div>
        ) : (
          // Multiple images layout - grid (reduced 20% - max-w from 280px to 224px)
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative" style={{ paddingBottom: '150px', marginBottom: '-150px' }}>
            
            {/* Image 1 */}
            <div className="relative w-full flex justify-center md:-mt-8">
               <FadeIn delay={0}>
                 <div className="w-full max-w-[224px] overflow-visible group relative">
                    {imageLink ? (
                      <a 
                        href={imageLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block cursor-pointer"
                      >
                        <img 
                          src={displayImages[0]} 
                          alt="Project Visual 1" 
                          loading="eager"
                          decoding="async"
                          className="w-full h-auto object-contain transform group-hover:scale-[1.02] transition-transform duration-[1500ms] ease-out"
                          style={{ 
                            imageRendering: 'auto',
                            filter: 'drop-shadow(0 20px 40px -12px rgba(0, 0, 0, 0.25))',
                            maxWidth: '100%',
                            height: 'auto'
                          }}
                        />
                      </a>
                    ) : (
                      <img 
                        src={displayImages[0]} 
                        alt="Project Visual 1" 
                        loading="eager"
                        decoding="async"
                        className="w-full h-auto object-contain transform group-hover:scale-[1.02] transition-transform duration-[1500ms] ease-out"
                        style={{ 
                          imageRendering: 'auto',
                          filter: 'drop-shadow(0 20px 40px -12px rgba(0, 0, 0, 0.25))',
                          maxWidth: '100%',
                          height: 'auto'
                        }}
                      />
                    )}
                 </div>
               </FadeIn>
            </div>

            {/* Image 2 */}
            <div className="relative w-full flex justify-center md:mt-8">
               <FadeIn delay={200}>
                 <div className="w-full max-w-[224px] overflow-visible group relative">
                    {imageLink ? (
                      <a 
                        href={imageLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block cursor-pointer"
                      >
                        <img 
                          src={displayImages[1] || displayImages[0]} 
                          alt="Project Visual 2" 
                          loading="eager"
                          decoding="async"
                          className="w-full h-auto object-contain transform group-hover:scale-[1.02] transition-transform duration-[1500ms] ease-out"
                          style={{ 
                            imageRendering: 'auto',
                            filter: 'drop-shadow(0 20px 40px -12px rgba(0, 0, 0, 0.25))',
                            maxWidth: '100%',
                            height: 'auto'
                          }}
                        />
                      </a>
                    ) : (
                      <img 
                        src={displayImages[1] || displayImages[0]} 
                        alt="Project Visual 2" 
                        loading="eager"
                        decoding="async"
                        className="w-full h-auto object-contain transform group-hover:scale-[1.02] transition-transform duration-[1500ms] ease-out"
                        style={{ 
                          imageRendering: 'auto',
                          filter: 'drop-shadow(0 20px 40px -12px rgba(0, 0, 0, 0.25))',
                          maxWidth: '100%',
                          height: 'auto'
                        }}
                      />
                    )}
                 </div>
               </FadeIn>
            </div>

            {/* Image 3 */}
            <div className="relative w-full flex justify-center md:-mt-4">
               <FadeIn delay={400}>
                 <div className="w-full max-w-[224px] overflow-visible group relative">
                    {imageLink ? (
                      <a 
                        href={imageLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block cursor-pointer"
                      >
                        <img 
                          src={displayImages[2] || displayImages[0]} 
                          alt="Project Visual 3" 
                          loading="eager"
                          decoding="async"
                          className="w-full h-auto object-contain transform group-hover:scale-[1.02] transition-transform duration-[1500ms] ease-out"
                          style={{ 
                            imageRendering: 'auto',
                            filter: 'drop-shadow(0 20px 40px -12px rgba(0, 0, 0, 0.25))',
                            maxWidth: '100%',
                            height: 'auto'
                          }}
                        />
                      </a>
                    ) : (
                      <img 
                        src={displayImages[2] || displayImages[0]} 
                        alt="Project Visual 3" 
                        loading="eager"
                        decoding="async"
                        className="w-full h-auto object-contain transform group-hover:scale-[1.02] transition-transform duration-[1500ms] ease-out"
                        style={{ 
                          imageRendering: 'auto',
                          filter: 'drop-shadow(0 20px 40px -12px rgba(0, 0, 0, 0.25))',
                          maxWidth: '100%',
                          height: 'auto'
                        }}
                      />
                    )}
                 </div>
               </FadeIn>
            </div>

          </div>
        )}
      </div>
    </section>
  );
};

