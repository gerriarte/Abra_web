import { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.abralatam.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/static/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
        ],
      },
      // Crawlers de buscadores con IA que citan fuentes: permitidos explícitamente (AEO)
      {
        userAgent: ['GPTBot', 'OAI-SearchBot', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended'],
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

