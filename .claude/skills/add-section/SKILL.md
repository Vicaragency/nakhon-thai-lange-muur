---
name: add-section
description: Build a new marketing section for the Meirlaen site following the established Section/SectionLabel primitives, tone system, and container conventions. Use whenever the user wants to add a new section, band, or block to the homepage or a marketing page. Provide the section purpose and target page as arguments.
argument-hint: "<what the section shows> [on <page>]"
user-invocable: true
---

# Add a marketing section

You are adding a new section: **$ARGUMENTS**. Match the existing section system exactly —
this site is a pixel-tuned emulation of a Figma design, so consistency of spacing, tone,
type, and container width matters. All copy is Dutch (NL-only, there is no i18n).

## Use the Section primitives

Import from `src/components/sections/section.tsx`. Do not hand-roll a `<section>`, its
container, or horizontal padding.

- **`<Section tone="plain|light|navy">`** — the wrapper. Renders a full-width `<section>`
  with a centred `max-w-[1320px] px-6` container (the Figma artboard content width).
  - `plain` = transparent background (inherits page), `light` = `bg-surface text-navy`,
    `navy` = `bg-navy-gradient text-white`.
  - **Vertical padding is NOT built in** — pass it per-section via `className` (e.g.
    `className="py-24"` / `"pb-24"`). Look at neighbours in the page composition to match.
  - `containerClassName` adds classes to the inner max-width container when needed.
  - Alternate tones down the page so adjacent sections don't blend — check the current
    order in the target page (e.g. `src/app/(site)/page.tsx`).
- **`<SectionLabel tone="light|dark">`** — the eyebrow: a small spiral icon
  (`/images/label-icon.svg`) + coloured label text. `light` renders `text-brand`;
  `dark` (for use on `navy` sections) inverts the icon and renders `text-white`. Place it
  directly above the section heading.

## Design tokens & utilities (copy these, do not invent values)

Defined in `src/app/globals.css`; colours live as CSS vars mapped to Tailwind classes.

- **Colours**: `--brand` `#2772b6` (`text-brand`/`bg-brand`), `--navy` `#113250`
  (`text-navy`), `--accent-orange` `#f08a01` (`bg-accent-orange`/`text-accent-orange`),
  `--surface` `#f3f3f2` (`bg-surface`). On navy sections use `text-white` and `text-white/70`.
- **`heading-display`** — the uppercase geometric display heading style (font-display,
  weight 800, uppercase, tight line-height). Use it on section `<h2>`s, sized with an
  explicit `text-[..px]` + `leading-[..]` per the design (e.g.
  `heading-display text-[32px] leading-[1.02] text-navy sm:text-[40px]`).
- **Navy gradients**: `bg-navy-gradient` (sections), `bg-navy-gradient-card` (cards),
  `bg-navy-gradient-band` (bands). `Section tone="navy"` already applies `bg-navy-gradient`.

## Established patterns (copy these)

Look at `ServicesOverview` (`src/components/sections/services-overview.tsx`),
`MachinePark` (`machine-park.tsx`), and `NewsTeasers` (`news-teasers.tsx`) as canonical
examples.

- **Two-column band**: `grid items-center gap-8 lg:grid-cols-2 lg:gap-14`, with an image
  column (`relative aspect-[..] w-full overflow-hidden rounded-[8px]` + `<Image fill>`) and
  a text column. Flip the image side with `lg:order-1` / `lg:order-2` driven by an
  `imageSide` field, exactly as `ServicesOverview` does.
- **CTAs / links**: use the `Pill` component from `src/components/ui/pill.tsx` — it is a
  styled `next/link`. Variants: `light`, `outlineLight`, `outlineDark`, `primary`. Pass
  `arrow` to prepend the orange `ArrowCircle`. Do NOT wrap `Pill` in another `<Link>`, and
  do not hand-build buttons.
- **Body copy**: `text-navy/70` on light/plain sections, `text-white/70` on navy; constrain
  width with `max-w-[..px]`.

## Rules

- **Server Component by default.** Only add `"use client"` if the section needs
  interactivity/state. Existing interactive sections (carousels, forms) already live under
  the per-domain subfolders in `src/components/sections/`.
- **Data comes from `src/lib/content/*.ts`** (async `getX()` helpers), never directly from
  the source-data files in `src/lib/*.ts` or from Payload. If the section shows CMS data,
  make the component `async` and `await` the matching `content/*` helper. FAQ blocks pull
  from `getFaq(group)` in `src/lib/content/faq.ts`.
- **Images are text paths** into `public/images` (there are no upload relations). Use a real
  asset path; don't invent one.
- Styling: Tailwind utilities only, no inline styles. Mobile-first, 2-space indent, `cn()`
  from `src/lib/utils.ts` for conditional classes. Named exports, PascalCase component.

## Steps

1. Create the component in `src/components/sections/<name>.tsx` (kebab-case file,
   PascalCase export), or in the relevant per-domain subfolder
   (`diensten/`, `machinepark/`, `materialen/`, `nieuws/`, `realisaties/`, `jobs/`,
   `contact/`, `over-ons/`) if it belongs to one page's flow. Reuse `Section`/`SectionLabel`
   and `Pill`.
2. Import and place it in the target page's composition (default: `src/app/(site)/page.tsx`;
   for a service page e.g. `src/app/(site)/diensten/<slug>/page.tsx`), choosing a `tone` that
   alternates with its neighbours.
3. `npm run typecheck` and view the page on the dev server (`npm run dev`). For pixel
   matching against the Figma reference, use the `screenshot-loop` skill.
