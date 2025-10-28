'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center">
            <Image
              src={scrolled ? "/abra-negro.png" : "/abra-blanco.png"}
              alt="A:BRA"
              width={90}
              height={28}
              className="h-7 w-auto transition-opacity duration-500"
              priority
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a 
              href="#problem" 
              className={`text-sm font-light transition-colors ${
                scrolled 
                  ? 'text-primary hover:text-primary-light' 
                  : 'text-white hover:text-white/80'
              }`}
            >
              Problem
            </a>
            <a 
              href="#method" 
              className={`text-sm font-light transition-colors ${
                scrolled 
                  ? 'text-primary hover:text-primary-light' 
                  : 'text-white hover:text-white/80'
              }`}
            >
              Method
            </a>
            <a 
              href="#projects" 
              className={`text-sm font-light transition-colors ${
                scrolled 
                  ? 'text-primary hover:text-primary-light' 
                  : 'text-white hover:text-white/80'
              }`}
            >
              Projects
            </a>
          </div>

          {/* Language Toggle & CTA */}
          <div className="flex items-center gap-6">
            <button
              onClick={toggleLanguage}
              className={`flex items-center gap-1 text-xs font-light transition-colors ${
                scrolled 
                  ? 'text-primary hover:text-primary-light' 
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
              href="#contact" 
              className={`hidden md:block text-xs font-light px-4 py-2 rounded transition-all duration-200 ${
                scrolled 
                  ? 'text-primary border border-primary hover:bg-primary hover:text-white' 
                  : 'text-white border border-white hover:bg-white hover:text-primary'
              }`}
            >
              Contact
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

