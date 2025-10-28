# 🔒 Validaciones de Seguridad - Formulario de Contacto

## ✅ Medidas de Seguridad Implementadas

### 1. Client-Side Validation

#### Honeypot Field
- **Campo oculto** que detecta bots
- Si el campo tiene valor → es un bot
- No visible para usuarios humanos
- `tabIndex={-1}` para que no sea accesible

#### Validación en Tiempo Real
- **Zod schema** validation
- Mensajes de error inmediatos
- Border rojo en campos inválidos
- Feedback visual instantáneo

#### HTML5 Validations
```html
- minLength / maxLength
- pattern (regex)
- required
- type="email", "tel"
```

### 2. Server-Side Validation

#### Rate Limiting
- **5 requests** por 15 minutos por IP
- Status 429 si se excede
- Cleanup automático de entradas expiradas
- In-memory store (escalable a Redis en producción)

#### Sanitización de Inputs
```typescript
- Remove HTML tags: < >
- Remove javascript: protocol
- Remove event handlers: onClick, etc.
- Trim whitespace
- Max length 1000 chars
```

#### Size Limits
- Max request size: 10KB
- Reject si excede
- Status 400 error

### 3. Validaciones Específicas

#### Nombre
```typescript
✅ Min: 2 caracteres
✅ Max: 100 caracteres
✅ Solo letras y espacios
✅ Regex: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
```

#### Empresa
```typescript
✅ Min: 2 caracteres
✅ Max: 100 caracteres
✅ Letras, números, espacios, puntos, guiones, &
✅ Regex: /^[a-zA-Z0-9\s.\-&]+$/
```

#### Teléfono
```typescript
✅ Código: /^\+\d{1,3}$/
✅ Número: 10-15 dígitos
✅ Solo dígitos y caracteres de formato
✅ Regex: /^[\d\s\-\(\)]+$/
```

#### Email
```typescript
✅ Formato email válido
✅ Max: 100 caracteres
✅ Regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
```

#### Servicio
```typescript
✅ Whitelist validation
✅ Solo valores permitidos:
  - Branding Development
  - Institutional Communications
  - Digital Marketing & Growth
  - Web Design & Development
  - Full Service
```

#### Fecha y Hora
```typescript
✅ Fecha: Formato ISO (YYYY-MM-DD)
✅ Fecha mínima: Hoy (no fechas pasadas)
✅ Hora: Formato HH:MM
✅ Validación con regex
```

## 🛡️ Capas de Protección

### Capa 1: Frontend (Client-Side)
- ✅ Honeypot field
- ✅ HTML5 validation
- ✅ Zod validation
- ✅ Real-time error messages
- ✅ Visual feedback

### Capa 2: Transport
- ✅ HTTPS (required)
- ✅ Content-Type validation
- ✅ Request size limit

### Capa 3: Backend (Server-Side)
- ✅ Rate limiting (5 req/15min)
- ✅ Input sanitization
- ✅ Zod validation (type-safe)
- ✅ Length limits
- ✅ Regex validation
- ✅ Size limits (10KB max)

## 🔐 Protecciones Implementadas

| Amenaza | Protección |
|---------|-----------|
| **XSS** | Sanitización de inputs, Escapar HTML |
| **SQL Injection** | Zod validation, No SQL direct |
| **CSRF** | Next.js built-in protection |
| **Bot Spam** | Honeypot field, Rate limiting |
| **DoS** | Rate limiting, Size limits |
| **Invalid Data** | Zod schema validation |
| **Oversized Payloads** | 10KB request limit |

## 📊 Flujo de Seguridad

```
Usuario llena formulario
  ↓
Client-side validation (Honeypot + Zod)
  ↓
POST to /api/contact
  ↓
Rate limit check (por IP)
  ↓
Request size check
  ↓
Sanitize all inputs
  ↓
Zod validation
  ↓
Process & Return
```

## 🚨 Response Codes

```typescript
200 OK - Form submitted successfully
400 Bad Request - Validation failed
429 Too Many Requests - Rate limit exceeded
500 Internal Server Error - Server error
```

## 🎯 Próximas Mejoras (Opcional)

### 1. reCAPTCHA v3
```typescript
// Agregar Google reCAPTCHA v3
// Score-based (no interrumpe UX)
```

### 2. IP Blacklist
```typescript
// Mantener lista de IPs bloqueadas
// Persistir en Redis
```

### 3. Email Verification
```typescript
// Send confirmation email
// Verify email before accepting submission
```

### 4. CAPTCHA alternativa
```typescript
// hCaptcha o Cloudflare Turnstile
// Más privado que reCAPTCHA
```

---

**Formulario con validaciones de seguridad completas! 🔒**

