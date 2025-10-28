/**
 * Sanitiza strings para prevenir XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .slice(0, 1000); // Limit length
}

/**
 * Valida que la fecha sea futura
 */
export function isFutureDate(dateString: string): boolean {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today;
}

/**
 * Valida formato de teléfono
 */
export function isValidPhone(phone: string): boolean {
  // Solo dígitos, espacios, guiones, paréntesis
  return /^[\d\s\-\(\)]+$/.test(phone);
}

