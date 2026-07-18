import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SITE } from "@/lib/site-config";
import { NAKHON, LANGE_MUUR, type Brand } from "@/lib/brands";
import { OrnamentDivider } from "@/components/brand/ornaments";

export const metadata: Metadata = {
  title: "Nakhon Thai & De Lange Muur - Brugge",
  description:
    "Twee keukens onder één dak in het hart van Brugge. Kies Nakhon Thai voor Thaise keuken of De Lange Muur voor Chinese keuken.",
  alternates: { canonical: "/" },
};

function Door({
  brand,
  image,
  cuisine,
  script,
}: {
  brand: Brand;
  image: string;
  cuisine: string;
  script: string;
}) {
  return (
    <Link
      href={brand.basePath}
      className="group relative flex min-h-[56vh] flex-col items-center justify-center overflow-hidden px-6 py-20 text-center lg:min-h-screen"
      aria-label={`${brand.name} - ${cuisine}`}
    >
      {/* Achtergrondfoto (decoratief; rechtstreeks geserveerd voor snelle laadtijd) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt=""
        aria-hidden
        className="absolute inset-0 size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
      />
      {/* Rode gradient-overlay (food schemert door; lichter bij hover) */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/75 via-brand/65 to-brand-dark/85 transition-opacity duration-500 group-hover:from-brand-dark/60 group-hover:via-brand/45 group-hover:to-brand-dark/70" />

      {/* Inhoud */}
      <div className="relative z-10 flex flex-col items-center text-white">
        <span className="heading-display text-[26px] leading-none text-beige-40">
          {script}
        </span>
        <span className="mt-5 inline-block rounded-full bg-white/15 px-5 py-2 text-[14px] font-semibold backdrop-blur-sm">
          {cuisine}
        </span>
        <h2 className="heading-display mt-5 text-[46px] leading-[0.95] sm:text-[62px] lg:text-[68px]">
          {brand.name}
        </h2>
        <span className="mt-8 inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-[15px] font-semibold text-brand shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5">
          Bekijk de website
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export default function SplashPage() {
  return (
    <main className="relative min-h-screen bg-brand-dark">
      {/* Twee deuren */}
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <Door
          brand={NAKHON}
          image="/images/dish-dumplings.jpg"
          cuisine="Thaise keuken"
          script={NAKHON.scripts.tasty}
        />
        <Door
          brand={LANGE_MUUR}
          image="/images/dish-duck.jpg"
          cuisine="Chinese keuken"
          script={LANGE_MUUR.scripts.tasty}
        />
      </div>

      {/* Centrale merk-badge + adreslijn, over beide deuren */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex flex-col items-center px-6 pt-8 text-center text-white">
        <OrnamentDivider className="text-beige-40/80" />
        <p className="mt-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-white/85">
          Twee keukens onder één dak
        </p>
        <p className="mt-1 text-[13px] text-white/65">
          {SITE.address.street}, {SITE.address.postalCode} {SITE.address.city}
        </p>
      </div>
    </main>
  );
}
