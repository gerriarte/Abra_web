'use client';

import { Fragment, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search, Send, MessageSquare, CalendarCheck, FileText, Handshake,
  TrendingUp, Activity, Play, Sparkles,
} from 'lucide-react';
import useOnScreen from '@/hooks/useOnScreen';
import { sectionContainerVariants, itemVariants } from '@/lib/animations/variants';
import WordReveal from './WordReveal';
import CountUp from './CountUp';

// Panel de muestra: así ve el cliente su captación con a:bra (adaptado de docs/panel.md
// a la identidad de A:BRA). Valores ilustrativos; "Avanzar" simula el paso de una semana.

// Accent de datos — frío y sobrio, coherente con el azul noche de la marca.
const ACCENT = '#3DD6C4';

const STAGES = [
  { key: 'prospec', label: 'Prospección', icon: Search, desc: 'Empresas que podrían comprarte' },
  { key: 'contacto', label: 'Contacto', icon: Send, desc: 'Alcanzadas por email y WhatsApp' },
  { key: 'interes', label: 'Interesados', icon: MessageSquare, desc: 'Respondieron con interés' },
  { key: 'reunion', label: 'Reuniones', icon: CalendarCheck, desc: 'Agendadas con el decisor' },
  { key: 'cotiza', label: 'Cotizaciones', icon: FileText, desc: 'Oportunidades en curso' },
  { key: 'cliente', label: 'Clientes nuevos', icon: Handshake, desc: 'Cerrados' },
] as const;

type CountKey = (typeof STAGES)[number]['key'];
type Counts = Record<CountKey, number>;

const START: Counts = { prospec: 420, contacto: 188, interes: 31, reunion: 11, cotiza: 5, cliente: 2 };
const START_WEEKS = [
  { sem: 'S1', reuniones: 1 }, { sem: 'S2', reuniones: 2 },
  { sem: 'S3', reuniones: 3 }, { sem: 'S4', reuniones: 5 },
];
const START_FEED = [
  { t: 'hace 12 min', txt: 'Nueva respuesta — Aceros del Llano S.A.S', kind: 'interes' },
  { t: 'hace 1 h', txt: 'Reunión agendada — Metalúrgica Briceño', kind: 'reunion' },
  { t: 'ayer 16:40', txt: 'Cotización enviada — Estructuras MZ ($48M)', kind: 'cotiza' },
  { t: 'ayer 09:12', txt: '320 empresas nuevas sumadas al pipeline', kind: 'prospec' },
];

const NOMBRES = [
  'Hierros del Sur', 'Tornería Caicedo', 'Fundiciones Aru',
  'Maquinados RJ', 'Calderería Pinto', 'Estructuras Vega',
];

const COP = (n: number) => '$' + n.toLocaleString('es-CO');
const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

const FEED_COLOR: Record<string, string> = {
  prospec: '#3DD6C4', interes: '#FFFFFF', reunion: '#8AB4FF',
  cotiza: '#FFB547', cliente: '#3DD6C4',
};

export default function LandingPanel() {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

  const [counts, setCounts] = useState<Counts>(START);
  const [weeks, setWeeks] = useState(START_WEEKS);
  const [feed, setFeed] = useState(START_FEED);
  const [week, setWeek] = useState(4);
  const [pulse, setPulse] = useState(false);
  const [lastAdd, setLastAdd] = useState<Counts | null>(null);

  function simular() {
    const add = {
      prospec: rnd(140, 260), contacto: rnd(70, 130), interes: rnd(6, 14),
      reunion: rnd(2, 5), cotiza: rnd(1, 3), cliente: rnd(0, 1),
    };
    setLastAdd(add);
    setCounts((c) => {
      const next = { ...c };
      (Object.keys(c) as CountKey[]).forEach((k) => (next[k] = c[k] + add[k]));
      return next;
    });
    const nw = week + 1;
    setWeek(nw);
    setWeeks((w) => [...w.slice(-7), { sem: 'S' + nw, reuniones: add.reunion }]);
    const ev = [
      { txt: `Reunión agendada — ${NOMBRES[rnd(0, 5)]}`, kind: 'reunion' },
      { txt: `${add.interes} respuestas nuevas esta semana`, kind: 'interes' },
      ...(add.cliente ? [{ txt: `Cliente cerrado — ${NOMBRES[rnd(0, 5)]} 🎉`, kind: 'cliente' }] : []),
    ];
    setFeed((f) => [
      ...ev.map((e) => ({ t: 'recién', txt: e.txt, kind: e.kind })),
      ...f,
    ].slice(0, 6));
    setPulse(true);
    setTimeout(() => setPulse(false), 700);
  }

  const valorCotiz = counts.cotiza * 47;
  const maxWk = Math.max(...weeks.map((w) => w.reuniones), 1);

  return (
    <section id="panel" className="py-28 md:py-36 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(10,45,77,0.18),transparent_65%)] pointer-events-none" aria-hidden />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-6xl">
        <motion.div
          ref={ref}
          variants={sectionContainerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <div className="max-w-3xl mb-14">
            <motion.span
              variants={itemVariants}
              className="text-[10px] font-mono tracking-[0.4em] uppercase text-text-muted mb-6 block"
            >
              Lo que vas a ver
            </motion.span>
            <h2 className="text-balance text-3xl md:text-5xl font-light leading-[1.1] tracking-[-0.02em] text-text-primary mb-6">
              <WordReveal text="Tu crecimiento, visible en tiempo real." />
            </h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-text-secondary font-light leading-relaxed"
            >
              Cada empresa contactada, cada respuesta y cada reunión, en un solo panel.
              Tocá <span className="text-text-primary">avanzar</span> y mirá cómo crece semana a semana.
            </motion.p>
          </div>

          {/* Dashboard frame */}
          <motion.div
            variants={itemVariants}
            className="rounded-3xl border border-white/10 bg-surface/40 backdrop-blur-sm overflow-hidden shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)]"
          >
            <div className="p-5 sm:p-7 md:p-9">
              {/* Topbar */}
              <div className="flex justify-between items-start gap-4 flex-wrap mb-8">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-light tracking-[-0.04em] text-text-primary">
                      a<span className="text-text-secondary">:</span>bra
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.15em] text-text-secondary border border-white/10 rounded-full px-2.5 py-1">
                      <Sparkles size={10} /> Vista previa
                    </span>
                  </div>
                  <div className="text-xs text-text-muted mt-2">
                    Panel de captación · <span className="text-text-secondary">Metalúrgica del Sur S.A.S</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: ACCENT }} />
                    <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: ACCENT }} />
                  </span>
                  En vivo · semana {week}
                </div>
              </div>

              {/* KPIs */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-9">
                {[
                  { icon: Activity, lab: 'Prospectos en pipeline', value: counts.prospec, format: (n: number) => Math.round(n).toLocaleString('es-CO'), sub: 'activos este mes' },
                  { icon: CalendarCheck, lab: 'Reuniones', value: counts.reunion, format: (n: number) => String(Math.round(n)), sub: 'con decisores' },
                  { icon: MessageSquare, lab: 'Tasa de respuesta', value: (counts.interes / counts.contacto) * 100, format: (n: number) => `${n.toFixed(1)}%`, sub: 'sobre contactados' },
                  { icon: FileText, lab: 'En cotización', value: valorCotiz, format: (n: number) => `${COP(Math.round(n))}M`, sub: 'oportunidades abiertas' },
                ].map((k) => {
                  const Icon = k.icon;
                  return (
                    <div
                      key={k.lab}
                      className={`rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 transition-colors duration-700 ${pulse ? 'border-white/20' : ''}`}
                    >
                      <div className="flex items-center gap-2 text-[11px] text-text-muted mb-3">
                        <Icon size={13} /> {k.lab}
                      </div>
                      <CountUp
                        value={k.value}
                        format={k.format}
                        duration={0.9}
                        className="block text-2xl sm:text-3xl font-light tracking-tight text-text-primary tabular-nums"
                      />
                      <div className="flex items-center gap-1 text-[11px] mt-1.5" style={{ color: ACCENT }}>
                        <TrendingUp size={11} /> {k.sub}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pipeline */}
              <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-text-muted mb-4 flex items-center gap-2">
                <Activity size={12} /> Flujo de captación · en tiempo real
              </div>
              <div className="flex gap-2 sm:gap-0 overflow-x-auto pb-2 mb-9 -mx-1 px-1">
                {STAGES.map((s, i) => {
                  const Icon = s.icon;
                  const delta = lastAdd?.[s.key] ?? 0;
                  return (
                    <Fragment key={s.key}>
                      <div
                        className={`relative flex-1 min-w-[130px] rounded-2xl border bg-white/[0.02] p-4 transition-colors duration-700 ${pulse ? 'border-white/20' : 'border-white/[0.06]'}`}
                      >
                        {/* Delta que sube al avanzar (se reporta el cambio) */}
                        {delta > 0 && (
                          <motion.span
                            key={week}
                            className="absolute top-3 right-3 text-[11px] font-mono tabular-nums"
                            style={{ color: ACCENT }}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: [0, 1, 0], y: -20 }}
                            transition={{ duration: 1.6, times: [0, 0.18, 1], ease: 'easeOut' }}
                          >
                            +{delta}
                          </motion.span>
                        )}
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3 border border-white/10" style={{ color: ACCENT, background: 'rgba(61,214,196,0.07)' }}>
                          <Icon size={15} />
                        </div>
                        <div className="text-[11px] text-text-muted">{s.label}</div>
                        <CountUp
                          value={counts[s.key]}
                          format={(n) => Math.round(n).toLocaleString('es-CO')}
                          duration={0.8}
                          className="block text-xl font-light tabular-nums text-text-primary my-0.5"
                        />
                        <div className="text-[10px] text-text-muted/60 leading-snug">{s.desc}</div>
                      </div>

                      {/* Conector con token que fluye hacia la siguiente etapa */}
                      {i < STAGES.length - 1 && (
                        <div className="relative hidden sm:block flex-none self-stretch w-5 md:w-7" aria-hidden>
                          <span className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2" style={{ background: 'rgba(61,214,196,0.18)' }} />
                          <span
                            className={`flow-dot absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full ${pulse ? 'flow-fast' : ''}`}
                            style={{ background: ACCENT, boxShadow: `0 0 8px ${ACCENT}`, animationDelay: `${i * 0.35}s` }}
                          />
                        </div>
                      )}
                    </Fragment>
                  );
                })}
              </div>

              {/* Chart + Feed */}
              <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4 sm:gap-6">
                {/* Bar chart */}
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6">
                  <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-text-muted mb-6 flex items-center gap-2">
                    <TrendingUp size={12} /> Reuniones por semana
                  </div>
                  <div className="flex items-end gap-2 sm:gap-3 h-[180px]">
                    {weeks.map((w) => (
                      <div key={w.sem} className="group flex-1 flex flex-col items-center justify-end gap-2 h-full">
                        <span className="text-[11px] tabular-nums text-text-secondary transition-colors duration-300 group-hover:text-text-primary">{w.reuniones}</span>
                        <motion.div
                          className="w-full rounded-t-md transition-[filter,opacity] duration-300 opacity-80 group-hover:opacity-100 group-hover:brightness-125"
                          style={{
                            background: `linear-gradient(180deg, ${ACCENT}, rgba(61,214,196,0.15))`,
                          }}
                          initial={false}
                          animate={{ height: `${(w.reuniones / maxWk) * 100}%` }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        />
                        <span className="text-[10px] font-mono text-text-muted">{w.sem}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Activity feed */}
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6">
                  <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-text-muted mb-4 flex items-center gap-2">
                    <Activity size={12} /> Actividad reciente
                  </div>
                  <div>
                    {feed.map((f, i) => {
                      const col = FEED_COLOR[f.kind] ?? '#FFFFFF';
                      return (
                        <div
                          key={`${f.txt}-${i}`}
                          className="flex gap-3 py-3 border-b border-white/[0.05] last:border-none items-start"
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                            style={{ background: col, boxShadow: `0 0 8px ${col}` }}
                          />
                          <div>
                            <div className="text-[13px] text-text-secondary leading-snug">{f.txt}</div>
                            <div className="text-[10px] text-text-muted mt-0.5">{f.t}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Footer / control */}
              <div className="flex justify-between items-center gap-4 flex-wrap mt-8 pt-7 border-t border-white/[0.06]">
                <p className="text-xs text-text-muted leading-relaxed max-w-md">
                  Así seguís tu captación con a:bra: cada contacto, cada respuesta y cada reunión, en tiempo real.{' '}
                  <span className="text-text-muted/60">Valores ilustrativos.</span>
                </p>
                <button
                  type="button"
                  onClick={simular}
                  className="cta-primary inline-flex items-center gap-2 px-6 py-3 bg-white text-background text-sm font-medium tracking-wide rounded-sm hover:bg-white/90"
                >
                  <Play size={15} /> Avanzar una semana
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
