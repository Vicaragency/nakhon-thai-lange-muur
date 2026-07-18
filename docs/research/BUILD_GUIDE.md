# Build Guide — Meirlaen pagina-builders

Lees dit VOLLEDIG voor je een pagina bouwt. Doel: elke pagina consistent met de al
gebouwde homepage, pixel-perfect uit Figma, met hergebruik van de gedeelde primitieven.

## Stack
- Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS v4.
- Routes onder `src/app/(site)/` (NL-only, GEEN i18n). Header + footer zitten al in
  `src/app/(site)/layout.tsx` — NIET opnieuw toevoegen op een pagina.
- Content NU statisch: zet data als arrays/consts bovenaan je component (later Payload).
- Alle teksten letterlijk NL uit het Figma-ontwerp. "Lorem ipsum" → korte NL-placeholder.

## Figma-bron
File key `WgIpbUteng1whyW94wFwu5`, cluster "Copywriting Check". Laad tools via ToolSearch:
`select:mcp__claude_ai_Figma__get_design_context,mcp__claude_ai_Figma__get_metadata,mcp__claude_ai_Figma__get_screenshot`
- `get_metadata` op je pagina-node = volledige boom + echte teksten.
- `get_design_context` op sub-nodes (`excludeScreenshot:true`) = exacte CSS + asset-URL's.
- Download assets: `curl -sL -o public/images/<pagina>-<naam>.<ext> "<url>"` (URL's leven 7 dagen).
  Gebruik een pagina-prefix in bestandsnamen om botsingen te vermijden (bv. `contact-map.jpg`).
- Referentie-screenshot van je pagina staat in `docs/design-references/<pagina>.png` (Read visueel).

## HERGEBRUIK deze gedeelde primitieven (niet zelf maken)
- `import { Section, SectionLabel } from "@/components/sections/section"`
  - `<Section tone="plain|light|navy" className="py-24" containerClassName="…">` — container is `max-w-[1320px] px-6`. Verticale padding zelf meegeven.
  - `tone="light"` = `bg-surface text-navy`; `tone="navy"` = navy→brand gradient + witte tekst.
  - `<SectionLabel tone="light|dark">Eyebrow</SectionLabel>` — spiraal-icoon + gekleurde eyebrow boven een kop.
- `import { Pill, ArrowCircle } from "@/components/ui/pill"`
  - `<Pill href="…" variant="light|primary|outlineDark|outlineLight" arrow>Tekst</Pill>`
  - `light` = witte pill + oranje tekst (op donker); `primary` = blauwe pill wit; `outlineDark` = witte rand op donker; `outlineLight` = navy rand op licht.
- `import { Button } from "@/components/ui/button"` + varianten uit `button-variants.ts` (pillLight/pillPrimary/pillOutlineDark/pillOutlineLight, size `pill`/`pill-icon`).
- `import { cn } from "@/lib/utils"`.
- Social-iconen: `src/components/icons.tsx`.

## Design tokens & utilities (staan al in globals.css)
- Kleuren als Tailwind-classes: `text-brand` `bg-brand` (#2772B6), `text-navy` `bg-navy` (#113250), `text-accent-orange` `bg-accent-orange` (#F08A01), `bg-surface` (#f3f3f2).
- Koppen: class **`heading-display`** (= Aviano Future Heavy, uppercase, weight 800). Gebruik dit op elke grote titel, samen met een Tailwind text-size (bv. `text-5xl heading-display`).
- Donkere secties: `bg-navy-gradient` (algemeen), `bg-navy-gradient-card` (kaarten 155°), `bg-navy-gradient-band` (banden 182°). Zachte glows: `/images/glow-1.svg` en `/images/glow-2.svg` absoluut gepositioneerd.
- Pills = `rounded-full` h-42px met rond arrow-icoon (ArrowCircle, oranje).
- Foto's: `next/image`, ronde hoeken (`rounded-2xl`/`rounded-3xl`), `object-cover`.

## Conventies
- Route: `src/app/(site)/<route>/page.tsx` (server component). Dynamische route: `[slug]/page.tsx`.
- Pagina-secties als aparte componenten in `src/components/sections/<pagina>/…tsx` (namespace per pagina om conflicten te vermijden). Kleine, herbruikbare stukken.
- Voeg per pagina `export const metadata` of `generateMetadata` toe (title + description in NL).
- Herhaal het home-patroon: alternerende licht/navy secties, SectionLabel + heading-display kop + lead, pills met arrow. Kijk naar bestaande home-secties in `src/components/sections/` (hero.tsx, process-steps.tsx, services-overview.tsx, machine-park.tsx, news-teasers.tsx) als voorbeeld van stijl/spacing.

## NIET DOEN (voorkomt merge-conflicten — meerdere builders draaien parallel)
- NIET bewerken: `layout.tsx`, `site-header.tsx`, `site-footer.tsx`, `section.tsx`,
  `pill.tsx`, `button.tsx`, `button-variants.ts`, `globals.css`, bestaande home-secties.
- Heb je een nieuwe knop/variant nodig? Gebruik inline Tailwind-classes i.p.v. de gedeelde
  bestanden te wijzigen. Noteer zulke gevallen in je eindrapport.
- Start GEEN dev-server (poort 3000 is bezet / andere builders). Visuele QA gebeurt centraal.
- NIET committen. Laat wijzigingen in de working tree.

## Verificatie (verplicht)
- `npx tsc --noEmit` moet slagen voor je afrondt (raak alleen je eigen nieuwe bestanden).
- Rapporteer: aangemaakte bestanden, gedownloade assets, tsc-resultaat, en afwijkingen/aannames.
