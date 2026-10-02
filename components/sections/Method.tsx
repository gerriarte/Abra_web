import Link from 'next/link';
import type { ReactElement } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Label, METHOD_ICONS, SectionHead, mutedTag } from '@/components/shared/motion';
import LoopDiagram from './LoopDiagram';

type Phase = { name: string; title: string; body: string };
type Step = { period: string; phase: string; body: string };

/** Insight = node network, Build = layers, Launch = converging paths, Learn = growing bars. */
const PHASE_ICONS: ReactElement[] = [METHOD_ICONS.expose, METHOD_ICONS.prepare, METHOD_ICONS.decide, METHOD_ICONS.prioritize];

/** Weeks per stretch of the 30-day process: one week each. */
const STEP_WEEKS = [1, 1, 1, 1];

export default function Method() {
  const t = useTranslations('home.method');
  const locale = useLocale();
  const phases = t.raw('phases') as Phase[];
  const steps = t.raw('process.steps') as Step[];

  return (
    <section id="method" className="relative border-t border-white/5 py-24 md:py-32">
      <div className="container mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHead eyebrow={t('eyebrow')} title={t.rich('title', mutedTag)} lead={t('lead')} />

        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="abra-reveal hidden lg:block">
            <LoopDiagram phases={phases.map((p) => p.name)} label={t('loopLabel')} caption={t('loopCaption')} />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {phases.map((phase, i) => (
              <article key={phase.name} className="abra-card abra-reveal">
                {PHASE_ICONS[i]}
                <Label>
                  {String(i + 1).padStart(2, '0')} · {phase.name}
                </Label>
                <h3 className="abra-h3">{phase.title}</h3>
                <p className="abra-text">{phase.body}</p>
                {i === 0 ? (
                  <Link href={`/${locale}/judgment-audit`} className="abra-link mt-auto pt-2">
                    {t('auditLink')}
                    <span className="abra-btn__arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>
                ) : null}
              </article>
            ))}
          </div>
        </div>

        <blockquote className="abra-reveal mx-auto mt-16 max-w-2xl text-center text-base font-light italic leading-relaxed text-white/60 md:text-lg">
          &ldquo;{t('quote')}&rdquo;
        </blockquote>

        {/* 30-day process */}
        <div className="mt-24 border-t border-white/[0.08] pt-16">
          <h3 className="abra-h2 abra-reveal mb-12 text-[clamp(1.6rem,3vw,2.4rem)]">{t.rich('process.title', mutedTag)}</h3>

          {/* 4-week bar split into the four stretches; each fills in sequence. */}
          <div
            className="abra-reveal mb-10 grid gap-2"
            style={{ gridTemplateColumns: STEP_WEEKS.map((w) => `${w}fr`).join(' ') }}
            aria-hidden="true"
          >
            {steps.map((step, i) => (
              <div key={step.period} className="flex min-w-0 flex-col gap-3">
                <div className="abra-track">
                  <div className="abra-fill" style={{ animationDelay: `${i * 0.7}s` }} />
                </div>
                <p className="abra-label abra-label--muted hidden truncate md:block">{step.period}</p>
              </div>
            ))}
          </div>

          <ol className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4" aria-label={t('process.timelineLabel')}>
            {steps.map((step) => (
              <li key={step.period} className="abra-card abra-reveal">
                <Label>{step.period}</Label>
                <h4 className="abra-h3 text-lg">{step.phase}</h4>
                <p className="abra-text">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
