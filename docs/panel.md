import React, { useState, useEffect, useRef } from "react";
import {
  Search, Send, MessageSquare, CalendarCheck, FileText, Handshake,
  TrendingUp, Activity, Play, Zap,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

// ---- Pipeline de captación: lo que "recibe" el cliente ----
const STAGES = [
  { key: "prospec",  label: "Prospección",     icon: Search,       desc: "Empresas que podrían comprarle" },
  { key: "contacto", label: "Contacto",        icon: Send,         desc: "Alcanzadas por email y WhatsApp" },
  { key: "interes",  label: "Interesados",     icon: MessageSquare,desc: "Respondieron con interés" },
  { key: "reunion",  label: "Reuniones",       icon: CalendarCheck,desc: "Agendadas con el decisor" },
  { key: "cotiza",   label: "Cotizaciones",    icon: FileText,     desc: "Oportunidades en curso" },
  { key: "cliente",  label: "Clientes nuevos", icon: Handshake,    desc: "Cerrados" },
];

const START = { prospec: 420, contacto: 188, interes: 31, reunion: 11, cotiza: 5, cliente: 2 };
const START_WEEKS = [
  { sem: "S1", reuniones: 1 }, { sem: "S2", reuniones: 2 },
  { sem: "S3", reuniones: 3 }, { sem: "S4", reuniones: 5 },
];
const START_FEED = [
  { t: "hace 12 min", txt: "Nueva respuesta — Aceros del Llano S.A.S", kind: "interes" },
  { t: "hace 1 h",    txt: "Reunión agendada — Metalúrgica Briceño", kind: "reunion" },
  { t: "ayer 16:40",  txt: "Cotización enviada — Estructuras MZ ($48M)", kind: "cotiza" },
  { t: "ayer 09:12",  txt: "320 empresas nuevas sumadas al pipeline", kind: "prospec" },
];

const COP = (n) => "$" + n.toLocaleString("es-CO");

export default function AbraDemoPanel() {
  const [counts, setCounts] = useState(START);
  const [weeks, setWeeks] = useState(START_WEEKS);
  const [feed, setFeed] = useState(START_FEED);
  const [week, setWeek] = useState(4);
  const [pulse, setPulse] = useState(null);
  const liveRef = useRef(null);

  // parpadeo del indicador "en vivo"
  const [dot, setDot] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setDot((d) => !d), 1100);
    return () => clearInterval(id);
  }, []);

  const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));

  function simular() {
    const add = {
      prospec: rnd(140, 260), contacto: rnd(70, 130), interes: rnd(6, 14),
      reunion: rnd(2, 5), cotiza: rnd(1, 3), cliente: rnd(0, 1),
    };
    setCounts((c) => {
      const next = {}; Object.keys(c).forEach((k) => (next[k] = c[k] + add[k])); return next;
    });
    const nw = week + 1;
    setWeek(nw);
    setWeeks((w) => [...w.slice(-7), { sem: "S" + nw, reuniones: add.reunion }]);
    const nombres = ["Hierros del Sur", "Tornería Caicedo", "Fundiciones Aru",
      "Maquinados RJ", "Calderería Pinto", "Estructuras Vega"];
    const ev = [
      { txt: `Reunión agendada — ${nombres[rnd(0,5)]}`, kind: "reunion" },
      { txt: `${add.interes} respuestas nuevas esta semana`, kind: "interes" },
      ...(add.cliente ? [{ txt: `Cliente cerrado — ${nombres[rnd(0,5)]} 🎉`, kind: "cliente" }] : []),
    ];
    setFeed((f) => [{ t: "recién", txt: ev[0].txt, kind: ev[0].kind },
      { t: "recién", txt: ev[1].txt, kind: ev[1].kind },
      ...(ev[2] ? [{ t: "recién", txt: ev[2].txt, kind: ev[2].kind }] : []),
      ...f].slice(0, 6));
    setPulse(Date.now());
    setTimeout(() => setPulse(null), 700);
  }

  const tasaResp = ((counts.interes / counts.contacto) * 100).toFixed(1);
  const valorCotiz = counts.cotiza * 47;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap');
        * { box-sizing: border-box; margin: 0; }
        .ab-root {
          --bg:#0a0d12; --surf:#11161f; --surf2:#161c27; --bd:#232c3a;
          --tx:#e7eef6; --mut:#7d8aa0; --ac:#a8f03c; --ac2:#3dd6c4;
          font-family:'Sora',sans-serif; background:
            radial-gradient(900px 500px at 85% -10%, rgba(61,214,196,.07), transparent),
            radial-gradient(700px 500px at 0% 110%, rgba(168,240,60,.06), transparent), var(--bg);
          color:var(--tx); min-height:100vh; padding:28px; letter-spacing:-.01em;
        }
        .ab-mono{font-family:'JetBrains Mono',monospace;}
        .ab-head{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;flex-wrap:wrap;margin-bottom:26px;}
        .ab-brand{display:flex;align-items:center;gap:13px;}
        .ab-logo{font-weight:800;font-size:23px;letter-spacing:-.04em;}
        .ab-logo b{color:var(--ac);}
        .ab-client{font-size:13px;color:var(--mut);margin-top:3px;}
        .ab-client b{color:var(--tx);font-weight:600;}
        .ab-demo-badge{display:inline-flex;align-items:center;gap:6px;font-size:10.5px;text-transform:uppercase;
          letter-spacing:.13em;color:var(--ac);border:1px solid rgba(168,240,60,.35);
          padding:4px 9px;border-radius:99px;background:rgba(168,240,60,.06);}
        .ab-live{display:flex;align-items:center;gap:8px;font-size:12px;color:var(--mut);}
        .ab-dot{width:8px;height:8px;border-radius:99px;background:var(--ac);transition:opacity .4s;box-shadow:0 0 10px var(--ac);}
        .ab-kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:24px;}
        .ab-card{background:linear-gradient(180deg,var(--surf2),var(--surf));border:1px solid var(--bd);
          border-radius:15px;padding:17px 18px;position:relative;overflow:hidden;}
        .ab-card .lab{font-size:11.5px;color:var(--mut);display:flex;align-items:center;gap:7px;margin-bottom:11px;}
        .ab-card .val{font-size:29px;font-weight:700;}
        .ab-card .sub{font-size:11px;color:var(--ac);margin-top:5px;display:flex;align-items:center;gap:4px;}
        .ab-section-t{font-size:12px;text-transform:uppercase;letter-spacing:.14em;color:var(--mut);margin:0 0 15px;display:flex;align-items:center;gap:8px;}
        .ab-pipe{display:flex;gap:0;align-items:stretch;margin-bottom:26px;overflow-x:auto;padding-bottom:6px;}
        .ab-node{flex:1;min-width:135px;background:linear-gradient(180deg,var(--surf2),var(--surf));
          border:1px solid var(--bd);border-radius:14px;padding:15px 14px;position:relative;}
        .ab-node .ico{width:34px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center;
          background:rgba(168,240,60,.1);color:var(--ac);margin-bottom:11px;}
        .ab-node .nlab{font-size:12.5px;color:var(--mut);}
        .ab-node .nval{font-size:27px;font-weight:800;margin:2px 0;}
        .ab-node .ndesc{font-size:10.5px;color:#5d6a80;line-height:1.35;}
        .ab-conn{display:flex;align-items:center;width:22px;flex:0 0 22px;position:relative;}
        .ab-conn::before{content:'';position:absolute;top:50%;left:0;right:0;height:2px;background:var(--bd);}
        .ab-conn::after{content:'';position:absolute;top:50%;margin-top:-3px;width:6px;height:6px;border-radius:99px;
          background:var(--ac);left:0;animation:flow 2.4s linear infinite;box-shadow:0 0 8px var(--ac);}
        @keyframes flow{0%{left:-4px;opacity:0}15%{opacity:1}85%{opacity:1}100%{left:20px;opacity:0}}
        .ab-grid{display:grid;grid-template-columns:1.5fr 1fr;gap:18px;}
        .ab-panel{background:linear-gradient(180deg,var(--surf2),var(--surf));border:1px solid var(--bd);border-radius:16px;padding:20px;}
        .ab-feed-item{display:flex;gap:11px;padding:11px 0;border-bottom:1px solid rgba(35,44,58,.6);align-items:flex-start;}
        .ab-feed-item:last-child{border-bottom:none;}
        .ab-fdot{width:7px;height:7px;border-radius:99px;margin-top:6px;flex:0 0 7px;}
        .ab-ftxt{font-size:13px;line-height:1.3;}
        .ab-ft{font-size:10.5px;color:var(--mut);margin-top:2px;}
        .ab-btn{display:inline-flex;align-items:center;gap:9px;background:var(--ac);color:#0a0d12;border:none;
          font-family:'Sora';font-weight:700;font-size:14px;padding:13px 22px;border-radius:11px;cursor:pointer;
          letter-spacing:-.01em;transition:transform .12s, box-shadow .2s;box-shadow:0 6px 22px rgba(168,240,60,.25);}
        .ab-btn:hover{transform:translateY(-2px);box-shadow:0 10px 30px rgba(168,240,60,.4);}
        .ab-btn:active{transform:translateY(0);}
        .ab-foot{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;margin-top:24px;}
        .ab-foot-note{font-size:12px;color:var(--mut);max-width:440px;line-height:1.5;}
        .flash{animation:flash .7s ease;}
        @keyframes flash{0%{background:rgba(168,240,60,.18)}100%{background:transparent}}
        .rise{opacity:0;animation:rise .6s ease forwards;}
        @keyframes rise{to{opacity:1;transform:none}from{transform:translateY(14px)}}
        @media(max-width:880px){.ab-kpis{grid-template-columns:repeat(2,1fr)}.ab-grid{grid-template-columns:1fr}}
      `}</style>

      <div className="ab-root">
        {/* Header */}
        <div className="ab-head">
          <div>
            <div className="ab-brand">
              <div className="ab-logo">a<b>:</b>bra</div>
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
          <div className="ab-card rise" style={{ animationDelay: "0ms" }}>
            <div className="lab"><Activity size={14} /> Prospectos en pipeline</div>
            <div className="val ab-mono">{counts.prospec.toLocaleString("es-CO")}</div>
            <div className="sub"><TrendingUp size={12} /> activos este mes</div>
          </div>
          <div className="ab-card rise" style={{ animationDelay: "80ms" }}>
            <div className="lab"><CalendarCheck size={14} /> Reuniones</div>
            <div className="val ab-mono">{counts.reunion}</div>
            <div className="sub"><TrendingUp size={12} /> con decisores</div>
          </div>
          <div className="ab-card rise" style={{ animationDelay: "160ms" }}>
            <div className="lab"><MessageSquare size={14} /> Tasa de respuesta</div>
            <div className="val ab-mono">{tasaResp}%</div>
            <div className="sub"><TrendingUp size={12} /> sobre contactados</div>
          </div>
          <div className="ab-card rise" style={{ animationDelay: "240ms" }}>
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
                <div className={"ab-node" + (pulse ? " flash" : "")}>
                  <div className="ico"><Icon size={18} /></div>
                  <div className="nlab">{s.label}</div>
                  <div className="nval ab-mono">{counts[s.key].toLocaleString("es-CO")}</div>
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
            <ResponsiveContainer width="100%" height={210}>
              <AreaChart data={weeks} margin={{ left: -22, right: 6, top: 6 }}>
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a8f03c" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#a8f03c" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#232c3a" vertical={false} />
                <XAxis dataKey="sem" stroke="#7d8aa0" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#7d8aa0" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip contentStyle={{ background: "#11161f", border: "1px solid #232c3a", borderRadius: 10, color: "#e7eef6", fontSize: 12 }} />
                <Area type="monotone" dataKey="reuniones" stroke="#a8f03c" strokeWidth={2.5} fill="url(#g)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="ab-panel">
            <div className="ab-section-t"><Activity size={13} /> Actividad reciente</div>
            <div>
              {feed.map((f, i) => {
                const col = { prospec: "#3dd6c4", interes: "#a8f03c", reunion: "#8ab4ff", cotiza: "#f0c23c", cliente: "#a8f03c" }[f.kind];
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
            Así vas a ver tu proceso de captación con a:bra: cada empresa contactada, cada respuesta
            y cada reunión, en tiempo real. Tocá <b style={{ color: "#a8f03c" }}>avanzar</b> para ver cómo crece semana a semana. <span style={{ opacity: .55 }}>Valores ilustrativos.</span>
          </div>
          <button className="ab-btn" onClick={simular}>
            <Play size={16} /> Avanzar una semana
          </button>
        </div>
      </div>
    </>
  );
}