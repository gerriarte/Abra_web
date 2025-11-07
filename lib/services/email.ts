import nodemailer from 'nodemailer';
import { logEvent } from '../utils/logger';
import type { ContactFormData } from '../validation/contactSchema';

const moduleName = 'lib/services/email';

function getTransport() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    logEvent({
      level: 'error',
      module: moduleName,
      functionName: 'getTransport',
      message: 'Missing SMTP configuration env vars',
      metadata: { host: !!host, port: !!port, user: !!user, pass: !!pass },
    });
    throw new Error('SMTP configuration is incomplete. Check environment variables.');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function sendContactEmail(payload: ContactFormData) {
  const recipient = process.env.CONTACT_RECIPIENT_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || payload.email;

  if (!recipient) {
    logEvent({
      level: 'error',
      module: moduleName,
      functionName: 'sendContactEmail',
      message: 'CONTACT_RECIPIENT_EMAIL env var is missing',
    });
    throw new Error('Contact recipient email is not configured.');
  }

  const transporter = getTransport();

  const message = {
    from,
    to: recipient,
    replyTo: payload.email,
    subject: `Nuevo contacto de ${payload.fullName} – ${payload.company}`,
    text: createPlainTextBody(payload),
    html: createHtmlBody(payload),
  };

  try {
    const result = await transporter.sendMail(message);
    logEvent({
      level: 'info',
      module: moduleName,
      functionName: 'sendContactEmail',
      message: 'Contact email sent successfully',
      metadata: { 
        recipient, 
        service: payload.service,
        messageId: result.messageId 
      },
    });
  } catch (sendError) {
    logEvent({
      level: 'error',
      module: moduleName,
      functionName: 'sendContactEmail',
      message: 'Failed to send email via transporter',
      metadata: { 
        error: sendError instanceof Error ? sendError.message : 'Unknown error',
        recipient,
        from,
      },
    });
    throw sendError;
  }
}

function createPlainTextBody(payload: ContactFormData) {
  return `Nuevo mensaje del formulario de contacto:

Nombre completo: ${payload.fullName}
Empresa: ${payload.company}
Correo: ${payload.email}
País: ${payload.country}
Teléfono: ${payload.phone}
Servicio de interés: ${payload.service}
Fecha preferida: ${payload.date}
Horario preferido: ${payload.time}`;
}

function createHtmlBody(payload: ContactFormData) {
  return `
    <div style="font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1b1b1b; line-height: 1.6;">
      <h2 style="font-weight: 400; color: #0f172a;">Nuevo contacto desde A:BRA</h2>
      <p><strong>Nombre completo:</strong> ${payload.fullName}</p>
      <p><strong>Empresa:</strong> ${payload.company}</p>
      <p><strong>Correo:</strong> <a href="mailto:${payload.email}">${payload.email}</a></p>
      <p><strong>País:</strong> ${payload.country}</p>
      <p><strong>Teléfono:</strong> ${payload.phone}</p>
      <p><strong>Servicio de interés:</strong> ${payload.service}</p>
      <p><strong>Fecha preferida:</strong> ${payload.date}</p>
      <p><strong>Horario preferido:</strong> ${payload.time}</p>
    </div>
  `;
}

