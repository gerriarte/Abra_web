# Guía de Despliegue en Vercel

## ✅ Estado del Proyecto

El proyecto **ESTÁ LISTO** para desplegarse en Vercel. El build se completa exitosamente.

## 📋 Checklist Pre-Despliegue

### 1. Variables de Entorno Requeridas

Configura estas variables en el dashboard de Vercel (Settings → Environment Variables):

#### Para el Formulario de Contacto (OBLIGATORIO si quieres que funcione):
```
SMTP_HOST=smtp.gmail.com (o tu proveedor SMTP)
SMTP_PORT=587 (o 465 para SSL)
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-app-password (NO tu contraseña normal)
CONTACT_RECIPIENT_EMAIL=destino@abralatam.com
CONTACT_FROM_EMAIL=noreply@abralatam.com
```

#### Opcionales:
```
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_SITE_URL=https://www.abralatam.com
```

### 2. Configuración de Node.js

✅ Ya está configurado en `package.json`: `"node": ">=24.0.0"`

### 3. Sistema de Archivos (Read-Only en Vercel)

✅ El código ya está preparado: `heroRepository.ts` detecta automáticamente si está en Vercel y previene escrituras al sistema de archivos. Los cambios al Hero deben hacerse via Git commits.

### 4. Build Command

✅ Vercel detectará automáticamente: `npm run build`

### 5. Rutas Dinámicas

✅ Las rutas dinámicas (`[slug]`, `[locale]`) están correctamente configuradas con `generateStaticParams` y `setRequestLocale` para renderizado estático optimizado.

## 🚀 Pasos para Desplegar

1. **Conecta tu repositorio a Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Importa tu repositorio de GitHub
   - Vercel detectará automáticamente Next.js

2. **Configura las Variables de Entorno:**
   - En el dashboard de Vercel, ve a Settings → Environment Variables
   - Agrega todas las variables listadas arriba
   - Asegúrate de agregarlas para "Production", "Preview" y "Development"

3. **Configura SMTP (si usas Gmail):**
   - Activa la verificación en 2 pasos
   - Genera una "App Password" en tu cuenta de Google
   - Usa esa App Password (no tu contraseña normal) en `SMTP_PASS`

4. **Deploy:**
   - Vercel hará el build automáticamente
   - Revisa los logs si hay errores

## ⚠️ Notas Importantes

- **Sin SMTP configurado**: El formulario de contacto mostrará un mensaje amigable indicando que se contacten por WhatsApp
- **Hero Slides**: Los cambios deben hacerse editando `public/data/hero.json` y haciendo commit
- **i18n**: Está configurado para funcionar en producción con `next-intl` y renderizado estático optimizado
- **Rutas estáticas**: Se generarán automáticamente para todos los casos de estudio y locales
- **SEO**: Sitemap y robots.txt se generan automáticamente

## 🧪 Prueba Local del Build

```bash
npm run build  # ✅ Debe completarse sin errores
```

## 📊 Estado del Build

- ✅ Build completado exitosamente
- ✅ Todas las rutas generadas correctamente
- ✅ Renderizado estático optimizado con `setRequestLocale`
- ✅ SEO completo (sitemap, robots, schemas JSON-LD)
- ✅ Metadatos dinámicos por página





