import { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n/config';
import { CASES_DATA } from '@/data/cases';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://abralatam.com';

// Usa la fecha del último commit en Vercel; si no, la fecha del build
const DEPLOY_DATE = process.env.VERCEL_GIT_COMMIT_DATE
  ? new Date(process.env.VERCEL_GIT_COMMIT_DATE)
  : new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const baseRoutes = [
    {
      url: siteUrl,
      lastModified: DEPLOY_DATE,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
  ];

  const localeRoutes = locales.flatMap((locale) => [
    {
      url: `${siteUrl}/${locale}`,
      lastModified: DEPLOY_DATE,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${siteUrl}/${locale}/cases`,
      lastModified: DEPLOY_DATE,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]);

  const caseStudyRoutes = Object.keys(CASES_DATA).flatMap((slug) =>
    locales.map((locale) => ({
      url: `${siteUrl}/${locale}/case-studies/${slug}`,
      lastModified: DEPLOY_DATE,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  return [...baseRoutes, ...localeRoutes, ...caseStudyRoutes];
}

