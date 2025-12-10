# Plantilla de Caso de Estudio - Proyectos Web

Esta plantilla está basada en el caso de estudio de **Monyte** y sirve como base para proyectos web completos.

## Estructura del Caso de Estudio

### 1. Información Básica
- **id**: Identificador único del caso
- **client**: Nombre del cliente
- **title**: Título principal del caso (ES)
- **titleEn**: Título principal del caso (EN)

### 2. Contenido Principal

#### Brand Description (Descripción de la Marca)
- **brandDescription**: Descripción del cliente y su negocio (ES)
- **brandDescriptionEn**: Descripción del cliente y su negocio (EN)

#### Situación
- **situation**: El desafío o problema que enfrentaba el cliente (ES)
- **situationEn**: El desafío o problema que enfrentaba el cliente (EN)

#### Tarea
- **task**: Los objetivos claros del proyecto (ES)
- **taskEn**: Los objetivos claros del proyecto (EN)

#### Acción
- **action**: La ejecución estratégica y soluciones implementadas (ES)
- **actionEn**: La ejecución estratégica y soluciones implementadas (EN)

### 3. Resultados
- **results**: Array de métricas con `label`, `value`, y `suffix` (ES)
- **resultsEn**: Array de métricas con `label`, `value`, y `suffix` (EN)

### 4. Detalles del Proyecto
- **projectDetails**: Objeto con:
  - `services`: Array de servicios proporcionados (ES)
  - `team`: Array de miembros del equipo (opcional)
  - `year`: Año del proyecto (opcional)
  - `duration`: Duración del proyecto (opcional)
  - `logo`: URL del logo (opcional)
- **projectDetailsEn**: Versión en inglés de los detalles

### 5. Assets Visuales
- **heroImage**: Imagen principal para el Hero (ruta desde `/public`)
- **images**: Array de imágenes para la galería (rutas desde `/public`)

## Estructura de Secciones en la Página

1. **Hero**: Título grande, subtítulo con dominio, categoría
2. **Marca**: Descripción de la marca del cliente
3. **Situación**: El desafío con imagen flotante (dashboard)
4. **Tarea**: Objetivos claros (tema oscuro)
5. **Acción**: Ejecución estratégica con imagen de marca flotante
6. **Project Details**: Cliente y servicios
7. **Image Grid**: Visuales del proyecto (3 imágenes móviles)

## Características Especiales para Proyectos Web

- **floatingImage**: `true` para imágenes sin contenedor
- **imageAspect**: `"auto"` para mantener proporciones
- **imageScale**: `0.7` para reducir pixelación en Hero
- Imágenes a sangre al final (cortadas por el footer)

## Ejemplo de Uso

```typescript
'securitas': {
  id: 'securitas-case-001',
  client: 'Securitas',
  title: 'Título en Español',
  titleEn: 'Title in English',
  // ... resto de campos
}
```

