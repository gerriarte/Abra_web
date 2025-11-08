'use client';

import { useCallback } from 'react';

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Hook personalizado para interactuar con Google Tag Manager
 * 
 * @example
 * ```tsx
 * const { pushEvent } = useGTM();
 * 
 * pushEvent('button_click', {
 *   button_name: 'contact_form_submit',
 *   page_location: window.location.href
 * });
 * ```
 */
export function useGTM() {
  /**
   * Envía un evento a Google Tag Manager
   * 
   * @param eventName - Nombre del evento (ej: 'button_click', 'form_submit')
   * @param eventData - Datos adicionales del evento
   */
  const pushEvent = useCallback((eventName: string, eventData?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        ...eventData,
      });
    }
  }, []);

  /**
   * Envía datos a la dataLayer sin evento específico
   * Útil para configuraciones o datos de página
   * 
   * @param data - Datos a enviar a la dataLayer
   */
  const pushData = useCallback((data: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push(data);
    }
  }, []);

  return {
    pushEvent,
    pushData,
  };
}

