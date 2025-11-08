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

### GTM no se carga

- Verifica que `NEXT_PUBLIC_GTM_ID` esté configurado correctamente
- Verifica que el GTM ID tenga el formato correcto (`GTM-XXXXXXX`)
- Revisa la consola del navegador para errores

### Los eventos no aparecen en GTM

- Verifica que el trigger esté configurado correctamente
- Usa el modo Preview de GTM para debuggear
- Verifica que `window.dataLayer` tenga los eventos en la consola del navegador

### Eventos duplicados

- Asegúrate de no tener múltiples instancias del componente `GoogleTagManager`
- Verifica que no haya otros scripts de GTM cargándose

