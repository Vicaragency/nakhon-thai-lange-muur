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
- [ ] **Reviews: echte tekst nodig** — de verzonnen placeholders zijn verwijderd en
      de reviewsectie rendert nu niets zolang `REVIEWS` (`src/lib/menu.ts`) en
      `LANGE_MUUR_REVIEWS` (`src/lib/menu-lange-muur.ts`) leeg zijn. Vul aan met
      reviews die echt in het Google Bedrijfsprofiel staan (tekst + voornaam
      letterlijk overnemen). Verzonnen reviews publiceren mag niet.
- [ ] **Actie/deal: content nodig** — de verlopen WK-deal is eruit. Acties staan nu
      in `src/lib/deals.ts` met een `validUntil`, en verlopen automatisch (de
      home- en menupagina's revalideren). Beide merken staan op `null`, dus de
      dealsectie is nu onzichtbaar. Nieuwe actie? Vul de config in.
      Zet in de fineprint alleen kortingen die ook écht in de webshop
      geconfigureerd staan (bv. de "na 21u -5€ vanaf 35€"-regel), anders belooft
      de site iets dat bij het afrekenen niet klopt.
- [ ] **Socials** — `SITE.socials` staat nu leeg (""); zolang die leeg is worden de
      iconen niet getoond en komen ze niet in de schema.org `sameAs`. De huidige
      site van de zaak heeft alleen een Facebook-icoon zonder link, dus de echte
      profiel-URL's moeten van de klant komen.
- [ ] **Eigen fotografie** — `public/images/*` zijn stockplaatsen (gedeeld door beide merken).
      Vervang door echte foto's van beide keukens.
- [x] **Menukaarten** — komen nu live uit de webshop (zie hieronder). De Chinese
      kaart is daarmee compleet: van 4 categorieën / 30 gerechten naar 18 / 68.
- [ ] **E-mailadres De Lange Muur** — nu gedeeld `info@nakhonthai.be` (uit de Figma). Klopt dit,
      of heeft De Lange Muur een eigen adres? Zie `SITE.email`.
- [ ] **Juridische pagina's** — privacy + algemene voorwaarden zijn gedeeld (huismerk Nakhon).
      Laat juridisch nakijken; vermeld beide handelsnamen indien nodig.
- [ ] **WK-deal** — tijdsgebonden (`validUntil = "19 juli"`) op beide homes. Na afloop aanpassen.
- [ ] OG-preview-afbeeldingen (`public/og/og-default.jpg`, `og-nakhon.jpg`, `og-lange-muur.jpg`)
      staan klaar met de huisstijl; vervang eventueel door echte foto's.

## Menukaart: komt uit de webshop
De menupagina's halen de kaart live uit de WooCommerce Store API van
nakhonthai-brugge.be (`src/lib/menu-source.ts`). Dat is dezelfde bron waar de
klant afrekent, dus de prijzen op de site kunnen niet meer uit de pas lopen. De
pagina's revalideren elk 6 uur, dus een prijswijziging in WooCommerce staat
binnen 6 uur op de site zonder nieuwe deploy.

- **Terugval:** `src/lib/menu-snapshot.json` is gecommit. Ligt de webshop plat of
  komt er een half antwoord terug (`validateMenu` keurt af), dan rendert de
  pagina uit de snapshot en gaat de menupagina dus niet stuk.
- **Snapshot bijwerken:** `npm run sync:menu`. Print een diff van wat er
  bijkomt, wegvalt of van prijs verandert. Commit het resultaat mee.
- **Thaise/Chinese tekens** staan niet in de webshop en komen uit de snapshot,
  gematcht op code + naam. Nieuwe gerechten hebben nog geen teken; de kolom
  wordt dan weggelaten voor die categorie. Aanvullen mag handmatig in
  `menu-snapshot.json` (het sync-script neemt bestaande tekens over).
- **Te controleren door de klant:**
  - "Poke" en "Thaise fondue met grillplaat" hebben in de shop geen merk-prefix
    en zijn door ons aan Nakhon Thai toegewezen (`UNPREFIXED` in
    `src/lib/menu-normalize.ts`). Klopt dat?
  - De shop bevat typfouten die wij niet stilzwijgend aanpassen, bv.
    "Chine garnalen met ananas en zoetzure saus" en de categorie "VEGETARISH"
    (die laatste tonen we als "Vegetarisch"). Laat de zaak dit in WooCommerce
    rechtzetten, dan volgt de site automatisch.
  - Categorie "Uncategorized" (2 producten) wordt bewust niet getoond.

## Architectuur (merk-systeem)
Beide merken delen structuur, huisstijl (rood palet) en contactgegevens. Het verschil zit in
`src/lib/brands.ts` (`NAKHON` en `LANGE_MUUR`): naam, keuken, teksten, tekens (Thais schrift
vs. Chinese karakters) en menukaart. De secties krijgen een `brand`-prop mee. Gedeelde gegevens
(adres, telefoon, uren, socials) staan in `src/lib/site-config.ts` (`SITE`).

## Display-font (licentie)
De koppen gebruiken **DIN Condensed Bold** (`src/fonts/din-condensed-bold.woff2`), een systeemfont.
Vervang door een gelicentieerd bestand voor productie.
