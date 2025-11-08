import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import GoogleTagManager from "@/components/analytics/GoogleTagManager";

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
        <GoogleTagManager gtmId={gtmId} />
        {children}
      </body>
    </html>
  );
}
