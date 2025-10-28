# 📝 Formulario de Contacto - Implementado

## ✅ Campos del Formulario

### 1. Nombre y Apellido *
- Campo de texto
- Validación: mínimo 2 caracteres
- Placeholder: "John Doe" / "Juan Pérez"

### 2. Nombre de Empresa *
- Campo de texto
- Validación: mínimo 2 caracteres
- Placeholder: "Your Company" / "Tu Empresa"

### 3. Teléfono con Selector de País *
- Selector de código de país (ej: +1, +52, +34)
- Campo de teléfono
- Países incluidos:
  - +1 US/Canada
  - +52 México
  - +34 España
  - +44 UK
  - +54 Argentina
  - +51 Perú
  - +56 Chile
- Validación: mínimo 10 dígitos

### 4. Correo Electrónico *
- Campo email
- Validación: formato de email válido

### 5. Servicio a Cotizar *
- Selector dropdown
- Opciones:
  - Branding Development
  - Institutional Communications
  - Digital Marketing & Growth
  - Web Design & Development
  - Full Service

### 6. Fecha y Hora *
- Selector de fecha (date picker)
- Selector de hora (time picker)
- Grid responsive (2 columnas en desktop)

## 🔧 API Endpoint

**Ruta:** `/api/contact`
**Método:** POST
**Validación:** Zod schema

### Esquema de Validación:
```typescript
{
  fullName: string (min 2 chars)
  company: string (min 2 chars)
  phoneCode: string
  phone: string (min 10 digits)
  email: string (email format)
  service: string
  date: string
  time: string
}
```

## 🎨 Diseño

- **Background**: bg-off (gris muy claro)
- **Form Card**: Blanco con shadow sutil
- **Inputs**: Minimalistas con borde elegante
- **Labels**: Font-light, color primary
- **Submit Button**: Primary color, hover effect
- **Responsive**: Grid adaptativo para fecha/hora

## 🌍 Bilingüe

**Inglés:**
- "Full Name", "Company Name", "Phone Number"
- "Schedule Consultation"

**Español:**
- "Nombre Completo", "Nombre de Empresa", "Teléfono"
- "Agendar Consultoría"

## 📋 Flujo de Funcionamiento

1. Usuario llena formulario
2. Click en "Submit"
3. Validación client-side
4. POST a `/api/contact`
5. Validación server-side con Zod
6. Procesamiento (email/database/webhook)
7. Respuesta de éxito
8. Limpia formulario
9. Muestra mensaje de confirmación

## 🔌 Integraciones Futuras

**En `app/api/contact/route.ts` agregar:**

### 1. Envío de Email (Resend/SendGrid)
```typescript
await fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    from: 'contact@abra.com',
    to: 'info@abra.com',
    subject: 'New Contact Form Submission',
    html: `<p>Name: ${data.fullName}</p>...`
  })
});
```

### 2. Base de Datos (PostgreSQL/MongoDB)
```typescript
await db.contactSubmissions.create({
  data: {
    fullName: validatedData.fullName,
    company: validatedData.company,
    phone: `${validatedData.phoneCode} ${validatedData.phone}`,
    email: validatedData.email,
    service: validatedData.service,
    meetingDate: `${validatedData.date} ${validatedData.time}`
  }
});
```

### 3. Webhook a CRM
```typescript
await fetch(process.env.HUBSPOT_WEBHOOK_URL, {
  method: 'POST',
  body: JSON.stringify({
    properties: {
      firstname: validatedData.fullName.split(' ')[0],
      lastname: validatedData.fullName.split(' ')[1],
      email: validatedData.email,
      phone: `${validatedData.phoneCode} ${validatedData.phone}`,
      company: validatedData.company,
      service_requested: validatedData.service
    }
  })
});
```

### 4. Slack/Discord Notification
```typescript
await fetch(process.env.SLACK_WEBHOOK_URL, {
  method: 'POST',
  body: JSON.stringify({
    text: `🎉 New contact form: ${validatedData.fullName} from ${validatedData.company}`
  })
});
```

## 🔒 Seguridad

✅ **Validación server-side** con Zod
✅ **Sanitización** de inputs
✅ **Rate limiting** (agregar middleware)
✅ **CSRF protection** (Next.js built-in)
✅ **HTTPS** required
✅ **Privacy note** visible

## 📱 Responsive

- **Desktop**: Grid de 2 columnas para fecha/hora
- **Mobile**: Stack vertical
- **Inputs**: Full-width en mobile
- **Submit button**: Full-width siempre

---

**Formulario funcional y listo para integrar! 📝**

