import { getTransport } from './email';
import { logEvent } from '../utils/logger';

const moduleName = 'lib/services/autodiagnostico-email';

export type AutodiagnosticoLead = {
  email: string;
  tot: number;
  level: string;
  blocks: Record<string, number>;
  weak: string;
  decision: string;
  utm_source: string;
  utm_campaign: string;
  ts: string;
};

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function blocksText(blocks: Record<string, number>): string {
  return Object.entries(blocks).map(([name, value]) => `${name}: ${value}/8`).join('\n');
}

/** Envía el lead del autodiagnóstico al mismo correo que recibe el formulario de contacto. */
export async function sendAutodiagnosticoEmail(lead: AutodiagnosticoLead) {
  const recipient = process.env.CONTACT_RECIPIENT_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || lead.email;

  if (!recipient) {
    throw new Error('Contact recipient email is not configured.');
  }

  const transporter = getTransport();
  const decisionLine = lead.decision ? `Decisión evaluada: ${lead.decision}` : 'Decisión evaluada: no indicada';
  const utm = [lead.utm_source && `utm_source=${lead.utm_source}`, lead.utm_campaign && `utm_campaign=${lead.utm_campaign}`]
    .filter(Boolean)
    .join(' · ') || 'sin UTM';

  const text = `Nuevo lead del autodiagnóstico

Correo: ${lead.email}
Puntaje: ${lead.tot}/32
Nivel: ${lead.level}
Bloque más débil: ${lead.weak}
${decisionLine}
Origen: ${utm}
Fecha: ${lead.ts}

Puntaje por bloque:
${blocksText(lead.blocks)}`;

  const html = `
    <div style="font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1b1b1b; line-height: 1.6;">
      <h2 style="font-weight: 400; color: #0f172a;">Nuevo lead del autodiagnóstico</h2>
      <p><strong>Correo:</strong> <a href="mailto:${esc(lead.email)}">${esc(lead.email)}</a></p>
      <p><strong>Puntaje:</strong> ${lead.tot}/32</p>
      <p><strong>Nivel:</strong> ${esc(lead.level)}</p>
      <p><strong>Bloque más débil:</strong> ${esc(lead.weak)}</p>
      <p><strong>${esc(decisionLine)}</strong></p>
      <p><strong>Origen:</strong> ${esc(utm)}</p>
      <p><strong>Fecha:</strong> ${esc(lead.ts)}</p>
      <h3 style="font-weight: 500; color: #0f172a;">Puntaje por bloque</h3>
      <ul>${Object.entries(lead.blocks).map(([name, value]) => `<li>${esc(name)}: ${value}/8</li>`).join('')}</ul>
    </div>`;

  try {
    await transporter.sendMail({
      from,
      to: recipient,
      replyTo: lead.email,
      subject: `Autodiagnóstico: ${lead.email} · ${lead.tot}/32 · Nivel ${lead.level}`,
      text,
      html,
    });
  } catch (error) {
    logEvent({
      level: 'error',
      module: moduleName,
      functionName: 'sendAutodiagnosticoEmail',
      message: 'Failed to send autodiagnostico lead email',
      metadata: { error: error instanceof Error ? error.message : 'unknown' },
    });
    throw error;
  }
}
