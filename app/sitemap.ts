import { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n/config';
import { CASES_DATA } from '@/data/cases';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://abralatam.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseRoutes = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
  ];

  // Generate routes for each locale
  const localeRoutes = locales.flatMap((locale) => [
    {
      url: `${siteUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${siteUrl}/${locale}/cases`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]);

  // Generate routes for case studies
  const caseStudyRoutes = Object.keys(CASES_DATA).flatMap((slug) =>
    locales.map((locale) => ({
      url: `${siteUrl}/${locale}/case-studies/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  return [...baseRoutes, ...localeRoutes, ...caseStudyRoutes];
}

