import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { checkRateLimit, getClientIP } from '@/lib/utils/rateLimit';
import { sanitizeInput } from '@/lib/utils/sanitize';
import { sendAutodiagnosticoEmail } from '@/lib/services/autodiagnostico-email';
import { logEvent } from '@/lib/utils/logger';

/** Solo se aceptan puntajes y textos cortos: nunca las respuestas individuales. */
const leadSchema = z.object({
  email: z.string().trim().max(254).email(),
  tot: z.number().int().min(0).max(32),
  level: z.string().max(60),
  blocks: z.record(z.string().max(80), z.number().int().min(0).max(8)),
  weak: z.string().max(80),
  decision: z.string().max(300),
  utm_source: z.string().max(100),
  utm_campaign: z.string().max(100),
  ts: z.string().max(40),
});

export async function POST(request: NextRequest) {
  const clientIP = getClientIP(request);

  if (!checkRateLimit(clientIP)) {
    return NextResponse.json({ success: false, error: 'Too many requests' }, { status: 429 });
  }

  let parsed: z.infer<typeof leadSchema>;
  try {
    const body = await request.json();
    const sanitized = {
      ...body,
      email: sanitizeInput(String(body?.email ?? '')),
      level: sanitizeInput(String(body?.level ?? '')),
      weak: sanitizeInput(String(body?.weak ?? '')),
      decision: sanitizeInput(String(body?.decision ?? '')),
      utm_source: sanitizeInput(String(body?.utm_source ?? '')),
      utm_campaign: sanitizeInput(String(body?.utm_campaign ?? '')),
    };
    parsed = leadSchema.parse(sanitized);
  } catch {
    return NextResponse.json({ success: false, error: 'Validation failed' }, { status: 400 });
  }

  try {
    await sendAutodiagnosticoEmail(parsed);
    logEvent({
      level: 'info',
      module: 'api/autodiagnostico',
      functionName: 'POST',
      message: 'Autodiagnostico lead sent',
      metadata: { tot: parsed.tot, level: parsed.level },
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    logEvent({
      level: 'error',
      module: 'api/autodiagnostico',
      functionName: 'POST',
      message: 'Autodiagnostico lead email failed',
      metadata: { error: error instanceof Error ? error.message : 'unknown' },
    });
    return NextResponse.json({ success: false, error: 'No se pudo enviar' }, { status: 500 });
  }
}
