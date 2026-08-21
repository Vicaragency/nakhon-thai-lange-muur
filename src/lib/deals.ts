import type { BrandKey } from "./menu-normalize";

/**
 * Tijdelijke acties per merk.
 *
 * Waarom dit een aparte config is: er stond een "WK deal" met "geldig tot en met
 * 19 juli" hardcoded in de component, en die bleef daarna gewoon staan. Een
 * actie met een einddatum hoort automatisch te verdwijnen, niet te blijven
 * hangen tot iemand het merkt.
 *
 * Zet `null` als er geen actie loopt: de dealsectie verdwijnt dan volledig van
 * de home- en menupagina's. Een actie met een `validUntil` in het verleden
 * verdwijnt vanzelf (de pagina's revalideren, zie `revalidate` daar).
 */
export interface Deal {
  /** Kop, bv. "WK deal". Komt in "Profiteer van onze <title>". */
  title: string;
  /** Laatste geldige dag, ISO: "2026-07-19". */
  validUntil: string;
  /** Wordt getoond als "Geldig tot en met ...". Bv. "19 juli". */
  validUntilLabel: string;
  /** Wervende tekst. `{keuken}` wordt vervangen door "Thaise" / "Chinese". */
  body: string;
  /** Kleine lettertjes onder de tekst. Leeg = niet tonen. */
  fineprint?: string;
}

/**
 * Nu geen enkele actie actief.
 *
 * De vorige actie ("WK deal", geldig tot 19 juli 2026) is verlopen en de tekst
 * verwees naar het WK, dus die kon niet blijven staan. Nieuwe actie? Vul
 * hieronder in en de sectie komt automatisch terug op de home- en menupagina.
 *
 * Voorbeeld:
 *   "nakhon-thai": {
 *     title: "Weekdeal",
 *     validUntil: "2026-09-30",
 *     validUntilLabel: "30 september",
 *     body: "Bestel nu en geniet van vers bereide {keuken} gerechten.",
 *     fineprint: "Bestellen na 21u extra korting 5€ per bestelling! Minimum 35€",
 *   },
 *
 * Let op: zet in de fineprint alleen kortingen die ook echt in de webshop
 * geconfigureerd staan, anders belooft de site iets dat bij het afrekenen niet
 * klopt.
 */
export const DEALS: Record<BrandKey, Deal | null> = {
  "nakhon-thai": null,
  "de-lange-muur": null,
};

/** ISO-datum van vandaag in de tijdzone van het restaurant. */
function todayInBrussels(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Brussels",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

/** De actie van dit merk, of null als er geen loopt of ze verlopen is. */
export function activeDeal(brand: BrandKey): Deal | null {
  const deal = DEALS[brand];
  if (!deal) return null;
  return deal.validUntil >= todayInBrussels() ? deal : null;
}
