import type { Metadata } from "next";
import Link from "next/link";

import { SITE } from "@/lib/site-config";
import { NAKHON, LANGE_MUUR } from "@/lib/brands";
import { buttonVariants } from "@/components/ui/button";
import { OrnamentDivider } from "@/components/brand/ornaments";

export const metadata: Metadata = {
  title: "Pagina niet gevonden",
  robots: { index: false, follow: false },
};

/**
 * 404 buiten de merk-layouts: er is hier geen header/footer, dus de pagina
 * biedt zelf de weg terug naar beide merken en naar de telefoon.
 */
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-seigaiha px-6 py-24 text-center">
      <OrnamentDivider className="mb-5" />
      <p className="heading-display text-[64px] leading-none text-neon-red sm:text-[80px]">
        404
      </p>
      <h1 className="heading-display mt-3 text-[32px] text-heading sm:text-[42px]">
        Deze pagina bestaat niet
      </h1>
      <p className="mt-4 max-w-[460px] text-[16px] leading-relaxed text-ink/70">
        De link is verhuisd of verkeerd getypt. Kies hieronder een van onze twee
        keukens, of bel ons gewoon even op.
      </p>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
        <Link href={NAKHON.basePath} className={buttonVariants({ variant: "primary" })}>
          {NAKHON.name}
        </Link>
        <Link
          href={LANGE_MUUR.basePath}
          className={buttonVariants({ variant: "soft" })}
        >
          {LANGE_MUUR.name}
        </Link>
      </div>
      <a
        href={`tel:${SITE.phoneHref}`}
        className="mt-7 text-[15px] font-semibold text-brand hover:text-brand-60"
      >
        {SITE.phone}
      </a>
    </main>
  );
}
