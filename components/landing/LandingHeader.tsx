'use client';

import Image from 'next/image';
import { WHATSAPP_HREF } from './cta';

export default function LandingHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-background/70 backdrop-blur-md border-b border-white/[0.06]" aria-hidden />
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#hero" className="flex items-center" aria-label="a:bra — inicio">
            <Image
              src="/abra-blanco.webp"
              alt="a:bra"
              width={92}
              height={32}
              priority
              className="h-7 w-auto md:h-8"
            />
          </a>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-background text-xs md:text-sm font-medium tracking-wide rounded-sm transition-all duration-300 hover:bg-white/90 active:scale-[0.98]"
          >
            Hablemos
          </a>
        </div>
      </div>
    </header>
  );
}
