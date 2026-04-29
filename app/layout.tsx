import "./globals.css";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { GoogleTagManagerNoscript } from "@/components/analytics/GoogleTagManager";
import GTMDebug from "@/components/analytics/GTMDebug";
import { generateSEOMetadata } from "@/lib/utils/seo";
import JsonLd from "@/components/seo/JsonLd";
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/utils/seo";

export const metadata: Metadata = {
  ...generateSEOMetadata({
    title: "A:BRA | Growth Marketing + IA Studio en Bogotá y Buenos Aires",
    description: "Studio híbrido que combina growth, IA y desarrollo de producto. Construimos sistemas de crecimiento y los productos que los hacen posibles.",
    keywords: ["agencia growth marketing", "IA aplicada", "desarrollo de producto", "growth engineering", "A:BRA Loop", "Bogotá", "Buenos Aires"],
    type: "website",
    locale: "es",
  }),
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
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
      <body className="antialiased overflow-x-hidden" suppressHydrationWarning>
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
