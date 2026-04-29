"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFloating from "@/components/ui/WhatsAppFloating";
import HashScrollHandler from "@/components/layout/HashScrollHandler";
import { ScrollBackground } from "@/components/background/ScrollBackground";

type LocaleChromeProps = {
  children: React.ReactNode;
  locale: string;
};

export default function LocaleChrome({ children, locale }: LocaleChromeProps) {
  const pathname = usePathname();
  const isQrLanding = pathname === `/${locale}/gerardo-riarte` || pathname === `/${locale}/gerardo-riarte/`;

  return (
    <>
      {!isQrLanding && <ScrollBackground />}
      {!isQrLanding && <div className="grain-overlay" />}
      {!isQrLanding && <HashScrollHandler />}
      {!isQrLanding && <Header />}

      <main className="overflow-x-hidden relative z-10">{children}</main>

      {!isQrLanding && <Footer />}
      {!isQrLanding && <WhatsAppFloating />}
    </>
  );
}
