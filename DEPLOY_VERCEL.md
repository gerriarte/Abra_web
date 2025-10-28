# 🚀 Guía de Deploy en Vercel - A:BRA Website

## 💰 Costos

### Plan FREE (Hobby) - Recomendado para tu proyecto

**GRATIS para siempre:**
- ✅ Hosting ilimitado
- ✅ Deploy ilimitados
- ✅ Tráfico: 100 GB/mes
- ✅ Ancho de banda: 100 GB/mes
- ✅ Dominio personalizado gratuito
- ✅ SSL automático (HTTPS)
- ✅ Edge Network global
- ✅ CI/CD automático desde Git
- ✅ Analytics básico
- ✅ Environment variables
- ✅ Preview deployments

**Limitaciones (que probablemente no afecten):**
- 💤 Sin funciones serverless premium
- 💤 Sin team collaboration
- No hay soporte prioritario

### Plan PRO ($20/mes) - Solo si lo necesitas

**Cuándo necesitarías PRO:**
- Más de 100 GB de tráfico/mes
- Necesitas funciones serverless avanzadas
- Equipo de trabajo (>1 persona)

**Para tu proyecto de sitio corporativo:** Plan FREE es suficiente ✅

---

## 🚀 Cómo Deployar en Vercel

### Opción 1: Desde Terminal (CLI) ⭐ Más rápido

#### Paso 1: Instalar Vercel CLI
```bash
npm install -g vercel
```

#### Paso 2: Login en Vercel
```bash
vercel login
```
- Te abrirá el navegador para autenticar
- O usa: `vercel login --email tu@email.com`

#### Paso 3: Navegar al proyecto
```bash
cd abra-website
```

#### Paso 4: Deploy
```bash
vercel
```

**Preguntas que te hará:**
```
? Set up and deploy "abra-website"? [Y/n] Y
? Which scope? Tu cuenta
? Link to existing project? No
? What's your project's name? abra-website
? In which directory is your code located? ./
```

#### Paso 5: Deploy de producción
```bash
vercel --prod
```

**¡Listo!** Tendrás una URL tipo: `abra-website.vercel.app`

---

### Opción 2: Desde Dashboard Web (Con GitHub)

#### Paso 1: Subir código a GitHub
```bash
cd abra-website
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/tu-usuario/abra-website.git
git branch -M main
git push -u origin main
```

#### Paso 2: Conectar con Vercel
1. Ir a [vercel.com](https://vercel.com)
2. Login con GitHub
3. Click en "Add New Project"
4. Importar repositorio `abra-website`
5. Click "Deploy"

#### Paso 3: Configuración automática
Vercel detecta Next.js automáticamente:
- ✅ Framework: Next.js
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `.next`
- ✅ Install Command: `npm install`

#### Paso 4: Clic en "Deploy"
- Compila automáticamente
- Sube al Edge Network
- Asigna URL (ej: `abra-website.vercel.app`)

**¡Listo!** Cada push a `main` hace auto-deploy 🚀

---

## 📋 Configuración Adicional

### 1. Variables de Entorno

**Vercel Dashboard → Settings → Environment Variables**

```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_FROM=noreply@abra.com
```

### 2. Dominio Personalizado

**Vercel Dashboard → Project → Settings → Domains**

1. Agregar dominio: `abra.com`
2. Vercel te dará DNS records
3. Configurar en tu proveedor DNS:
   ```
   Tipo A: @ → 76.76.21.21
   Tipo CNAME: www → cname.vercel-dns.com
   ```
4. Esperar propaga DNS (5-30 min)
5. SSL automático se configura solo ✅

### 3. Re-deployment

**Automático:**
- Cada push a `main` → deploy automático
- Cada PR → preview deployment (URL única)

**Manual:**
```bash
vercel --prod
```

---

## 🎯 Flujo Completo de Deploy

### Primera vez:
```bash
# 1. Instalar CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
cd abra-website
vercel

# 4. Deploy producción
vercel --prod
```

### Actualizaciones futuras:
```bash
git add .
git commit -m "Actualización"
git push

# Auto-deploy automático desde GitHub
# O manual:
vercel --prod
```

---

## 📊 Tiempos

- **Primer deploy:** 2-5 minutos
- **Deploy subsecuentes:** 30-60 segundos
- **Build time:** 30-90 segundos
- **Propagación global:** <1 minuto

---

## 🔍 Monitoreo

### Vercel Dashboard
- ✅ Analytics de tráfico
- ✅ Performance metrics
- ✅ Error tracking
- ✅ Deployment logs
- ✅ Speed insights

### URLs Automáticas
```
Production:  abra-website.vercel.app
Preview:     abra-website-git-branch-tu-usuario.vercel.app
Staging:     abra-website-staging.vercel.app
```

---

## 💡 Ventajas sobre cPanel

| Característica | Vercel | cPanel |
|---------------|--------|---------|
| **Setup** | 2 minutos | 30+ minutos |
| **Costo** | Gratis | $5-15/mes |
| **SSH/Node.js** | Automático | Requiere upgrade |
| **SSL** | Automático gratuito | Necesitas Let's Encrypt |
| **Performance** | Edge CDN global | Un solo servidor |
| **Deploy** | 1 comando | FTP + config manual |
| **Auto-deploy** | Desde Git | Manual |
| **Rollback** | 1 click | Manual/complejo |
| **Preview URLs** | Automático | No disponible |
| **Analytics** | Integrado | Necesitas configurar |
| **Next.js** | 100% optimizado | Compatibilidad limitada |

---

## 🚨 Troubleshooting

### Build falla
```bash
# Ver logs detallados
vercel logs abra-website

# Re-deploy con más info
vercel --debug
```

### Error de dependencias
```bash
# Limpiar e instalar
rm -rf node_modules package-lock.json
npm install
vercel --prod
```

### Variables de entorno
```bash
# Ver variables actuales
vercel env ls

# Agregar nueva
vercel env add VARIABLE_NAME production
```

---

## ✅ Después del Deploy

### 1. Verificar URL
Ir a: `https://abra-website.vercel.app`
- Debe cargar el sitio
- Verificar ambas rutas: `/en` y `/es`

### 2. Testing
- [ ] Hero con video carga
- [ ] Navegación funciona
- [ ] Cambio de idioma funciona
- [ ] Scroll animations funcionan
- [ ] Carrusel de proyectos arrastra
- [ ] Responsive en mobile

### 3. Configurar dominio (opcional)
- Agregar en Vercel Dashboard
- Configurar DNS
- Esperar propagación
- ¡Listo!

---

## 🎯 Resumen

**Costo:** 🆓 GRATIS (plan Hobby es suficiente)

**Tiempo:** ⏱️ 5 minutos setup + 2 minutos cada deploy

**Pasos:**
1. `vercel login`
2. `cd abra-website`
3. `vercel`
4. `vercel --prod`

**URL:** `abra-website.vercel.app`

**Beneficios:**
- ✅ Gratis para siempre
- ✅ Perfecto para Next.js
- ✅ SSL automático
- ✅ Edge Network global
- ✅ Auto-deploy desde Git
- ✅ Rollback fácil
- ✅ Analytics integrado
- ✅ Preview deployments

---

## 📝 Comandos Rápidos

```bash
# Deploy producción
vercel --prod

# Deploy preview
vercel

# Ver deployments
vercel ls

# Ver logs
vercel logs

# Remover deploy
vercel remove

# Ver info del proyecto
vercel inspect
```

---

**¿Quieres que te guíe paso a paso para hacer el deploy ahora? 🚀**

