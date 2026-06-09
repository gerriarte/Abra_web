'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import useOnScreen from '@/hooks/useOnScreen';
import useSpotlight from '@/hooks/useSpotlight';
import { SectionFlowLine } from '@/components/ui/SectionFlowLine';
import { sectionContainerVariants, itemVariants } from '@/lib/animations/variants';

function ProblemCard({ keyId }: { keyId: string }) {
  const t = useTranslations('problem');
  const { onMouseMove, background } = useSpotlight(360, 'rgba(255,255,255,0.06)');
  return (
    <motion.div
      variants={itemVariants}
      onMouseMove={onMouseMove}
      className="group relative overflow-hidden p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.08] hover:border-primary/30 transition-all duration-500"
    >
      <motion.span
        aria-hidden
        style={{ background }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="relative flex items-center gap-2 mb-6">
        <div className="w-2 h-2 rounded-full bg-warning animate-pulse" />
        <span className="text-[10px] font-mono uppercase tracking-widest text-warning/80">Pain Point</span>
      </div>
      <h3 className="relative text-xl font-medium text-text-primary mb-4 group-hover:text-primary transition-colors duration-300">
        {t(`cards.${keyId}.title`)}
      </h3>
      <p className="relative text-sm text-text-secondary font-light leading-relaxed">
        {t(`cards.${keyId}.description`)}
      </p>
      <span className="absolute bottom-4 right-6 text-6xl font-bold text-white/[0.02] select-none group-hover:text-primary/10 transition-colors duration-500">
        {keyId}
      </span>
    </motion.div>
  );
}

export default function Problem() {
  const t = useTranslations('problem');
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

  const cards = ['01', '02', '03'];

  return (
    <section id="problem" className="py-32 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-7xl">
        <motion.div
          ref={ref}
          variants={sectionContainerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="max-w-4xl mb-24">
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
            <motion.p 
              variants={itemVariants}
              className="text-lg text-text-secondary font-light leading-relaxed max-w-3xl"
            >
              {t('body')}
            </motion.p>
            <motion.div variants={itemVariants} className="mt-10">
              <SectionFlowLine />
            </motion.div>
          </div>

          {/* Cards Grid */}
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-y-1/2" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {cards.map((key) => (
              <ProblemCard key={key} keyId={key} />
            ))}
            </div>
          </div>

          {/* Bottom Callout */}
          <motion.div 
            variants={itemVariants}
            className="mt-20 flex justify-center"
          >
            <div className="px-6 py-3 rounded-full border border-primary/10 bg-primary/5 backdrop-blur-sm">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary">
                Análisis de cuello de botella detectado
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
