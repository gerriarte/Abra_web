import { useTranslations } from 'next-intl';
import { Grid, SectionHead, mutedTag } from '@/components/shared/motion';

type Signal = { title: string; body: string };

export default function Problem() {
  const t = useTranslations('home.problem');
  const signals = t.raw('signals') as Signal[];

  return (
    <section id="problem" className="relative border-t border-white/5 py-24 md:py-32">
      <div className="container mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHead eyebrow={t('eyebrow')} title={t.rich('title', mutedTag)} lead={t('body')} />
        <Grid min={240}>
          {signals.map((signal, i) => (
            <article key={signal.title} className="abra-card abra-reveal">
              <p aria-hidden="true" className="font-display text-5xl font-light leading-none tracking-[-0.05em] text-white/[0.12]">
                {String(i + 1).padStart(2, '0')}
              </p>
              <span className="abra-dot abra-dot--amber" aria-hidden="true" />
              <h3 className="abra-h3">{signal.title}</h3>
              <p className="abra-text">{signal.body}</p>
            </article>
          ))}
        </Grid>
      </div>
    </section>
  );
}
