import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Script from "next/script";
import { GoogleTagManagerNoscript } from "@/components/analytics/GoogleTagManager";
import GTMDebug from "@/components/analytics/GTMDebug";
import { generateSEOMetadata } from "@/lib/utils/seo";
import JsonLd from "@/components/seo/JsonLd";
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/utils/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  ...generateSEOMetadata({
    title: "A:BRA - Strategic Digital Engineering Agency | Agencia de Ingeniería Digital Estratégica",
    description: "We transform complex data into predictable growth systems. From brand vision to web development, we build digital solutions that work, proven by metrics. | Transformamos datos complejos en sistemas de crecimiento predecibles.",
    keywords: ["digital agency", "agencia digital", "branding", "web development", "desarrollo web", "digital marketing", "marketing digital", "growth strategy", "estrategia de crecimiento", "UX design", "diseño UX", "strategic consulting", "consultoría estratégica", "LATAM"],
    type: "website",
    locale: "en",
  }),
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  manifest: "/manifest.json",
  themeColor: "#04213B",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // GTM ID - puede venir de variable de entorno o usar el valor por defecto
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-56J4SKMV';

  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <body className={`${inter.variable} antialiased overflow-x-hidden`} suppressHydrationWarning>
        <JsonLd data={[generateOrganizationSchema(), generateWebSiteSchema()]} />
        {/* Google Tag Manager (noscript) - Debe estar inmediatamente después del body */}
        <GoogleTagManagerNoscript gtmId={gtmId} />
        {/* Inicializar dataLayer antes de GTM */}
        <Script
          id="gtm-dataLayer-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
            `,
          }}
        />
        {/* Google Tag Manager Script */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `,
          }}
        />
        {children}
        <GTMDebug />
      </body>
    </html>
  );
}
