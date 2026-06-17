# ⚙️ Configuración del Proyecto

Guía completa de configuración del proyecto A:BRA Website.

## 📋 Variables de Entorno

### Variables Requeridas

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

#### Para el Formulario de Contacto (OBLIGATORIO)

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-app-password
CONTACT_FROM_EMAIL=noreply@abralatam.com
CONTACT_RECIPIENT_EMAIL=contacto@abralatam.com
```

**Nota para Gmail**: Necesitas generar una "App Password" desde tu cuenta de Google:
1. Ve a tu cuenta de Google → Seguridad
2. Activa la verificación en 2 pasos
3. Genera una "App Password" para correo
4. Usa esa contraseña en `SMTP_PASS` (no tu contraseña normal)

#### Opcionales

```env
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_SITE_URL=https://www.abralatam.com
```

### Configuración en Vercel

1. Ve a **Settings → Environment Variables**
2. Agrega todas las variables listadas arriba
3. Selecciona los entornos: Production, Preview, Development
4. **Importante**: Después de agregar variables, haz redeploy

## 📧 Configuración SMTP

### Proveedores SMTP Comunes

#### Gmail
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-app-password
```

#### Outlook/Hotmail
```
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
```

#### SendGrid
```
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=tu-api-key-de-sendgrid
```

#### Mailgun
```
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
```

## 🔍 Verificación

### Verificar Configuración SMTP

1. Prueba el formulario de contacto en el sitio
2. Si las variables están correctas, deberías recibir el correo
3. Si hay errores, revisa los logs en Vercel → **Functions** → **api/contact**

### Verificar GTM

1. Abre las DevTools (F12)
2. Ve a la pestaña **Console**
3. Escribe: `window.dataLayer`
4. Deberías ver un array con los eventos enviados

## 📚 Documentación Relacionada

- [Google Tag Manager](GTM.md) - Configuración detallada de GTM
- [Panel de Administración](ADMIN_PANEL.md) - Configuración del admin panel
- [Despliegue en Vercel](../deployment/VERCEL.md) - Variables de entorno en producción





