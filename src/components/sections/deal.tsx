import Image from "next/image";
import { ArrowRight } from "lucide-react";

import type { Brand } from "@/lib/brands";
import { activeDeal } from "@/lib/deals";
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
  variant = "beige",
}: {
  brand: Brand;
  /** Achtergrond: "beige" (home) of "seigaiha" (wit patroon, zoals de menupagina). */
  variant?: "beige" | "seigaiha";
}) {
  // Geen actie of een verlopen actie: sectie helemaal niet renderen. Zie
  // src/lib/deals.ts. De pagina's revalideren, dus een actie die vandaag
  // eindigt verdwijnt vanzelf.
  const deal = activeDeal(brand.key);
  if (!deal) return null;

  return (
    <section className={variant === "seigaiha" ? "bg-seigaiha" : "bg-beige"}>
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
            Geldig tot en met {deal.validUntilLabel}
          </span>
          <h2 className="heading-display mt-4 text-[30px] text-heading sm:text-[34px] lg:text-[38px]">
            Profiteer van onze <span className="text-neon-red">{deal.title}</span>
          </h2>
          <p className="mt-4 max-w-[500px] text-[16px] leading-relaxed text-ink/80">
            {deal.body.replace("{keuken}", brand.cuisineAdj)}
          </p>
          {deal.fineprint ? (
            <p className="mt-3 text-[14px] text-ink/45">{deal.fineprint}</p>
          ) : null}
          <div className="mt-6 flex flex-wrap items-center gap-5">
            <Button href={brand.orderUrl} variant="primary">
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
