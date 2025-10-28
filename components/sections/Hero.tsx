'use client';

import { useTranslations } from 'next-intl';
import useOnScreen from '@/hooks/useOnScreen';

export default function Hero() {
  const t = useTranslations();
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

  return (
    <section className="min-h-screen flex items-center relative bg-primary-darkest overflow-hidden">
      {/* Vimeo Video Background */}
      <div className="absolute inset-0 z-0 opacity-60">
        <iframe
          src="https://player.vimeo.com/video/39610409?autoplay=1&loop=1&muted=1&background=1&controls=0"
          className="absolute top-0 left-0 w-full h-full"
          style={{
            width: '100vw',
            height: '56.25vw',
            minHeight: '100vh',
            minWidth: '177.77vh',
          }}
          allow="autoplay; fullscreen"
          frameBorder="0"
          allowFullScreen
        />
      </div>

      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-primary-darkest/80 z-0" />

      <div ref={ref} className="container mx-auto px-4 lg:px-8 py-32 md:py-48 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-12">
            {/* Left Column - Typography Composition */}
            <div className="flex-1 space-y-6">
              {/* Welcome Message */}
              <div className={`text-sm text-white/70 font-light transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                {t('hero.welcome')}
              </div>

              {/* Main Headline - Large and Bold */}
              <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-none tracking-tight transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                {t('hero.title')}
              </h1>

              {/* Tagline */}
              <p className={`text-lg md:text-xl text-white/80 font-light transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                {t('hero.tagline')}
              </p>

              {/* Sub-Headline */}
              <div className={`space-y-3 max-w-2xl transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <p className="text-lg md:text-xl text-white font-light leading-relaxed">
                  {t('hero.subtitle')}
                </p>
              </div>

              {/* Bottom small text */}
              <p className={`text-sm md:text-base text-white/70 font-light max-w-xl leading-relaxed transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                {t('hero.description')}
              </p>
            </div>

            {/* Right Column - CTA */}
            <div className={`self-end transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <a 
                href="#contact" 
                className="bg-white text-primary hover:bg-off transition-colors px-8 py-4 text-lg font-light inline-flex items-center justify-center"
              >
                {t('hero.cta')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

