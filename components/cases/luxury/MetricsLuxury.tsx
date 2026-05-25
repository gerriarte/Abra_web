'use client';

import React from 'react';
import { motion } from 'framer-motion';
import useOnScreen from '@/hooks/useOnScreen';

interface Metric {
  label: string;
  value: string;
  suffix?: string;
}

interface MetricsLuxuryProps {
  metrics: Metric[];
  title?: string;
}

export const MetricsLuxury: React.FC<MetricsLuxuryProps> = ({ metrics, title = "Key Impact Metrics" }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

  return (
    <section 
      ref={ref}
      className="py-32 bg-background-off relative border-y border-white/5"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-24"
        >
          <span className="text-[9px] font-mono tracking-[0.6em] uppercase text-text-muted mb-4 block">Resultados</span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight">{title}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-[2.5rem] overflow-hidden">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ delay: index * 0.1 }}
              className="bg-background p-12 flex flex-col items-center text-center group hover:bg-surface/20 transition-colors duration-500"
            >
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-text-muted mb-6 group-hover:text-primary transition-colors">
                {metric.label}
              </span>
              <div className="text-5xl md:text-6xl font-light text-text-primary tracking-tighter flex items-baseline">
                {metric.value}
                {metric.suffix && <span className="text-2xl ml-1 opacity-40">{metric.suffix}</span>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
