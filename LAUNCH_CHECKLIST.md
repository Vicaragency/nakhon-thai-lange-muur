# 🚀 Launch checklist — Nakhon Thai & De Lange Muur

Eén gecombineerde site voor twee merken onder één dak (Philipstockstraat 12, Brugge):

- `/` → splash-landing met twee deuren
- `/nakhon-thai` (+ `/menu`, `/contact`) → Nakhon Thai (Thaise keuken)
- `/de-lange-muur` (+ `/menu`, `/contact`) → De Lange Muur (Chinese keuken)
- `/privacy` + `/algemene-voorwaarden` → gedeelde juridische pagina's

Zolang de site op `*.vercel.app` draait staat ze bewust op **noindex**.

## ⚠️ BIJ DOMEINKOPPELING — indexering terug aanzetten
1. **`src/app/robots.ts`** → verwijder de `disallow: "/"` en voeg de sitemap-verwijzing toe.
2. **`src/app/layout.tsx`** → verwijder `robots: { index: false, follow: false }`.
3. **`NEXT_PUBLIC_SERVER_URL`** (`.env.local` + Vercel production) → zet op het echte domein.
4. Verifieer met Google Search Console + dien de sitemap in.

## ⚠️ DOMEIN: welk domein mag NIET naar Vercel
Het bestelsysteem (WooCommerce/orderticket.net) staat op **nakhonthai-brugge.be**
(Hostinger, WordPress). `nakhonthai.be` is vandaag alleen een 302-redirect naar
nakhonthai-brugge.be en bevat zelf geen inhoud.

- ✅ **Veilig:** de nieuwe site op `nakhonthai.be` (+ www) zetten. Bestellen blijft
      werken, want dat loopt over de andere hostname.
- ❌ **Breekt bestellen:** `nakhonthai-brugge.be` naar Vercel laten wijzen. Dan
      verdwijnen `/online-bestellen/`, `/order-online/`, `/cart/` en `/checkout/`.
- Reserveren staat volledig los van het domein (bookings.zenchef.com) en blijft
      in alle gevallen werken.

### DNS vóór de transfer
De volledige DNS van de drie domeinen staat vastgelegd in
[`docs/DNS_BASELINE.md`](docs/DNS_BASELINE.md) (21-08-2026). **Alle drie hebben
actieve MX-records**, dus een transfer die de nameservers reset legt ook de mail
stil, inclusief `info@nakhonthai.be`. Lees dat document vóór je een domein
verzet.

## Geverifieerd (21-08-2026)
- ✅ **Zenchef** — `rid=367627` = "Nakhon Thai - De Lange Muur", Philipstockstraat 12,
      8000 Bruges, tel. +3250331848, tijdzone Europe/Brussels, live betaalprovider.
      Zelfde URL (incl. `pid=1001`) als op de huidige site van de zaak.
      Boekbaar 7/7: Lunch 12:00-15:00 en Diner 17:30-22:30 (sloten per 15 min, 1-20 pers.).
- ✅ **Bestellen per merk** — `/online-bestellen/` = Thaise kaart (Nakhon Thai),
      `/order-online/` = Chinese kaart (De Lange Muur). Beide HTTP 200.
- ✅ Build, lint, typecheck, alle routes, 404, alle assets, geen console/hydratiefouten.

### ⚠️ Zenchef vs. de gepubliceerde uren
Zenchef neemt reservaties aan van **17:30 tot 22:30**; de site (en de huidige
site van de zaak) vermeldt **18:00 - 23:00**. Laat de zaak kiezen: Zenchef
gelijkzetten, of de uren op de site aanpassen. Nu kan iemand om 17:30 boeken.

## Andere launch-taken
- [ ] Custom domein koppelen in Vercel + DNS (zie de domein-waarschuwing hierboven).
- [ ] **Reviews zijn verzonnen** — `REVIEWS` (`src/lib/menu.ts`) en
      `LANGE_MUUR_REVIEWS` (`src/lib/menu-lange-muur.ts`) zijn placeholder-teksten
      ("Bart", "Sofie", "Thomas") die met een Google-logo worden gepresenteerd.
      Verzonnen reviews publiceren mag niet (EU-consumentenrecht). Vervang door
      echte Google-reviews of haal de sectie weg vóór livegang.
- [ ] **WK-deal is verlopen** — "Geldig tot en met 19 juli" + "WK deal" staat op
      beide homepages en menupagina's (`src/components/sections/deal.tsx`).
      Nieuwe actie of de sectie verwijderen.
- [ ] **Socials** — `SITE.socials` staat nu leeg (""); zolang die leeg is worden de
      iconen niet getoond en komen ze niet in de schema.org `sameAs`. De huidige
      site van de zaak heeft alleen een Facebook-icoon zonder link, dus de echte
      profiel-URL's moeten van de klant komen.
- [ ] **Eigen fotografie** — `public/images/*` zijn stockplaatsen (gedeeld door beide merken).
      Vervang door echte foto's van beide keukens.
- [ ] **Menukaarten** — Nakhon (`src/lib/menu.ts`, Thaise kaart) staat er; De Lange Muur
      (`src/lib/menu-lange-muur.ts`, Chinese kaart) is overgenomen uit de Figma-placeholder
      → laat de klant de echte Chinese menukaart + prijzen bevestigen.
- [ ] **E-mailadres De Lange Muur** — nu gedeeld `info@nakhonthai.be` (uit de Figma). Klopt dit,
      of heeft De Lange Muur een eigen adres? Zie `SITE.email`.
- [ ] **Juridische pagina's** — privacy + algemene voorwaarden zijn gedeeld (huismerk Nakhon).
      Laat juridisch nakijken; vermeld beide handelsnamen indien nodig.
- [ ] **WK-deal** — tijdsgebonden (`validUntil = "19 juli"`) op beide homes. Na afloop aanpassen.
- [ ] OG-preview-afbeeldingen (`public/og/og-default.jpg`, `og-nakhon.jpg`, `og-lange-muur.jpg`)
      staan klaar met de huisstijl; vervang eventueel door echte foto's.

## Architectuur (merk-systeem)
Beide merken delen structuur, huisstijl (rood palet) en contactgegevens. Het verschil zit in
`src/lib/brands.ts` (`NAKHON` en `LANGE_MUUR`): naam, keuken, teksten, tekens (Thais schrift
vs. Chinese karakters) en menukaart. De secties krijgen een `brand`-prop mee. Gedeelde gegevens
(adres, telefoon, uren, socials) staan in `src/lib/site-config.ts` (`SITE`).

## Display-font (licentie)
De koppen gebruiken **DIN Condensed Bold** (`src/fonts/din-condensed-bold.woff2`), een systeemfont.
Vervang door een gelicentieerd bestand voor productie.
