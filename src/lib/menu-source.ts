import type { MenuCategory } from "./menu";
import {
  buildMenu,
  validateMenu,
  type BrandKey,
  type MenuSnapshot,
  type StoreProduct,
} from "./menu-normalize";
import snapshot from "./menu-snapshot.json";

/**
 * Levert de menukaart per merk aan de menupagina's.
 *
 * De webshop op nakhonthai-brugge.be is de bron van waarheid: daar rekent de
 * klant af, dus daar staan de juiste prijzen. We halen de kaart bij elke
 * revalidatie live op, zodat een prijswijziging in WooCommerce automatisch op
 * de site komt zonder nieuwe deploy.
 *
 * Valt de webshop weg of komt er een half antwoord terug, dan rendert de
 * pagina uit `menu-snapshot.json`. Die snapshot is gecommit en wordt
 * bijgewerkt met `npm run sync:menu`. De menupagina gaat dus nooit stuk door
 * een probleem bij de shop.
 */

const SNAPSHOT = snapshot as MenuSnapshot;

const API =
  process.env.MENU_API_URL ??
  "https://nakhonthai-brugge.be/wp-json/wc/store/v1/products";

/** Hoe lang een opgehaalde kaart hergebruikt wordt (seconden). 6 uur. */
const REVALIDATE = 60 * 60 * 6;

/** Tekens (Thais/Chinees) uit de snapshot, om de live kaart mee aan te vullen. */
function scriptsFromSnapshot() {
  const items: Record<string, string> = {};
  const categories: Record<string, string> = {};
  for (const brand of Object.keys(SNAPSHOT) as BrandKey[]) {
    for (const category of SNAPSHOT[brand]) {
      if (category.th) {
        categories[`${brand}|${category.title}`.toLowerCase()] = category.th;
      }
      for (const item of category.items) {
        if (item.th) items[`${item.code}|${item.name}`.toLowerCase()] = item.th;
      }
    }
  }
  return { items, categories };
}

function withScripts(menu: MenuSnapshot): MenuSnapshot {
  const { items, categories } = scriptsFromSnapshot();
  for (const brand of Object.keys(menu) as BrandKey[]) {
    for (const category of menu[brand]) {
      category.th =
        categories[`${brand}|${category.title}`.toLowerCase()] ?? category.th;
      for (const item of category.items) {
        item.th = items[`${item.code}|${item.name}`.toLowerCase()] ?? item.th;
      }
    }
  }
  return menu;
}

async function fetchProducts(): Promise<StoreProduct[]> {
  const all: StoreProduct[] = [];
  for (let page = 1; page <= 5; page++) {
    const res = await fetch(`${API}?per_page=100&page=${page}`, {
      next: { revalidate: REVALIDATE },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const batch = (await res.json()) as StoreProduct[];
    all.push(...batch);
    if (batch.length < 100) break;
  }
  return all;
}

let warned = false;

/** De volledige kaart voor beide merken: live indien mogelijk, anders de snapshot. */
async function loadMenu(): Promise<MenuSnapshot> {
  try {
    const menu = withScripts(buildMenu(await fetchProducts()));
    const problem = validateMenu(menu, SNAPSHOT);
    if (problem) throw new Error(`kaart afgekeurd (${problem})`);
    return menu;
  } catch (error) {
    if (!warned) {
      warned = true;
      console.warn(
        `[menu] live kaart uit de webshop niet gebruikt, terugval op de snapshot: ${
          error instanceof Error ? error.message : error
        }`,
      );
    }
    return SNAPSHOT;
  }
}

/** De menukaart van één merk. Gebruik dit in de menupagina's. */
export async function loadBrandMenu(brand: BrandKey): Promise<MenuCategory[]> {
  const menu = await loadMenu();
  return menu[brand] ?? SNAPSHOT[brand];
}

/** De gecommitte kaart, zonder netwerk. Voor plekken die synchroon moeten zijn. */
export function snapshotMenu(brand: BrandKey): MenuCategory[] {
  return SNAPSHOT[brand];
}

export const menuRevalidate = REVALIDATE;
