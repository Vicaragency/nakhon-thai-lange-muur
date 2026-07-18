import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { NAKHON } from "@/lib/brands";

/**
 * Huis-layout voor de gedeelde juridische pagina's (privacy + algemene
 * voorwaarden). Ze gelden voor beide merken; we tonen de Nakhon Thai-chrome
 * als "huismerk".
 */
export default function LegalLayout({
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
