import type { Metadata } from "next";

import { PageBanner } from "@/components/sections/page-banner";
import { Deal } from "@/components/sections/deal";
import { MenuList } from "@/components/sections/menu-list";
import { Cta } from "@/components/sections/cta";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import { NAKHON, buildBrandMetadata } from "@/lib/brands";

export const metadata: Metadata = buildBrandMetadata(NAKHON, {
  title: "Menu",
  description: NAKHON.seo.menu,
  path: "/menu",
});

export default function NakhonMenu() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: NAKHON.basePath },
          { name: "Menu", path: `${NAKHON.basePath}/menu` },
        ])}
      />
      <PageBanner title="Ons menu" />
      <Deal brand={NAKHON} />
      <MenuList brand={NAKHON} />
      <Cta brand={NAKHON} />
    </>
  );
}
