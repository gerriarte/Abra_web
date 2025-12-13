# 📝 Casos de Estudio

Documentación y recursos para los casos de estudio de A:BRA.

## 📁 Estructura

### Templates
- [Plantilla de Caso de Estudio](templates/README.md) - Guía completa para crear nuevos casos de estudio

### Contenido
- [monyte.md](content/monyte.md) - Contenido del caso Monyte
- [rac.md](content/rac.md) - Contenido del caso RAC
- [securitas.md](content/securitas.md) - Contenido del caso Securitas

## 🎯 Cómo Crear un Nuevo Caso de Estudio

1. Revisa la [plantilla](templates/README.md) para entender la estructura
2. Crea el contenido en `data/cases.ts`
3. Agrega las imágenes en `public/[nombre-caso]/`
4. Opcionalmente, guarda contenido adicional en `content/[nombre-caso].md`

## 📊 Estructura de Datos

Los casos de estudio se definen en `data/cases.ts` con la siguiente estructura:

- Información básica (id, client, title, titleEn)
- Contenido principal (brandDescription, situation, task, action)
- Resultados (results, resultsEn)
- Detalles del proyecto (projectDetails)
- Assets visuales (heroImage, images)

Para más detalles, consulta la [plantilla completa](templates/README.md).

