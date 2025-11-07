# Configuración del Servicio de Email

## Problema Actual

El formulario de contacto no envía correos porque las variables de entorno de SMTP no están configuradas en Vercel.

## Solución: Configurar Variables de Entorno en Vercel

### Paso 1: Acceder a la Configuración de Vercel

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona el proyecto `Abra_web`
3. Ve a **Settings** → **Environment Variables**

### Paso 2: Agregar las Variables de Entorno

Agrega las siguientes variables de entorno:

#### Variables Requeridas:

```
SMTP_HOST=smtp.tu-servidor.com
SMTP_PORT=587
SMTP_USER=tu-usuario@tudominio.com
SMTP_PASS=tu-contraseña-app
CONTACT_FROM_EMAIL=noreply@tudominio.com
CONTACT_RECIPIENT_EMAIL=contacto@tudominio.com
```

#### Configuración por Entorno:

- **Environment**: Selecciona `Production`, `Preview`, y `Development` según necesites
- **Apply to**: Selecciona todos los entornos donde quieras que funcione

### Paso 3: Ejemplos de Configuración

#### Para Gmail:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-app-password  # Usa App Password, no tu contraseña normal
CONTACT_FROM_EMAIL=tu-email@gmail.com
CONTACT_RECIPIENT_EMAIL=contacto@tudominio.com
```

**Nota para Gmail**: Necesitas generar una "App Password" desde tu cuenta de Google:
1. Ve a tu cuenta de Google → Seguridad
2. Activa la verificación en 2 pasos
3. Genera una "App Password" para correo
4. Usa esa contraseña en `SMTP_PASS`

#### Para Otros Proveedores SMTP:

**Outlook/Hotmail:**
```
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
```

**SendGrid:**
```
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=tu-api-key-de-sendgrid
```

**Mailgun:**
```
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
```

### Paso 4: Hacer Redeploy

Después de agregar las variables:

1. Ve a **Deployments**
2. Haz clic en los tres puntos del último deployment
3. Selecciona **Redeploy**
4. Asegúrate de que las variables de entorno estén seleccionadas

### Paso 5: Verificar

1. Prueba el formulario de contacto en el sitio
2. Si las variables están correctas, deberías recibir el correo
3. Si hay errores, revisa los logs en Vercel → **Functions** → **api/contact**

## Verificación de Configuración

El formulario ahora mostrará mensajes de error claros si:
- Las variables de entorno no están configuradas
- Hay un error al enviar el correo
- El servicio SMTP no está disponible

## Alternativa: Contacto Directo

Si prefieres no configurar SMTP ahora, los usuarios pueden:
- Usar el botón flotante de WhatsApp
- Contactar directamente por email

El formulario mostrará un mensaje claro indicando que usen WhatsApp si el correo no está configurado.

