'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function HashScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    // Solo ejecutar en el home
    const isHome = pathname === '/es' || pathname === '/en' || pathname === '/es/' || pathname === '/en/';
    
    if (!isHome) return;

    // Función para hacer scroll a la sección indicada por el hash
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.substring(1); // Remover el #
        const element = document.getElementById(id);
        
        if (element) {
          const headerOffset = 80; // Altura del header
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          return true;
        }
      }
      return false;
    };

    // Intentar hacer scroll inmediatamente
    if (!scrollToHash()) {
      // Si no está disponible, intentar varias veces con intervalos
      let attempts = 0;
      const maxAttempts = 30; // Aumentado para dar más tiempo
      const interval = setInterval(() => {
        attempts++;
        if (scrollToHash() || attempts >= maxAttempts) {
          clearInterval(interval);
        }
      }, 50);
      
      return () => clearInterval(interval);
    }

    // También escuchar cambios en el hash (por si se cambia dinámicamente)
    const handleHashChange = () => {
      setTimeout(scrollToHash, 50);
    };

    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [pathname]);

  return null;
}

