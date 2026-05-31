'use client';

import React from 'react';
import { FadeIn } from '../cases/ui/FadeIn';
import { ExternalLink } from 'lucide-react';
import { SectionFlowLine } from '@/components/ui/SectionFlowLine';

interface Partner {
    name: string;
    logo: string;
    url: string;
    description: string;
    descriptionEn: string;
}

const PARTNERS: Partner[] = [
    {
        name: 'MTM Marca tu Marca',
        logo: '/Bestune/MTM-Marca-tu-marca-brand.webp',
        url: 'https://mtmmarcatumarca.com',
        description: 'Expertos en producción audiovisual de alto impacto y narrativa visual cinematográfica.',
        descriptionEn: 'Experts in high-impact audiovisual production and cinematic visual storytelling.'
    }
    // Add more partners here in the future
];

interface PartnerShowcaseProps {
    locale: string;
}

export const PartnerShowcase: React.FC<PartnerShowcaseProps> = ({ locale }) => {
    const isEn = locale === 'en';

    return (
        <section id="partners" className="bg-transparent py-24 md:py-32 px-6 border-y border-white/5 relative overflow-hidden">
            {/* 3D Spatial Grid Background */}
            <div className="absolute inset-x-0 bottom-0 top-0 z-0 pointer-events-none overflow-hidden mask-spatial-grid opacity-15">
                <div className="spatial-grid" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="max-w-3xl mb-16">
                    <FadeIn>
                        <div className="flex items-center gap-4 mb-6">
                            <span className="h-px w-12 bg-primary"></span>
                            <span className="text-xs font-bold tracking-[0.2em] uppercase text-text-muted">
                                {isEn ? 'Strategic Ecosystem' : 'Aliados'}
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-light leading-tight text-text-primary tracking-tight">
                            {isEn ? "We don't work alone. But we curate who we add." : "No trabajamos solos. Pero curamos a quién sumamos."}
                        </h2>
                        <p className="mt-6 text-lg text-text-secondary font-light leading-relaxed">
                            {isEn
                                ? 'We collaborate with industry leaders to integrate specialized capabilities into every project, ensuring excellence at every touchpoint.'
                                : 'Colaboramos con líderes de la industria para integrar capacidades especializadas en cada proyecto.'}
                        </p>
                        <SectionFlowLine className="mt-10" />
                    </FadeIn>
                </div>

                {/* Partners Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PARTNERS.map((partner, index) => (
                        <FadeIn key={partner.name} delay={index * 100}>
                            <a
                                href={partner.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative block bg-white/[0.02] p-8 rounded-3xl border border-white/5 transition-all duration-500 hover:bg-white/[0.05] hover:border-primary/20 hover:-translate-y-1 h-full"
                            >
                                <div className="flex flex-col h-full gap-8">
                                    {/* Logo Container */}
                                    <div className="h-20 flex items-center justify-start transition-all duration-500">
                                        <img
                                            src={partner.logo}
                                            alt={partner.name}
                                            className="h-full w-auto object-contain max-w-[180px] rounded-lg grayscale group-hover:grayscale-0 transition-all"
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="space-y-4 flex-1">
                                        <h3 className="text-xl font-medium text-text-primary group-hover:text-primary transition-colors flex items-center gap-2">
                                            {partner.name}
                                            <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-y-1" />
                                        </h3>
                                        <p className="text-sm text-text-secondary font-light leading-relaxed">
                                            {isEn ? partner.descriptionEn : partner.description}
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </FadeIn>
                    ))}
                </div>

            </div>
        </section>
    );
};
