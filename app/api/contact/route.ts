import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validation/contactSchema';
import { checkRateLimit, getClientIP } from '@/lib/utils/rateLimit';
import { sanitizeInput } from '@/lib/utils/sanitize';
import { sendContactEmail } from '@/lib/services/email';
import { logEvent } from '@/lib/utils/logger';

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
      country: sanitizeInput(body.country || ''),
      phone: sanitizeInput(body.phone || ''),
      email: sanitizeInput(body.email || ''),
      service: sanitizeInput(body.service || ''),
      date: body.date || '',
      time: body.time || '',
      privacyAccepted: Boolean(body.privacyAccepted),
    };
    
    // Validate data with Zod
    const validatedData = contactSchema.parse(sanitizedBody);
    
    logEvent({
      level: 'info',
      module: 'api/contact',
      functionName: 'POST',
      message: 'Validated contact form submission',
      metadata: {
        service: validatedData.service,
        ip: clientIP,
      },
    });

    try {
      await sendContactEmail(validatedData);
    } catch (emailError) {
      const errorMessage = emailError instanceof Error ? emailError.message : 'Unknown email error';
      
      // Log email error
      logEvent({
        level: 'error',
        module: 'api/contact',
        functionName: 'POST',
        message: 'Failed to send contact email',
        metadata: { 
          error: errorMessage,
          formData: {
            email: validatedData.email,
            service: validatedData.service,
          }
        },
      });
      
      // Return error response - don't pretend success if email fails
      if (errorMessage.includes('SMTP configuration') || errorMessage.includes('not configured')) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'El servicio de correo no está configurado. Por favor, contáctanos directamente por WhatsApp o email.' 
          },
          { status: 503 }
        );
      }
      
      // Return generic error for other email failures
      return NextResponse.json(
        { 
          success: false, 
          error: 'Error al enviar el correo. Por favor, intenta nuevamente o contáctanos directamente.' 
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: '¡Gracias! Te contactaremos pronto.' 
      },
      { status: 200 }
    );
    
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      logEvent({
        level: 'warn',
        module: 'api/contact',
        functionName: 'POST',
        message: 'Contact form validation failed',
        metadata: { details: error.message },
      });
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed',
          details: error.message 
        },
        { status: 400 }
      );
    }
    
    logEvent({
      level: 'error',
      module: 'api/contact',
      functionName: 'POST',
      message: 'Unhandled contact form error',
      metadata: { error: error instanceof Error ? error.message : 'Unknown error' },
    });
    
    console.error('Contact form error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error' 
      },
      { status: 500 }
    );
  }
}

