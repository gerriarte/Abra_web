import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Script from "next/script";
import { GoogleTagManagerNoscript } from "@/components/analytics/GoogleTagManager";
import GTMDebug from "@/components/analytics/GTMDebug";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {/* Google Tag Manager (noscript) - Debe estar inmediatamente después del body */}
        <GoogleTagManagerNoscript gtmId={gtmId} />
        {/* Inicializar dataLayer antes de GTM */}
        {gtmId && (
          <Script
            id="gtm-dataLayer-init"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
              `,
            }}
          />
        )}
        {/* Google Tag Manager Script */}
        {gtmId && (
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
        )}
        {children}
        <GTMDebug />
      </body>
    </html>
  );
}
