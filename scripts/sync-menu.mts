/**
 * Haalt de volledige menukaart uit de WooCommerce Store API van de webshop en
 * schrijft die naar src/lib/menu-snapshot.json.
 *
 *   npm run sync:menu
 *
 * De snapshot is de terugval van de site: als de webshop plat ligt of een half
 * antwoord geeft, rendert de menupagina hieruit. Committeer het bestand dus mee.
 *
 * De Thaise/Chinese tekens staan niet in de webshop. Ze worden overgenomen uit
 * de bestaande snapshot (en bij de eerste run uit de handgemaakte kaarten in
 * src/lib/menu.ts en src/lib/menu-lange-muur.ts) op basis van categorie + code
 * + naam. Nieuwe gerechten krijgen een lege waarde.
 *
 * Node voert dit bestand direct uit (type-stripping), dus geen build-stap nodig.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import {
  buildMenu,
  type BrandKey,
  type MenuSnapshot,
  type StoreProduct,
} from "../src/lib/menu-normalize.ts";
import { MENU_CATEGORIES, type MenuCategory } from "../src/lib/menu.ts";
import { LANGE_MUUR_MENU } from "../src/lib/menu-lange-muur.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SNAPSHOT = join(ROOT, "src/lib/menu-snapshot.json");
const API =
  process.env.MENU_API_URL ??
  "https://nakhonthai-brugge.be/wp-json/wc/store/v1/products";

const BRANDS: BrandKey[] = ["nakhon-thai", "de-lange-muur"];

async function fetchAllProducts(): Promise<StoreProduct[]> {
  const all: StoreProduct[] = [];
  for (let page = 1; page <= 20; page++) {
    const res = await fetch(`${API}?per_page=100&page=${page}`);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText} op pagina ${page}`);
    const batch = (await res.json()) as StoreProduct[];
    all.push(...batch);
    if (batch.length < 100) break;
  }
  return all;
}

/**
 * Bouwt de tekens-lookup. Sleutel voor gerechten is "slug|code|naam", maar de
 * handgemaakte kaarten kennen die slug niet, dus daar vallen we terug op
 * "code|naam" en matchen we losser.
 */
function collectScripts(previous: MenuSnapshot | null) {
  /** Gerechten: "code|naam" -> teken. Merk-onafhankelijk, codes zijn uniek genoeg. */
  const items: Record<string, string> = {};
  /** Categorieën: "merk|titel" -> teken. Titels als "Soep" bestaan bij beide merken. */
  const categories: Record<string, string> = {};

  const harvest = (brand: BrandKey, list: readonly MenuCategory[]) => {
    for (const category of list) {
      if (category.th) {
        categories[`${brand}|${category.title}`.toLowerCase()] = category.th;
      }
      for (const item of category.items) {
        if (item.th) items[`${item.code}|${item.name}`.toLowerCase()] = item.th;
      }
    }
  };

  // Bestaande snapshot heeft voorrang (daar zijn de tekens al eens nagekeken),
  // de handgemaakte kaarten zijn de bron bij de eerste run.
  harvest("nakhon-thai", MENU_CATEGORIES);
  harvest("de-lange-muur", LANGE_MUUR_MENU);
  if (previous) {
    for (const brand of BRANDS) harvest(brand, previous[brand] ?? []);
  }
  return { items, categories };
}

/** Vult de tekens in nadat de kaart gebouwd is. */
function applyScripts(
  menu: MenuSnapshot,
  scripts: { items: Record<string, string>; categories: Record<string, string> },
) {
  let filled = 0;
  let missing = 0;
  for (const brand of BRANDS) {
    for (const category of menu[brand]) {
      category.th =
        scripts.categories[`${brand}|${category.title}`.toLowerCase()] ?? "";
      for (const item of category.items) {
        item.th = scripts.items[`${item.code}|${item.name}`.toLowerCase()] ?? "";
        if (item.th) filled++;
        else missing++;
      }
    }
  }
  return { filled, missing };
}

function summarize(menu: MenuSnapshot) {
  return BRANDS.map((b) => {
    const cats = menu[b].length;
    const items = menu[b].reduce((n, c) => n + c.items.length, 0);
    return `${b}: ${cats} categorieën / ${items} gerechten`;
  }).join("  |  ");
}

function diff(before: MenuSnapshot | null, after: MenuSnapshot) {
  if (!before) {
    console.log("Geen bestaande snapshot: alles is nieuw.");
    return;
  }
  for (const brand of BRANDS) {
    const key = (m: MenuSnapshot) =>
      new Map(
        m[brand].flatMap((c) =>
          c.items.map((i) => [`${c.title} / ${i.code} ${i.name}`, i.price] as const),
        ),
      );
    const a = key(before);
    const b = key(after);
    const added = [...b.keys()].filter((k) => !a.has(k));
    const removed = [...a.keys()].filter((k) => !b.has(k));
    const changed = [...b.entries()].filter(
      ([k, v]) => a.has(k) && a.get(k) !== v,
    );
    console.log(`\n--- ${brand}`);
    if (!added.length && !removed.length && !changed.length) {
      console.log("    geen wijzigingen");
    }
    for (const k of added) console.log(`  + ${k}  ${b.get(k)}`);
    for (const k of removed) console.log(`  - ${k}  ${a.get(k)}`);
    for (const [k, v] of changed) console.log(`  ~ ${k}  ${a.get(k)} -> ${v}`);
  }
}

const previous: MenuSnapshot | null = existsSync(SNAPSHOT)
  ? (JSON.parse(readFileSync(SNAPSHOT, "utf8")) as MenuSnapshot)
  : null;

console.log(`Ophalen: ${API}`);
const products = await fetchAllProducts();
console.log(`${products.length} producten opgehaald.`);

const lookups = collectScripts(previous);
const menu = buildMenu(products, lookups);
const scripts = applyScripts(menu, lookups);

console.log(summarize(menu));
console.log(
  `Tekens (Thais/Chinees): ${scripts.filled} overgenomen, ${scripts.missing} nog leeg.`,
);
diff(previous, menu);

writeFileSync(SNAPSHOT, `${JSON.stringify(menu, null, 2)}\n`, "utf8");
console.log(`\nGeschreven naar ${SNAPSHOT}`);
console.log("Commit dit bestand mee: het is de terugval als de webshop plat ligt.");
