import type { Metadata } from "next";

import { Hero } from "@/components/sections/hero";
import { Deal } from "@/components/sections/deal";
import { CategoryMarquee } from "@/components/sections/category-marquee";
import { MenuHighlight } from "@/components/sections/menu-highlight";
import { Reviews } from "@/components/sections/reviews";
import { Cta } from "@/components/sections/cta";
import { JsonLd, restaurantSchema } from "@/components/seo/json-ld";
import { NAKHON, buildBrandMetadata } from "@/lib/brands";

export const metadata: Metadata = buildBrandMetadata(NAKHON, {
  description: NAKHON.description,
  path: "/",
});

export default function NakhonHome() {
  return (
    <>
      <JsonLd data={[restaurantSchema(NAKHON)]} />
      <Hero brand={NAKHON} />
      <Deal brand={NAKHON} />
      <CategoryMarquee brand={NAKHON} />
      <MenuHighlight brand={NAKHON} />
      <Reviews brand={NAKHON} />
      <Cta brand={NAKHON} />
    </>
  );
}
