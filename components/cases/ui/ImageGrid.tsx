'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface ImageGridProps {
  images?: string[];
  title?: string;
  imageLink?: string;
}

const ParallaxImage = ({ 
  src, 
  alt, 
  speed = 0.1, 
  className = "", 
  onClick 
}: { 
  src: string; 
  alt: string; 
  speed?: number; 
  className?: string;
  onClick: () => void;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-50 * speed, 50 * speed]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <div 
      ref={ref} 
      onClick={onClick}
      className={`relative overflow-hidden rounded-[2.5rem] bg-surface/10 border border-white/5 cursor-zoom-in group ${className}`}
    >
      <motion.div style={{ y: springY }} className="h-[120%] w-full -top-[10%] absolute">
        <div className="relative w-full h-full">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
          />
        </div>
      </motion.div>
      
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
        <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-75 group-hover:scale-100" size={32} strokeWidth={1.5} />
      </div>
    </div>
  );
};

export const ImageGrid: React.FC<ImageGridProps> = ({ 
  images = [],
  title = 'Visuales de Campaña',
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  
  const displayImages = images.length > 0 ? images : [
    'https://picsum.photos/1200/800?random=1',
    'https://picsum.photos/1200/800?random=2',
    'https://picsum.photos/1200/800?random=3',
    'https://picsum.photos/1200/800?random=4',
    'https://picsum.photos/1200/800?random=5',
    'https://picsum.photos/1200/800?random=6'
  ];

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev - 1 + displayImages.length) % displayImages.length : null));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % displayImages.length : null));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  return (
    <section className="py-40 bg-background px-6 relative z-20">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-24 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-mono tracking-[0.5em] uppercase text-text-muted mb-4 block"
          >
            {title}
          </motion.span>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            viewport={{ once: true }}
            className="h-px bg-white/10 mx-auto"
          />
        </div>

        {/* Editorial Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Main Hero Image */}
          <div className="md:col-span-8">
            <ParallaxImage 
              src={displayImages[0]} 
              alt="Main Project Visual" 
              speed={1.5}
              onClick={() => setSelectedIndex(0)}
              className="aspect-[16/10] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
            />
          </div>

          {/* Side Info / Small Image */}
          <div className="md:col-span-4 md:mt-24">
            <ParallaxImage 
              src={displayImages[1] || displayImages[0]} 
              alt="Project Detail" 
              speed={2.5}
              onClick={() => setSelectedIndex(1 % displayImages.length)}
              className="aspect-[4/5] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)]"
            />
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mt-8 pl-4 border-l border-white/10"
            >
              <p className="text-sm font-light text-text-secondary leading-relaxed italic">
                {images.length > 0 ? "Exploración visual del ecosistema digital diseñado para maximizar la conversión y el impacto." : "Detailed view of the interface components and design system."}
              </p>
            </motion.div>
          </div>

          {/* Row 2 */}
          {displayImages[2] && (
            <div className="md:col-span-12 md:mt-12 flex justify-center">
              <div className="w-full md:w-5/6">
                <ParallaxImage 
                  src={displayImages[2]} 
                  alt="Full Width Showcase" 
                  speed={0.8}
                  onClick={() => setSelectedIndex(2)}
                  className="aspect-[21/9] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.45)]"
                />
              </div>
            </div>
          )}

          {/* Row 3 Staggered */}
          {displayImages[3] && (
            <div className="md:col-span-6 md:mt-24">
              <ParallaxImage 
                src={displayImages[3]} 
                alt="Bottom Staggered 1" 
                speed={1.8}
                onClick={() => setSelectedIndex(3)}
                className="aspect-square shadow-[0_40px_80px_-20px_rgba(0,0,0,0.45)]"
              />
            </div>
          )}
          
          {displayImages[4] && (
            <div className="md:col-span-6 md:-mt-12">
              <ParallaxImage 
                src={displayImages[4]} 
                alt="Bottom Staggered 2" 
                speed={3}
                onClick={() => setSelectedIndex(4)}
                className="aspect-[3/4] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.45)]"
              />
            </div>
          )}

          {displayImages[5] && (
            <div className="md:col-span-12 md:mt-12">
               <ParallaxImage 
                src={displayImages[5]} 
                alt="Bottom Final" 
                speed={1.2}
                onClick={() => setSelectedIndex(5)}
                className="aspect-[16/7] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.45)]"
              />
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close Button */}
            <button 
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[110]"
              onClick={() => setSelectedIndex(null)}
            >
              <X size={32} strokeWidth={1.5} />
            </button>

            {/* Navigation Buttons */}
            <button 
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-all hover:scale-110 z-[110] bg-white/5 p-4 rounded-full backdrop-blur-md"
              onClick={handlePrev}
            >
              <ChevronLeft size={32} strokeWidth={1.5} />
            </button>
            <button 
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-all hover:scale-110 z-[110] bg-white/5 p-4 rounded-full backdrop-blur-md"
              onClick={handleNext}
            >
              <ChevronRight size={32} strokeWidth={1.5} />
            </button>

            {/* Main Image Container */}
            <motion.div 
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="relative max-w-7xl w-full max-h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[85vh]">
                <Image
                  src={displayImages[selectedIndex]}
                  alt="Project Full View"
                  fill
                  className="object-contain rounded-xl shadow-[0_40px_120px_rgba(0,0,0,0.8)]"
                  sizes="100vw"
                />
              </div>
              
              {/* Image Caption / Counter */}
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center">
                <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-text-muted">
                  {selectedIndex + 1} / {displayImages.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
