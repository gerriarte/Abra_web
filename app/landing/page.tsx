import type { Metadata } from 'next';
import { generateSEOMetadata } from '@/lib/utils/seo';
import LandingHeader from '@/components/landing/LandingHeader';
import LandingHero from '@/components/landing/LandingHero';
import LandingThesis from '@/components/landing/LandingThesis';
import LandingLoop from '@/components/landing/LandingLoop';
import LandingCapabilities from '@/components/landing/LandingCapabilities';
import LandingCases from '@/components/landing/LandingCases';
import LandingFinalCTA from '@/components/landing/LandingFinalCTA';

export const metadata: Metadata = generateSEOMetadata({
  title: 'a:bra — Construimos el crecimiento de tu marca',
  description:
    'Estrategia, ejecución técnica e IA en un mismo equipo. a:bra opera un sistema de crecimiento de punta a punta: el A:BRA Loop. Growth marketing con IA en Bogotá y Buenos Aires.',
  keywords: [
    'growth marketing',
    'IA aplicada',
    'A:BRA Loop',
    'paid media',
    'captación B2B',
    'outbound',
    'analítica avanzada',
    'Bogotá',
    'Buenos Aires',
  ],
  type: 'website',
  locale: 'es',
  url: '/landing',
});

export default function LandingPage() {
  return (
    <>
      <LandingHeader />
      <main className="relative z-10">
        <LandingHero />
        <LandingThesis />
        <LandingLoop />
        <LandingCapabilities />
        <LandingCases />
        <LandingFinalCTA />
      </main>
    </>
  );
}
