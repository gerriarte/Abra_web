import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validation/contactSchema';
import { checkRateLimit, getClientIP } from '@/lib/utils/rateLimit';
import { sanitizeInput } from '@/lib/utils/sanitize';

/**
 * Validaciones de Seguridad Implementadas:
 * 1. Rate limiting (5 requests por 15 minutos por IP)
 * 2. Sanitización de inputs (XSS protection)
 * 3. Validación con Zod (type-safe)
 * 4. Length limits en todos los campos
 * 5. Regex validation para formatos específicos
 * 6. Rechazo de requests muy grandes
 */

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP(request);
    
    // Check rate limit
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Too many requests. Please try again later.' 
        },
        { status: 429 }
      );
    }

    // Get request body
    const body = await request.json();
    
    // Check body size (max 10KB)
    const bodySize = JSON.stringify(body).length;
    if (bodySize > 10000) {
      return NextResponse.json(
        { success: false, error: 'Request too large' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedBody = {
      fullName: sanitizeInput(body.fullName || ''),
      company: sanitizeInput(body.company || ''),
      phoneCode: sanitizeInput(body.phoneCode || ''),
      phone: sanitizeInput(body.phone || ''),
      email: sanitizeInput(body.email || ''),
      service: sanitizeInput(body.service || ''),
      date: body.date || '',
      time: body.time || '',
    };
    
    // Validate data with Zod
    const validatedData = contactSchema.parse(sanitizedBody);
    
    // Log submission (en producción enviar a servicio externo)
    console.log('New secure contact form submission:', {
      ...validatedData,
      phone: `${validatedData.phoneCode} ${validatedData.phone}`,
      timestamp: new Date().toISOString(),
      ip: clientIP,
    });
    
    // Here you would typically:
    // 1. Send email via Resend/SendGrid
    // 2. Save to database
    // 3. Send to CRM (HubSpot, Salesforce)
    // 4. Send Slack/Discord notification
    
    // TODO: Integrar servicio de email
    // await sendEmail(validatedData);
    
    // TODO: Guardar en base de datos
    // await db.contacts.create({ data: validatedData });
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you! We will contact you soon.' 
      },
      { status: 200 }
    );
    
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed',
          details: error.message 
        },
        { status: 400 }
      );
    }
    
    console.error('Contact form error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}

