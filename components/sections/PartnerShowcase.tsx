'use client';

import React from 'react';
import { FadeIn } from '../cases/ui/FadeIn';
import { ExternalLink } from 'lucide-react';

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
        logo: '/Bestune/MTM-Marca-tu-marca-brand.jpeg',
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
        <section className="bg-black py-24 md:py-32 px-6 border-y border-white/5">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="max-w-3xl mb-16">
                    <FadeIn>
                        <div className="flex items-center gap-4 mb-6">
                            <span className="h-px w-12 bg-white"></span>
                            <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/40">
                                {isEn ? 'Strategic Ecosystem' : 'Ecosistema Estratégico'}
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-light leading-tight text-white tracking-tight">
                            {isEn ? 'Alliances that amplify results.' : 'Alianzas que amplifican resultados.'}
                        </h2>
                        <p className="mt-6 text-lg text-white/50 font-light leading-relaxed">
                            {isEn
                                ? 'We collaborate with industry leaders to integrate specialized capabilities into every project, ensuring excellence at every touchpoint.'
                                : 'Colaboramos con líderes de la industria para integrar capacidades especializadas en cada proyecto, asegurando la excelencia en cada punto de contacto.'}
                        </p>
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
                                className="group relative block bg-white/[0.02] p-8 rounded-3xl border border-white/5 transition-all duration-500 hover:bg-white/[0.05] hover:border-white/10 hover:-translate-y-1 h-full"
                            >
                                <div className="flex flex-col h-full gap-8">
                                    {/* Logo Container */}
                                    <div className="h-20 flex items-center justify-start transition-all duration-500">
                                        <img
                                            src={partner.logo}
                                            alt={partner.name}
                                            className="h-full w-auto object-contain max-w-[180px] rounded-lg"
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="space-y-4 flex-1">
                                        <h3 className="text-xl font-medium text-white group-hover:text-accent transition-colors flex items-center gap-2">
                                            {partner.name}
                                            <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-y-1" />
                                        </h3>
                                        <p className="text-sm text-white/40 font-light leading-relaxed">
                                            {isEn ? partner.descriptionEn : partner.description}
                                        </p>
                                    </div>

                                    {/* Decorative element */}
                                    <div className="absolute top-8 right-8 w-2 h-2 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </a>
                        </FadeIn>
                    ))}

                    {/* Placeholder for future partners */}
                    <div className="hidden lg:flex items-center justify-center p-8 rounded-3xl border-2 border-dashed border-white/5">
                        <p className="text-white/10 text-sm font-light tracking-widest uppercase">
                            {isEn ? 'Future Partner' : 'Próximo Aliado'}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
