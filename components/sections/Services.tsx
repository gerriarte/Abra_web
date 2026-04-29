'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import useOnScreen from '@/hooks/useOnScreen';

export default function Services() {
  const t = useTranslations('services');
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98] as const,
      },
    },
  };

  const services = ['01', '02', '03', '04'];

  return (
    <section id="services" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-7xl">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="mb-24">
            <motion.span 
              variants={itemVariants}
              className="text-xs font-mono tracking-[0.3em] uppercase text-text-muted mb-4 block"
            >
              {t('eyebrow')}
            </motion.span>
            <motion.h2 
              variants={itemVariants}
              className="text-balance mb-8"
            >
              {t('title')}
            </motion.h2>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden">
            {services.map((key) => (
              <motion.div
                key={key}
                variants={itemVariants}
                className="group p-12 bg-background hover:bg-white/[0.02] transition-all duration-500 relative overflow-hidden"
              >
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-500 font-mono text-8xl font-bold select-none pointer-events-none">
                  {key}
                </div>

                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-4">
                     <div className="w-1.5 h-10 bg-primary group-hover:h-12 transition-all duration-500 shadow-[0_0_15px_rgba(0,122,255,0.5)]" />
                     <h3 className="text-2xl md:text-3xl font-medium text-text-primary tracking-tight">
                        {t(`list.${key}.title`)}
                     </h3>
                  </div>
                  
                  <p className="text-lg text-text-secondary font-light leading-relaxed max-w-md">
                    {t(`list.${key}.description`)}
                  </p>
                  
                  <div className="pt-4 flex items-center gap-2 text-primary font-mono text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-500">
                    <span>A:BRA System Ready</span>
                    <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
