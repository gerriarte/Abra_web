'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('contact.form');
  const locale = useLocale();
  const isEnglish = locale === 'en';

  return (
    <footer className="bg-background border-t border-white/5 py-12 md:py-20 relative z-10">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Logo & Info */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Image
              src="/abra-blanco.webp"
              alt="A:BRA Logo"
              width={100}
              height={32}
              className="h-8 w-auto opacity-100"
            />
            <p className="text-sm text-text-secondary max-w-xs font-light leading-relaxed">
              Strategic Digital Engineering. Construimos sistemas de crecimiento y los productos que los hacen posibles.
            </p>
            <div className="flex gap-4 pt-4">
               <a
                href="https://linkedin.com/company/abra"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-xs text-text-muted hover:text-primary transition-colors uppercase tracking-widest font-medium"
              >
                LinkedIn
              </a>
              <a
                href="https://instagram.com/abra"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-xs text-text-muted hover:text-primary transition-colors uppercase tracking-widest font-medium"
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-[10px] font-bold text-text-primary mb-6 tracking-[0.3em] uppercase">
              Operamos desde
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 group">
                <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(0,122,255,0.5)]" />
                <p className="text-sm text-text-secondary font-light">Bogotá, Colombia</p>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(0,122,255,0.5)]" />
                <p className="text-sm text-text-secondary font-light">Buenos Aires, Argentina</p>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div>
            <h3 className="text-[10px] font-bold text-text-primary mb-6 tracking-[0.3em] uppercase">
              Newsletter
            </h3>
            <p className="text-xs text-text-muted font-light mb-4">
              Insights sobre Growth, IA e Ingeniería.
            </p>
            <div className="flex border-b border-white/10 pb-2">
              <input 
                type="email" 
                placeholder="tu@email.com" 
                className="bg-transparent border-none text-xs text-text-primary focus:outline-none w-full font-light"
              />
              <button className="text-primary text-xs font-medium">→</button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-text-muted font-light uppercase tracking-widest">
            © {new Date().getFullYear()} A:BRA — Strategic Digital Engineering
          </p>
          <div className="flex items-center gap-5">
            <Link
              href={`/${locale}/privacy`}
              className="link-underline text-[10px] text-text-muted hover:text-primary transition-colors uppercase tracking-widest font-light"
            >
              {isEnglish ? 'Privacy Policy' : 'Política de Privacidad'}
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="link-underline text-[10px] text-text-muted hover:text-primary transition-colors uppercase tracking-widest font-light"
            >
              {isEnglish ? 'Terms of Service' : 'Términos de Servicio'}
            </Link>
          </div>
        </div>
      </div>
    </footer>

  );
}

