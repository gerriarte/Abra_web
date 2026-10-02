'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CAL_BOOKING_URL } from '@/lib/links';

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

  const isServicesActive = activeSection === 'services' || pathname === `/${locale}/judgment-audit`;

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
              src="/abra-blanco.webp"
              alt="A:BRA"
              width={90}
              height={28}
              className="h-7 w-auto transition-opacity duration-500 max-w-[90px]"
              priority
            />
          </Link>

          {/* Navigation Links (same order as the home sections) */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink href={`/${locale}#problem`} label={t('problem')} active={activeSection === 'problem'} />

            {/* Services Dropdown */}
            <div className="group/services relative">
              <Link
                href={`/${locale}#services`}
                aria-haspopup="true"
                className={`group relative inline-flex items-center gap-1.5 ${NAV_TEXT} ${isServicesActive ? 'text-text-primary' : NAV_IDLE}`}
              >
                <span className="relative z-[1]">{t('services')}</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 10 6"
                  className="h-1.5 w-2.5 transition-transform duration-300 group-hover/services:rotate-180 group-focus-within/services:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.2}
                >
                  <path d="M1 1l4 4 4-4" />
                </svg>
                <NavUnderline active={isServicesActive} />
              </Link>

              {/* pt-5 bridges the gap so the menu stays open while the cursor moves down */}
              <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-5 opacity-0 transition-all duration-300 group-hover/services:visible group-hover/services:opacity-100 group-focus-within/services:visible group-focus-within/services:opacity-100">
                <div className="min-w-[220px] rounded-xl border border-white/10 bg-background/95 p-2 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                  <Link
                    href={`/${locale}/judgment-audit`}
                    className={`block rounded-lg px-4 py-3 ${NAV_TEXT} hover:bg-white/[0.04] hover:text-aqua ${
                      pathname === `/${locale}/judgment-audit` ? 'text-aqua' : NAV_IDLE
                    }`}
                  >
                    {t('judgmentAudit')}
                  </Link>
                </div>
              </div>
            </div>

            <NavLink href={`/${locale}#method`} label={t('method')} active={activeSection === 'method'} />
            <NavLink href={`/${locale}/cases`} label={t('cases')} active={pathname === `/${locale}/cases`} />
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
              className="cta-ghost hidden lg:block text-[10px] font-medium px-6 py-2.5 rounded-full border border-white/10 text-text-primary hover:bg-white hover:text-background"
            >
              {t('contact')}
            </Link>

            <a
              href={CAL_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-primary hidden md:inline-flex items-center text-[10px] font-medium px-6 py-2.5 rounded-full bg-white text-background hover:bg-white/90"
            >
              {t('schedule')}
            </a>
          </div>
        </div>
      </nav>
    </header>

  );
}

const NAV_TEXT = 'text-[11px] font-light tracking-[0.2em] uppercase transition-colors duration-300';
const NAV_IDLE = 'text-white/60 hover:text-text-primary';

/** Aqua line drawn under the link on hover (scaleX 0 → 1); stays drawn while active. */
function NavUnderline({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute inset-x-0 -bottom-2 h-px origin-left rounded-full bg-aqua transition-transform duration-500 ease-out motion-reduce:transition-none ${
        active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
      }`}
    />
  );
}

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link href={href} className={`group relative ${NAV_TEXT} ${active ? 'text-text-primary' : NAV_IDLE}`}>
      <span className="relative z-[1]">{label}</span>
      <NavUnderline active={active} />
    </Link>
  );
}
