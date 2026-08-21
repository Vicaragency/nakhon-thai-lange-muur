import type { MenuCategory, MenuItem } from "./menu";

/**
 * Zet de ruwe producten uit de WooCommerce Store API van de webshop
 * (nakhonthai-brugge.be) om naar onze MenuCategory-structuur.
 *
 * De shop is de bron van waarheid voor welke gerechten er zijn en wat ze
 * kosten: daar rekent de klant ook echt af. De data is wel rommelig
 * (categorieën heten "nakhonthai 06 SUGGESTIES", Thaise namen staan in
 * hoofdletters, er is een "Uncategorized"), dus alles gaat door één
 * normalisatie die zowel het sync-script als de site gebruikt. Zo ziet de
 * live-versie er exact hetzelfde uit als de snapshot.
 */

export type BrandKey = "nakhon-thai" | "de-lange-muur";

/** Alleen de velden die we nodig hebben uit /wp-json/wc/store/v1/products. */
export interface StoreProduct {
  id: number;
  name: string;
  prices: {
    price: string;
    currency_minor_unit: number;
    currency_symbol: string;
  };
  categories: { id: number; name: string; slug: string }[];
}

export type MenuSnapshot = Record<BrandKey, MenuCategory[]>;

/**
 * Categorieën zonder merk-prefix in de shop. Handmatig toegewezen, want uit de
 * naam alleen valt niet af te leiden bij welke keuken ze horen.
 * `sort` bepaalt de plaats op de menupagina (hoog = achteraan).
 * "Uncategorized" staat er bewust niet in en valt dus weg.
 */
const UNPREFIXED: Record<string, { brand: BrandKey; sort: number }> = {
  "01-poke": { brand: "nakhon-thai", sort: 90 },
  "02-thaise-fondue-met-grill-plaat": { brand: "nakhon-thai", sort: 91 },
};

/**
 * Nettere titels waar de shop-naam te lelijk of fout is. Alleen weergave:
 * de gerechten en prijzen komen onveranderd uit de shop.
 */
const TITLE_OVERRIDES: Record<string, string> = {
  "nakhonthai-04-vegetarish": "Vegetarisch",
  "delangemuur-13-speciaal-aanbevolen-tipan-yaki":
    "Speciaal aanbevolen Tipan-Yaki",
  "delangemuur-03-nasi-goreng-gerechten": "Nasi goreng",
  "delangemuur-04-bami-goreng-gerechten": "Bami goreng",
  "delangemuur-06-chop-shoy": "Chop shoy",
  "01-poke": "Poke",
  "02-thaise-fondue-met-grill-plaat": "Thaise fondue met grillplaat",
};

const PREFIXES: { prefix: string; brand: BrandKey }[] = [
  { prefix: "nakhonthai ", brand: "nakhon-thai" },
  { prefix: "delangemuur ", brand: "de-lange-muur" },
];

/**
 * De webshop levert namen met HTML-entities aan ("scampi&#8217;s"). Die moeten
 * eruit, anders staat de code letterlijk op de menukaart.
 */
const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  quot: '"',
  apos: "'",
  lt: "<",
  gt: ">",
  nbsp: " ",
};

function decodeEntities(text: string) {
  return text.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (match, body: string) => {
    if (body.startsWith("#")) {
      const isHex = body[1] === "x" || body[1] === "X";
      const code = Number.parseInt(isHex ? body.slice(2) : body.slice(1), isHex ? 16 : 10);
      return Number.isFinite(code) && code > 0 ? String.fromCodePoint(code) : match;
    }
    return NAMED_ENTITIES[body.toLowerCase()] ?? match;
  });
}

function isShouting(text: string) {
  return text === text.toUpperCase() && /[A-Z]{2}/.test(text);
}

/** "PAD KRAPAO NUA" -> "Pad Krapao Nua". Woorden met cijfers blijven intact. */
function toTitleCase(text: string) {
  return text
    .toLowerCase()
    .replace(/[a-zà-ÿ]+/g, (word) => word[0].toUpperCase() + word.slice(1));
}

/** "ZEEVRUCHTEN GERECHTEN" -> "Zeevruchten gerechten". */
function toSentenceCase(text: string) {
  const lower = text.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

/**
 * "115. Kikkerbilletjes..." -> code "115." + naam. Geen code = code "".
 * Dubbele spaties komen voor in de shop ("TOM YAM  TALAY") en worden platgeslagen,
 * anders mislukt het matchen van de Thaise/Chinese tekens.
 */
function splitCode(productName: string): { code: string; name: string } {
  const clean = decodeEntities(productName).replace(/\s+/g, " ").trim();
  const match = clean.match(/^([A-Za-z]{0,2}\d+[A-Za-z]?\.)\s*(.*)$/);
  if (!match) return { code: "", name: clean };
  return { code: match[1], name: match[2].trim() };
}

/** Sorteersleutel uit een code: "T12A." -> [12, "a"], "53C." -> [53, "c"]. */
function codeSortKey(code: string): [number, string] {
  const match = code.match(/(\d+)([A-Za-z]?)/);
  if (!match) return [Number.MAX_SAFE_INTEGER, ""];
  return [Number(match[1]), (match[2] || "").toLowerCase()];
}

function formatPrice(prices: StoreProduct["prices"]) {
  const cents = Number(prices.price);
  if (!Number.isFinite(cents)) return "";
  const value = cents / 10 ** prices.currency_minor_unit;
  return `${prices.currency_symbol || "€"}${value.toFixed(2)}`;
}

interface CategoryBucket {
  brand: BrandKey;
  slug: string;
  title: string;
  sort: number;
  items: MenuItem[];
}

/**
 * Bepaalt merk, titel en sorteerplaats voor één shop-categorie.
 * Geeft null terug voor categorieën die niet op de site horen.
 */
function classify(category: { name: string; slug: string }) {
  const categoryName = decodeEntities(category.name);
  const override = UNPREFIXED[category.slug];
  if (override) {
    return {
      brand: override.brand,
      sort: override.sort,
      title: TITLE_OVERRIDES[category.slug] ?? toSentenceCase(categoryName),
    };
  }

  const match = PREFIXES.find((p) =>
    categoryName.toLowerCase().startsWith(p.prefix),
  );
  if (!match) return null;

  // "nakhonthai 06 SUGGESTIES" -> sort 6, rest "SUGGESTIES"
  const rest = categoryName.slice(match.prefix.length).trim();
  const numbered = rest.match(/^(\d+)\s*(.*)$/);
  const sort = numbered ? Number(numbered[1]) : 50;
  const label = numbered ? numbered[2].trim() : rest;

  return {
    brand: match.brand,
    sort,
    title:
      TITLE_OVERRIDES[category.slug] ??
      (isShouting(label) ? toSentenceCase(label) : label),
  };
}

/**
 * Bouwt de menukaart per merk uit de shop-producten.
 *
 * `scripts` levert de Thaise/Chinese tekens aan, want die staan niet in de
 * webshop. Ze worden overgenomen uit de bestaande snapshot op basis van de
 * code van het gerecht; nieuwe gerechten krijgen een lege waarde (de
 * menulijst laat die kolom dan gewoon leeg).
 */
export function buildMenu(
  products: StoreProduct[],
  scripts: { items: Record<string, string>; categories: Record<string, string> } = {
    items: {},
    categories: {},
  },
): MenuSnapshot {
  const buckets = new Map<string, CategoryBucket>();

  for (const product of products) {
    const price = formatPrice(product.prices);
    if (!price) continue;

    for (const category of product.categories) {
      const info = classify(category);
      if (!info) continue;

      let bucket = buckets.get(category.slug);
      if (!bucket) {
        bucket = {
          brand: info.brand,
          slug: category.slug,
          title: info.title,
          sort: info.sort,
          items: [],
        };
        buckets.set(category.slug, bucket);
      }

      const { code, name } = splitCode(product.name);
      bucket.items.push({
        code,
        th: scripts.items[`${category.slug}|${code}|${name}`] ?? "",
        name: isShouting(name) ? toTitleCase(name) : name,
        price,
      });
    }
  }

  const result: MenuSnapshot = { "nakhon-thai": [], "de-lange-muur": [] };

  // Categorieën volgen het nummer uit de shop; bij een gelijk nummer (de shop
  // heeft twee keer "02") alfabetisch, zodat de volgorde stabiel is.
  const ordered = [...buckets.values()].sort(
    (a, b) => a.sort - b.sort || a.title.localeCompare(b.title, "nl"),
  );

  for (const bucket of ordered) {
    if (bucket.items.length === 0) continue;
    bucket.items.sort((a, b) => {
      const [an, al] = codeSortKey(a.code);
      const [bn, bl] = codeSortKey(b.code);
      return an - bn || al.localeCompare(bl) || a.name.localeCompare(b.name);
    });
    result[bucket.brand].push({
      title: bucket.title,
      th: scripts.categories[bucket.slug] ?? "",
      items: bucket.items,
    });
  }

  return result;
}

/**
 * Sanity-check op een net opgehaalde kaart. De site valt terug op de
 * gecommitte snapshot zodra dit faalt, zodat een half antwoord van de webshop
 * nooit een uitgeklede menukaart oplevert.
 */
export function validateMenu(
  menu: MenuSnapshot,
  reference: MenuSnapshot,
): string | null {
  for (const key of ["nakhon-thai", "de-lange-muur"] as BrandKey[]) {
    const categories = menu[key];
    if (!categories || categories.length === 0) {
      return `${key}: geen categorieën`;
    }
    const minCategories = Math.floor(reference[key].length * 0.8);
    if (categories.length < minCategories) {
      return `${key}: ${categories.length} categorieën, verwacht minstens ${minCategories}`;
    }
    const items = categories.reduce((n, c) => n + c.items.length, 0);
    const minItems = Math.floor(
      reference[key].reduce((n, c) => n + c.items.length, 0) * 0.8,
    );
    if (items < minItems) {
      return `${key}: ${items} gerechten, verwacht minstens ${minItems}`;
    }
    for (const category of categories) {
      for (const item of category.items) {
        if (!item.name || !item.price) {
          return `${key} / ${category.title}: gerecht zonder naam of prijs`;
        }
      }
    }
  }
  return null;
}
