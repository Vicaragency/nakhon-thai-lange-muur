import type { Metadata } from "next";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { NAKHON } from "@/lib/brands";

export const metadata: Metadata = {
  title: { template: "%s - Nakhon Thai", default: NAKHON.defaultTitle },
};

export default function NakhonLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader brand={NAKHON} />
      <main className="flex flex-1 flex-col">{children}</main>
      <SiteFooter brand={NAKHON} />
    </div>
  );
}
