# 📤 Desplegar en cPanel - Versión Estática

## ⚠️ ADVERTENCIA

Esta configuración convierte el sitio en **estático** lo que significa:
- ❌ No hay Server-Side Rendering
- ❌ No hay API routes (los formularios NO funcionarán así)
- ❌ El cambio de idioma será menos fluido
- ❌ Menor performance que Vercel

**Recomendación:** Usa Vercel (gratis y perfecto para Next.js)

---

## 📋 Pasos para Deploy en cPanel

### 1. Modificar Configuración

```bash
# Renombrar el config actual
mv next.config.ts next.config.server.ts

# Usar config estático
mv next.config.static.ts next.config.ts
```

### 2. Construir Sitio Estático

```bash
npm run build
```

Esto generará una carpeta `out/` con HTML estático.

### 3. Subir Archivos a cPanel

**Opción A: File Manager (cPanel)**
1. Acceder a cPanel
2. Abrir File Manager
3. Navegar a `public_html/`
4. Subir TODO el contenido de `abra-website/out/`
5. Asegurar que `index.html` esté en la raíz

**Opción B: FTP**
```bash
# Usar cliente FTP (FileZilla, Cyberduck)
# Conectar a: ftp.tudominio.com
# Upload contenido de 'abra-website/out/' a public_html/
```

### 4. Configurar .htaccess

Crear archivo `.htaccess` en `public_html/`:

```apache
RewriteEngine On

# Redirigir raíz a /en/
RewriteCond %{REQUEST_URI} ^/$
RewriteRule ^(.*)$ /en/ [R=301,L]

# Mantener idiomas en URLs
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(en|es)(/.*)?$ $1/index.html [L]

# Comprimir archivos
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Cache control
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

### 5. Verificar

1. Ir a `https://tudominio.com`
2. Debería cargar en `/en/`
3. Probar cambio de idioma
4. Verificar que el video se carga

---

## 🔧 Modificaciones Necesarias en el Código

### Desactivar Funciones que Requieren Servidor

```typescript
// components/sections/Hero.tsx
// El video de Vimeo funcionará pero hay que asegurar que el iframe cargue
```

### Simplificar Rutas

```typescript
// app/page.tsx - Asegurar que redirige correctamente
import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/en');
}
```

---

## 📊 Estructura de Archivos Generados

```
out/
├── en/
│   ├── index.html
│   ├── _next/
│   └── ...
├── es/
│   ├── index.html
│   ├── _next/
│   └── ...
└── static files...
```

---

## ⚡ Alternativas Rápidas

### 1. Vercel (2 minutos)
```bash
vercel
```

### 2. Netlify (2 minutos)
```bash
npm install -g netlify-cli
netlify deploy
```

---

## 🎯 Conclusión

Si usas **cPanel**, el sitio funcionará pero:
- No habrá formularios (no API)
- Menor performance
- Más complejo de mantener

**Recomendación:** Usa Vercel (gratis, rápido, perfecto para Next.js)

¿Quieres que proceda con la configuración estática o prefieres Vercel?

