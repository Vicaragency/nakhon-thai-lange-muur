import type { Metadata } from "next";

/**
 * Centrale bron van waarheid voor bedrijfs- en SEO-gegevens.
 * Gebruikt door de per-pagina metadata (buildMetadata), de footer/header en
 * de JSON-LD structured data (src/components/seo/json-ld.tsx).
 */
export const SITE = {
  name: "Nakhon Thai",
  legalName: "Nakhon Thai",
  /** Standaard <title> voor de home + fallback. */
  defaultTitle: "Nakhon Thai - Thais restaurant in het hart van Brugge",
  description:
    "Heerlijke Thaise keuken in het hart van Brugge. Verse soepen, dim sum, noodles en specialiteiten. Reserveer een tafel of bestel online.",
  url: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
  locale: "nl_BE",
  phone: "050 33 18 48",
  /** Genormaliseerd voor tel:-links en schema. */
  phoneHref: "+3250331848",
  email: "info@nakhonthai.be",
  cuisine: "Thai",
  priceRange: "€€",
  address: {
    street: "Philipstockstraat 12",
    postalCode: "8000",
    city: "Brugge",
    region: "West-Vlaanderen",
    countryCode: "BE",
    countryName: "België",
  },
  /** Externe platforms. Vervang '#' door de echte URL's. */
  reserveUrl: "#reserveren",
  orderUrl: "#bestellen",
  socials: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    tiktok: "https://tiktok.com/",
  },
  /** Google Maps embed voor de contactpagina (Philipstockstraat, Brugge). */
  mapEmbedSrc:
    "https://www.google.com/maps?q=Philipstockstraat+12,+8000+Brugge&output=embed",
  mapLink:
    "https://www.google.com/maps/search/?api=1&query=Philipstockstraat+12+8000+Brugge",
  /** Standaard Open Graph-afbeelding (1200x630). */
  ogImage: "/og/og-default.jpg",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  /**
   * Openingsuren per dag (7 op 7). Lunch- en dinerdienst.
   * Volgorde = ma t/m zo, geschikt voor de urentabel en schema.org.
   */
  openingHours: [
    { day: "Maandag", lunch: "12:00 - 15:00", dinner: "18:00 - 23:00" },
    { day: "Dinsdag", lunch: "12:00 - 15:00", dinner: "18:00 - 23:00" },
    { day: "Woensdag", lunch: "12:00 - 15:00", dinner: "18:00 - 23:00" },
    { day: "Donderdag", lunch: "12:00 - 15:00", dinner: "18:00 - 23:00" },
    { day: "Vrijdag", lunch: "12:00 - 15:00", dinner: "18:00 - 23:00" },
    { day: "Zaterdag", lunch: "12:00 - 15:00", dinner: "18:00 - 23:00" },
    { day: "Zondag", lunch: "12:00 - 15:00", dinner: "18:00 - 23:00" },
  ],
} as const;

interface BuildMetadataOptions {
  /** Paginatitel zonder merk-suffix, bv. "Menu". Leeg = home (default titel). */
  title?: string;
  description: string;
  /** Root-relatief pad, bv. "/contact". Wordt de canonical + og:url. */
  path: string;
  /** Root-relatief pad naar een afbeelding; standaard de site-brede OG-image. */
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
}

/**
 * Bouwt een consistent Metadata-object met openGraph + twitter voor elke pagina.
 */
export function buildMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  type = "website",
}: BuildMetadataOptions): Metadata {
  const fullTitle = title ? `${title} - ${SITE.name}` : SITE.defaultTitle;
  const img = image ?? SITE.ogImage;

  return {
    title: title ? title : { absolute: SITE.defaultTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: SITE.locale,
      url: path,
      siteName: SITE.name,
      title: fullTitle,
      description,
      images: [
        {
          url: img,
          width: SITE.ogImageWidth,
          height: SITE.ogImageHeight,
          alt: imageAlt ?? fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [img],
    },
  };
}

/** Gedeelde navigatie-items (nav-overlay, footer). */
export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Reserveren", href: SITE.reserveUrl },
  { label: "Bestellen", href: SITE.orderUrl },
  { label: "Contact", href: "/contact" },
] as const;
