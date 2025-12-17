'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('contact.form');

  return (
    <footer className="bg-off border-t border-border py-6 md:py-12 mt-0 relative z-10 overflow-x-hidden">
      <div className="container mx-auto px-4 max-w-full">
        <div className="max-w-6xl mx-auto w-full">
          {/* Mobile: Centered layout */}
          <div className="md:hidden space-y-6 text-center">
            {/* Logo */}
            <div className="flex justify-center">
              <Image
                src="/abra-negro.png"
                alt="A:BRA Logo"
                width={80}
                height={24}
                className="h-6 w-auto opacity-90"
              />
            </div>
            
            {/* Social Links */}
            <div className="flex items-center justify-center gap-4">
              <a 
                href="https://linkedin.com/company/abra" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-text-secondary hover:text-primary transition-colors font-light"
              >
                LinkedIn
              </a>
              <span className="text-primary-light/30">•</span>
              <a 
                href="https://instagram.com/abra" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-text-secondary hover:text-primary transition-colors font-light"
              >
                Instagram
              </a>
            </div>
            
            {/* Locations */}
            <div className="flex items-center justify-center gap-4 text-xs text-text-secondary font-light">
              <span>Argentina</span>
              <span className="text-primary-light/30">•</span>
              <span>Colombia</span>
              <span className="text-primary-light/30">•</span>
              <span>España</span>
            </div>
            
            {/* Copyright */}
            <p className="text-center text-[10px] text-text-muted font-light pt-2 border-t border-primary-light/10">
              © {new Date().getFullYear()} A:BRA - Strategic Digital Engineering
            </p>
          </div>

          {/* Desktop: Full layout */}
          <div className="hidden md:grid md:grid-cols-3 gap-8 mb-8">
            {/* Logo */}
            <div>
              <Image
                src="/abra-negro.png"
                alt="A:BRA Logo"
                width={100}
                height={32}
                className="h-8 w-auto opacity-90 mb-4"
              />
            </div>

            {/* Locations */}
            <div>
              <h3 className="text-[10px] font-light text-primary-light/70 mb-3 tracking-[0.2em] uppercase">
                {t('locations')}
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 group">
                  <div className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                  <p className="text-sm text-text-secondary font-light group-hover:text-primary transition-colors">Argentina</p>
                </div>
                <div className="flex items-center gap-2 group">
                  <div className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                  <p className="text-sm text-text-secondary font-light group-hover:text-primary transition-colors">Colombia</p>
                </div>
                <div className="flex items-center gap-2 group">
                  <div className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                  <p className="text-sm text-text-secondary font-light group-hover:text-primary transition-colors">España</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-[10px] font-light text-primary-light/70 mb-3 tracking-[0.2em] uppercase">
                {t('connect')}
              </h3>
              <div className="space-y-2">
                <a 
                  href="https://linkedin.com/company/abra" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-all duration-300 font-light"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                  <span>LinkedIn</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-xs">→</span>
                </a>
                <a 
                  href="https://instagram.com/abra" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-all duration-300 font-light"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                  <span>Instagram</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-xs">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Desktop Copyright */}
          <div className="hidden md:block pt-8 border-t border-primary-light/10">
            <p className="text-center text-sm text-text-muted font-light">
              © {new Date().getFullYear()} A:BRA - Strategic Digital Engineering
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

