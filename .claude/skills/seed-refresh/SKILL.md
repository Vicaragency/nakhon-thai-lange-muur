---
name: seed-refresh
description: Safely reseed the Payload (Neon) database from the Meirlaen source data and regenerate Payload types after collection or source-data changes. Use whenever the user wants to reseed, refresh the database, re-run the seed, sync source data into the CMS, or regenerate Payload types. Warns before destructive reseeds.
user-invocable: true
---

# Reseed & regenerate types

Use this after editing collections (`src/collections/*.ts`) or source data
(`src/lib/services.ts`, `machines.ts`, `materials.ts`, `projects.ts`, `nieuws.ts`,
`jobs.ts`, and the FAQ arrays in `src/lib/seed/*.ts`). The site reads from Payload via
`src/lib/content/*.ts`, so source-data edits are invisible in the UI until you reseed.

## ⚠️ The seed is destructive

`seed()` in `src/seed.ts` orchestrates one seed per domain:

```
seedServices → seedMachines → seedMaterials → seedProjects → seedNews → seedJobs → seedContactFaq
```

Each domain seed **deletes its whole collection before recreating it** from the source data,
and each one also **deletes its own FAQ group** in the shared `faq-items` collection before
recreating those items (group-scoped, so other domains' FAQ survive). Concretely:

- `seedServices` wipes `services` + every service's FAQ group (`group === slug`).
- `seedMachines` wipes `machines` + the `machinepark` FAQ group.
- `seedMaterials` / `seedProjects` / `seedJobs` wipe `materials` / `projects` / `jobs`.
- `seedNews` wipes `news-posts` then `news-categories` (posts first, they relate by id).
- `seedContactFaq` wipes the `contact` FAQ group.

**Any content edited by hand in the Payload admin for those collections is wiped.** Note
`contact-requests` is NOT touched by the seed (it holds real form submissions).

**Before reseeding, confirm with the user** that the DB holds no hand-authored admin content
worth keeping. If it does, promote that content into the source data first (the source
arrays in `src/lib/*` are the source of truth pre-CMS-handover).

## Regenerate types after a collection change

If you changed a collection's fields, regenerate the Payload types (and, only if admin
components changed, the import map):

```bash
npm run generate:types        # payload-types.ts
npm run generate:importmap    # admin import map (only if admin components changed)
```

Note: the `content/*.ts` mappers use locally-declared `RawX` types rather than the generated
ones, so a type regen won't propagate schema changes into the read layer automatically —
update the `RawX` types and `mapX` mappers by hand when a field's shape changes.

## Run the seed

The seed runs through a guarded endpoint (`src/app/(payload)/seed/route.ts`):

- **Disabled in production** (`NODE_ENV === "production"` → 403). The prod route is off.
- Requires the `PAYLOAD_SECRET` env var passed as the `secret` query param (401 otherwise).
- **Local dev connects to the same Neon `DATABASE_URI` as production** — reseeding locally
  overwrites the live data, so treat it as a production write, not a throwaway.

Steps:
1. Ensure the dev server is running (`npm run dev`).
2. Trigger the seed (read `PAYLOAD_SECRET` from `.env`; do not print or hardcode the secret):
   ```bash
   curl "http://localhost:3000/seed?secret=$PAYLOAD_SECRET"
   ```
3. A successful response is
   `{ "ok": true, "seeded": { services, machines, materials, projects, news, jobs, contactFaq } }`
   (each `true`). On failure the route returns `{ "ok": false, "error": ... }` with status 500.

## After seeding

- Verify the affected pages render the new data: `/`, `/diensten/<slug>`, `/machinepark`,
  `/materialen`, `/realisaties`, `/nieuws`, `/nieuws/<slug>`, `/jobs`, `/contact`.
- Order matters: `seedNews` creates `news-categories` before `news-posts` so the relationship
  resolves. If you add a new related collection, register its seed in the correct order in
  `src/seed.ts`.
