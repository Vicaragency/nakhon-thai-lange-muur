import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

import { SITE } from "@/lib/site-config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Gecondenseerde display-font voor de uppercase koppen: DIN Condensed (zelf-gehost, Bold).
const dinCondensed = localFont({
  src: "../fonts/din-condensed-bold.woff2",
  variable: "--font-din",
  weight: "700",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Nakhon Thai & De Lange Muur - Brugge",
    template: "%s",
  },
  description:
    "Nakhon Thai (Thaise keuken) en De Lange Muur (Chinese keuken) - twee keukens onder één dak in het hart van Brugge. Reserveer een tafel of bestel online.",
  applicationName: "Nakhon Thai & De Lange Muur",
  openGraph: {
    type: "website",
    locale: SITE.locale,
    siteName: "Nakhon Thai & De Lange Muur",
    images: [{ url: "/og/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og/og-default.jpg"] },
  // PRE-LAUNCH: noindex tot het echte domein gekoppeld is. Zie LAUNCH_CHECKLIST.md.
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="nl"
      className={`${inter.variable} ${dinCondensed.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
