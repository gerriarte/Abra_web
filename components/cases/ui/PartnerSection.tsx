'use client';

import React from 'react';
import { FadeIn } from './FadeIn';

interface PartnerSectionProps {
    partner: {
        name: string;
        logo: string;
    };
    locale: string;
}

export const PartnerSection: React.FC<PartnerSectionProps> = ({ partner, locale }) => {
    return (
        <section className="bg-black py-32 px-6 border-y border-white/5">
            <div className="max-w-4xl mx-auto text-center">
                <FadeIn>
                    <p className="text-white/40 uppercase text-[10px] tracking-[0.4em] mb-12 font-medium">
                        {locale === 'en' ? 'In Partnership With' : 'En Alianza Con'}
                    </p>

                    <div className="flex flex-col items-center gap-8">
                        <img
                            src={partner.logo}
                            alt={partner.name}
                            className="h-24 md:h-32 w-auto object-contain opacity-90 transition-all duration-700 hover:opacity-100"
                        />

                        <div className="space-y-4">
                            <h2 className="text-white text-4xl md:text-6xl font-extralight tracking-tight">
                                {partner.name}
                            </h2>
                            <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed font-light">
                                {locale === 'en'
                                    ? 'Combining Bestune\'s innovative mobility with MTM\'s production expertise to redefine automotive storytelling.'
                                    : 'Combinando la movilidad innovadora de Bestune con la experiencia en producción de MTM para redefinir la narrativa automotriz.'}
                            </p>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};
