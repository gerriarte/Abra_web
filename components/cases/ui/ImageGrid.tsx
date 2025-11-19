'use client';

import React from 'react';
import { FadeIn } from './FadeIn';

export const ImageGrid: React.FC = () => {
  return (
    <section className="py-24 bg-[#f0f0f0] px-6">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <h3 className="text-center text-gray-500 text-xs tracking-[0.2em] uppercase mb-12">Visuales de Campaña</h3>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 h-[120vh] md:h-[80vh]">
          
          {/* Image 1 */}
          <div className="relative h-full w-full md:-mt-12">
             <FadeIn delay={0} className="h-full">
               <div className="w-full h-full overflow-hidden group relative cursor-pointer">
                  <div className="absolute inset-0 bg-[#04213B]/20 group-hover:bg-transparent z-10 transition-colors duration-700 pointer-events-none" />
                  <img 
                    src="https://picsum.photos/600/800?random=10" 
                    alt="Campaign Visual 1" 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1500ms] ease-out" 
                  />
               </div>
             </FadeIn>
          </div>

          {/* Image 2 */}
          <div className="relative h-full w-full md:mt-12">
             <FadeIn delay={200} className="h-full">
               <div className="w-full h-full overflow-hidden group relative cursor-pointer">
                  <div className="absolute inset-0 bg-[#04213B]/20 group-hover:bg-transparent z-10 transition-colors duration-700 pointer-events-none" />
                  <img 
                    src="https://picsum.photos/600/800?random=11" 
                    alt="Campaign Visual 2" 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1500ms] ease-out" 
                  />
               </div>
             </FadeIn>
          </div>

          {/* Image 3 */}
          <div className="relative h-full w-full md:-mt-8">
             <FadeIn delay={400} className="h-full">
               <div className="w-full h-full overflow-hidden group relative cursor-pointer">
                  <div className="absolute inset-0 bg-[#04213B]/20 group-hover:bg-transparent z-10 transition-colors duration-700 pointer-events-none" />
                  <img 
                    src="https://picsum.photos/600/800?random=12" 
                    alt="Campaign Visual 3" 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1500ms] ease-out" 
                  />
               </div>
             </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
};

