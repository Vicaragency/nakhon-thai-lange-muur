import type { Metadata } from "next";

import { SITE } from "./site-config";
import {
  MENU_CATEGORIES,
  MARQUEE_CATEGORIES,
  REVIEWS,
  type MenuCategory,
} from "./menu";
import { LANGE_MUUR_MENU, LANGE_MUUR_REVIEWS } from "./menu-lange-muur";

/**
 * Twee merken onder één dak (zelfde restaurant, Philipstockstraat 12 Brugge):
 * Nakhon Thai (Thaise keuken) en De Lange Muur (Chinese keuken). Ze delen adres,
 * telefoon, openingsuren en huisstijl (rood palet); ze verschillen in naam,
 * keuken, teksten, tekens (Thais schrift vs. Chinese karakters) en menukaart.
 */
export interface Brand {
  key: "nakhon-thai" | "de-lange-muur";
  name: string;
  legalName: string;
  /** Root-relatief pad, bv. "/nakhon-thai". */
  basePath: string;
  /** schema.org servesCuisine. */
  cuisine: string;
  /** Eyebrow boven de hero-titel. */
  eyebrow: string;
  /** Bijvoeglijk naamwoord: "Thaise" / "Chinese" (keuken/gerechten). */
  cuisineAdj: string;
  /** Land voor "Ontdek de smaken van ...". */
  region: string;
  /** Hero-titel in twee regels. */
  heroTitle: [string, string];
  /** Decoratieve tekens op de badges/banden (Thais schrift vs. Chinees). */
  scripts: { deal: string; tasty: string; homemade: string };
  /** Borden voor het hero-"rad" (eerste item = middelste/prominente bord). */
  heroDishes: { src: string; alt: string }[];
  menu: MenuCategory[];
  marquee: typeof MARQUEE_CATEGORIES;
  reviews: readonly { name: string; rating: number; text: string }[];
  defaultTitle: string;
  description: string;
  /** Per-pagina SEO-omschrijvingen. */
  seo: { menu: string; contact: string };
  ogImage: string;
}

export const NAKHON: Brand = {
  key: "nakhon-thai",
  name: "Nakhon Thai",
  legalName: "Nakhon Thai",
  basePath: "/nakhon-thai",
  cuisine: "Thai",
  eyebrow: "Thais restaurant in Brugge",
  cuisineAdj: "Thaise",
  region: "Thailand",
  heroTitle: ["Heerlijke Thaise keuken", "in het hart van Brugge"],
  scripts: { deal: "โปร", tasty: "อร่อย", homemade: "ทำเอง" },
  heroDishes: [
    { src: "/images/hero-n-scallops.png", alt: "Gestoomde sint-jakobsschelpen met orchidee" },
    { src: "/images/hero-n-soup.png", alt: "Pittige Thaise soep" },
    { src: "/images/hero-n-dumplings.png", alt: "Thaise dim sum in een kom" },
  ],
  menu: MENU_CATEGORIES,
  marquee: MARQUEE_CATEGORIES,
  reviews: REVIEWS,
  defaultTitle: "Nakhon Thai - Thais restaurant in het hart van Brugge",
  description:
    "Nakhon Thai - heerlijke Thaise keuken in het hart van Brugge. Verse soepen, dim sum, noodles en specialiteiten. Reserveer een tafel of bestel online.",
  seo: {
    menu: "Ontdek de menukaart van Nakhon Thai: verse soepen, dim sum, noodles, gebakken rijst en Thaise specialiteiten. Eten in het restaurant of afhalen in Brugge.",
    contact:
      "Nakhon Thai vind je in de Philipstockstraat 12, 8000 Brugge. 7 op 7 open voor lunch en diner. Reserveer of bel 050 33 18 48.",
  },
  ogImage: "/og/og-nakhon.jpg",
};

export const LANGE_MUUR: Brand = {
  key: "de-lange-muur",
  name: "De Lange Muur",
  legalName: "De Lange Muur",
  basePath: "/de-lange-muur",
  cuisine: "Chinese",
  eyebrow: "Chinees restaurant in Brugge",
  cuisineAdj: "Chinese",
  region: "China",
  heroTitle: ["Heerlijke Chinese keuken", "in het hart van Brugge"],
  scripts: { deal: "优惠", tasty: "好吃", homemade: "家常" },
  heroDishes: [
    { src: "/images/lm-noodles.png", alt: "Gebakken noodles met groenten" },
    { src: "/images/lm-chicken.png", alt: "Krokante kip met dipsaus" },
    { src: "/images/lm-tofu.png", alt: "Tofu met broccoli en paddenstoelen" },
    { src: "/images/lm-dumplings.png", alt: "Gefrituurde hapjes op rijst" },
    { src: "/images/lm-fried.png", alt: "Gefrituurde loempia's met dipsaus" },
  ],
  menu: LANGE_MUUR_MENU,
  marquee: MARQUEE_CATEGORIES,
  reviews: LANGE_MUUR_REVIEWS,
  defaultTitle: "De Lange Muur - Chinees restaurant in het hart van Brugge",
  description:
    "De Lange Muur - heerlijke Chinese keuken in het hart van Brugge. Verse soepen, dim sum, noodles en specialiteiten. Reserveer een tafel of bestel online.",
  seo: {
    menu: "Ontdek de menukaart van De Lange Muur: verse soepen, dim sum, noodles, gebakken rijst en Chinese specialiteiten. Eten in het restaurant of afhalen in Brugge.",
    contact:
      "De Lange Muur vind je in de Philipstockstraat 12, 8000 Brugge. 7 op 7 open voor lunch en diner. Reserveer of bel 050 33 18 48.",
  },
  ogImage: "/og/og-lange-muur.jpg",
};

export const BRANDS: Record<Brand["key"], Brand> = {
  "nakhon-thai": NAKHON,
  "de-lange-muur": LANGE_MUUR,
};

/** Gedeelde navigatie-items per merk (nav-overlay + footer). */
export function navItems(brand: Brand) {
  return [
    { label: "Home", href: brand.basePath },
    { label: "Menu", href: `${brand.basePath}/menu` },
    { label: "Reserveren", href: SITE.reserveUrl },
    { label: "Bestellen", href: SITE.orderUrl },
    { label: "Contact", href: `${brand.basePath}/contact` },
  ] as const;
}

interface BuildMetadataOptions {
  title?: string;
  description: string;
  /** Root-relatief pad, bv. "/menu" (wordt onder de basePath geplaatst). */
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
}

/** Bouwt een consistent Metadata-object per merk (openGraph + twitter). */
export function buildBrandMetadata(
  brand: Brand,
  { title, description, path, image, imageAlt, type = "website" }: BuildMetadataOptions,
): Metadata {
  const fullTitle = title ? `${title} - ${brand.name}` : brand.defaultTitle;
  const url = `${brand.basePath}${path === "/" ? "" : path}` || brand.basePath;
  const img = image ?? brand.ogImage;

  return {
    title: title ? title : { absolute: brand.defaultTitle },
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      locale: SITE.locale,
      url,
      siteName: brand.name,
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
