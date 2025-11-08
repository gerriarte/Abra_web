'use client';

import { useEffect } from 'react';

/**
 * Componente de debug para verificar que GTM está cargando correctamente
 * Solo se muestra en desarrollo
 */
export default function GTMDebug() {
  useEffect(() => {
    // Solo en desarrollo
    if (process.env.NODE_ENV === 'development') {
      const checkGTM = () => {
        const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
        
        console.log('🔍 GTM Debug Info:');
        console.log('GTM ID:', gtmId || '❌ NO CONFIGURADO');
        
        if (typeof window !== 'undefined') {
          console.log('dataLayer:', window.dataLayer);
          console.log('GTM Script loaded:', !!document.querySelector('script[src*="googletagmanager.com/gtm.js"]'));
          console.log('GTM Noscript loaded:', !!document.querySelector('noscript iframe[src*="googletagmanager.com"]'));
        }
      };

      // Verificar después de un pequeño delay para que GTM tenga tiempo de cargar
      setTimeout(checkGTM, 2000);
    }
  }, []);

  return null;
}

