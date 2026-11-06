/* Canal en vivo compartido por la pantalla (index.html) y el público (voto.html).
   Usa Supabase Realtime Broadcast (sin tablas ni datos personales) y, como respaldo,
   BroadcastChannel para ensayar con dos pestañas en el mismo computador. */
window.Vivo = (function () {
  const C = window.TERTULIA || {};
  const EVENTS = ['voto', 'juego', 'reac', 'fase', 'hola'];
  const handlers = {};
  const seen = new Set();
  let ch = null, ready = false, local = null;

  function dispatch(ev, payload) {
    if (!payload || seen.has(payload._n)) return;
    seen.add(payload._n);
    (handlers[ev] || []).forEach(f => { try { f(payload); } catch (e) { console.error('[vivo]', e); } });
  }

  function connect(onStatus) {
    const status = onStatus || function () {};
    try {
      local = new BroadcastChannel('tertulia-' + (C.canal || 'local'));
      local.onmessage = (m) => dispatch(m.data.ev, m.data.payload);
    } catch (e) { local = null; }
    if (!window.supabase || !C.supabaseUrl || !C.supabaseKey) { status('off'); return; }
    const sb = window.supabase.createClient(C.supabaseUrl, C.supabaseKey, { realtime: { params: { eventsPerSecond: 30 } } });
    ch = sb.channel(C.canal, { config: { broadcast: { self: false, ack: false } } });
    EVENTS.forEach(ev => ch.on('broadcast', { event: ev }, ({ payload }) => dispatch(ev, payload)));
    status('wait');
    ch.subscribe((s) => {
      ready = s === 'SUBSCRIBED';
      status(ready ? 'on' : (s === 'CHANNEL_ERROR' || s === 'TIMED_OUT' || s === 'CLOSED') ? 'off' : 'wait');
    });
  }

  function on(ev, f) { (handlers[ev] = handlers[ev] || []).push(f); }

  function send(ev, payload) {
    const p = Object.assign({ _n: Math.random().toString(36).slice(2) + Date.now() }, payload);
    seen.add(p._n);
    if (local) local.postMessage({ ev, payload: p });
    if (ch && ready) return ch.send({ type: 'broadcast', event: ev, payload: p });
    return Promise.resolve(local ? 'local' : 'off');
  }

  function myId() {
    let id = localStorage.getItem('tertulia-id');
    if (!id) { id = Math.random().toString(36).slice(2, 10); localStorage.setItem('tertulia-id', id); }
    return id;
  }

  return { connect, on, send, myId, isReady: () => ready };
})();
