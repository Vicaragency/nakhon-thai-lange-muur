import type { Metadata } from "next";

import { PageBanner } from "@/components/sections/page-banner";
import { Deal } from "@/components/sections/deal";
import { MenuList } from "@/components/sections/menu-list";
import { Cta } from "@/components/sections/cta";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import { LANGE_MUUR, buildBrandMetadata } from "@/lib/brands";

export const metadata: Metadata = buildBrandMetadata(LANGE_MUUR, {
  title: "Menu",
  description: LANGE_MUUR.seo.menu,
  path: "/menu",
});

export default function LangeMuurMenu() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: LANGE_MUUR.basePath },
          { name: "Menu", path: `${LANGE_MUUR.basePath}/menu` },
        ])}
      />
      <PageBanner title="Ons menu" />
      <Deal brand={LANGE_MUUR} />
      <MenuList brand={LANGE_MUUR} />
      <Cta brand={LANGE_MUUR} />
    </>
  );
}
