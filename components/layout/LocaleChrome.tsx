"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFloating from "@/components/ui/WhatsAppFloating";
import HashScrollHandler from "@/components/layout/HashScrollHandler";

type LocaleChromeProps = {
  children: React.ReactNode;
  locale: string;
};

export default function LocaleChrome({ children, locale }: LocaleChromeProps) {
  const pathname = usePathname();
  const isQrLanding = pathname === `/${locale}/gerardo-riarte` || pathname === `/${locale}/gerardo-riarte/`;

  return (
    <>
      {!isQrLanding && <div className="nebula-glow opacity-30 fixed inset-0 z-0" />}
      {!isQrLanding && <div className="spatial-grid opacity-[0.03] fixed inset-0 z-0" />}
      {!isQrLanding && <div className="grain-overlay" />}
      {!isQrLanding && <HashScrollHandler />}
      {!isQrLanding && <Header />}

      <main className="overflow-x-hidden relative z-10">{children}</main>

      {!isQrLanding && <Footer />}
      {!isQrLanding && <WhatsAppFloating />}
    </>
  );
}
