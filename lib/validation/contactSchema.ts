import { z } from 'zod';

// Validaciones robustas para el formulario de contacto
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
  
  phoneCode: z.string().regex(/^\+\d{1,3}$/, 'Invalid country code'),
  
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
  
  service: z
    .string()
    .min(1, 'Please select a service')
    .refine(
      (val) => [
        'Branding Development',
        'Institutional Communications',
        'Digital Marketing & Growth',
        'Web Design & Development',
        'Full Service'
      ].includes(val),
      'Invalid service selected'
    ),
  
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  
  time: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
  
  privacyAccepted: z
    .boolean()
    .refine((val) => val === true, 'You must accept the privacy terms'),
});

export type ContactFormData = z.infer<typeof contactSchema>;

