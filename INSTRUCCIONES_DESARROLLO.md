# 🚀 Instrucciones para Desarrollo Local

## Iniciar el Servidor

Desde el directorio `abra-website`, ejecuta:

```bash
npm run dev
```

El servidor se iniciará en **http://localhost:3000**

## ✅ Acceso al Sitio

### Forma Fácil
Simplemente abre tu navegador en:
```
http://localhost:3000
```

Serás redirigido automáticamente a `/en` (idioma por defecto).

### URLs Directas

**Inglés:**
```
http://localhost:3000/en
```

**Español:**
```
http://localhost:3000/es
```

## ¿Cómo Funciona?

Este proyecto usa **internacionalización (i18n)** con rutas por idioma:
- `http://localhost:3000/` → Redirige automáticamente a `/en`
- `http://localhost:3000/en` → Página en Inglés
- `http://localhost:3000/es` → Página en Español

El middleware de next-intl maneja las redirecciones automáticamente.

## 🔧 Solución Rápida

1. Inicia el servidor:
   ```bash
   cd abra-website
   npm run dev
   ```

2. Abre tu navegador en:
   - Inglés: **http://localhost:3000/en**
   - Español: **http://localhost:3000/es**

3. Si accedes a la raíz (`/`), serás redirigido automáticamente a `/en` (idioma por defecto)

## 📝 Comandos Disponibles

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Ejecutar producción
npm start

# Linter
npm run lint
```

## 🐛 Troubleshooting

### El sitio no carga en localhost:3000

1. Verifica que el servidor esté corriendo:
   ```bash
   npm run dev
   ```

2. Asegúrate de acceder a la URL correcta:
   - ✅ `http://localhost:3000/en`
   - ✅ `http://localhost:3000/es`
   - ❌ `http://localhost:3000/`

3. Verifica que no haya errores en la consola

### Error: "Port 3000 is already in use"

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill
```

### Los cambios no se reflejan

1. Detén el servidor (Ctrl+C)
2. Elimina `.next` folder
3. Reinicia:
   ```bash
   npm run dev
   ```

## 📖 Estructura de Rutas

```
http://localhost:3000/en          → Página principal (Inglés)
http://localhost:3000/es          → Página principal (Español)
http://localhost:3000/en/about   → About (Inglés) - cuando se implemente
http://localhost:3000/es/about   → About (Español) - cuando se implemente
```

## ✅ Todo está listo

El proyecto está completamente configurado y funcionando. Solo necesitas:

1. Ejecutar `npm run dev`
2. Acceder a `/en` o `/es`
3. ¡Disfrutar del sitio!

