import { z } from 'zod';

// Validaciones robustas para el formulario de contacto
const allowedServices = [
  'Branding Development',
  'Institutional Communications',
  'Digital Marketing & Growth',
  'Web Design & Development',
  'UX/UI Design',
  'Marketing Reports & Analytics',
  'Full Service',
  'Desarrollo de Branding',
  'Comunicaciones Institucionales',
  'Marketing Digital y Crecimiento',
  'Diseño y Desarrollo Web',
  'Diseño UX/UI',
  'Reporte y análisis de Marketing',
  'Servicio Completo',
];

export const contactSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Name can only contain letters and spaces'),
  
  company: z
    .string()
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name is too long')
    .regex(/^[a-zA-Z0-9\s.\-&]+$/, 'Company name contains invalid characters'),
  
  country: z
    .string()
    .max(60, 'Country name is too long')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/, 'Country can only contain letters and spaces')
    .optional()
    .default(''),
  
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number is too long')
    .regex(/^[\d\s\-\(\)]+$/, 'Phone number can only contain digits and formatting characters'),
  
  email: z
    .string()
    .email('Invalid email address')
    .max(100, 'Email is too long')
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format'),
  
  services: z
    .array(z.string())
    .min(1, 'Please select at least one service')
    .refine((val) => val.every(s => allowedServices.includes(s)), 'Invalid service selected')
    .refine((val) => val.length <= 10, 'Too many services selected'),
  
  customMessage: z
    .string()
    .max(1000, 'Message is too long')
    .optional()
    .default(''),
  
  date: z
    .string()
    .refine((val) => !val || /^\d{4}-\d{2}-\d{2}$/.test(val), 'Invalid date format')
    .optional()
    .default(''),
  
  time: z
    .string()
    .refine((val) => !val || /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(val), 'Invalid time format')
    .optional()
    .default(''),
  
  privacyAccepted: z
    .boolean()
    .refine((val) => val === true, 'You must accept the privacy terms'),
});

export type ContactFormData = z.infer<typeof contactSchema>;

