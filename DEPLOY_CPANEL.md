# 🚀 Guía de Deployment en cPanel

## ❌ Limitación Actual

**Problema:** Next.js con Server Components y i18n no es compatible directamente con cPanel tradicional porque:

1. **Requiere Node.js** - cPanel compartido normalmente solo soporta PHP
2. **Next.js Runtime** - Necesita servidor Node.js corriendo
3. **API Routes** - No funcionan en hosting estático

## ✅ Soluciones Posibles

### Opción 1: Exportación Estática (Recomendado para cPanel tradicional)

Convertir el proyecto a sitio estático:

```typescript
// next.config.ts
import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./lib/i18n/request.ts');

const nextConfig: NextConfig = {
  output: 'export', // Exporta como sitio estático
  images: {
    unoptimized: true, // Las imágenes se servirán directamente
  },
};

export default withNextIntl(nextConfig);
```

**Problemas con export estático:**
- ❌ No hay SSR (Server-Side Rendering)
- ❌ Los enlaces de idioma necesitan HTML estático para cada ruta
- ❌ No hay API routes
- ❌ El video de Vimeo funcionará, pero sin optimizaciones server

**Pasos para desplegar en cPanel:**

1. **Construir el sitio estático:**
```bash
npm run build
```

2. **Subir carpeta `out/` a cPanel**
   - Conectar vía FTP/File Manager
   - Subir todo el contenido de `abra-website/out/` a `public_html/`

3. **Configurar .htaccess** para reescribir URLs:
```apache
RewriteEngine On
RewriteRule ^$ /en/index.html [L]
RewriteRule ^es$ /es/index.html [L]
RewriteRule ^en$ /en/index.html [L]
```

---

### Opción 2: Hosting con Node.js (Recomendado)

**Alternativas a cPanel tradicional:**

#### 2.1 Vercel (GRATIS y optimizado para Next.js)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deployar
cd abra-website
vercel
```

**Ventajas:**
- ✅ Gratis para proyectos personales
- ✅ Optimizado para Next.js
- ✅ SSL automático
- ✅ Edge Network global
- ✅ Auto-deploy desde Git

#### 2.2 Netlify (Similar a Vercel)
- Similar funcionamiento
- También gratuito

#### 2.3 Hosting con cPanel que soporta Node.js

**Hosting con Node.js en cPanel:**
- Hostinger
- A2 Hosting
- KnownHost
- Cloudways

**Pasos:**
1. Pedir activación de Node.js en cPanel
2. Crear aplicación Node.js
3. Subir archivos
4. Configurar puerto

---

### Opción 3: Convertir a PHP (NO Recomendado)

Convertir a WordPress o PHP puro sería rehacer todo el proyecto.

---

## 🎯 Recomendación Final

### **Vercel (Mejor Opción)**

**¿Por qué Vercel?**
1. ✅ **Gratis** para proyectos open source
2. ✅ **Optimizado** para Next.js nativamente
3. ✅ **Sin configuración** - Next.js funciona perfecto
4. ✅ **Deploy automático** desde Git
5. ✅ **SSL gratuito** para dominio custom
6. ✅ **Edge Network** global
7. ✅ **Environment variables** fáciles
8. ✅ **Domain management** integrado

**Pasos para desplegar:**

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
cd abra-website
vercel

# 4. Seguir prompts
```

**O desde GitHub:**
1. Push código a GitHub
2. Ir a vercel.com
3. Importar repositorio
4. Auto-deploy configurado

---

## 📋 Resumen de Opciones

| Opción | Complejidad | Costo | Rendimiento | Recomendado |
|--------|-------------|-------|-------------|-------------|
| **Vercel** | ⭐ Fácil | 🆓 Gratis | ⭐⭐⭐⭐⭐ | ✅✅✅ |
| **Netlify** | ⭐ Fácil | 🆓 Gratis | ⭐⭐⭐⭐⭐ | ✅✅ |
| **cPanel + Node.js** | ⭐⭐⭐ Medio | 💰 Hosting | ⭐⭐⭐ | ✅ |
| **cPanel Estático** | ⭐⭐ Fácil | 💰 Hosting | ⭐⭐ | ⚠️ Limitado |
| **PHP/WordPress** | ⭐⭐⭐⭐ Difícil | 💰 Varios | ⭐⭐⭐ | ❌ |

---

## 🔧 Configuración para cPanel (Si lo necesitas)

Si insistes en usar cPanel compartido tradicional, puedo:
1. Modificar `next.config.ts` para export estático
2. Crear scripts de build optimizados
3. Generar instrucciones de upload a FTP
4. Configurar `.htaccess` para routing

**Pero te recomiendo 100% usar Vercel por simplicidad y rendimiento.**

¿Quieres que configure para Vercel o prefieres adaptarlo a cPanel estático?

