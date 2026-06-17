'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Search, Send, MessageSquare, CalendarCheck, FileText, Handshake,
  TrendingUp, Activity, Play, Zap,
} from 'lucide-react';

/* ---- Pipeline de captación: lo que "recibe" el cliente ---- */
type StageKey = 'prospec' | 'contacto' | 'interes' | 'reunion' | 'cotiza' | 'cliente';

const STAGES: { key: StageKey; label: string; icon: React.ElementType; desc: string }[] = [
  { key: 'prospec',  label: 'Prospección',     icon: Search,        desc: 'Empresas que podrían comprarle' },
  { key: 'contacto', label: 'Contacto',        icon: Send,          desc: 'Alcanzadas por email y WhatsApp' },
  { key: 'interes',  label: 'Interesados',     icon: MessageSquare, desc: 'Respondieron con interés' },
  { key: 'reunion',  label: 'Reuniones',       icon: CalendarCheck, desc: 'Agendadas con el decisor' },
  { key: 'cotiza',   label: 'Cotizaciones',    icon: FileText,      desc: 'Oportunidades en curso' },
  { key: 'cliente',  label: 'Clientes nuevos', icon: Handshake,     desc: 'Cerrados' },
];

type Counts = Record<StageKey, number>;
type Week = { sem: string; reuniones: number };
type FeedItem = { t: string; txt: string; kind: StageKey };

const START: Counts = { prospec: 420, contacto: 188, interes: 31, reunion: 11, cotiza: 5, cliente: 2 };
const START_WEEKS: Week[] = [
  { sem: 'S1', reuniones: 1 }, { sem: 'S2', reuniones: 2 },
  { sem: 'S3', reuniones: 3 }, { sem: 'S4', reuniones: 5 },
];
const START_FEED: FeedItem[] = [
  { t: 'hace 12 min', txt: 'Nueva respuesta — Aceros del Llano S.A.S', kind: 'interes' },
  { t: 'hace 1 h',    txt: 'Reunión agendada — Metalúrgica Briceño', kind: 'reunion' },
  { t: 'ayer 16:40',  txt: 'Cotización enviada — Estructuras MZ ($48M)', kind: 'cotiza' },
  { t: 'ayer 09:12',  txt: '320 empresas nuevas sumadas al pipeline', kind: 'prospec' },
];

const COP = (n: number) => '$' + n.toLocaleString('es-CO');

const FEED_COLORS: Record<StageKey, string> = {
  prospec: '#6FE0FF', contacto: '#8AB4FF', interes: '#3B9DFF',
  reunion: '#8AB4FF', cotiza: '#FFB547', cliente: '#3B9DFF',
};

/* ---- Mini área-chart en SVG (sin dependencias) ---- */
function MiniAreaChart({ data }: { data: Week[] }) {
  const W = 560, H = 210, padX = 16, padTop = 14, padBottom = 12;
  const max = Math.max(...data.map((d) => d.reuniones), 1);
  const n = data.length;
  const x = (i: number) => padX + (i * (W - 2 * padX)) / Math.max(n - 1, 1);
  const y = (v: number) => H - padBottom - (v / max) * (H - padTop - padBottom);
  const pts = data.map((d, i) => [x(i), y(d.reuniones)] as const);
  const line = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const area = `${line} L ${x(n - 1).toFixed(1)} ${H - padBottom} L ${x(0).toFixed(1)} ${H - padBottom} Z`;
  const grid = [0.25, 0.5, 0.75, 1].map((g) => H - padBottom - g * (H - padTop - padBottom));

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={210} preserveAspectRatio="none" role="img" aria-label="Reuniones por semana">
        <defs>
          <linearGradient id="abra-demo-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3B9DFF" stopOpacity={0.45} />
            <stop offset="100%" stopColor="#3B9DFF" stopOpacity={0} />
          </linearGradient>
        </defs>
        {grid.map((gy, i) => (
          <line key={i} x1={0} x2={W} y1={gy} y2={gy} stroke="rgba(255,255,255,0.06)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
        ))}
        <path d={area} fill="url(#abra-demo-grad)" />
        <path d={line} fill="none" stroke="#3B9DFF" strokeWidth={2.5} vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
      <div className="ab-xaxis">
        {data.map((d) => <span key={d.sem}>{d.sem}</span>)}
      </div>
    </div>
  );
}

export default function AbraDemoPanel() {
  const [counts, setCounts] = useState<Counts>(START);
  const [weeks, setWeeks] = useState<Week[]>(START_WEEKS);
  const [feed, setFeed] = useState<FeedItem[]>(START_FEED);
  const [week, setWeek] = useState(4);
  const [pulse, setPulse] = useState<number | null>(null);
  const [dot, setDot] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setDot((d) => !d), 1100);
    return () => clearInterval(id);
  }, []);

  const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

  function simular() {
    const add: Counts = {
      prospec: rnd(140, 260), contacto: rnd(70, 130), interes: rnd(6, 14),
      reunion: rnd(2, 5), cotiza: rnd(1, 3), cliente: rnd(0, 1),
    };
    setCounts((c) => {
      const next = { ...c };
      (Object.keys(c) as StageKey[]).forEach((k) => (next[k] = c[k] + add[k]));
      return next;
    });
    const nw = week + 1;
    setWeek(nw);
    setWeeks((w) => [...w.slice(-7), { sem: 'S' + nw, reuniones: add.reunion }]);
    const nombres = ['Hierros del Sur', 'Tornería Caicedo', 'Fundiciones Aru', 'Maquinados RJ', 'Calderería Pinto', 'Estructuras Vega'];
    const ev: FeedItem[] = [
      { t: 'recién', txt: `Reunión agendada — ${nombres[rnd(0, 5)]}`, kind: 'reunion' },
      { t: 'recién', txt: `${add.interes} respuestas nuevas esta semana`, kind: 'interes' },
      ...(add.cliente ? [{ t: 'recién', txt: `Cliente cerrado — ${nombres[rnd(0, 5)]} 🎉`, kind: 'cliente' as StageKey }] : []),
    ];
    setFeed((f) => [...ev, ...f].slice(0, 6));
    setPulse(Date.now());
    setTimeout(() => setPulse(null), 700);
  }

  const tasaResp = ((counts.interes / counts.contacto) * 100).toFixed(1);
  const valorCotiz = counts.cotiza * 47;

  return (
    <>
      <style>{`
        .ab-root {
          --surf:#061a2e; --surf2:#0a2236; --bd:rgba(255,255,255,.08);
          --tx:rgba(255,255,255,.92); --mut:rgba(255,255,255,.4); --ac:#3B9DFF;
          font-family:var(--font-inter,'Inter',system-ui,sans-serif);
          background:
            radial-gradient(900px 500px at 85% -10%, rgba(59,157,255,.10), transparent),
            radial-gradient(700px 500px at 0% 110%, rgba(59,157,255,.06), transparent),
            #020C17;
          color:var(--tx); border:1px solid var(--bd); border-radius:28px;
          padding:28px; letter-spacing:-.01em; overflow:hidden;
        }
        .ab-mono{font-variant-numeric:tabular-nums;font-feature-settings:'tnum';}
        .ab-head{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;flex-wrap:wrap;margin-bottom:26px;}
        .ab-brand{display:flex;align-items:center;gap:14px;}
        .ab-client{font-size:13px;color:var(--mut);margin-top:9px;}
        .ab-client b{color:var(--tx);font-weight:600;}
        .ab-demo-badge{display:inline-flex;align-items:center;gap:6px;font-size:10.5px;text-transform:uppercase;
          letter-spacing:.13em;color:var(--ac);border:1px solid rgba(59,157,255,.35);
          padding:4px 9px;border-radius:99px;background:rgba(59,157,255,.06);}
        .ab-live{display:flex;align-items:center;gap:8px;font-size:12px;color:var(--mut);}
        .ab-dot{width:8px;height:8px;border-radius:99px;background:var(--ac);transition:opacity .4s;box-shadow:0 0 10px var(--ac);}
        .ab-kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:24px;}
        .ab-card{background:linear-gradient(180deg,var(--surf2),var(--surf));border:1px solid var(--bd);
          border-radius:15px;padding:17px 18px;position:relative;overflow:hidden;}
        .ab-card .lab{font-size:11.5px;color:var(--mut);display:flex;align-items:center;gap:7px;margin-bottom:11px;}
        .ab-card .val{font-size:29px;font-weight:600;}
        .ab-card .sub{font-size:11px;color:var(--ac);margin-top:5px;display:flex;align-items:center;gap:4px;}
        .ab-section-t{font-size:12px;text-transform:uppercase;letter-spacing:.14em;color:var(--mut);margin:0 0 15px;display:flex;align-items:center;gap:8px;}
        .ab-pipe{display:flex;gap:0;align-items:stretch;margin-bottom:26px;overflow-x:auto;padding-bottom:6px;}
        .ab-node{flex:1;min-width:135px;background:linear-gradient(180deg,var(--surf2),var(--surf));
          border:1px solid var(--bd);border-radius:14px;padding:15px 14px;position:relative;}
        .ab-node .ico{width:34px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center;
          background:rgba(59,157,255,.1);color:var(--ac);margin-bottom:11px;}
        .ab-node .nlab{font-size:12.5px;color:var(--mut);}
        .ab-node .nval{font-size:27px;font-weight:700;margin:2px 0;}
        .ab-node .ndesc{font-size:10.5px;color:rgba(255,255,255,.32);line-height:1.35;}
        .ab-conn{display:flex;align-items:center;width:22px;flex:0 0 22px;position:relative;}
        .ab-conn::before{content:'';position:absolute;top:50%;left:0;right:0;height:2px;background:var(--bd);}
        .ab-conn::after{content:'';position:absolute;top:50%;margin-top:-3px;width:6px;height:6px;border-radius:99px;
          background:var(--ac);left:0;animation:abflow 2.4s linear infinite;box-shadow:0 0 8px var(--ac);}
        @keyframes abflow{0%{left:-4px;opacity:0}15%{opacity:1}85%{opacity:1}100%{left:20px;opacity:0}}
        .ab-grid{display:grid;grid-template-columns:1.5fr 1fr;gap:18px;}
        .ab-panel{background:linear-gradient(180deg,var(--surf2),var(--surf));border:1px solid var(--bd);border-radius:16px;padding:20px;}
        .ab-xaxis{display:flex;justify-content:space-between;margin-top:8px;font-size:11px;color:var(--mut);}
        .ab-feed-item{display:flex;gap:11px;padding:11px 0;border-bottom:1px solid rgba(255,255,255,.05);align-items:flex-start;}
        .ab-feed-item:last-child{border-bottom:none;}
        .ab-fdot{width:7px;height:7px;border-radius:99px;margin-top:6px;flex:0 0 7px;}
        .ab-ftxt{font-size:13px;line-height:1.3;}
        .ab-ft{font-size:10.5px;color:var(--mut);margin-top:2px;}
        .ab-btn{display:inline-flex;align-items:center;gap:9px;background:var(--ac);color:#020C17;border:none;
          font-family:inherit;font-weight:600;font-size:14px;padding:13px 22px;border-radius:11px;cursor:pointer;
          letter-spacing:-.01em;transition:transform .12s, box-shadow .2s;box-shadow:0 6px 22px rgba(59,157,255,.25);}
        .ab-btn:hover{transform:translateY(-2px);box-shadow:0 10px 30px rgba(59,157,255,.4);}
        .ab-btn:active{transform:translateY(0);}
        .ab-foot{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;margin-top:24px;}
        .ab-foot-note{font-size:12px;color:var(--mut);max-width:440px;line-height:1.5;}
        .ab-flash{animation:abflash .7s ease;}
        @keyframes abflash{0%{background:rgba(59,157,255,.18)}100%{background:transparent}}
        .ab-rise{opacity:0;animation:abrise .6s ease forwards;}
        @keyframes abrise{to{opacity:1;transform:none}from{transform:translateY(14px)}}
        @media(max-width:880px){.ab-kpis{grid-template-columns:repeat(2,1fr)}.ab-grid{grid-template-columns:1fr}}
      `}</style>

      <div className="ab-root">
        {/* Header */}
        <div className="ab-head">
          <div>
            <div className="ab-brand">
              <Image src="/abra-blanco.webp" alt="A:BRA" width={92} height={29} className="h-7 w-auto" priority />
              <span className="ab-demo-badge"><Zap size={11} /> Vista previa</span>
            </div>
            <div className="ab-client">Panel de captación · <b>Metalúrgica del Sur S.A.S</b></div>
          </div>
          <div className="ab-live">
            <span className="ab-dot" style={{ opacity: dot ? 1 : 0.25 }} /> En vivo · semana {week}
          </div>
        </div>

        {/* KPIs */}
        <div className="ab-kpis">
          <div className="ab-card ab-rise" style={{ animationDelay: '0ms' }}>
            <div className="lab"><Activity size={14} /> Prospectos en pipeline</div>
            <div className="val ab-mono">{counts.prospec.toLocaleString('es-CO')}</div>
            <div className="sub"><TrendingUp size={12} /> activos este mes</div>
          </div>
          <div className="ab-card ab-rise" style={{ animationDelay: '80ms' }}>
            <div className="lab"><CalendarCheck size={14} /> Reuniones</div>
            <div className="val ab-mono">{counts.reunion}</div>
            <div className="sub"><TrendingUp size={12} /> con decisores</div>
          </div>
          <div className="ab-card ab-rise" style={{ animationDelay: '160ms' }}>
            <div className="lab"><MessageSquare size={14} /> Tasa de respuesta</div>
            <div className="val ab-mono">{tasaResp}%</div>
            <div className="sub"><TrendingUp size={12} /> sobre contactados</div>
          </div>
          <div className="ab-card ab-rise" style={{ animationDelay: '240ms' }}>
            <div className="lab"><FileText size={14} /> En cotización</div>
            <div className="val ab-mono">{COP(valorCotiz)}M</div>
            <div className="sub"><TrendingUp size={12} /> oportunidades abiertas</div>
          </div>
        </div>

        {/* Pipeline de nodos */}
        <div className="ab-section-t"><Activity size={13} /> Flujo de captación · en tiempo real</div>
        <div className="ab-pipe">
          {STAGES.map((s, i) => {
            const Icon = s.icon;
            return (
              <React.Fragment key={s.key}>
                <div className={'ab-node' + (pulse ? ' ab-flash' : '')}>
                  <div className="ico"><Icon size={18} /></div>
                  <div className="nlab">{s.label}</div>
                  <div className="nval ab-mono">{counts[s.key].toLocaleString('es-CO')}</div>
                  <div className="ndesc">{s.desc}</div>
                </div>
                {i < STAGES.length - 1 && <div className="ab-conn" />}
              </React.Fragment>
            );
          })}
        </div>

        {/* Chart + Feed */}
        <div className="ab-grid">
          <div className="ab-panel">
            <div className="ab-section-t"><TrendingUp size={13} /> Reuniones por semana</div>
            <MiniAreaChart data={weeks} />
          </div>

          <div className="ab-panel">
            <div className="ab-section-t"><Activity size={13} /> Actividad reciente</div>
            <div>
              {feed.map((f, i) => {
                const col = FEED_COLORS[f.kind];
                return (
                  <div className="ab-feed-item" key={i}>
                    <span className="ab-fdot" style={{ background: col, boxShadow: `0 0 8px ${col}` }} />
                    <div>
                      <div className="ab-ftxt">{f.txt}</div>
                      <div className="ab-ft">{f.t}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer / control de simulación */}
        <div className="ab-foot">
          <div className="ab-foot-note">
            Así vas a ver tu proceso de captación con A:BRA: cada empresa contactada, cada respuesta
            y cada reunión, en tiempo real. Tocá <b style={{ color: 'var(--ac)' }}>avanzar</b> para ver cómo crece semana a semana. <span style={{ opacity: .55 }}>Valores ilustrativos.</span>
          </div>
          <button className="ab-btn" onClick={simular}>
            <Play size={16} /> Avanzar una semana
          </button>
        </div>
      </div>
    </>
  );
}
