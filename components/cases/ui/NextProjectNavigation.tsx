'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CaseStudy } from '@/data/cases';

interface NextProjectNavigationProps {
    prev?: { slug: string; title: string };
    next?: { slug: string; title: string };
    locale: string;
}

export const NextProjectNavigation: React.FC<NextProjectNavigationProps> = ({ prev, next, locale }) => {
    const isEnglish = locale === 'en';

    return (
        <section className="py-24 border-t border-gray-100 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row justify-between items-stretch gap-8">
                    {/* Previous Project */}
                    <div className="flex-1">
                        {prev ? (
                            <Link
                                href={`/${locale}/case-studies/${prev.slug}`}
                                className="group flex flex-col items-start h-full p-8 rounded-2xl border border-gray-100 hover:border-accent/30 hover:bg-accent/[0.02] transition-all duration-500"
                            >
                                <div className="flex items-center gap-2 text-text-muted text-xs font-bold uppercase tracking-[0.2em] mb-4">
                                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                                    {isEnglish ? 'Previous Project' : 'Proyecto Anterior'}
                                </div>
                                <h4 className="text-xl md:text-2xl font-light text-primary group-hover:text-accent transition-colors">
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
                            className="px-6 py-3 rounded-full border border-primary/10 text-primary/60 text-xs font-bold uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all duration-300"
                        >
                            {isEnglish ? 'View All' : 'Ver Todos'}
                        </Link>
                    </div>

                    {/* Next Project */}
                    <div className="flex-1">
                        {next ? (
                            <Link
                                href={`/${locale}/case-studies/${next.slug}`}
                                className="group flex flex-col items-end text-right h-full p-8 rounded-2xl border border-gray-100 hover:border-accent/30 hover:bg-accent/[0.02] transition-all duration-500"
                            >
                                <div className="flex items-center gap-2 text-text-muted text-xs font-bold uppercase tracking-[0.2em] mb-4">
                                    {isEnglish ? 'Next Project' : 'Siguiente Proyecto'}
                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                                <h4 className="text-xl md:text-2xl font-light text-primary group-hover:text-accent transition-colors">
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
