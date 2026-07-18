import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { SITE } from "@/lib/site-config";
import type { Brand } from "@/lib/brands";
import { Button } from "@/components/ui/button";
import { ScallopBadge } from "@/components/brand/ornaments";

/** Schuine, fel-rode "โปร / 优惠 / DEAL" band boven de deal-kaart. */
function DealBand({ char }: { char: string }) {
  const cells = Array.from({ length: 18 });
  return (
    <div className="relative z-50 overflow-x-clip">
      <div className="-mx-[12%] -mt-10 w-[124%] -rotate-[1.5deg] bg-neon-red py-5 text-white shadow-sm">
        <div className="flex w-max animate-marquee items-center">
          {cells.map((_, i) => (
            <span key={i} className="flex items-center gap-10 pr-10">
              <span className="text-[30px] leading-none">{char}</span>
              <span className="heading-display text-[36px] leading-none">
                Deal
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Deal({
  brand,
  validUntil = "19 juli",
  title = "WK deal",
}: {
  brand: Brand;
  validUntil?: string;
  title?: string;
}) {
  return (
    <section className="bg-beige">
      <DealBand char={brand.scripts.deal} />
      <div className="mx-auto grid w-full max-w-[1120px] items-center gap-10 px-6 py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
        {/* Foto met sticker */}
        <div className="relative mx-auto w-full max-w-[440px] lg:mx-0">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[20px] shadow-sm">
            <Image
              src="/images/deal-dish.jpg"
              alt={`${brand.cuisineAdj} dim sum, vers bereid`}
              fill
              sizes="(max-width: 1024px) 90vw, 520px"
              className="object-cover"
            />
          </div>
          <ScallopBadge
            fill="#ed3fa6"
            className="absolute left-[-64px] top-[58%] w-[150px] -translate-y-1/2 sm:w-[160px]"
          >
            <span className="text-[30px] font-semibold leading-none text-white">
              {brand.scripts.deal}
            </span>
            <span className="mt-1 text-[13px] font-semibold tracking-wide text-white">
              ( DEAL )
            </span>
          </ScallopBadge>
        </div>

        {/* Tekst */}
        <div>
          <span className="inline-block rounded-full bg-beige-20 px-4 py-1.5 text-[14px] font-semibold text-brand">
            Geldig tot en met {validUntil}
          </span>
          <h2 className="heading-display mt-4 text-[30px] text-heading sm:text-[34px] lg:text-[38px]">
            Profiteer van onze <span className="text-neon-red">{title}</span>
          </h2>
          <p className="mt-4 max-w-[500px] text-[16px] leading-relaxed text-ink/80">
            Geen goesting om te koken tijdens het WK? Wij zorgen voor de smaken,
            jij voor de sfeer. Bestel nu en geniet van vers bereide{" "}
            {brand.cuisineAdj} gerechten. Geleverd voor de aftrap!
          </p>
          <p className="mt-3 text-[14px] text-ink/45">
            Bestellen na 21u extra korting 5€ per bestelling! Minimum 35€
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-5">
            <Button href={SITE.orderUrl} variant="primary">
              Bestellen
            </Button>
            <a
              href={`${brand.basePath}/menu`}
              className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-heading transition-colors hover:text-brand"
            >
              Ontdek het menu
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
