'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import useOnScreen from '@/hooks/useOnScreen';
import { SectionFlowLine } from '@/components/ui/SectionFlowLine';
import { sectionContainerVariants, itemVariants } from '@/lib/animations/variants';

const NOUGRAM_URL = 'https://nougram.co';

export default function Laboratory() {
  const t = useTranslations('lab');
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

  const highlights = ['01', '02', '03'] as const;

  return (
    <section id="laboratory" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-7xl">
        <motion.div
          ref={ref}
          variants={sectionContainerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-end">
            <div>
              <motion.span
                variants={itemVariants}
                className="text-xs font-mono tracking-[0.3em] uppercase text-text-muted mb-4 block"
              >
                {t('eyebrow')}
              </motion.span>
              <motion.h2 variants={itemVariants} className="text-balance">
                {t('title')}
              </motion.h2>
            </div>
            <motion.div variants={itemVariants}>
              <p className="text-lg text-text-secondary font-light leading-relaxed max-w-xl">
                {t('body')}
              </p>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="mb-12">
            <SectionFlowLine />
          </motion.div>

          <div className="space-y-12">
            {['nougram', 'agent-x'].map((productId) => (
              <motion.div
                key={productId}
                variants={itemVariants}
                className={`rounded-[2rem] border p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.35)] ${
                  productId === 'nougram' 
                  ? 'border-[#E54D00]/25 bg-[#262537]' 
                  : 'border-primary/20 bg-background/50 backdrop-blur-sm'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-white/50 mb-3">
                      {t(`products.${productId}.eyebrow`)}
                    </p>
                    <h3 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
                      {t(`products.${productId}.title`)}
                    </h3>
                  </div>
                  <span className={`text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full border ${
                    productId === 'nougram'
                    ? 'border-[#E54D00]/40 bg-[#E54D00]/10 text-[#FFB48A]'
                    : 'border-primary/40 bg-primary/10 text-primary'
                  }`}>
                    {t(`products.${productId}.status`)}
                  </span>
                </div>

                <p className="text-xl md:text-2xl font-medium leading-snug text-white mb-4">
                  {t(`products.${productId}.headline`)}
                </p>
                <p className="text-base text-white/75 font-light leading-relaxed max-w-3xl mb-8">
                  {t(`products.${productId}.description`)}
                </p>

                <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                  {highlights.map((key) => (
                    <li
                      key={key}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-white/80 font-light leading-relaxed"
                    >
                      {t(`products.${productId}.highlights.${key}`)}
                    </li>
                  ))}
                </ul>

                <a
                  href={productId === 'nougram' ? NOUGRAM_URL : '#contact'}
                  target={productId === 'nougram' ? "_blank" : "_self"}
                  rel={productId === 'nougram' ? "noopener noreferrer" : ""}
                  className={`cta-primary inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white ${
                    productId === 'nougram'
                    ? 'bg-[#E54D00] hover:bg-[#f05f18]'
                    : 'bg-primary hover:bg-primary/90'
                  }`}
                >
                  {t(`products.${productId}.cta`)}
                </a>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="mt-12 pt-8 border-t border-white/5">
            <p className="text-xs text-text-muted italic max-w-3xl font-light leading-relaxed">
              {t('microcopy')}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
