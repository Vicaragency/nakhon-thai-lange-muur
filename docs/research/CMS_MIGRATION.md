# CMS-migratie contract (Fase 4) — Meirlaen

Doel: de statische content in de pagina-componenten verhuizen naar **Payload-collections**,
zodat alles bewerkbaar is via `/admin`. Gelaagde datastroom zoals OFP:

```
src/lib/<domein>.ts        (bron-data, ECHTE NL-content, geen lorem)   ┐ bron van waarheid
        │  seedX(payload)   (src/lib/seed/<domein>.ts)                  │
        ▼                                                               │
Payload collection (src/collections/<Naam>.ts)                          │
        │  mapper (src/lib/content/<domein>.ts, leest via getPayloadClient)
        ▼                                                               ┘
pagina (server component) → geeft data als props aan de sectie-componenten
```

## Harde afspraken (voorkomt conflicten — meerdere agents parallel)
- **Raak deze centrale bestanden NIET aan** (ik integreer ze): `src/payload.config.ts`,
  `src/app/(payload)/seed/route.ts`, `src/lib/content.ts` (indien aanwezig), `globals.css`,
  `layout.tsx`, header/footer, `section.tsx`, `pill.tsx`, `button*`.
- Werk enkel in je eigen domein-bestanden + je eigen pagina's/sectie-componenten.
- **Beelden**: gebruik het bestaande pad als **tekstveld** (`image: text`, waarde bv.
  `/images/machinepark-cobot.png`). GEEN Payload-upload-relaties, GEEN her-upload van assets.
  De huidige assets in `public/images/` blijven staan; je zet enkel het pad in de bron-data.
- Alle content in het **Nederlands**, ECHT en volledig — **nergens "lorem ipsum" of lege
  placeholder-antwoorden**. Verzin plausibele, professionele NL-copy waar het ontwerp leeg was
  (metaalbewerking-context: CNC draaien/frezen, 3D printing, staal/aluminium/RVS/brons/messing/
  koper/kunststof, industriële toelevering, ~25 jaar ervaring, partners Mazak & Renishaw).
- Collections: `access: { read: () => true }`, NL-labels, `admin.group` per thema,
  `useAsTitle`, en een `order`/`slug` waar zinvol. Geen `localized` (NL-only).
- Elke collectie krijgt een seed-functie `export async function seed<Domein>(payload)` in
  `src/lib/seed/<domein>.ts` die eerst wist (`payload.delete({collection, where:{id:{exists:true}}})`)
  en dan uit de bron-data (her)aanmaakt. Idempotent.
- Pagina's worden **async server components** die via de mapper uit Payload lezen en de data
  als props doorgeven aan de bestaande sectie-componenten (pas de component-signatuur aan naar
  props i.p.v. hardgecodeerde arrays).
- Verifieer `npx tsc --noEmit` voor je eigen bestanden. Niet committen. Geen dev-server starten
  (er draait er al één op :3000, maar raak 'm niet aan).

## Mapper-patroon
```ts
import { getPayloadClient } from "@/lib/payload-client";
export async function getMachines() {
  const payload = await getPayloadClient();
  const res = await payload.find({ collection: "machines", limit: 100, sort: "order" });
  return res.docs.map(mapMachine); // map naar bestaand UI-type
}
```

## Rapporteer aan het einde
- Collection-slug(s) + het pad van je collection-bestand(en).
- De naam van je `seed<Domein>`-functie + bestand (zodat ik ze centraal kan registreren).
- Gewijzigde pagina's/componenten. tsc-resultaat.
