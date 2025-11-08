# Google Tag Manager Setup

Este proyecto incluye una implementación completa de Google Tag Manager (GTM) para tracking y análisis.

## Configuración Inicial

### 1. Obtener el GTM ID

1. Ve a [Google Tag Manager](https://tagmanager.google.com/)
2. Crea un nuevo contenedor o selecciona uno existente
3. Copia el GTM ID (formato: `GTM-XXXXXXX`)

### 2. Configurar Variable de Entorno

Agrega el GTM ID a tu archivo `.env.local`:

```env
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

**Importante**: El prefijo `NEXT_PUBLIC_` es necesario para que la variable esté disponible en el cliente.

### 3. Desplegar en Vercel

Si estás usando Vercel, agrega la variable de entorno en:
- **Settings → Environment Variables**
- Agrega `NEXT_PUBLIC_GTM_ID` con tu GTM ID

## Uso del Hook useGTM

El proyecto incluye un hook personalizado `useGTM` para facilitar el envío de eventos.

### Ejemplo Básico

```tsx
'use client';

import { useGTM } from '@/hooks/useGTM';

export default function MyComponent() {
  const { pushEvent, pushData } = useGTM();

  const handleButtonClick = () => {
    pushEvent('button_click', {
      button_name: 'cta_button',
      button_location: 'hero_section',
      page_location: window.location.href,
    });
  };

  return (
    <button onClick={handleButtonClick}>
      Click me
    </button>
  );
}
```

### Métodos Disponibles

#### `pushEvent(eventName, eventData?)`

Envía un evento a GTM con datos opcionales.

```tsx
pushEvent('form_submit', {
  form_name: 'contact_form',
  form_status: 'success',
  service_selected: 'Web Development',
});
```

#### `pushData(data)`

Envía datos directamente a la dataLayer sin evento específico.

```tsx
pushData({
  page_type: 'product',
  product_id: '12345',
  user_type: 'premium',
});
```

## Eventos Pre-configurados

El proyecto ya incluye tracking para:

- **Formulario de Contacto**: Se rastrea automáticamente cuando se envía el formulario (éxito o error)
  - Evento: `form_submit`
  - Datos incluidos:
    - `form_name`: 'contact_form'
    - `form_status`: 'success' | 'error'
    - `service_selected`: Servicio seleccionado
    - `error_type`: Código de error (solo en caso de error)
    - `page_location`: URL actual

## Configuración en Google Tag Manager

### Crear un Trigger para Eventos Personalizados

1. Ve a **Triggers → New**
2. Selecciona **Custom Event**
3. Configura:
   - **Event name**: `form_submit` (o el nombre de tu evento)
   - **This trigger fires on**: All Custom Events

### Crear un Tag

1. Ve a **Tags → New**
2. Selecciona el tipo de tag (ej: Google Analytics, Facebook Pixel, etc.)
3. Configura el trigger creado anteriormente
4. Usa las variables de la dataLayer en la configuración del tag

### Variables Útiles

Las siguientes variables estarán disponibles en GTM:
- `{{form_name}}`
- `{{form_status}}`
- `{{service_selected}}`
- `{{page_location}}`

## Verificación

### 1. Verificar en el Navegador

1. Abre las DevTools (F12)
2. Ve a la pestaña **Console**
3. Escribe: `window.dataLayer`
4. Deberías ver un array con los eventos enviados

### 2. Usar Google Tag Assistant

1. Instala la extensión [Tag Assistant](https://tagassistant.google.com/)
2. Navega por tu sitio
3. Verifica que los eventos se estén enviando correctamente

### 3. Modo Preview en GTM

1. En GTM, haz clic en **Preview**
2. Ingresa la URL de tu sitio
3. Navega por el sitio y verifica que los eventos aparezcan en el panel de debug

## Mejores Prácticas

1. **No enviar información sensible**: Nunca envíes contraseñas, números de tarjeta de crédito u otra información sensible a GTM
2. **Usar nombres consistentes**: Mantén una convención de nombres para eventos (ej: `snake_case`)
3. **Documentar eventos**: Mantén un registro de todos los eventos personalizados que uses
4. **Testing**: Siempre prueba los eventos en desarrollo antes de desplegar

## Troubleshooting

### GTM no se detecta / "No se detecta la etiqueta"

Si Google Tag Manager reporta que no se detecta la etiqueta, sigue estos pasos:

#### 1. Verificar Variable de Entorno

**En desarrollo local:**
- Verifica que existe el archivo `.env.local` en la raíz del proyecto
- Verifica que contiene: `NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX`
- Reinicia el servidor de desarrollo después de agregar la variable

**En Vercel:**
- Ve a **Settings → Environment Variables**
- Verifica que `NEXT_PUBLIC_GTM_ID` esté configurada
- Verifica que el valor sea correcto (formato: `GTM-XXXXXXX`)
- **IMPORTANTE**: Después de agregar/modificar variables, debes **redesplegar** el proyecto

#### 2. Verificar en el Navegador

1. Abre las DevTools (F12)
2. Ve a la pestaña **Network** (Red)
3. Recarga la página
4. Busca una petición a `googletagmanager.com/gtm.js?id=GTM-XXXXXXX`
   - Si NO aparece: GTM no se está cargando
   - Si aparece: GTM se está cargando correctamente

5. En la pestaña **Console**, escribe:
   ```javascript
   window.dataLayer
   ```
   - Deberías ver un array con objetos
   - Si es `undefined`: GTM no se inicializó correctamente

6. Verifica que existan estos elementos en el DOM:
   ```javascript
   // Script de GTM
   document.querySelector('script[src*="googletagmanager.com/gtm.js"]')
   
   // Noscript de GTM
   document.querySelector('noscript iframe[src*="googletagmanager.com"]')
   ```

#### 3. Usar el Modo Preview de GTM

1. En GTM, haz clic en **Preview**
2. Ingresa la URL de tu sitio (incluye `http://` o `https://`)
3. Haz clic en **Connect**
4. Si GTM está correctamente instalado, deberías ver:
   - Un panel de debug en la parte inferior
   - La página debería mostrar "Connected"
   - Si aparece "Tag Assistant couldn't find the GTM container", significa que GTM no está instalado

#### 4. Verificar el Código Fuente

1. Haz clic derecho en la página → **Ver código fuente**
2. Busca `GTM-` en el código fuente
3. Deberías encontrar el script de GTM con tu ID

#### 5. Verificar en Desarrollo

El proyecto incluye un componente de debug que se ejecuta automáticamente en desarrollo:
- Abre la consola del navegador en modo desarrollo
- Después de 2 segundos, verás información de debug sobre GTM
- Esto te ayudará a identificar si el problema es de configuración

### Los eventos no aparecen en GTM

- Verifica que el trigger esté configurado correctamente
- Usa el modo Preview de GTM para debuggear
- Verifica que `window.dataLayer` tenga los eventos en la consola del navegador
- Asegúrate de que los tags estén publicados en GTM (no solo guardados)

### Eventos duplicados

- Asegúrate de no tener múltiples instancias del componente `GoogleTagManager`
- Verifica que no haya otros scripts de GTM cargándose
- Revisa que no tengas extensiones del navegador que inyecten GTM

### Problemas Comunes

**Problema**: Variable de entorno no se lee
- **Solución**: Asegúrate de que el nombre comience con `NEXT_PUBLIC_`
- Reinicia el servidor después de agregar la variable

**Problema**: GTM se carga pero no detecta tags
- **Solución**: Verifica que los tags estén publicados en GTM (no solo en modo borrador)
- Usa el modo Preview para verificar qué tags deberían activarse

**Problema**: Bloqueadores de contenido
- **Solución**: Desactiva temporalmente bloqueadores de anuncios (uBlock Origin, AdBlock, etc.)
- Algunos bloqueadores pueden impedir que GTM funcione

