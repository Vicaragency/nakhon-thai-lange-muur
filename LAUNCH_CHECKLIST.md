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

## Andere launch-taken
- [ ] Custom domein koppelen in Vercel + DNS.
- [ ] **Reserveren / Bestellen koppelen** — `SITE.reserveUrl` / `SITE.orderUrl`
      (`src/lib/site-config.ts`) staan op `#`. Zelfde platform voor beide merken?
- [ ] **Socials** — Instagram/Facebook/TikTok in `SITE.socials` zijn placeholders.
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
