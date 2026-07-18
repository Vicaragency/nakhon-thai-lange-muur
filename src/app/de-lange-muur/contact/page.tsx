import type { Metadata } from "next";

import { PageBanner } from "@/components/sections/page-banner";
import { ContactInfo } from "@/components/sections/contact-info";
import {
  JsonLd,
  breadcrumbSchema,
  restaurantSchema,
} from "@/components/seo/json-ld";
import { LANGE_MUUR, buildBrandMetadata } from "@/lib/brands";

export const metadata: Metadata = buildBrandMetadata(LANGE_MUUR, {
  title: "Contact",
  description: LANGE_MUUR.seo.contact,
  path: "/contact",
});

export default function LangeMuurContact() {
  return (
    <>
      <JsonLd
        data={[
          restaurantSchema(LANGE_MUUR),
          breadcrumbSchema([
            { name: "Home", path: LANGE_MUUR.basePath },
            { name: "Contact", path: `${LANGE_MUUR.basePath}/contact` },
          ]),
        ]}
      />
      <PageBanner title="Contact" />
      <ContactInfo brand={LANGE_MUUR} />
    </>
  );
}
