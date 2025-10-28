import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./lib/i18n/request.ts');

const nextConfig: NextConfig = {
  output: 'export', // Exporta como sitio estático HTML
  
  // Desactivar optimizaciones que requieren servidor
  images: {
    unoptimized: true, // Las imágenes se servirán directamente sin optimización
  },
  
  // Trailing slash para URLs limpias
  trailingSlash: true,
  
  // Distinir entre output estático
  distDir: 'out',
};

export default withNextIntl(nextConfig);

