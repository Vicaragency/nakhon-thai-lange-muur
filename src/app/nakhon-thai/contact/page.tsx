import type { Metadata } from "next";

import { PageBanner } from "@/components/sections/page-banner";
import { ContactInfo } from "@/components/sections/contact-info";
import {
  JsonLd,
  breadcrumbSchema,
  restaurantSchema,
} from "@/components/seo/json-ld";
import { NAKHON, buildBrandMetadata } from "@/lib/brands";

export const metadata: Metadata = buildBrandMetadata(NAKHON, {
  title: "Contact",
  description: NAKHON.seo.contact,
  path: "/contact",
});

export default function NakhonContact() {
  return (
    <>
      <JsonLd
        data={[
          restaurantSchema(NAKHON),
          breadcrumbSchema([
            { name: "Home", path: NAKHON.basePath },
            { name: "Contact", path: `${NAKHON.basePath}/contact` },
          ]),
        ]}
      />
      <PageBanner title="Contact" />
      <ContactInfo brand={NAKHON} />
    </>
  );
}
