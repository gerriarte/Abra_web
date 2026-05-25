'use client';

import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import useOnScreen from '@/hooks/useOnScreen';
import Link from 'next/link';

interface Case {
  id: string;
  title: string;
  category: string;
  metric?: string;
  image?: string;
  size: 'large' | 'medium' | 'small';
}

const cases: Case[] = [
  { id: 'pre-concretos', title: 'Pre Concretos', category: 'Growth & Branding', metric: '+120% Leads', image: '/cases/pre-concretos.png', size: 'large' },
  { id: 'duvyclass', title: 'DuvyClass', category: 'Growth Marketing', metric: '-40% CAC', image: '/cases/duvyclass.png', size: 'medium' },
  { id: 'gea-beauty', title: 'Gea Beauty', category: 'Health & Branding', metric: 'Branding V2', image: '/cases/gea-beauty.png', size: 'medium' },
  { id: 'praxis-school', title: 'Praxis School', category: 'EdTech & Growth', metric: '+200% Growth', image: '/cases/praxis-school.png', size: 'small' },
  { id: 'message-boutique', title: 'Message Boutique', category: 'Fashion E-commerce', metric: '+45% Conv.', image: '/cases/message-boutique.png', size: 'small' },
  { id: 'monyte', title: 'Monyte', category: 'Branding & Dev Crypto', metric: '100% Unificado', image: '/monyte/Monyte Banner.png', size: 'medium' },
  { id: 'securitas', title: 'Securitas', category: 'Digital Transformation', metric: '+60% Eficiencia', image: '/Securitas/Mockup dashboard.png', size: 'medium' },
];

export default function ClientCases() {
  const t = useTranslations('cases');
  const locale = useLocale();
  const [ref, isVisible] = useOnScreen({ threshold: 0.05 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.21, 0.47, 0.32, 0.98] as const,
      },
    },
  };

  return (
    <section id="cases" className="py-40 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-7xl">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="max-w-6xl mx-auto"
        >
          <div className="mb-32 text-center max-w-3xl mx-auto">
            <motion.span
              variants={itemVariants}
              className="text-[9px] font-mono tracking-[0.5em] uppercase text-text-muted mb-6 block"
            >
              {t('eyebrow')}
            </motion.span>

            <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-light mb-8 tracking-tight">
              {t('title')}
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-text-secondary font-light leading-relaxed">
              {t('subtitle')}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[280px]">
            {cases.map((c) => (
              <motion.div
                key={c.id}
                variants={itemVariants}
                className={`group relative rounded-[2.5rem] overflow-hidden border border-white/5 bg-surface/30 backdrop-blur-sm transition-all duration-1000 ${
                  c.size === 'large'
                    ? 'md:col-span-8 md:row-span-2'
                    : c.size === 'medium'
                      ? 'md:col-span-4 md:row-span-2'
                      : 'md:col-span-4 md:row-span-1'
                }`}
              >
                <div className="absolute inset-0 z-0 overflow-hidden">
                  {c.image ? (
                    <>
                      <img
                        src={c.image}
                        alt={c.title}
                        className="w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-60 transition-all duration-1000 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                    </>
                  ) : (
                    <div className="w-full h-full bg-surface/50" />
                  )}
                </div>

                <div className="absolute inset-0 p-10 flex flex-col justify-between z-10">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-2">
                      <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-text-muted">
                        {c.category}
                      </span>
                      <h3
                        className={`${c.size === 'large' ? 'text-3xl md:text-4xl' : 'text-xl'} font-light text-text-primary tracking-tight`}
                      >
                        {c.title}
                      </h3>
                    </div>
                    {c.metric && (
                      <div className="px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-[9px] font-mono text-text-secondary">
                        {c.metric}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-end opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition-all duration-700 ease-out">
                    <p className="text-xs text-text-secondary max-w-[240px] font-light leading-relaxed">
                      {t('cardNote')}
                    </p>
                    <Link
                      href={`/${locale}/case-studies/${c.id}`}
                      className="w-12 h-12 rounded-full bg-white text-background flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    >
                      →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="mt-32 text-center">
            <Link
              href={`/${locale}/cases`}
              className="inline-flex items-center gap-4 px-12 py-6 rounded-full border border-white/10 text-text-primary hover:bg-white/5 transition-all group font-light tracking-widest text-xs uppercase"
            >
              {t('ctaAll')}
              <span className="group-hover:translate-x-2 transition-transform duration-500">→</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
