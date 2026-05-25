'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import useOnScreen from '@/hooks/useOnScreen';
import { SectionFlowLine } from '@/components/ui/SectionFlowLine';

const LOOP_PDF_MAILTO =
  'mailto:business@abralatam.com?subject=Solicitud%20A%3ABRA%20Loop%20PDF&body=Hola%2C%20quiero%20recibir%20el%20PDF%20del%20A%3ABRA%20Loop.';

export default function Method() {
  const t = useTranslations('method');
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98] as const,
      },
    },
  };

  const phases = ['01', '02', '03', '04'];

  return (
    <section id="method" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-7xl">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-24">
            <motion.span 
              variants={itemVariants}
              className="text-xs font-mono tracking-[0.3em] uppercase text-primary mb-4 block"
            >
              {t('eyebrow')}
            </motion.span>
            <motion.h2 
              variants={itemVariants}
              className="text-balance mb-8"
            >
              {t('title')}
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-text-secondary font-light leading-relaxed"
            >
              {t('subtitle')}
            </motion.p>
            <motion.div variants={itemVariants} className="mt-10">
              <SectionFlowLine />
            </motion.div>
          </div>

          {/* The Loop Flow */}
          <div className="relative">
            {/* Desktop Connector Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-y-1/2" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {phases.map((key, index) => (
                <motion.div
                  key={key}
                  variants={itemVariants}
                  className="group"
                >
                  <div className="h-full p-8 rounded-3xl bg-background border border-white/5 hover:border-primary/50 transition-all duration-500 flex flex-col items-center text-center">
                    {/* Phase Number & Name */}
                    <div className="mb-6 relative">
                       <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-mono text-xl group-hover:bg-primary group-hover:text-background transition-all duration-500 shadow-[0_0_20px_rgba(0,122,255,0.1)]">
                         {key}
                       </div>
                       <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-background border border-white/10 rounded text-[10px] font-mono uppercase tracking-widest text-text-muted">
                         {t(`phases.${key}.name`)}
                       </div>
                    </div>

                    <h3 className="text-xl font-medium text-text-primary mb-4 group-hover:text-primary transition-colors duration-300">
                      {t(`phases.${key}.title`)}
                    </h3>
                    
                    <p className="text-sm text-text-secondary font-light leading-relaxed">
                      {t(`phases.${key}.description`)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Footer & CTA */}
          <motion.div 
            variants={itemVariants}
            className="mt-24 text-center space-y-12"
          >
            <div className="max-w-2xl mx-auto">
              <p className="text-sm text-text-muted italic font-light leading-relaxed">
                "{t('footer')}"
              </p>
            </div>

            <a
              href={LOOP_PDF_MAILTO}
              className="inline-flex items-center gap-3 px-10 py-5 bg-transparent border border-primary text-primary font-medium rounded-full hover:bg-primary hover:text-background transition-all duration-300 shadow-[0_0_40px_rgba(0,122,255,0.2)] group"
            >
              <span>{t('cta')}</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative background circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary/5 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/5 rounded-full pointer-events-none" />
    </section>
  );
}
