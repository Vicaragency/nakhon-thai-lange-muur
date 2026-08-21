import type { Metadata } from "next";

import { Hero } from "@/components/sections/hero";
import { Deal } from "@/components/sections/deal";
import { CategoryMarquee } from "@/components/sections/category-marquee";
import { MenuHighlight } from "@/components/sections/menu-highlight";
import { Reviews } from "@/components/sections/reviews";
import { Cta } from "@/components/sections/cta";
import { JsonLd, restaurantSchema } from "@/components/seo/json-ld";
import { LANGE_MUUR, buildBrandMetadata } from "@/lib/brands";

export const metadata: Metadata = buildBrandMetadata(LANGE_MUUR, {
  description: LANGE_MUUR.description,
  path: "/",
});

// Elk uur revalideren zodat een actie met een einddatum vanzelf van de pagina
// verdwijnt (zie src/lib/deals.ts) in plaats van te blijven staan tot de
// volgende deploy.
export const revalidate = 3600;

export default function LangeMuurHome() {
  return (
    <>
      <JsonLd data={[restaurantSchema(LANGE_MUUR)]} />
      <Hero brand={LANGE_MUUR} />
      <Deal brand={LANGE_MUUR} />
      <CategoryMarquee brand={LANGE_MUUR} />
      <MenuHighlight brand={LANGE_MUUR} />
      <Reviews brand={LANGE_MUUR} />
      <Cta brand={LANGE_MUUR} />
    </>
  );
}
