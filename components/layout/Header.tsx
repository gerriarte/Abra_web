'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const locale = useLocale();
  const t = useTranslations('nav');
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      {
        rootMargin: '-40% 0px -40% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    const sectionIds = ['problem', 'method', 'projects', 'cases'];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'es' : 'en';
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md border-b border-border' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 lg:px-8 max-w-full overflow-hidden">
        <div className="flex items-center justify-between h-20 min-w-0">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center flex-shrink-0 min-w-0">
            <Image
              src={scrolled ? "/abra-negro.png" : "/abra-blanco.png"}
              alt="A:BRA"
              width={90}
              height={28}
              className="h-7 w-auto transition-opacity duration-500 max-w-[90px]"
              priority
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {[
              { id: 'problem', label: t('problem') },
              { id: 'method', label: t('method') },
              { id: 'projects', label: t('projects') },
            ].map(({ id, label }) => {
              const isActive = activeSection === id;
              const baseColor = scrolled
                ? 'text-primary/70 hover:text-accent'
                : 'text-white/70 hover:text-white';

              const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                
                // Si estamos en el home, hacer scroll a la sección
                if (pathname === `/${locale}` || pathname === `/${locale}/`) {
                  const element = document.getElementById(id);
                  if (element) {
                    const headerOffset = 80; // Altura del header
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                } else {
                  // Si estamos en otra página, navegar al home y luego hacer scroll
                  router.push(`/${locale}`);
                  
                  // Esperar a que la navegación se complete y luego actualizar el hash y hacer scroll
                  setTimeout(() => {
                    // Actualizar el hash en la URL
                    window.history.replaceState(null, '', `/${locale}#${id}`);
                    
                    // Función para hacer scroll cuando el elemento esté disponible
                    const scrollToSection = () => {
                      const element = document.getElementById(id);
                      if (element) {
                        const headerOffset = 80;
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                          top: offsetPosition,
                          behavior: 'smooth'
                        });
                        return true;
                      }
                      return false;
                    };

                    // Intentar hacer scroll inmediatamente
                    if (!scrollToSection()) {
                      // Si no está disponible, intentar varias veces con intervalos
                      let attempts = 0;
                      const maxAttempts = 30;
                      const interval = setInterval(() => {
                        attempts++;
                        if (scrollToSection() || attempts >= maxAttempts) {
                          clearInterval(interval);
                        }
                      }, 50);
                    }
                  }, 100);
                }
              };

              return (
                <a
                  key={id}
                  href={`/${locale}#${id}`}
                  onClick={handleClick}
                  className={`group relative text-sm font-light tracking-wide transition-all duration-300 ${baseColor} ${
                    isActive
                      ? scrolled
                        ? 'text-primary'
                        : 'text-white'
                      : ''
                  }`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  <span className="relative z-[1]">{label}</span>
                  <span
                    className={`absolute inset-x-0 -bottom-2 h-0.5 origin-left transform rounded-full transition-transform duration-300 ease-out ${
                      scrolled ? 'bg-accent' : 'bg-white'
                    } ${isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`}
                  />
                  <span
                    className={`pointer-events-none absolute inset-0 -z-[1] scale-95 rounded-full bg-accent/5 opacity-0 transition-all duration-300 ease-out ${
                      scrolled ? 'group-hover:opacity-100 group-hover:scale-100' : 'group-hover:bg-white/10'
                    } ${isActive ? 'opacity-100 scale-100' : ''}`}
                  />
                </a>
              );
            })}

            {/* Cases Link (Separate Page) */}
            <Link
              href={`/${locale}/cases`}
              className={`group relative text-sm font-light tracking-wide transition-all duration-300 ${
                scrolled
                  ? 'text-primary/70 hover:text-accent'
                  : 'text-white/70 hover:text-white'
              } ${pathname === `/${locale}/cases` ? (scrolled ? 'text-primary' : 'text-white') : ''}`}
            >
              <span className="relative z-[1]">{t('cases', { defaultMessage: 'Casos' })}</span>
              <span
                className={`absolute inset-x-0 -bottom-2 h-0.5 origin-left transform rounded-full transition-transform duration-300 ease-out ${
                  scrolled ? 'bg-accent' : 'bg-white'
                } ${pathname === `/${locale}/cases` ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`}
              />
            </Link>
          </div>

          {/* Language Toggle & CTA */}
          <div className="flex items-center gap-2 md:gap-6 min-w-0 flex-shrink-0">
            <button
              onClick={toggleLanguage}
              className={`flex items-center gap-1 text-xs font-light transition-colors flex-shrink-0 ${
                scrolled 
                  ? 'text-primary hover:text-accent' 
                  : 'text-white hover:text-white/80'
              }`}
            >
              <span className={locale === 'en' ? 'font-normal' : (scrolled ? 'text-text-muted' : 'text-white/60')}>
                EN
              </span>
              <span className={scrolled ? 'text-text-muted' : 'text-white/60'}>/</span>
              <span className={locale === 'es' ? 'font-normal' : (scrolled ? 'text-text-muted' : 'text-white/60')}>
                ES
              </span>
            </button>
            
            <a 
              href={`/${locale}#contact`}
              onClick={(e) => {
                e.preventDefault();
                
                // Si estamos en el home, hacer scroll a la sección
                if (pathname === `/${locale}` || pathname === `/${locale}/`) {
                  const element = document.getElementById('contact');
                  if (element) {
                    const headerOffset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                } else {
                  // Si estamos en otra página, navegar al home y luego hacer scroll
                  router.push(`/${locale}`);
                  
                  // Esperar a que la navegación se complete y luego actualizar el hash y hacer scroll
                  setTimeout(() => {
                    // Actualizar el hash en la URL
                    window.history.replaceState(null, '', `/${locale}#contact`);
                    
                    // Función para hacer scroll cuando el elemento esté disponible
                    const scrollToSection = () => {
                      const element = document.getElementById('contact');
                      if (element) {
                        const headerOffset = 80;
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                          top: offsetPosition,
                          behavior: 'smooth'
                        });
                        return true;
                      }
                      return false;
                    };

                    // Intentar hacer scroll inmediatamente
                    if (!scrollToSection()) {
                      // Si no está disponible, intentar varias veces con intervalos
                      let attempts = 0;
                      const maxAttempts = 30;
                      const interval = setInterval(() => {
                        attempts++;
                        if (scrollToSection() || attempts >= maxAttempts) {
                          clearInterval(interval);
                        }
                      }, 50);
                    }
                  }, 100);
                }
              }}
              className={`hidden md:block text-xs font-light px-4 py-2 rounded transition-all duration-200 ${
                scrolled 
                  ? 'text-primary border border-primary hover:bg-primary hover:text-white hover:border-primary' 
                  : 'text-white border border-white hover:bg-white hover:text-primary'
              }`}
            >
              {t('contact')}
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

