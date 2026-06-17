'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import BeforeAfterSlider from './BeforeAfterSlider';

const GREEN = '#1FA37A';

/* ---------------------------------------------------------------- content */

const CONTENT = {
  es: {
    category: 'BRANDING · ESTRATEGIA DIGITAL · DESARROLLO WEB',
    sector: 'MANUFACTURA · COLOMBIA',
    headline: ['56 años de química.', 'Cero presencia digital.', 'Eso lo cambiamos.'],
    heroMetrics: [
      { value: '56+', unit: 'años', label: 'Trayectoria consolidada' },
      { value: '100%', unit: '', label: 'Identidad renovada' },
      { value: '3', unit: 'sectores', label: 'Industrias activadas' },
    ],
    problem: {
      eyebrow: 'El Problema',
      quote: 'El problema no era el producto. Era la percepción.',
      support:
        'INCAP tenía el mejor adhesivo industrial de Colombia y lo sabía. Pero su marca decía lo contrario: un sitio desactualizado, sin arquitectura de conversión, sin un lenguaje que le hablara al ingeniero de planta ni al dueño de fábrica.',
      points: [
        { n: '01', title: 'Marca que no escalaba', desc: 'Sin consistencia entre canales ni un sistema visual que sostuviera el crecimiento.' },
        { n: '02', title: 'Web sin conversión', desc: 'Catálogos fríos, sin llamadas a la acción orientadas a la industria.' },
        { n: '03', title: 'Posicionamiento invisible', desc: '56 años de expertise técnico que no se traducían en autoridad digital.' },
      ],
    },
    method: {
      eyebrow: 'El Método',
      title: 'A:BRA Loop aplicado a INCAP',
      intro: 'No fue “hicimos un sitio bonito”. Fue el sistema completo: marca, web y conversión, integrados.',
      phases: [
        { phase: 'INSIGHT', desc: 'Auditoría 360° de marca, análisis de competencia en adhesivos LATAM y mapeo de buyer personas: jefe de producción, gerente de compras y maestro artesanal.' },
        { phase: 'BUILD', desc: 'Nuevo sistema de identidad visual, arquitectura web por industria, guía técnica de aplicación interactiva y contenido orientado a conversión.' },
        { phase: 'LAUNCH', desc: 'Posicionamiento por sectores (calzado, madera, colchones) e integración de WhatsApp como canal de diagnóstico técnico.' },
        { phase: 'LEARN', desc: 'KPIs de tráfico por categoría de industria y medición de solicitudes de asesoría para iterar el sistema.' },
      ],
    },
    system: {
      eyebrow: 'El Sistema',
      title: 'Lo que construimos',
      shots: [
        { tag: 'Narrative system', note: 'Mensajería problem-aware en el hero del nuevo www.grupoincap.com.co.' },
        { tag: 'Conversion architecture', note: 'Segmentación por caso de uso: una sección por industria.' },
        { tag: 'Growth trigger', note: 'CTA de diagnóstico sin fricción integrado a WhatsApp.' },
      ],
      sliderTitle: 'Antes / Después',
      sliderDesc: 'El salto de identidad, en un gesto. Arrastrá para comparar.',
      beforeLabel: 'Antes',
      afterLabel: 'Después',
      beforeNote: 'Sitio anterior — estética 1990, sin conversión',
      afterNote: 'Nuevo sistema — dark premium, orientado a industria',
    },
    results: {
      eyebrow: 'Resultados',
      title: 'El sistema, listo para escalar',
      items: [
        { value: '56+ años', desc: 'Identidad renovada sin perder autoridad histórica.' },
        { value: '3 industrias', desc: 'Arquitectura de contenido especializada por sector.' },
        { value: '+200% potencial', desc: 'Estructura lista para escalar tráfico orgánico.' },
        { value: '1 sistema', desc: 'Loop completo: marca + web + conversión integrados.' },
      ],
    },
    quote: {
      text: 'Llevábamos décadas siendo los mejores en la planta. A:BRA nos ayudó a serlo también en pantalla.',
      author: 'Gerencia',
      org: 'Grupo INCAP',
    },
    cta: {
      title: '¿Tu empresa industrial es mejor en la planta que en pantalla?',
      live: 'Ver el sitio en vivo',
      contact: 'Agenda un diagnóstico',
    },
    labNote: 'Auditoría de marca y análisis competitivo potenciados con herramientas de IA del A:BRA Lab.',
    partner: {
      eyebrow: 'Proyecto en alianza',
      title: 'Realizado junto a MTM Marca tu Marca',
      text: 'Este proyecto se desarrolló en conjunto con MTM Marca tu Marca, responsables de todo el desarrollo de branding e identidad de marca. A:BRA lideró la estrategia digital, la arquitectura web y el sistema de conversión.',
    },
  },
  en: {
    category: 'BRANDING · DIGITAL STRATEGY · WEB DEVELOPMENT',
    sector: 'MANUFACTURING · COLOMBIA',
    headline: ['56 years of chemistry.', 'Zero digital presence.', 'We changed that.'],
    heroMetrics: [
      { value: '56+', unit: 'years', label: 'Consolidated track record' },
      { value: '100%', unit: '', label: 'Identity renewed' },
      { value: '3', unit: 'sectors', label: 'Industries activated' },
    ],
    problem: {
      eyebrow: 'The Problem',
      quote: "The problem wasn't the product. It was the perception.",
      support:
        'INCAP had the best industrial adhesive in Colombia and knew it. But its brand said otherwise: an outdated site, no conversion architecture, no language that spoke to the plant engineer or the factory owner.',
      points: [
        { n: '01', title: "A brand that didn't scale", desc: 'No consistency across channels, no visual system to support growth.' },
        { n: '02', title: 'A web with no conversion', desc: 'Cold catalogs, no industry-oriented calls to action.' },
        { n: '03', title: 'Invisible positioning', desc: '56 years of technical expertise that never translated into digital authority.' },
      ],
    },
    method: {
      eyebrow: 'The Method',
      title: 'The A:BRA Loop applied to INCAP',
      intro: 'It wasn\'t "we made a pretty site." It was the full system: brand, web, and conversion, integrated.',
      phases: [
        { phase: 'INSIGHT', desc: '360° brand audit, LATAM adhesives competitive analysis, and buyer-persona mapping: production manager, procurement lead, and master craftsman.' },
        { phase: 'BUILD', desc: 'New visual identity system, industry-based web architecture, interactive technical application guide, and conversion-oriented content.' },
        { phase: 'LAUNCH', desc: 'Sector positioning (footwear, wood, mattresses) and WhatsApp integration as a technical-diagnosis channel.' },
        { phase: 'LEARN', desc: 'Traffic KPIs by industry category and advisory-request tracking to iterate the system.' },
      ],
    },
    system: {
      eyebrow: 'The System',
      title: 'What we built',
      shots: [
        { tag: 'Narrative system', note: 'Problem-aware messaging on the new www.grupoincap.com.co hero.' },
        { tag: 'Conversion architecture', note: 'Use-case segmentation: one section per industry.' },
        { tag: 'Growth trigger', note: 'Friction-less diagnosis CTA wired into WhatsApp.' },
      ],
      sliderTitle: 'Before / After',
      sliderDesc: 'The identity leap, in one gesture. Drag to compare.',
      beforeLabel: 'Before',
      afterLabel: 'After',
      beforeNote: 'Previous site — 1990s aesthetic, no conversion',
      afterNote: 'New system — dark premium, industry-oriented',
    },
    results: {
      eyebrow: 'Results',
      title: 'The system, ready to scale',
      items: [
        { value: '56+ years', desc: 'Renewed identity without losing historical authority.' },
        { value: '3 industries', desc: 'Content architecture specialized by sector.' },
        { value: '+200% potential', desc: 'Structure ready to scale organic traffic.' },
        { value: '1 system', desc: 'Full Loop: brand + web + conversion, integrated.' },
      ],
    },
    quote: {
      text: 'For decades we were the best on the factory floor. A:BRA helped us be the best on screen too.',
      author: 'Management',
      org: 'Grupo INCAP',
    },
    cta: {
      title: 'Is your industrial company better on the floor than on screen?',
      live: 'View the live site',
      contact: 'Book a diagnosis',
    },
    labNote: 'Brand audit and competitive analysis powered by A:BRA Lab AI tooling.',
    partner: {
      eyebrow: 'A partnered project',
      title: 'Delivered together with MTM Marca tu Marca',
      text: 'This project was carried out together with MTM Marca tu Marca, who led the entire branding and brand-identity development. A:BRA drove the digital strategy, web architecture and conversion system.',
    },
  },
} as const;

/* ------------------------------------------------------------- primitives */

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] as const },
};

/** Marco que muestra una captura real del sitio de INCAP. */
function Frame({
  src,
  alt,
  objectPosition = 'top',
}: {
  src: string;
  alt: string;
  objectPosition?: string;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-background-off">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover"
        style={{ objectPosition }}
      />
    </div>
  );
}

/* ---------------------------------------------------------------- section */

export default function IncapCaseStudy({ locale }: { locale: string }) {
  const t = CONTENT[locale === 'en' ? 'en' : 'es'];

  return (
    <div className="bg-background text-text-primary overflow-x-hidden selection:bg-white selection:text-background">
      {/* ---------- BLOCK 1 · HERO ---------- */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden pt-32 pb-24">
        <div className="nebula-glow opacity-20" />
        <div className="spatial-grid opacity-[0.03]" />
        <div
          className="absolute left-1/2 top-24 h-[420px] w-[420px] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: `${GREEN}1A` }}
        />
        <div className="container relative z-10 mx-auto max-w-7xl px-6">
          <motion.div {...fadeUp} className="mb-8 flex flex-wrap items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-text-muted">{t.category}</span>
            <span
              className="rounded-full border px-3 py-1 font-mono text-[9px] uppercase tracking-[0.3em]"
              style={{ borderColor: `${GREEN}40`, color: GREEN }}
            >
              {t.sector}
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="max-w-5xl text-5xl font-light leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl"
          >
            {t.headline.map((line, i) => (
              <span key={i} className={`block ${i === 2 ? 'text-text-secondary' : ''}`}>
                {line}
              </span>
            ))}
          </motion.h1>

          {/* hero metrics */}
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.25 }}
            className="mt-16 grid max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-[2rem] border border-white/5 bg-white/5 sm:grid-cols-3"
          >
            {t.heroMetrics.map((m) => (
              <div key={m.label} className="bg-background p-8">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-light tracking-tighter text-white md:text-5xl">{m.value}</span>
                  {m.unit && <span className="text-sm font-mono uppercase tracking-widest text-text-muted">{m.unit}</span>}
                </div>
                <p className="mt-3 text-xs font-light leading-relaxed text-text-secondary">{m.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------- HERO VISUAL ---------- */}
      <section className="relative -mt-8 pb-8">
        <div className="container mx-auto max-w-7xl px-6">
          <motion.div
            {...fadeUp}
            className="aspect-[16/9] overflow-hidden rounded-[2.5rem] border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
          >
            <Frame src="/incap/incap-hero.webp" alt="Grupo INCAP — nuevo sistema de marca y web" objectPosition="center" />
          </motion.div>
        </div>
      </section>

      {/* ---------- BLOCK 2 · PROBLEM ---------- */}
      <section className="border-y border-white/5 bg-background-off py-28 md:py-40">
        <div className="container mx-auto max-w-5xl px-6">
          <motion.span {...fadeUp} className="mb-6 block font-mono text-[9px] uppercase tracking-[0.6em] text-text-muted">
            {t.problem.eyebrow}
          </motion.span>
          <motion.h2
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-3xl font-light leading-tight tracking-tight text-white md:text-5xl"
          >
            {t.problem.quote}
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-text-secondary"
          >
            {t.problem.support}
          </motion.p>

          <div className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-[2rem] border border-white/5 bg-white/5 md:grid-cols-3">
            {t.problem.points.map((p, i) => (
              <motion.div
                key={p.n}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.1 * i }}
                className="bg-background p-10"
              >
                <span className="font-mono text-sm tracking-widest" style={{ color: GREEN }}>{p.n}</span>
                <h3 className="mt-5 text-xl font-light tracking-tight text-white">{p.title}</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-text-secondary">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- BLOCK 3 · METHOD (LOOP) ---------- */}
      <section className="py-28 md:py-40">
        <div className="container mx-auto max-w-6xl px-6">
          <motion.span {...fadeUp} className="mb-6 block font-mono text-[9px] uppercase tracking-[0.6em] text-text-muted">
            {t.method.eyebrow}
          </motion.span>
          <motion.h2 {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="max-w-3xl text-3xl font-light tracking-tight text-white md:text-5xl">
            {t.method.title}
          </motion.h2>
          <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }} className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-text-secondary">
            {t.method.intro}
          </motion.p>

          <div className="mt-16 divide-y divide-white/5 border-y border-white/5">
            {t.method.phases.map((ph, i) => (
              <motion.div
                key={ph.phase}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.06 * i }}
                className="group grid grid-cols-1 gap-6 py-10 md:grid-cols-[260px_1fr] md:gap-12"
              >
                <div className="flex items-center gap-5">
                  <span className="font-mono text-xs text-text-muted">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-2xl font-light tracking-tight text-white md:text-3xl">
                    {ph.phase}
                  </span>
                </div>
                <p className="max-w-2xl text-base font-light leading-relaxed text-text-secondary">{ph.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- BLOCK 4 · SYSTEM BUILT ---------- */}
      <section className="border-y border-white/5 bg-background-off py-28 md:py-40">
        <div className="container mx-auto max-w-7xl px-6">
          <motion.span {...fadeUp} className="mb-6 block font-mono text-[9px] uppercase tracking-[0.6em] text-text-muted">
            {t.system.eyebrow}
          </motion.span>
          <motion.h2 {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="text-3xl font-light tracking-tight text-white md:text-5xl">
            {t.system.title}
          </motion.h2>

          {/* annotated views of the new site (top / middle / bottom of the full page) */}
          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {t.system.shots.map((s, i) => (
              <motion.div key={s.tag} {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 * i }} className="group">
                <div className="aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/10">
                  <Frame
                    src="/incap/incap-despues.webp"
                    alt={`www.grupoincap.com.co — ${s.tag}`}
                    objectPosition={i === 0 ? 'top' : i === 1 ? 'center' : 'bottom'}
                  />
                </div>
                <div className="mt-5 px-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: GREEN }}>{s.tag}</span>
                  <p className="mt-2 text-sm font-light leading-relaxed text-text-secondary">{s.note}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* before / after slider */}
          <motion.div {...fadeUp} className="mt-28">
            <div className="mb-8 flex flex-col gap-2">
              <h3 className="text-2xl font-light tracking-tight text-white md:text-3xl">{t.system.sliderTitle}</h3>
              <p className="max-w-xl text-sm font-light leading-relaxed text-text-secondary">{t.system.sliderDesc}</p>
            </div>
            <BeforeAfterSlider
              beforeLabel={t.system.beforeLabel}
              afterLabel={t.system.afterLabel}
              before={<Frame src="/incap/incap-antes.webp" alt={t.system.beforeNote} objectPosition="top" />}
              after={<Frame src="/incap/incap-despues.webp" alt={t.system.afterNote} objectPosition="top" />}
            />
          </motion.div>
        </div>
      </section>

      {/* ---------- BLOCK 5 · RESULTS ---------- */}
      <section className="py-28 md:py-40">
        <div className="container mx-auto max-w-7xl px-6">
          <motion.span {...fadeUp} className="mb-6 block font-mono text-[9px] uppercase tracking-[0.6em] text-text-muted">
            {t.results.eyebrow}
          </motion.span>
          <motion.h2 {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="text-3xl font-light tracking-tight text-white md:text-5xl">
            {t.results.title}
          </motion.h2>

          <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/5 md:grid-cols-2 lg:grid-cols-4">
            {t.results.items.map((r, i) => (
              <motion.div key={i} {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 * i }} className="bg-background p-10">
                <p className="text-3xl font-light tracking-tighter text-white md:text-4xl">{r.value}</p>
                <p className="mt-4 text-sm font-light leading-relaxed text-text-secondary">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- BLOCK 6 · QUOTE ---------- */}
      <section className="border-y border-white/5 bg-background-off py-28 md:py-40">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <motion.div {...fadeUp} className="text-6xl font-light leading-none" style={{ color: GREEN }}>“</motion.div>
          <motion.blockquote
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="mt-4 text-2xl font-light leading-snug tracking-tight text-white md:text-4xl"
          >
            {t.quote.text}
          </motion.blockquote>
          <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }} className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted">
            — {t.quote.author} / {t.quote.org}
          </motion.p>
        </div>
      </section>

      {/* ---------- BLOCK 7 · CTA ---------- */}
      <section className="py-28 md:py-40">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <motion.h2 {...fadeUp} className="text-3xl font-light leading-tight tracking-tight text-white md:text-5xl">
            {t.cta.title}
          </motion.h2>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }} className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://www.grupoincap.com.co"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-primary rounded-full bg-white px-8 py-4 text-sm font-medium tracking-tight text-background transition-colors hover:bg-white/90"
            >
              → {t.cta.live}
            </a>
            <Link
              href={`/${locale}#contact`}
              className="cta-ghost rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-medium tracking-tight text-white transition-colors hover:bg-white/10"
            >
              → {t.cta.contact}
            </Link>
          </motion.div>

        </div>
      </section>

      {/* ---------- PARTNER CREDIT ---------- */}
      <section className="border-t border-white/5 pb-28 pt-4 md:pb-40">
        <div className="container mx-auto max-w-4xl px-6">
          <motion.div
            {...fadeUp}
            className="flex flex-col items-center gap-8 rounded-[2.5rem] border border-white/10 bg-background-off p-10 text-center md:p-14"
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.5em] text-text-muted">{t.partner.eyebrow}</span>
            <img
              src="/Bestune/MTM-Marca-tu-marca-brand.webp"
              alt="MTM Marca tu Marca"
              loading="lazy"
              className="h-12 w-auto opacity-90"
            />
            <h3 className="text-2xl font-light tracking-tight text-white md:text-3xl">{t.partner.title}</h3>
            <p className="max-w-2xl text-base font-light leading-relaxed text-text-secondary">{t.partner.text}</p>
            <p className="text-[11px] font-light leading-relaxed text-text-muted">{t.labNote}</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
