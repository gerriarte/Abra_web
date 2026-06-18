'use client';

import Image from 'next/image';
import { WHATSAPP_HREF } from './cta';
import { CAL_BOOKING_URL } from '@/lib/links';

export default function LandingHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-background/70 backdrop-blur-md border-b border-white/[0.06]" aria-hidden />
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#hero" className="flex items-center animate-fade-in" aria-label="a:bra — inicio">
            <Image
              src="/abra-blanco.webp"
              alt="a:bra"
              width={92}
              height={32}
              priority
              className="h-7 w-auto md:h-8 transition-opacity duration-300 hover:opacity-80"
            />
          </a>
          <div className="flex items-center gap-2 md:gap-3">
            <a
              href={CAL_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-ghost hidden sm:inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs md:text-sm font-light text-text-primary rounded-sm border border-white/15 hover:border-white/30 hover:bg-white/[0.03]"
            >
              Agendar
            </a>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-primary inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-background text-xs md:text-sm font-medium tracking-wide rounded-sm hover:bg-white/90"
            >
              Hablemos
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
