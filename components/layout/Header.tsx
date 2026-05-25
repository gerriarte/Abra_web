'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const locale = useLocale();
  const t = useTranslations('nav');
  const pathname = usePathname();
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

    const sectionIds = ['problem', 'method', 'services', 'laboratory', 'cases'];
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
    window.location.href = newPath;
  };

  if (!mounted) {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent'
        }`}
    >
      <nav className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-20 min-w-0">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center flex-shrink-0 min-w-0">
            <Image
              src="/abra-blanco.png"
              alt="A:BRA"
              width={90}
              height={28}
              className="h-7 w-auto transition-opacity duration-500 max-w-[90px]"
              priority
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { id: 'problem', label: t('problem') },
              { id: 'method', label: t('method') },
              { id: 'services', label: t('services') },
            ].map(({ id, label }) => {
              const isActive = activeSection === id;

              return (
                <Link
                  key={id}
                  href={`/${locale}#${id}`}
                  className={`group relative text-[11px] font-light tracking-[0.2em] uppercase transition-all duration-300 ${
                    isActive ? 'text-text-primary' : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  <span className="relative z-[1]">{label}</span>
                  <span
                    className={`absolute inset-x-0 -bottom-2 h-px origin-left transform rounded-full transition-transform duration-500 ease-out bg-primary ${
                      isActive ? 'scale-x-100 opacity-50' : 'scale-x-0 opacity-0 group-hover:scale-x-50 group-hover:opacity-30'
                    }`}
                  />
                </Link>
              );
            })}

            {/* Cases Link */}
            <Link
              href={`/${locale}/cases`}
              className={`group relative text-[11px] font-light tracking-[0.2em] uppercase transition-all duration-300 ${
                pathname === `/${locale}/cases` ? 'text-text-primary' : 'text-text-muted hover:text-text-primary'
              }`}
            >
              <span className="relative z-[1]">{t('cases')}</span>
              <span
                className={`absolute inset-x-0 -bottom-2 h-px origin-left transform rounded-full transition-transform duration-500 ease-out bg-primary ${
                  pathname === `/${locale}/cases` ? 'scale-x-100 opacity-50' : 'scale-x-0 opacity-0 group-hover:scale-x-50 group-hover:opacity-30'
                }`}
              />
            </Link>
          </div>

          {/* Language Toggle & CTA */}
          <div className="flex items-center gap-2 md:gap-8 min-w-0 flex-shrink-0">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-xs font-mono tracking-tighter transition-colors text-text-muted hover:text-text-primary"
            >
              <span className={locale === 'en' ? 'text-primary' : ''}>EN</span>
              <span className="opacity-30">/</span>
              <span className={locale === 'es' ? 'text-primary' : ''}>ES</span>
            </button>

            <Link
              href={`/${locale}#contact`}
              className="hidden md:block text-[10px] font-medium px-6 py-2.5 rounded-full border border-white/10 transition-all duration-500 text-text-primary hover:bg-white hover:text-background"
            >
              {t('contact')}
            </Link>
          </div>
        </div>
      </nav>
    </header>

  );
}
