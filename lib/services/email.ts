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
        services: payload.services,
        messageId: result.messageId
      },
    });
  } catch (sendError: any) {
    const errorMsg = sendError?.message || 'Unknown error';
    const errorCode = sendError?.code || 'NO_CODE';

    logEvent({
      level: 'error',
      module: moduleName,
      functionName: 'sendContactEmail',
      message: `Failed to send email: ${errorMsg}`,
      metadata: {
        error: errorMsg,
        code: errorCode,
        recipient,
        from,
        smtp_host: process.env.SMTP_HOST,
        smtp_port: process.env.SMTP_PORT
      },
    });

    // Si es un error de autenticación o conexión, lanzamos un error que el route.ts pueda clasificar
    if (errorCode === 'EAUTH' || errorCode === 'ECONNECTION' || errorMsg.includes('Invalid login')) {
      throw new Error(`SMTP_CONFIG_ERROR: ${errorMsg}`);
    }

    throw sendError;
  }
}

function createPlainTextBody(payload: ContactFormData) {
  const servicesList = Array.isArray(payload.services)
    ? payload.services.join(', ')
    : payload.services || 'No especificado';

  const customMessage = payload.customMessage ? `\n\nConsulta personalizada:\n${payload.customMessage}` : '';
  const availability = (payload.date || payload.time)
    ? `\n\nDisponibilidad:\nFecha preferida: ${payload.date || 'No especificada'}\nHorario preferido: ${payload.time || 'No especificado'}`
    : '';

  return `Nuevo mensaje del formulario de contacto:

Nombre completo: ${payload.fullName}
Empresa: ${payload.company}
Correo: ${payload.email}
País: ${payload.country}
Teléfono: ${payload.phone}
Servicios de interés: ${servicesList}${customMessage}${availability}`;
}

function createHtmlBody(payload: ContactFormData) {
  const servicesList = Array.isArray(payload.services) ? payload.services.join(', ') : payload.services || 'No especificado';
  const customMessageSection = payload.customMessage
    ? `<div style="margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-left: 4px solid #04213B; border-radius: 4px;">
        <p style="margin: 0 0 10px 0; font-weight: 500; color: #0f172a;">Consulta personalizada:</p>
        <p style="margin: 0; white-space: pre-wrap; color: #1b1b1b;">${payload.customMessage}</p>
      </div>`
    : '';
  const availabilitySection = (payload.date || payload.time)
    ? `<div style="margin-top: 20px;">
        <p><strong>Fecha preferida:</strong> ${payload.date || 'No especificada'}</p>
        <p><strong>Horario preferido:</strong> ${payload.time || 'No especificado'}</p>
      </div>`
    : '';

  return `
    <div style="font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1b1b1b; line-height: 1.6;">
      <h2 style="font-weight: 400; color: #0f172a;">Nuevo contacto desde A:BRA</h2>
      <p><strong>Nombre completo:</strong> ${payload.fullName}</p>
      <p><strong>Empresa:</strong> ${payload.company}</p>
      <p><strong>Correo:</strong> <a href="mailto:${payload.email}">${payload.email}</a></p>
      <p><strong>País:</strong> ${payload.country || 'No especificado'}</p>
      <p><strong>Teléfono:</strong> ${payload.phone}</p>
      <p><strong>Servicios de interés:</strong> ${servicesList}</p>
      ${customMessageSection}
      ${availabilitySection}
    </div>
  `;
}

