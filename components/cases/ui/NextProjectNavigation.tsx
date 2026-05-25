'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface NextProjectNavigationProps {
    prev?: { slug: string; title: string };
    next?: { slug: string; title: string };
    locale: string;
}

export const NextProjectNavigation: React.FC<NextProjectNavigationProps> = ({ prev, next, locale }) => {
    const isEnglish = locale === 'en';

    return (
        <section className="py-32 border-t border-white/5 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-stretch gap-8">
                    {/* Previous Project */}
                    <div className="flex-1">
                        {prev ? (
                            <Link
                                href={`/${locale}/case-studies/${prev.slug}`}
                                className="group flex flex-col items-start h-full p-12 rounded-[2.5rem] border border-white/5 bg-white/5 hover:bg-white/[0.08] transition-all duration-700"
                            >
                                <div className="flex items-center gap-3 text-text-muted text-[10px] font-mono uppercase tracking-[0.4em] mb-6">
                                    <ArrowLeft size={14} className="group-hover:-translate-x-2 transition-transform duration-500" />
                                    {isEnglish ? 'Previous' : 'Anterior'}
                                </div>
                                <h4 className="text-2xl md:text-3xl font-light text-text-primary tracking-tight">
                                    {prev.title}
                                </h4>
                            </Link>
                        ) : (
                            <div className="hidden md:block flex-1" />
                        )}
                    </div>

                    {/* All Projects / Home */}
                    <div className="flex items-center justify-center">
                        <Link
                            href={`/${locale}/cases`}
                            className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-white/5 transition-all duration-500 group"
                        >
                            <div className="grid grid-cols-2 gap-1 group-hover:rotate-90 transition-transform duration-500">
                               <div className="w-1.5 h-1.5 rounded-full bg-current" />
                               <div className="w-1.5 h-1.5 rounded-full bg-current" />
                               <div className="w-1.5 h-1.5 rounded-full bg-current" />
                               <div className="w-1.5 h-1.5 rounded-full bg-current" />
                            </div>
                        </Link>
                    </div>

                    {/* Next Project */}
                    <div className="flex-1">
                        {next ? (
                            <Link
                                href={`/${locale}/case-studies/${next.slug}`}
                                className="group flex flex-col items-end text-right h-full p-12 rounded-[2.5rem] border border-white/5 bg-white/5 hover:bg-white/[0.08] transition-all duration-700"
                            >
                                <div className="flex items-center gap-3 text-text-muted text-[10px] font-mono uppercase tracking-[0.4em] mb-6">
                                    {isEnglish ? 'Next' : 'Siguiente'}
                                    <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-500" />
                                </div>
                                <h4 className="text-2xl md:text-3xl font-light text-text-primary tracking-tight">
                                    {next.title}
                                </h4>
                            </Link>
                        ) : (
                            <div className="hidden md:block flex-1" />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
