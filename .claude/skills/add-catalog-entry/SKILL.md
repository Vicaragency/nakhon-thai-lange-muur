---
name: add-catalog-entry
description: Add a new service, machine, material, project, news article, job or FAQ item to the Meirlaen content end-to-end, wiring it through the full data flow (source data → seed → Payload collection → content mapper → UI). Use whenever the user wants to add, create, or register a new service, machine, material, realisatie/project, news post, vacancy or FAQ. Provide the entry type and its details as arguments.
argument-hint: "service|machine|material|project|news|job|faq — <details>"
user-invocable: true
---

# Add a content entry

You are adding a new **$ARGUMENTS** to the Meirlaen site. This project has a deliberate
layered data flow — an entry is NOT just a row in a Payload collection. Get every layer
right or the item will be invisible, untyped, or wiped on the next reseed. All copy is
Dutch (NL-only; there is no i18n / no localized fields).

## The data flow (read this first)

```
src/lib/<domein>.ts            source of truth (typed arrays)      ┐
                               services.ts, machines.ts,           │ 1. source data
                               materials.ts, projects.ts,          │
                               nieuws.ts, jobs.ts                   ┘
        │  seed<Domein>()
        ▼
src/lib/seed/<domein>.ts       writes source data into Payload,    ← 2. seed wiring
                               orchestrated by src/seed.ts             (destructive!)
        │  payload.create
        ▼
src/collections/*.ts           Payload schema (fields, Dutch labels)  ← 3. collection schema
        │  Local API (payload.find)
        ▼
src/lib/content/*.ts           reads + maps Payload docs → UI types   ← 4. read/map layer
        │
        ▼
src/app/(site)/**              async server components consume it     ← 5. UI
```

Pages/components import **only** from `src/lib/content/*.ts` (and `content/faq.ts`), never
from the source-data files or from Payload directly. Each `content/*` mapper defines local
`RawX` types (loosely `unknown`-typed) and re-shapes the Payload doc into a UI type. If a
new field must reach the UI, thread it through all of: collection field → source-data type &
data → seed mapping → `content/*` `RawX` type + `mapX` → UI type.

## Collections (registered in `src/payload.config.ts`)

`services`, `machines`, `materials`, `projects`, `news-categories`, `news-posts`, `jobs`,
`faq-items`, `contact-requests`, plus `media` and `users`. `contact-requests` is written by
the contact form, not seeded — don't add entries there.

## Conventions to preserve

- **Slugs are hand-authored** in the source data (there is no `slugify()` helper). Keep them
  kebab-case, lowercase, and matching the URL/route. Slug fields are `unique` in the
  collections (e.g. `services.slug`, `news-posts.slug`).
- **No localization.** Fields are plain `text`/`textarea`; write Dutch values directly.
  Payload field `label:` values and admin `group:` are Dutch ("Content", "Nieuws", "Jobs").
- **Images are TEXT PATHS** into `public/images` (e.g. `/images/nieuws-artikel-mazak.jpg`) —
  there are NO upload relations. Reuse an existing asset or add a real file under
  `public/images`; never invent a path that isn't on disk.
- **FAQ is shared.** All FAQ lives in the single `faq-items` collection, tagged by a `group`
  select. Valid groups (see `FaqItems.ts` / `getFaq` in `src/lib/content/faq.ts`):
  `cnc-draaien`, `cnc-frezen`, `3d-printing`, `machinepark`, `materialen`, `realisaties`,
  `jobs`, `contact`, `algemeen`. Pages read their group via `getFaq(group)`.

## Steps by entry type

### service (dienstpagina onder /diensten)
1. Add/extend the entry in the `services` array in `src/lib/services.ts` (slug, title, intro,
   order, SEO meta, the home `overview*` fields, and the `features[]` blocks with
   image/imageAlt/imageSide/aspect and body OR intro+bullets+outro).
2. FAQ for the service lives on the same entry (its `faqs[]`) and is seeded into `faq-items`
   with `group === slug` by `seedServices`. Add Q&A there.
3. A brand-new service also needs a route: `src/app/(site)/diensten/<slug>/page.tsx`
   (copy an existing one; it awaits `getService(SLUG)` + `getFaq(SLUG)`).

### machine
1. Add a machine object to the `machines` array in `src/lib/machines.ts`
   (brand, model, brandLogo, image, fit, omschrijving, order). Logos/photos are paths.
2. No collection/mapper change unless you add a NEW field — then update `Machines.ts`,
   `mapMachine` in `src/lib/content/machines.ts`, and the `Machine` UI type.

### material / project (realisatie) / job (vacature)
1. Add to the matching source array in `src/lib/materials.ts` / `projects.ts` / `jobs.ts`,
   matching the existing object shape exactly (including `order`).
2. Only touch the collection (`Materials.ts` / `Projects.ts` / `Jobs.ts`) and its
   `content/*` mapper if you introduce a new field.

### news (nieuwsartikel)
1. Add a `NewsArticle` to `newsArticles` in `src/lib/nieuws.ts` (slug, title, category, date,
   readTime, image, imageAlt, excerpt, sections[]). `category` must be one of the
   `newsCategories` names; reuse an existing one, or add a new name to `newsCategories` AND a
   slug for it in the `categorySlug` map in `src/lib/seed/news.ts` (posts relate to
   `news-categories` by id, resolved at seed time).

### faq
1. If the group already has a dedicated source array, add the Q&A there:
   - service FAQs → the service's `faqs[]` in `src/lib/services.ts`.
   - `machinepark` → the `machineparkFaq` array in `src/lib/seed/machines.ts`.
   - `contact` → the `CONTACT_FAQ` array in `src/lib/seed/contact.ts`.
2. For a group without its own seed yet, add a new grouped `payload.create` block in the
   relevant `src/lib/seed/*.ts` (mirror the scoped-delete + recreate pattern), or extend
   `seedContactFaq`. Set `group` to a valid value and give each item an `order`.

## After editing

1. Run `/seed-refresh` (or hit the seed endpoint) so Payload reflects the new source data —
   the UI reads from Payload, not from the source arrays directly.
2. `npm run typecheck` to confirm types line up across the layers. If you changed a
   collection's fields, also `npm run generate:types`.
3. Verify the item renders on its page (`/diensten/<slug>`, `/machinepark`, `/materialen`,
   `/realisaties`, `/nieuws`, `/nieuws/<slug>`, `/jobs`, or the FAQ block on the relevant page).

⚠️ Confirm with the user before reseeding if the Payload DB holds hand-edited admin content —
`seed()` clears each collection first (see `/seed-refresh`).
