// CTA compartido para la landing del brief (docs/Landing.md).
// Todos los botones apuntan al mismo lugar: WhatsApp de a:bra.

export const WHATSAPP_NUMBER = '+57 321 444 4727';

const WA_DIGITS = '573214444727';
const WA_MESSAGE = 'Hola A:BRA Latam 👋 Quiero hablar de cómo hacer crecer mi marca.';

export const WHATSAPP_HREF = `https://wa.me/${WA_DIGITS}?text=${encodeURIComponent(WA_MESSAGE)}`;
