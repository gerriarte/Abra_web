'use client';

import React from 'react';
import { FadeIn } from './FadeIn';

interface Video {
    url: string;
    title: string;
    titleEn: string;
}

interface VideoGridProps {
    videos: Video[];
    locale: string;
}

export const VideoGrid: React.FC<VideoGridProps> = ({ videos, locale }) => {
    if (!videos || videos.length === 0) return null;

    const getYoutubeEmbedUrl = (url: string) => {
        try {
            const urlObj = new URL(url);
            let videoId = '';

            if (urlObj.hostname === 'youtu.be') {
                videoId = urlObj.pathname.slice(1);
            } else {
                videoId = urlObj.searchParams.get('v') || '';
            }

            return `https://www.youtube.com/embed/${videoId}`;
        } catch (e) {
            console.error('Invalid YouTube URL', url);
            return '';
        }
    };

    return (
        <section id="videos" className="py-24 bg-white px-6 overflow-x-hidden relative" style={{ zIndex: 1 }}>
            <div className="max-w-7xl mx-auto w-full">
                <FadeIn>
                    <h3 className="text-center text-gray-400 text-xs tracking-[0.2em] uppercase mb-16 font-medium">
                        {locale === 'en' ? 'Advertising Production' : 'Producción Publicitaria'}
                    </h3>
                </FadeIn>

                <div className={`grid grid-cols-1 ${videos.length === 1 ? 'max-w-4xl mx-auto' : videos.length === 2 ? 'md:grid-cols-2 max-w-6xl mx-auto' : 'md:grid-cols-3'} gap-8 md:gap-12 pb-16`}>
                    {videos.map((video, index) => {
                        const embedUrl = getYoutubeEmbedUrl(video.url);
                        if (!embedUrl) return null;

                        return (
                            <FadeIn key={index} delay={index * 200}>
                                <div className="group space-y-4">
                                    <div className="aspect-video w-full overflow-hidden rounded-2xl bg-gray-100 shadow-lg shadow-gray-200/50 transform group-hover:scale-[1.01] transition-all duration-500">
                                        <iframe
                                            src={embedUrl}
                                            title={locale === 'en' ? video.titleEn : video.title}
                                            className="w-full h-full border-0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                    <div className="px-1 text-center">
                                        <h4 className="text-primary font-light text-sm tracking-wide">
                                            {locale === 'en' ? video.titleEn : video.title}
                                        </h4>
                                        <p className="text-xs text-text-muted mt-1 uppercase tracking-widest font-light">
                                            {locale === 'en' ? 'Original Production' : 'Producción Original'}
                                        </p>
                                    </div>
                                </div>
                            </FadeIn>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
