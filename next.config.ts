import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./lib/i18n/request.ts');

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
  },

  // Presentación Noches de IA (estática en public/noches-ia) → abralatam.com/noches-ia
  async rewrites() {
    return [
      { source: '/noches-ia', destination: '/noches-ia/index.html' },
      { source: '/noches-ia/', destination: '/noches-ia/index.html' },
      // Recursos del libro (estáticos en public/) → /es/libro y /es/judgment-audit/*
      { source: '/es/libro', destination: '/libro/index.html' },
      { source: '/es/libro/', destination: '/libro/index.html' },
      { source: '/es/judgment-audit/canvas', destination: '/judgment-audit-tools/canvas/index.html' },
      { source: '/es/judgment-audit/canvas/', destination: '/judgment-audit-tools/canvas/index.html' },
      { source: '/es/judgment-audit/autodiagnostico', destination: '/judgment-audit-tools/autodiagnostico/index.html' },
      { source: '/es/judgment-audit/autodiagnostico/', destination: '/judgment-audit-tools/autodiagnostico/index.html' },
    ];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        source: '/(.*)\\.(png|jpg|jpeg|webp|avif|svg|ico|woff|woff2|ttf|otf)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/(sitemap.xml|robots.txt)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
