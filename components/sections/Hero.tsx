'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useOnScreen from '@/hooks/useOnScreen';

interface HeroSlideRaw {
  id: number;
  titleEs: string;
  titleEn: string;
  descriptionEs: string;
  descriptionEn: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  ctaLabelEs?: string;
  ctaLabelEn?: string;
  ctaHref?: string;
}

interface HeroSlide {
  id: number;
  title: string;
  description: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  ctaLabel?: string;
  ctaHref?: string;
}

const ROTATION_INTERVAL = 9000;

export default function Hero() {
  const t = useTranslations();
  const locale = useLocale();
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  const [rawSlides, setRawSlides] = useState<HeroSlideRaw[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);

  // Transform raw slides to localized slides
  const slides: HeroSlide[] = useMemo(() => {
    return rawSlides.map((slide) => ({
      id: slide.id,
      title: locale === 'es' ? slide.titleEs : slide.titleEn,
      description: locale === 'es' ? slide.descriptionEs : slide.descriptionEn,
      mediaType: slide.mediaType,
      mediaUrl: slide.mediaUrl,
      ctaLabel: locale === 'es' ? slide.ctaLabelEs : slide.ctaLabelEn,
      ctaHref: slide.ctaHref,
    }));
  }, [rawSlides, locale]);

  const fallbackSlide: HeroSlide = useMemo(
    () => ({
      id: 0,
      title: t('hero.title'),
      description: t('hero.subtitle'),
      mediaType: 'video',
      mediaUrl: 'https://player.vimeo.com/video/39610409',
      ctaLabel: t('hero.cta'),
      ctaHref: '#contact',
    }),
    [t]
  );

  const slideData = slides.length > 0 ? slides : [fallbackSlide];
  const activeSlide = slideData[Math.min(activeIndex, slideData.length - 1)] || fallbackSlide;

  const changeSlide = useCallback((newIndex: number) => {
    if (newIndex === activeIndex) return;
    
    setIsTransitioning(true);
    setProgress(0);
    
    setTimeout(() => {
      setActiveIndex(newIndex);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 300);
  }, [activeIndex]);

  const handleSelectSlide = useCallback((index: number) => {
    changeSlide(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 15000);
  }, [changeSlide]);

  const handlePrevious = useCallback(() => {
    const newIndex = (activeIndex - 1 + slideData.length) % slideData.length;
    changeSlide(newIndex);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 15000);
  }, [activeIndex, slideData.length, changeSlide]);

  const handleNext = useCallback(() => {
    const newIndex = (activeIndex + 1) % slideData.length;
    changeSlide(newIndex);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 15000);
  }, [activeIndex, slideData.length, changeSlide]);

  useEffect(() => {
    let isMounted = true;

    const loadSlides = async () => {
      try {
        const response = await fetch(`/api/admin/hero?ts=${Date.now()}`);
        if (!response.ok) {
          throw new Error('Failed to load hero slides');
        }
        const data = await response.json();
        if (isMounted && Array.isArray(data.slides)) {
          setRawSlides(data.slides);
        }
      } catch (error) {
        console.error('Error loading hero slides', error);
      } finally {
        if (isMounted) {
          setIsLoaded(true);
        }
      }
    };

    loadSlides();

    // Reload slides every 30 seconds to pick up admin changes
    const interval = setInterval(() => {
      if (isMounted) {
        loadSlides();
      }
    }, 30000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Reload slides when locale changes
  useEffect(() => {
    const loadSlides = async () => {
      try {
        const response = await fetch(`/api/admin/hero?ts=${Date.now()}`);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data.slides)) {
            setRawSlides(data.slides);
          }
        }
      } catch (error) {
        console.error('Error reloading hero slides', error);
      }
    };
    loadSlides();
  }, [locale]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (slideData.length <= 1) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slideData.length, handlePrevious, handleNext]);

  useEffect(() => {
    if (slideData.length <= 1 || isPaused) {
      setProgress(0);
      return undefined;
    }

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progressValue = Math.min((elapsed / ROTATION_INTERVAL) * 100, 100);
      setProgress(progressValue);
    }, 50);

    const timeout = setTimeout(() => {
      const nextIndex = (activeIndex + 1) % slideData.length;
      changeSlide(nextIndex);
    }, ROTATION_INTERVAL);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [slideData.length, isPaused, activeIndex, changeSlide]);

  const renderBackground = () => {
    const transitionClass = isTransitioning 
      ? 'opacity-0 scale-105' 
      : 'opacity-100 scale-100';
    
    if (activeSlide.mediaType === 'video') {
      if (isEmbeddableService(activeSlide.mediaUrl)) {
        return (
          <iframe
            key={`video-${activeSlide.id}`}
            src={`${formatEmbedUrl(activeSlide.mediaUrl)}`}
            className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out ${transitionClass}`}
            style={{
              width: '100vw',
              height: '56.25vw',
              minHeight: '100vh',
              minWidth: '177.77vh',
            }}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            frameBorder="0"
            title={activeSlide.title}
          />
        );
      }

      return (
        <video
          key={`video-${activeSlide.id}`}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${transitionClass}`}
          src={activeSlide.mediaUrl}
          autoPlay
          loop
          muted
          playsInline
        />
      );
    }

    return (
      <div
        key={`image-${activeSlide.id}`}
        className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out ${transitionClass}`}
        style={{ backgroundImage: `url(${activeSlide.mediaUrl})` }}
        aria-hidden
      />
    );
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-primary-darkest">
      <div className="absolute inset-0 z-0 opacity-60 transition-opacity duration-1000">
        {renderBackground()}
      </div>
      <div className="absolute inset-0 bg-primary-darkest/80 z-0" />

      {/* Navigation Arrows */}
      {slideData.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/25 active:bg-white/30 backdrop-blur-md border border-white/30 hover:border-white/50 flex items-center justify-center transition-all duration-300 ease-out group shadow-lg hover:shadow-xl hover:scale-110 active:scale-95"
            aria-label="Slide anterior"
          >
            <svg
              className="w-6 h-6 md:w-7 md:h-7 text-white group-hover:text-accent group-hover:translate-x-[-2px] transition-all duration-300 ease-out"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/25 active:bg-white/30 backdrop-blur-md border border-white/30 hover:border-white/50 flex items-center justify-center transition-all duration-300 ease-out group shadow-lg hover:shadow-xl hover:scale-110 active:scale-95"
            aria-label="Slide siguiente"
          >
            <svg
              className="w-6 h-6 md:w-7 md:h-7 text-white group-hover:text-accent group-hover:translate-x-[2px] transition-all duration-300 ease-out"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      <div ref={ref} className="container mx-auto px-4 lg:px-8 py-32 md:py-48 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-12">
            <div className="flex-1 space-y-6">
              <div 
                key={`welcome-${activeIndex}`} 
                className={`text-sm text-white/70 font-light transition-all duration-500 ease-out ${
                  isTransitioning 
                    ? 'opacity-0 translate-y-4' 
                    : isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-4'
                }`}
              >
                {t('hero.welcome')}
              </div>
              <h1 
                key={`title-${activeIndex}`} 
                className={`text-5xl md:text-7xl lg:text-8xl font-light text-white leading-tight tracking-tight transition-all duration-500 ease-out delay-75 ${
                  isTransitioning 
                    ? 'opacity-0 translate-y-8 scale-95' 
                    : isVisible 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-8 scale-95'
                }`}
              >
                {activeSlide.title || fallbackSlide.title}
              </h1>
              <p 
                key={`tagline-${activeIndex}`} 
                className={`text-lg md:text-xl text-white/80 font-light transition-all duration-500 ease-out delay-150 ${
                  isTransitioning 
                    ? 'opacity-0 translate-y-6' 
                    : isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-6'
                }`}
              >
                {t('hero.tagline')}
              </p>
              <div 
                key={`description-${activeIndex}`} 
                className={`space-y-3 max-w-2xl transition-all duration-500 ease-out delay-200 ${
                  isTransitioning 
                    ? 'opacity-0 translate-y-6' 
                    : isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-6'
                }`}
              >
                <p className="text-lg md:text-xl text-white font-light leading-relaxed">
                  {activeSlide.description || fallbackSlide.description}
                </p>
              </div>
              <p 
                key={`subdescription-${activeIndex}`} 
                className={`text-sm md:text-base text-white/70 font-light max-w-xl leading-relaxed transition-all duration-500 ease-out delay-300 ${
                  isTransitioning 
                    ? 'opacity-0 translate-y-6' 
                    : isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-6'
                }`}
              >
                {t('hero.description')}
              </p>
            </div>

            <div 
              key={`cta-${activeIndex}`}
              className={`self-end transition-all duration-500 ease-out delay-400 ${
                isTransitioning 
                  ? 'opacity-0 translate-y-6 scale-95' 
                  : isVisible 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-6 scale-95'
              }`}
            >
              <a
                href={activeSlide.ctaHref || '#contact'}
                className="bg-white text-primary hover:bg-accent hover:text-white active:bg-accent-dark transition-all duration-300 ease-out px-8 py-4 text-lg font-light inline-flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              >
                {activeSlide.ctaLabel || t('hero.cta')}
              </a>
            </div>
          </div>
        </div>

        {slideData.length > 1 && (
          <div className="mt-16 flex items-center justify-center gap-3">
            {slideData.map((slide, index) => {
              const isActive = index === activeIndex;
              const progressWidth = isActive && !isPaused ? `${progress}%` : '0%';
              
              return (
                <button
                  key={slide.id}
                  onClick={() => handleSelectSlide(index)}
                  className="relative h-2 rounded-full overflow-hidden transition-all duration-300 ease-out group"
                  aria-label={`Mostrar ${slide.title}`}
                  aria-current={isActive ? 'true' : 'false'}
                >
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ease-out ${
                      isActive 
                        ? 'w-12 bg-accent/20 shadow-lg shadow-accent/20' 
                        : 'w-6 bg-white/40 group-hover:bg-accent/60 group-hover:w-8'
                    }`}
                  />
                  {isActive && (
                    <div
                      className="absolute top-0 left-0 h-full bg-accent rounded-full transition-all duration-75 ease-linear shadow-lg shadow-accent/50"
                      style={{ width: progressWidth }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {!isLoaded && (
        <div className="absolute inset-x-0 bottom-0 h-1 bg-white/10 overflow-hidden">
          <div className="h-full w-1/3 bg-white/40 animate-pulse" />
        </div>
      )}
    </section>
  );
}

function isEmbeddableService(url: string) {
  return url.includes('vimeo.com') || url.includes('youtube.com') || url.includes('youtu.be');
}

function formatEmbedUrl(url: string) {
  if (url.includes('vimeo.com')) {
    const hasQuery = url.includes('?');
    const params = 'autoplay=1&loop=1&muted=1&background=1&controls=0';
    return hasQuery ? `${url}&${params}` : `${url}?${params}`;
  }

  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const videoId = extractYouTubeId(url);
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&mute=1&controls=0&showinfo=0&modestbranding=1`;
  }

  return url;
}

function extractYouTubeId(url: string) {
  const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu.be\/)([\w-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : url;
}

