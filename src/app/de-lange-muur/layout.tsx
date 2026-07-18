import type { Metadata } from "next";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { LANGE_MUUR } from "@/lib/brands";

export const metadata: Metadata = {
  title: { template: "%s - De Lange Muur", default: LANGE_MUUR.defaultTitle },
};

export default function LangeMuurLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader brand={LANGE_MUUR} />
      <main className="flex flex-1 flex-col">{children}</main>
      <SiteFooter brand={LANGE_MUUR} />
    </div>
  );
}
