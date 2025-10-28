'use client';

import { useTranslations } from 'next-intl';
import useOnScreen from '@/hooks/useOnScreen';
import { useState, useEffect, useRef } from 'react';

export default function Projects() {
  const t = useTranslations();
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Random heights for Pinterest effect
  const heights = [280, 320, 240, 360, 260, 340, 300, 350];

  const projectsData = t.raw('projects.items') as Array<{
    title: string;
    description: string;
    category: string;
  }>;

  const gradients = [
    'from-primary-light/30 to-primary-light/10',
    'from-primary-light/20 to-primary-light/5',
    'from-primary-lighter/25 to-primary-lighter/10',
    'from-primary-light/30 to-primary-light/10',
    'from-primary-lighter/20 to-primary-lighter/5',
    'from-primary-light/25 to-primary-light/8',
    'from-primary-light/20 to-primary-light/5',
    'from-primary-lighter/25 to-primary-lighter/10',
  ];

  const projects = projectsData.map((item, index) => ({
    id: index + 1,
    title: item.title,
    description: item.description,
    category: item.category,
    gradient: gradients[index]
  }));

  // Handle mouse drag
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2; // Scroll speed
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  // Touch support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !carouselRef.current) return;
    const x = e.touches[0].pageX - (carouselRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Go to specific slide
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: index * carouselRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  };

  // Auto scroll detection
  useEffect(() => {
    if (!carouselRef.current) return;

    const handleScroll = () => {
      if (!carouselRef.current) return;
      const scrollPosition = carouselRef.current.scrollLeft;
      const slideWidth = carouselRef.current.offsetWidth;
      const newIndex = Math.round(scrollPosition / slideWidth);
      setCurrentIndex(newIndex);
    };

    carouselRef.current.addEventListener('scroll', handleScroll);
    return () => carouselRef.current?.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="projects" className="py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div ref={ref} className="mb-16 text-center">
            <h2 className={`text-4xl md:text-5xl font-light text-primary mb-4 tracking-tight transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {t('projects.title')}
            </h2>
            <p className={`text-lg text-text-secondary font-light transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              {t('projects.subtitle')}
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            <div
              ref={carouselRef}
              className="flex overflow-x-hidden scroll-smooth snap-x snap-mandatory scrollbar-hide"
              style={{
                cursor: isDragging ? 'grabbing' : 'grab',
                userSelect: 'none',
              }}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="flex-shrink-0 w-full"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                    {/* Image/Visual */}
                    <div className="w-full md:w-1/2 aspect-[4/3] bg-gradient-to-br from-primary-light/30 via-primary-light/15 to-primary-lighter/8 rounded-lg overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center p-8">
                        <div className="w-full h-full relative">
                          <svg 
                            viewBox="0 0 200 200" 
                            className="w-full h-full opacity-20 transition-opacity duration-500"
                          >
                            <defs>
                              <linearGradient id={`grad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{ stopColor: '#04213B', stopOpacity: 0.5 }} />
                                <stop offset="100%" style={{ stopColor: '#04213B', stopOpacity: 0.1 }} />
                              </linearGradient>
                            </defs>
                            {/* Large geometric pattern */}
                            <rect width="90" height="90" x="20" y="20" fill={`url(#grad-${index})`} rx="4" />
                            <rect width="70" height="70" x="110" y="30" fill={`url(#grad-${index})`} rx="4" />
                            <circle cx="50" cy="140" r="35" fill={`url(#grad-${index})`} />
                            <circle cx="150" cy="130" r="25" fill={`url(#grad-${index})`} />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="w-full md:w-1/2 space-y-6">
                      <div>
                        <span className="text-xs text-primary-light font-light uppercase tracking-wider mb-3 block">
                          {project.category}
                        </span>
                        <h3 className="text-3xl md:text-4xl font-light text-primary mb-6">
                          {project.title}
                        </h3>
                        <p className="text-lg text-text-secondary font-light leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-12">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 ${
                    currentIndex === index 
                      ? 'w-8 h-2 bg-primary rounded-full' 
                      : 'w-2 h-2 bg-primary-light rounded-full hover:bg-primary'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Drag hint */}
            <div className="flex items-center justify-center mt-6 gap-2 text-sm text-text-muted font-light">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 15l-4-4-4 4" />
              </svg>
              <span>Drag to navigate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
