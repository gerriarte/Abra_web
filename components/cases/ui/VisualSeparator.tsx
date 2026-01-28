'use client';

import React from 'react';
import { FadeIn } from './FadeIn';

interface VisualSeparatorProps {
    image: string;
    alt?: string;
    parallax?: boolean;
}

export const VisualSeparator: React.FC<VisualSeparatorProps> = ({
    image,
    alt = "Visual Separator",
    parallax = true
}) => {
    return (
        <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-black">
            <div
                className={`absolute inset-0 w-full h-full ${parallax ? 'scale-110' : ''}`}
                style={{
                    backgroundImage: `url(${image})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundAttachment: parallax ? 'fixed' : 'scroll',
                    filter: 'brightness(0.9)'
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />

            <FadeIn className="relative h-full flex items-center justify-center pointer-events-none">
                <div className="w-full h-full border-[0.5px] border-white/10 m-8 rounded-3xl" />
            </FadeIn>
        </div>
    );
};
