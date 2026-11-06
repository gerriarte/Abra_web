/* Motor de la presentación: navegación por pasos, fotos, QR, mapa, demos y el público en vivo. */
(function () {
  const C = window.TERTULIA || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const slides = $$('.slide');
  const STORE = 'tertulia-estado';
  const AUTO_INTRO_MS = 3800;
  let cur = 0, step = 0;

  /* ---------- estado en vivo (persistente por si se recarga la pantalla) ---------- */
  const S = Object.assign({ mano1: {}, mano2: {}, juego: {}, ppl: {}, rx: 0 }, JSON.parse(localStorage.getItem(STORE) || '{}'));
  const save = () => localStorage.setItem(STORE, JSON.stringify(S));

  /* ---------- URLs ---------- */
  const base = location.href.split('#')[0].split('?')[0].replace(/index\.html$/, '').replace(/\/$/, '');
  const URLS = { voto: base + '/voto.html', mauricio: C.linkedinMauricio, gerardo: C.linkedinGerardo, web: C.web };

  /* ---------- fotos: fotos/<nombre>.(jpg|png|webp); si no existen quedan las iniciales ---------- */
  function loadPhoto(name) {
    const exts = ['jpg', 'jpeg', 'png', 'webp'];
    const tryExt = (i) => {
      if (i >= exts.length) return;
      const src = `fotos/${name}.${exts[i]}`;
      const img = new Image();
      const glow = name === 'gerardo' ? ', radial-gradient(circle at 50% 38%, rgba(255,138,61,0) 32%, rgba(255,138,61,.95) 78%)' : '';
      img.onload = () => $$(`[data-photo="${name}"]`).forEach(el => { el.style.backgroundImage = `url("${src}")` + (el.classList.contains('ph') ? '' : glow); });
      img.onerror = () => tryExt(i + 1);
      img.src = src;
    };
    tryExt(0);
  }
  ['mauricio', 'mauricio-perfil', 'mauricio-terreno', 'mauricio-bn', 'gerardo'].forEach(loadPhoto);

  /* ---------- QR ---------- */
  function qrSvg(text) {
    if (!window.qrcode) return '<small>QR sin conexión</small>';
    const q = window.qrcode(0, 'M'); q.addData(text); q.make();
    const n = q.getModuleCount();
    let d = '';
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (q.isDark(r, c)) d += `M${c} ${r}h1v1h-1z`;
    return `<svg viewBox="0 0 ${n} ${n}" shape-rendering="crispEdges"><path d="${d}" fill="#0b1a2b"/></svg>`;
  }
  $$('[data-qr]').forEach(el => { el.innerHTML = qrSvg(URLS[el.dataset.qr] || base); });
  $('#qrUrl').textContent = URLS.voto.replace(/^https?:\/\//, '');
  $('#pcM').href = URLS.mauricio; $('#pcG').href = URLS.gerardo; $('#pcW').href = URLS.web;

  /* ---------- fondo: red de nodos (el "mapa") ---------- */
  const fx = $('#fx'), g = fx.getContext('2d');
  let pts = [];
  function sizeFx() {
    fx.width = innerWidth * devicePixelRatio; fx.height = innerHeight * devicePixelRatio;
    pts = Array.from({ length: 46 }, () => ({ x: Math.random() * fx.width, y: Math.random() * fx.height, vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25 }));
  }
  function drawFx() {
    g.clearRect(0, 0, fx.width, fx.height);
    const max = 170 * devicePixelRatio;
    for (const p of pts) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > fx.width) p.vx *= -1; if (p.y < 0 || p.y > fx.height) p.vy *= -1; }
    for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
      const a = pts[i], b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < max) { g.strokeStyle = `rgba(140,180,230,${.10 * (1 - d / max)})`; g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(b.x, b.y); g.stroke(); }
    }
    g.fillStyle = 'rgba(160,200,240,.35)';
    for (const p of pts) { g.beginPath(); g.arc(p.x, p.y, 1.4 * devicePixelRatio, 0, 7); g.fill(); }
    requestAnimationFrame(drawFx);
  }
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) { sizeFx(); drawFx(); addEventListener('resize', sizeFx); }

  /* ---------- navegación ---------- */
  const steps = (i) => +(slides[i].dataset.steps || 0);
  let introTimer = null;

  function render() {
    slides.forEach((s, i) => { s.classList.toggle('on', i === cur); s.classList.toggle('off-up', i < cur); });
    const s = slides[cur];
    $$('[data-step]', s).forEach(el => el.classList.toggle('shown', +el.dataset.step <= step));
    document.body.dataset.tone = s.dataset.tone || 'blue';
    document.body.classList.toggle('noqr', !s.dataset.live || s.dataset.live === 'manos' || cur === slides.length - 1);
    $('#bar').style.width = ((cur + 1) / slides.length * 100) + '%';
    $('#pg').textContent = String(cur + 1).padStart(2, '0') + ' / ' + slides.length;
    $$('#rail button').forEach((b, i) => b.classList.toggle('on', i === cur));
    $$('#railTab i').forEach((b, i) => b.classList.toggle('on', i === cur));
    history.replaceState(null, '', '#' + (cur + 1));
    onStep(s);
  }

  function go(i, atEnd) {
    if (i < 0 || i >= slides.length) return;
    const changed = i !== cur;
    cur = i; step = atEnd ? steps(i) : 0;
    render();
    if (changed || atEnd === undefined) onEnter(slides[cur]);
  }
  const next = () => (step < steps(cur) ? (step++, render()) : go(cur + 1));
  const prev = () => (step > 0 ? (step--, render()) : go(cur - 1, true));

  function onEnter(s) {
    clearTimeout(introTimer);
    if (s.classList.contains('intro') && step === 0) introTimer = setTimeout(() => { if (slides[cur] === s && step === 0) next(); }, AUTO_INTRO_MS);
    $$('[data-count]', s).forEach(countUp);
    if (s.hasAttribute('data-graph')) Graph.play();
    if (s.hasAttribute('data-portfolio')) Portfolio.show(Portfolio.tab);
    if (s.querySelector('#term')) Onto.run('sin');
    if (s.querySelector('#wall')) buildWall();
    sendFase();
  }

  function onStep(s) {
    if (s.classList.contains('intro')) s.classList.toggle('phase2', step >= 1);
    if (s.querySelector('#flip')) $('#flip').classList.toggle('done', step >= 1);
    if (s.hasAttribute('data-graph')) Graph.rules(step);
    if (s.dataset.live === 'manos') paintManos();
    if (s.dataset.live === 'juego') paintJuego();
    $$('[data-connect]', s).forEach(b => { const on = step >= 1; b.textContent = on ? '✓ Pendiente' : '+ Conectar'; b.classList.toggle('done', on); b.classList.toggle('pri', !on); });
    sendFase();
  }

  function countUp(el) {
    const to = +el.dataset.count, suf = el.dataset.suffix || '', t0 = performance.now(), dur = 1400;
    const tick = (t) => { const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3); el.textContent = Math.round(to * e) + suf; if (k < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }

  function buildWall() {
    const w = $('#wall'); w.innerHTML = '';
    for (let k = 0; k < 24; k++) { const i = document.createElement('i'); i.style.setProperty('--k', 23 - k); w.appendChild(i); }
  }

  /* ---------- mapa del negocio (grafo SVG) ---------- */
  const Graph = (function () {
    const N = { trab: [130, 90, 'Trabajador'], cont: [380, 90, 'Contrato'], carg: [630, 90, 'Cargo'], afil: [130, 330, 'Afiliaciones'], sal: [630, 330, 'Salario'] };
    const E = [['trab', 'cont', 'firma'], ['cont', 'carg', 'define el puesto'], ['trab', 'afil', 'necesita'], ['carg', 'sal', 'define']];
    const svg = $('#graph');
    let html = '';
    E.forEach(([a, b, l], i) => {
      const [x1, y1] = N[a], [x2, y2] = N[b];
      html += `<path class="edge" data-e="${a}-${b}" d="M${x1} ${y1}L${x2} ${y2}"/>`;
      const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
      html += `<text class="lbl" data-e="${a}-${b}" x="${mx + (x1 === x2 ? 14 : 0)}" y="${my - (y1 === y2 ? 14 : 0)}" text-anchor="${x1 === x2 ? 'start' : 'middle'}">${l}</text>`;
    });
    Object.entries(N).forEach(([k, [x, y, t]]) => {
      html += `<g class="node" data-n="${k}"><rect x="${x - 95}" y="${y - 34}" width="190" height="68"/><text x="${x}" y="${y}">${t}</text></g>`;
    });
    html += `<text id="gWarn" x="130" y="410" text-anchor="middle" style="font:600 14px var(--mono);fill:var(--red);opacity:0;transition:opacity .4s">✕ sin afiliación = no empieza</text>`;
    svg.innerHTML = html;
    const timers = [];
    function play() {
      timers.forEach(clearTimeout); timers.length = 0;
      $$('.node,.edge,.lbl', svg).forEach(e => e.classList.remove('shown', 'hl', 'bad'));
      $('#gWarn').style.opacity = 0;
      const order = ['trab', 'cont', 'carg', 'afil', 'sal'];
      order.forEach((k, i) => timers.push(setTimeout(() => $(`.node[data-n="${k}"]`, svg).classList.add('shown'), 300 + i * 260)));
      E.forEach(([a, b], i) => timers.push(setTimeout(() => $$(`[data-e="${a}-${b}"]`, svg).forEach(e => e.classList.add('shown')), 1500 + i * 320)));
    }
    function clearHl() { $$('.hl,.bad', svg).forEach(e => e.classList.remove('hl', 'bad')); $('#gWarn').style.opacity = 0; }
    function hl(keys, cls = 'hl') {
      clearHl();
      keys.forEach(k => { const el = k.includes('-') ? $$(`path[data-e="${k}"]`, svg) : [$(`.node[data-n="${k}"]`, svg)]; el.forEach(e => e && e.classList.add(cls)); });
    }
    function rules(st) {
      if (st === 2) hl(['trab', 'afil', 'trab-afil']);
      else if (st === 3) hl(['cont', 'carg', 'cont-carg']);
      else clearHl();
    }
    $$('.node', svg).forEach(n => n.addEventListener('click', (ev) => {
      ev.stopPropagation(); const k = n.dataset.n;
      hl([k, ...E.filter(e => e[0] === k || e[1] === k).flatMap(e => [e[0], e[1], e[0] + '-' + e[1]])]);
    }));
    $$('.rule').forEach(r => r.addEventListener('click', (ev) => {
      ev.stopPropagation();
      if (r.dataset.rule === 'afil') { hl(['afil', 'trab-afil'], 'bad'); $('#gWarn').style.opacity = 1; }
      else hl(['cont', 'carg', 'cont-carg']);
    }));
    return { play, rules };
  })();

  /* ---------- ontología: IA sin mapa vs con mapa ---------- */
  const Onto = (function () {
    const SCRIPTS = {
      sin: [['p', '> Redacta el contrato de Ana Gómez, auxiliar contable. Empieza el lunes.'], ['', ''], ['ok', '✓ Contrato generado · 4 páginas · cláusulas completas · listo para firma.'], ['', ''], ['w', '⚠ Nadie preguntó: Ana todavía no está afiliada a EPS, pensión ni ARL.'], ['err', '✕ Un contrato impecable… para alguien que no puede empezar a trabajar.']],
      con: [['p', '> Redacta el contrato de Ana Gómez, auxiliar contable. Empieza el lunes.'], ['', ''], ['', '· consultando el mapa: Trabajador → necesita → Afiliaciones'], ['err', '✕ ARL: no registrada · EPS: en trámite'], ['ok', '■ Regla 1: nadie empieza a trabajar sin estar afiliado.'], ['ok', '→ Primero: radicar ARL y EPS. Cuando estén, genero el contrato.']]
    };
    let tok = 0;
    async function run(kind) {
      const my = ++tok, term = $('#term');
      $$('[data-onto]').forEach(b => { b.classList.toggle('on', b.dataset.onto === kind); b.classList.toggle('ok', b.dataset.onto === 'con'); });
      term.innerHTML = '';
      for (const [cls, line] of SCRIPTS[kind]) {
        const span = document.createElement('div'); span.className = cls; term.appendChild(span);
        const msPerChar = cls === 'p' ? 22 : 14, t0 = performance.now();
        let i = 0;
        while (i < line.length) {
          if (my !== tok) return;
          i = Math.min(line.length, Math.floor((performance.now() - t0) / msPerChar));
          span.innerHTML = line.slice(0, i) + '<span class="cursor"></span>';
          await new Promise(r => setTimeout(r, msPerChar));
        }
        if (my !== tok) return;
        span.textContent = line || ' ';
        await new Promise(r => setTimeout(r, 380));
      }
    }
    $$('[data-onto]').forEach(b => b.addEventListener('click', (e) => { e.stopPropagation(); run(b.dataset.onto); }));
    return { run };
  })();

  /* ---------- portafolio ---------- */
  const Portfolio = (function () {
    const D = {
      laboral: { t: 'Un mismo mapa laboral. <em>Nueve herramientas.</em>', n: 'Laboral y gestión humana', items: [
        ['SST · SaaS', 'GRIAL·SST', 'Seguridad y salud en el trabajo: cerca de 70 módulos.', 1], ['Riesgo · SaaS', 'Psicosocial360', 'Baterías de riesgo psicosocial, informes y plan de intervención.', 1, 'https://psicosocial360.vercel.app'],
        ['Compensación · SaaS', 'Compensa360', 'Valoración de cargos, equidad y brecha salarial.', 1, 'https://compensa360.vercel.app'], ['Nómina · SaaS', 'Presupuesto360', 'Presupuesto de nómina a 1–5 años y costo empleador.', 0, 'https://presupuesto-nomina.vercel.app'],
        ['Desempeño · SaaS', 'Alza360', 'Evaluación de desempeño 360°.'], ['Contratación · SaaS', 'DocuLaboral', 'Documentos laborales desde plantillas y checklist documental.'],
        ['Asistencia · SaaS', 'PULSO', 'Control de asistencia con PIN y novedades.'], ['Gestión humana', 'Ausentismos360', 'Ausentismos, sus costos y portal del empleado.'], ['Laboral · suscripción', 'Ecosistema Laboral', 'Calculadoras del Código Sustantivo del Trabajo.']] },
      legal: { t: 'El mismo mapa, del lado legal. <em>Ocho más.</em>', n: 'Legal y cumplimiento', items: [
        ['Auditoría · IA', 'Sólido360 Auditorías', 'Auditoría laboral con IA: más de 160 empresas en un ciclo.', 1], ['Casos jurídicos', 'SólidoLex', 'Seguimiento y gestión de casos jurídicos.'],
        ['Societario', 'Secretaría Jurídica', 'Actas, marcas, repositorio societario y vencimientos.'], ['Cumplimiento', 'SólidoLex OC', 'Oficial de cumplimiento SAGRILAFT y PTEE.'],
        ['Portal', 'Portal legal Sólido', 'Portal legal empresarial en un solo lugar.'], ['Contratos · IA', 'Gestión contractual', 'Generador de contratos con IA. En detalle →', 1],
        ['Ecosistema', 'Toolbox 360', 'Hub de más de 17 herramientas para más de 12 empresas.'], ['Captación', 'Diagnóstico IA', '10 preguntas, semáforo y 3 recomendaciones en PDF.']] },
      crea: { t: 'Otro dominio, otro mapa. <em>El mismo método.</em>', n: 'Creatividad y procesos', items: [
        ['Marketing', 'KIP Score', 'Seguimiento y reporte automatizado de KPI.'], ['Transporte', 'CRM gerencial', 'Cartera, semáforo, metas y alertas para la gerencia.'],
        ['Creatividad', 'Prompt Architect', 'Prompts avanzados para producción audiovisual de agencia.'], ['Gráficas', 'Pliego App', 'Cotizador para imprentas y agencias gráficas.', 2, 'https://pliego.abralatam.com'],
        ['Datos · analítica', 'Synapse', 'Múltiples fuentes de datos en un reporte unificado de negocio.'], ['Agencia · creatividad', 'My Voice', 'Cuadro de materiales, copy y adaptación de piezas para más de 80 medios.'],
        ['Agencias', 'Nougram', 'Cotizador de servicios creativos con IA y control de rentabilidad.']] }
    };
    const api = { tab: 'laboral' };
    $('#pfTabs').innerHTML = Object.entries(D).map(([k, v]) => `<button data-tab="${k}">${v.n}<b>${v.items.length}</b></button>`).join('');
    api.show = function (k) {
      api.tab = k; const v = D[k];
      $('#pfTitle').innerHTML = v.t;
      $$('#pfTabs button').forEach(b => b.classList.toggle('on', b.dataset.tab === k));
      $('#pfGrid').innerHTML = v.items.map(([cat, name, desc, flag, url], i) =>
        `<div class="tool in-anim ${flag === 1 ? 'star' : flag === 2 ? 'own' : ''}" style="--k:${i}"><small>${cat}</small><h4>${name}</h4><p>${desc}</p>${url ? `<a href="${url}" target="_blank" rel="noopener" aria-label="${name}"></a>` : ''}</div>`).join('');
    };
    $$('#pfTabs button').forEach(b => b.addEventListener('click', (e) => { e.stopPropagation(); api.show(b.dataset.tab); }));
    api.cycle = () => { const ks = Object.keys(D); api.show(ks[(ks.indexOf(api.tab) + 1) % ks.length]); };
    return api;
  })();

  /* ---------- demo del generador de contratos ---------- */
  (function () {
    const doc = $('#doc'), chk = $$('#chk span');
    const LABELS = ['Trabajador identificado', 'Cargo definido', 'Salario ≥ SMMLV 2026', 'Afiliaciones (EPS · pensión · ARL · caja)', 'Preaviso de 30 días programado'];
    function run(ok) {
      chk.forEach((s, i) => { s.className = ''; s.textContent = '☐ ' + LABELS[i]; });
      doc.innerHTML = '<h5>CONTRATO INDIVIDUAL DE TRABAJO A TÉRMINO FIJO</h5><p style="color:#777">Validando contra el mapa…</p>';
      const failAt = ok ? 99 : 3;
      chk.forEach((s, i) => setTimeout(() => {
        if (i > failAt) return;
        const bad = i === failAt; s.className = bad ? 'n' : 'y'; s.textContent = (bad ? '✕ ' : '✓ ') + LABELS[i];
        if (i === Math.min(failAt, chk.length - 1)) setTimeout(() => paint(ok), 350);
      }, 300 + i * 380));
    }
    function paint(ok) {
      const af = ok ? '<span class="fld">EPS Sura · Colpensiones · ARL Positiva · Compensar</span>' : '<span class="fld miss">ARL: NO REGISTRADA</span>';
      doc.innerHTML = `<h5>CONTRATO INDIVIDUAL DE TRABAJO A TÉRMINO FIJO</h5>
        <p>Entre <b>EMPRESA DEMO S.A.S.</b> y <span class="fld">ANA GÓMEZ</span>, identificada con C.C. <span class="fld">1.0XX.XXX.XXX</span>, se celebra el presente contrato para el cargo de <span class="fld">AUXILIAR CONTABLE</span>,
        con salario mensual de <span class="fld">$ 1.900.000</span> y duración de <span class="fld">6 meses</span>.</p>
        <p style="margin-top:10px"><b>Afiliaciones:</b> ${af}</p>
        <p style="margin-top:10px"><b>Preaviso:</b> ${ok ? '<span class="fld">alerta programada 30 días antes del vencimiento</span>' : '—'}</p>
        <div class="stamp ${ok ? 'ok' : 'no'}">${ok ? '✓ LISTO PARA FIRMA' : '✕ BLOQUEADO · REGLA 1'}</div>`;
    }
    $('#ctOk').addEventListener('click', (e) => { e.stopPropagation(); run(true); });
    $('#ctNo').addEventListener('click', (e) => { e.stopPropagation(); run(false); });
  })();

  /* ---------- público en vivo ---------- */
  const pct = (a, b) => (b ? Math.round(a / b * 100) : 0);
  function paintManos() {
    const ids = Object.keys(S.mano1), tot = ids.length;
    const y1 = ids.filter(i => S.mano1[i]).length, y2 = Object.keys(S.mano2).filter(i => S.mano2[i] && S.mano1[i]).length;
    const p1 = pct(y1, tot), p2 = pct(y2, tot);
    $('#m1').style.width = p1 + '%'; $('#m1t').textContent = p1 + '%';
    $('#m2').style.width = p2 + '%'; $('#m2t').textContent = p2 + '%';
    $('#gapN').textContent = Math.max(0, p1 - p2);
    $('#nVotes').textContent = tot;
    $('#nPpl').textContent = Object.keys(S.ppl).length;
  }
  const RIGHT = { t1: 'ia', t2: 'ia', t3: 'ia', t4: 'persona', t5: 'persona', t6: 'persona' };
  function paintJuego() {
    const reveal = slides[cur].dataset.live === 'juego' && step >= 1;
    $$('.task').forEach(t => {
      const k = t.dataset.task, votes = Object.values(S.juego[k] || {}), ok = votes.filter(v => v === RIGHT[k]).length;
      t.classList.toggle('shown', reveal);
      t.querySelector('.pb i').style.width = (reveal ? pct(ok, votes.length) : 0) + '%';
      t.querySelector('.pct').textContent = reveal ? `${pct(ok, votes.length)}% acertó · ${votes.length}` : `${votes.length} votos`;
    });
  }
  function flyEmoji(e) {
    const el = document.createElement('div'); el.className = 'fly'; el.textContent = e;
    el.style.left = (8 + Math.random() * 84) + 'vw';
    el.style.setProperty('--dx', (Math.random() * 120 - 60) + 'px'); el.style.setProperty('--rot', (Math.random() * 40 - 20) + 'deg');
    $('#rx').appendChild(el); setTimeout(() => el.remove(), 4300);
    S.rx++; $('#rxCount').textContent = S.rx;
  }
  let saveT = null; const saveSoon = () => { clearTimeout(saveT); saveT = setTimeout(save, 500); };

  function sendFase() {
    const s = slides[cur];
    Vivo.send('fase', { f: s.dataset.live || 'espera', paso: step, titulo: s.dataset.title });
  }
  Vivo.on('hola', (p) => { S.ppl[p.id] = 1; saveSoon(); paintManos(); sendFase(); });
  Vivo.on('voto', (p) => { if (p.q !== 'mano1' && p.q !== 'mano2') return; S[p.q][p.id] = !!p.v; S.ppl[p.id] = 1; saveSoon(); paintManos(); });
  Vivo.on('juego', (p) => { if (!RIGHT[p.k]) return; (S.juego[p.k] = S.juego[p.k] || {})[p.id] = p.v; saveSoon(); paintJuego(); });
  Vivo.on('reac', (p) => { if (typeof p.e === 'string' && p.e.length <= 4) { flyEmoji(p.e); saveSoon(); } });
  Vivo.connect((st) => {
    $('#live').classList.toggle('on', st === 'on');
    $('#liveTxt').textContent = st === 'on' ? 'en vivo' : st === 'wait' ? 'conectando…' : 'sin conexión en vivo';
    if (st === 'on') sendFase();
  });
  $$('#rxbar button').forEach(b => b.addEventListener('click', (e) => { e.stopPropagation(); flyEmoji(b.dataset.e); }));
  $('#rxCount').textContent = S.rx;

  /* Ensayo / respaldo: D simula público, Shift+X borra los votos */
  function demo() {
    for (let i = 0; i < 40; i++) {
      const id = 'demo' + i, used = Math.random() < .9;
      S.mano1[id] = used; S.mano2[id] = used && Math.random() < .25; S.ppl[id] = 1;
      Object.keys(RIGHT).forEach(k => { (S.juego[k] = S.juego[k] || {})[id] = Math.random() < .72 ? RIGHT[k] : (RIGHT[k] === 'ia' ? 'persona' : 'ia'); });
    }
    save(); paintManos(); paintJuego(); for (let i = 0; i < 12; i++) setTimeout(() => flyEmoji(['👍', '💡', '👏', '🔥'][i % 4]), i * 120);
  }
  function reset() { if (!confirm('¿Borrar todos los votos y reacciones?')) return; S.mano1 = {}; S.mano2 = {}; S.juego = {}; S.ppl = {}; S.rx = 0; save(); paintManos(); paintJuego(); $('#rxCount').textContent = 0; }

  /* ---------- riel de secciones (S) y buscador (Ctrl+K) ---------- */
  let lastSec = '';
  $('#rail').innerHTML = slides.map((s, i) => {
    const h = s.dataset.sec !== lastSec ? `<h6>${s.dataset.sec}</h6>` : ''; lastSec = s.dataset.sec;
    return `${h}<button data-go="${i}"><i>${String(i + 1).padStart(2, '0')}</i>${s.dataset.title}</button>`;
  }).join('');
  $('#rail').insertAdjacentHTML('afterbegin', '<div class="rh"><img src="assets/abra.png" alt="A:BRA" style="height:16px"><small>S · ocultar</small></div>');
  $('#railTab').innerHTML = slides.map(() => '<i></i>').join('');
  const rail = $('#rail');
  let railTimer = null;
  function railSet(open) { clearTimeout(railTimer); rail.classList.toggle('open', open); document.body.classList.toggle('rail-open', open); }
  $('#railTab').addEventListener('mouseenter', () => railSet(true));
  $('#railTab').addEventListener('click', (e) => { e.stopPropagation(); railSet(true); });
  rail.addEventListener('mouseenter', () => clearTimeout(railTimer));
  rail.addEventListener('mouseleave', () => { railTimer = setTimeout(() => railSet(false), 350); });
  $$('#rail button').forEach(b => b.addEventListener('click', (e) => { e.stopPropagation(); go(+b.dataset.go); railSet(false); }));
  const sk = $('#sk'), skIn = $('#skIn'), skList = $('#skList');
  let skSel = 0, skRes = [];
  function skPaint() {
    const q = skIn.value.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    skRes = slides.map((s, i) => ({ i, t: s.dataset.title, txt: (s.dataset.title + ' ' + s.textContent).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '') })).filter(r => r.txt.includes(q));
    skSel = Math.min(skSel, Math.max(0, skRes.length - 1));
    skList.innerHTML = skRes.map((r, k) => `<li class="${k === skSel ? 'on' : ''}" data-i="${r.i}"><i>${String(r.i + 1).padStart(2, '0')}</i>${r.t}</li>`).join('');
  }
  function skOpen() { sk.classList.add('open'); skIn.value = ''; skSel = 0; skPaint(); skIn.focus(); }
  function skClose() { sk.classList.remove('open'); }
  skIn.addEventListener('input', () => { skSel = 0; skPaint(); });
  skList.addEventListener('click', (e) => { const li = e.target.closest('li'); if (li) { go(+li.dataset.i); skClose(); } });
  sk.addEventListener('click', (e) => { if (e.target === sk) skClose(); });

  /* ---------- teclado, clic y gestos ---------- */
  addEventListener('keydown', (e) => {
    if (sk.classList.contains('open')) {
      if (e.key === 'Escape') skClose();
      else if (e.key === 'ArrowDown') { skSel = Math.min(skSel + 1, skRes.length - 1); skPaint(); e.preventDefault(); }
      else if (e.key === 'ArrowUp') { skSel = Math.max(skSel - 1, 0); skPaint(); e.preventDefault(); }
      else if (e.key === 'Enter' && skRes[skSel]) { go(skRes[skSel].i); skClose(); }
      return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); skOpen(); return; }
    const k = e.key;
    if (['ArrowRight', 'PageDown', ' ', 'Enter'].includes(k)) { e.preventDefault(); next(); }
    else if (['ArrowLeft', 'PageUp', 'Backspace'].includes(k)) { e.preventDefault(); prev(); }
    else if (k === 'Home') go(0); else if (k === 'End') go(slides.length - 1);
    else if (k === 's' || k === 'S') railSet(!rail.classList.contains('open'));
    else if (k === 'f' || k === 'F') (document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen()).catch(() => {});
    else if (k === 'd' || k === 'D') demo();
    else if (k === 'X' && e.shiftKey) reset();
    else if (k === 't' || k === 'T') { if (slides[cur].hasAttribute('data-portfolio')) Portfolio.cycle(); }
    else if (k === 'Escape') railSet(false);
  });
  document.addEventListener('click', (e) => {
    if (e.target.closest('a,button,input,.rule,.node,.rail,.rail-tab,.sk,.rxbar,#flip,.qrbig')) {
      if (e.target.closest('#flip')) { step = step >= 1 ? 0 : 1; render(); }
      return;
    }
    if (innerWidth > 900) (e.clientX < innerWidth * .25 ? prev : next)();
  });
  let tx = null;
  addEventListener('touchstart', (e) => { tx = e.touches[0].clientX; }, { passive: true });
  addEventListener('touchend', (e) => { if (tx === null || innerWidth <= 900) return; const d = e.changedTouches[0].clientX - tx; if (Math.abs(d) > 60) (d < 0 ? next : prev)(); tx = null; });

  addEventListener('hashchange', () => { const n = parseInt(location.hash.slice(1), 10); if (n >= 1 && n <= slides.length && n - 1 !== cur) go(n - 1); });

  /* ---------- arranque ---------- */
  const h = parseInt(location.hash.slice(1), 10);
  cur = h >= 1 && h <= slides.length ? h - 1 : 0;
  render(); onEnter(slides[cur]); paintManos(); paintJuego();
})();
