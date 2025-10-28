/**
 * Rate limiting simple en memoria
 * Para producción, usar Redis o servicio externo
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  // Si no existe o ha expirado, crear nueva entrada
  if (!entry || now > entry.resetTime) {
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + 15 * 60 * 1000, // 15 minutos
    });
    return true;
  }

  // Verificar límite (5 requests por 15 minutos)
  if (entry.count >= 5) {
    return false;
  }

  // Incrementar contador
  entry.count++;
  rateLimitStore.set(ip, entry);

  return true;
}

/**
 * Obtener IP del request
 */
export function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return 'unknown';
}

/**
 * Cleanup automático de entradas expiradas
 */
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(ip);
    }
  }
}, 5 * 60 * 1000); // Cada 5 minutos

