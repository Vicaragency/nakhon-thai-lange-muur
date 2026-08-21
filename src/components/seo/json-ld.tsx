import { SITE } from "@/lib/site-config";
import type { Brand } from "@/lib/brands";

type JsonObject = Record<string, unknown>;

/**
 * Rendert één of meerdere schema.org-objecten als
 * <script type="application/ld+json">. Te gebruiken in server components.
 */
export function JsonLd({ data }: { data: JsonObject | JsonObject[] }) {
  const json = Array.isArray(data) ? data : [data];
  return (
    <>
      {json.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}

/** Volledige URL vanaf een root-relatief pad. */
function abs(path: string): string {
  return new URL(path, SITE.url).toString();
}

const postalAddress = () => ({
  "@type": "PostalAddress",
  streetAddress: SITE.address.street,
  postalCode: SITE.address.postalCode,
  addressLocality: SITE.address.city,
  addressRegion: SITE.address.region,
  addressCountry: SITE.address.countryCode,
});

const DAY_MAP: Record<string, string> = {
  Maandag: "Monday",
  Dinsdag: "Tuesday",
  Woensdag: "Wednesday",
  Donderdag: "Thursday",
  Vrijdag: "Friday",
  Zaterdag: "Saturday",
  Zondag: "Sunday",
};

/** Lunch- en dinerdienst per dag omzetten naar OpeningHoursSpecification. */
function openingHoursSpecification() {
  const spec: JsonObject[] = [];
  for (const block of SITE.openingHours) {
    const day = DAY_MAP[block.day] ?? block.day;
    for (const range of [block.lunch, block.dinner]) {
      const [opens, closes] = range.split(" - ");
      spec.push({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: day,
        opens,
        closes,
      });
    }
  }
  return spec;
}

/** Restaurant-schema met NAP, keuken, prijsklasse en openingsuren (per merk). */
export function restaurantSchema(brand: Brand): JsonObject {
  const sameAs = [
    SITE.socials.instagram,
    SITE.socials.facebook,
    SITE.socials.tiktok,
  ].filter((url) => url.length > 0);

  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": abs(`${brand.basePath}#restaurant`),
    name: brand.name,
    legalName: brand.legalName,
    url: abs(brand.basePath),
    image: abs(brand.ogImage),
    description: brand.description,
    email: SITE.email,
    // E.164 zodat Google/Apple het nummer eenduidig kan interpreteren.
    telephone: SITE.phoneHref,
    servesCuisine: brand.cuisine,
    priceRange: SITE.priceRange,
    currenciesAccepted: "EUR",
    acceptsReservations: true,
    hasMenu: abs(`${brand.basePath}/menu`),
    address: postalAddress(),
    areaServed: { "@type": "City", name: SITE.address.city },
    openingHoursSpecification: openingHoursSpecification(),
    // Alleen ingevulde profielen: een `sameAs` naar instagram.com/ (de homepage
    // van het platform) is een verkeerd signaal voor de knowledge graph.
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

/** BreadcrumbList vanaf een lijst van {name, path}-items (in volgorde). */
export function breadcrumbSchema(
  items: { name: string; path: string }[],
): JsonObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}
