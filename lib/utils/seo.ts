import { Metadata } from 'next';
import { locales } from '@/lib/i18n/config';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://abralatam.com';
const siteName = 'A:BRA';
const defaultDescription = {
  en: 'Strategic Digital Engineering Agency. We transform complex data into predictable growth systems. From brand vision to web development, we build digital solutions that work, proven by metrics.',
  es: 'Agencia de Ingeniería Digital Estratégica. Transformamos datos complejos en sistemas de crecimiento predecibles. De la visión de marca al desarrollo web, construimos soluciones digitales que funcionan, probadas por la métrica.',
};

export interface SEOConfig {
  title: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  locale?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

/**
 * Genera metadatos SEO completos con Open Graph y Twitter Cards
 */
export function generateSEOMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    image,
    url,
    type = 'website',
    locale = 'en',
    noindex = false,
    nofollow = false,
  } = config;

  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const metaDescription = description || defaultDescription[locale as 'en' | 'es'] || defaultDescription.en;
  const imageUrl = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : `${siteUrl}/abra.png`;
  const pageUrl = url ? (url.startsWith('http') ? url : `${siteUrl}${url}`) : siteUrl;

  // Generar alternate links para hreflang
  const alternates: Metadata['alternates'] = {
    canonical: pageUrl,
    languages: {},
  };

  locales.forEach((loc) => {
    if (loc !== locale) {
      const altUrl = url 
        ? url.replace(`/${locale}/`, `/${loc}/`).replace(`/${locale}`, `/${loc}`)
        : `${siteUrl}/${loc}`;
      alternates.languages![loc] = altUrl;
    }
  });

  const robots = [
    noindex ? 'noindex' : 'index',
    nofollow ? 'nofollow' : 'follow',
    'max-image-preview:large',
    'max-snippet:-1',
    'max-video-preview:-1',
  ].join(', ');

  return {
    title: fullTitle,
    description: metaDescription,
    keywords: keywords.length > 0 ? keywords : undefined,
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    alternates,
    openGraph: {
      type: type === 'article' ? 'article' : 'website',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      url: pageUrl,
      siteName,
      title: fullTitle,
      description: metaDescription,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: metaDescription,
      images: [imageUrl],
      creator: '@abra_agency',
      site: '@abra_agency',
    },
    metadataBase: new URL(siteUrl),
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };
}

/**
 * Genera schema JSON-LD para Organization
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'A:BRA',
    alternateName: 'ABRA',
    url: siteUrl,
    logo: `${siteUrl}/abra.png`,
    description: defaultDescription.en,
    sameAs: [
      // Agregar redes sociales cuando estén disponibles
      // 'https://www.linkedin.com/company/abra',
      // 'https://twitter.com/abra_agency',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['English', 'Spanish'],
    },
  };
}

/**
 * Genera schema JSON-LD para WebSite con SearchAction
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    description: defaultDescription.en,
    inLanguage: ['en', 'es'],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Genera schema JSON-LD para Service
 */
export function generateServiceSchema(serviceName: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: serviceName,
    provider: {
      '@type': 'Organization',
      name: siteName,
      url: siteUrl,
    },
    description,
    areaServed: 'Worldwide',
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: siteUrl,
    },
  };
}

/**
 * Genera schema JSON-LD para Article/WebPage (Case Study)
 */
export function generateArticleSchema(config: {
  title: string;
  description: string;
  image?: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
}) {
  const {
    title,
    description,
    image,
    url,
    datePublished,
    dateModified,
    author = siteName,
  } = config;

  const imageUrl = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : `${siteUrl}/abra.png`;
  const pageUrl = url.startsWith('http') ? url : `${siteUrl}${url}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: imageUrl,
    url: pageUrl,
    datePublished: datePublished || new Date().toISOString(),
    dateModified: dateModified || new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: author,
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/abra.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
  };
}

/**
 * Genera schema JSON-LD para BreadcrumbList
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`,
    })),
  };
}

