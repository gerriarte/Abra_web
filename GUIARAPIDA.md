# 🚀 Guía Rápida - A:BRA Website

## ⚡ Inicio Rápido

### 1. Navega al directorio correcto:
```bash
cd C:\Users\Usuario\Documents\GitHub\Abra_web\abra-website
```

### 2. Inicia el servidor:
```bash
npm run dev
```

### 3. Abre tu navegador en:
```
http://localhost:3000
```

## 📍 Ubicación del Proyecto

✅ **Correcto:**
```
C:\Users\Usuario\Documents\GitHub\Abra_web\abra-website\
```

❌ **Incorrecto (no uses este):**
```
C:\Users\Usuario\Documents\GitHub\Abra_web\
```

## 🌐 URLs del Sitio

Una vez que el servidor esté corriendo:

- **Inglés:** http://localhost:3000/en
- **Español:** http://localhost:3000/es
- **Auto-redirect:** http://localhost:3000 → Te redirige a /en

## 🎨 Qué Verás

1. **Header fijo** con logo y toggle de idioma (EN | ES)
2. **Hero Section** - Título principal y CTA
3. **Problem Section** - 3 tarjetas con problemas
4. **Method Section** - 4 pilares de A:BRA
5. **Result Section** - Resultado final con CTA
6. **Footer** - Branding

## 🔄 Cambiar de Idioma

Haz clic en "EN | ES" en el header superior derecho.

## ✅ Verificar que Funciona

Después de ejecutar `npm run dev`, verás en la terminal:

```
  ▲ Next.js 16.0.0
  - Local:        http://localhost:3000
  ✓ Ready
```

## 🐛 Problemas Comunes

### Error: "no such file or directory"
**Solución:** Asegúrate de estar en el directorio `abra-website`:
```bash
cd C:\Users\Usuario\Documents\GitHub\Abra_web\abra-website
```

### Error: "port 3000 already in use"
**Solución:** 
```bash
# Buscar proceso
netstat -ano | findstr :3000
# Matar proceso (reemplaza <PID> con el número)
taskkill /PID <PID> /F
```

### El sitio se ve en blanco
**Solución:** Abre la consola del navegador (F12) y verifica si hay errores.

## 📱 Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Ver versión de Next.js
npx next -v

# Limpiar cache y rebuild
rm -rf .next
npm run dev
```

## 🎉 Estado del Proyecto

✅ Next.js 16 con TypeScript  
✅ Bilingüe (EN/ES)  
✅ Material Design  
✅ Responsive  
✅ Build exitoso  
✅ Listo para desarrollo  

## 📞 Siguiente Paso

1. Ve a la terminal/powershell
2. Ejecuta: `cd C:\Users\Usuario\Documents\GitHub\Abra_web\abra-website`
3. Ejecuta: `npm run dev`
4. Abre: http://localhost:3000
5. ¡Disfruta del sitio!

