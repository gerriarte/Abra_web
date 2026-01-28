# Panel de Administración

## Análisis de Opciones

### Opción Recomendada: JSON Files + UI Admin Simple

Para el caso específico de A:BRA, se recomienda una solución simple basada en archivos JSON con una interfaz de administración minimalista.

#### Ventajas
- ✅ Implementación rápida (4-6 horas)
- ✅ Sin costos adicionales
- ✅ Muy simple de mantener
- ✅ Funciona con el deployment actual
- ✅ No requiere backend adicional

#### Desventajas
- ❌ Sin versionado automático
- ❌ Cambios requieren commit/deploy
- ❌ Interface más básica que CMS completo

## Implementación Actual

El proyecto incluye un panel de administración en `/admin` que permite:

- ✅ Editar proyectos
- ✅ Agregar/Eliminar proyectos
- ✅ Gestionar Hero Slides
- ✅ Preview antes de guardar
- ✅ Validación de datos
- ✅ Protección por password

### Archivos de Datos

Los datos se almacenan en:
- `public/data/projects.json` - Lista de proyectos
- `public/data/hero.json` - Slides del hero

### Modo Producción

En producción (Vercel), el panel funciona en modo solo lectura. Los cambios deben hacerse mediante:
1. Editar los archivos JSON localmente
2. Hacer commit a GitHub
3. Vercel desplegará automáticamente

## Futuras Mejoras

Si el volumen de contenido crece, se puede migrar a:
- **Sanity CMS** - Headless CMS con plan gratuito
- **Strapi** - Open source, self-hosted
- **Base de datos + Admin UI** - Solución completamente custom





