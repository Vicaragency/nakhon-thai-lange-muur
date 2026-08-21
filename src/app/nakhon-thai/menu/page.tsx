import type { Metadata } from "next";

import { PageBanner } from "@/components/sections/page-banner";
import { Deal } from "@/components/sections/deal";
import { MenuList } from "@/components/sections/menu-list";
import { Cta } from "@/components/sections/cta";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import { loadBrandMenu } from "@/lib/menu-source";
import { NAKHON, buildBrandMetadata } from "@/lib/brands";

export const metadata: Metadata = buildBrandMetadata(NAKHON, {
  title: "Menu",
  description: NAKHON.seo.menu,
  path: "/menu",
});

// De kaart komt live uit de webshop; elke 6 uur opnieuw ophalen.
// Next wil hier een letterlijke waarde: houd dit gelijk met REVALIDATE in
// src/lib/menu-source.ts (6 * 60 * 60).
export const revalidate = 21600;

export default async function NakhonMenu() {
  const categories = await loadBrandMenu("nakhon-thai");

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: NAKHON.basePath },
          { name: "Menu", path: `${NAKHON.basePath}/menu` },
        ])}
      />
      <PageBanner title="Ons menu" />
      <Deal brand={NAKHON} variant="seigaiha" />
      <MenuList categories={categories} />
      <Cta brand={NAKHON} />
    </>
  );
}
