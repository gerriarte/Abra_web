'use client';

import React from 'react';
import { FadeIn } from './FadeIn';
import { Play } from 'lucide-react';

interface Video {
    url: string;
    title: string;
    titleEn: string;
}

interface VideoCinemaProps {
    videos: Video[];
    locale: string;
}

export const VideoCinema: React.FC<VideoCinemaProps> = ({ videos, locale }) => {
    const getYoutubeEmbedUrl = (url: string) => {
        try {
            const urlObj = new URL(url);
            let videoId = '';
            if (urlObj.hostname === 'youtu.be') videoId = urlObj.pathname.slice(1);
            else videoId = urlObj.searchParams.get('v') || '';
            return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`;
        } catch (e) {
            return '';
        }
    };

    return (
        <section className="bg-black py-24 px-6">
            <div className="max-w-7xl mx-auto space-y-32">
                {videos.map((video, index) => (
                    <FadeIn key={index} delay={index * 100}>
                        <div className="flex flex-col gap-8">
                            <div className="relative group overflow-hidden rounded-3xl bg-neutral-900 border border-white/5 shadow-2xl">
                                <div className="aspect-video w-full">
                                    <iframe
                                        src={getYoutubeEmbedUrl(video.url)}
                                        title={locale === 'en' ? video.titleEn : video.title}
                                        className="w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 px-4">
                                <div className="max-w-2xl">
                                    <h3 className="text-white text-3xl md:text-5xl font-light mb-2">
                                        {locale === 'en' ? video.titleEn : video.title}
                                    </h3>
                                    <div className="flex items-center gap-3">
                                        <span className="w-8 h-[1px] bg-white/20"></span>
                                        <p className="text-white/40 uppercase text-[10px] tracking-[0.3em] font-medium">
                                            {locale === 'en' ? 'Audiovisual Masterpiece' : 'Pieza Audiovisual'}
                                        </p>
                                    </div>
                                </div>

                                <div className="text-right hidden md:block">
                                    <p className="text-white/20 text-xs tracking-widest uppercase">
                                        Bestune / MTM
                                    </p>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                ))}
            </div>
        </section>
    );
};
