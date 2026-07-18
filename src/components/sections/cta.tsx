import Image from "next/image";

import { SITE } from "@/lib/site-config";
import type { Brand } from "@/lib/brands";
import { Button } from "@/components/ui/button";
import { OrnamentDivider, ScallopBadge } from "@/components/brand/ornaments";

/** "Reserveer een tafel of bestel online" - blok met twee bleeding bowls. */
export function Cta({ brand }: { brand: Brand }) {
  return (
    <section className="relative isolate overflow-hidden bg-seigaiha-beige">
      {/* Bleeding bowls links en rechts */}
      <div className="pointer-events-none absolute -left-[150px] top-1/2 hidden size-[460px] -translate-y-1/2 sm:block lg:-left-[175px] lg:size-[600px]">
        <Image
          src="/images/cta-soup.png"
          alt=""
          fill
          sizes="600px"
          className="object-contain"
        />
      </div>
      <div className="pointer-events-none absolute -right-[150px] top-1/2 hidden size-[460px] -translate-y-1/2 sm:block lg:-right-[175px] lg:size-[600px]">
        <Image
          src="/images/cta-dumplings.png"
          alt=""
          fill
          sizes="600px"
          className="object-contain"
        />
      </div>

      {/* "Homemade" sticker rechtsboven, straddelt de bovenrand. */}
      <ScallopBadge
        fill="#90e6e1"
        className="absolute right-[8%] top-8 z-20 hidden w-[120px] -rotate-[8deg] sm:block lg:right-[12%] lg:top-10 lg:w-[135px]"
      >
        <span className="text-[22px] font-semibold leading-none text-heading">
          {brand.scripts.homemade}
        </span>
        <span className="mt-0.5 text-[10px] font-semibold tracking-wide text-heading">
          ( HOMEMADE )
        </span>
      </ScallopBadge>

      <div className="mx-auto flex w-full max-w-[620px] flex-col items-center px-6 py-24 text-center lg:py-32">
        <OrnamentDivider className="mb-4" />
        <span className="inline-block rounded-full bg-white px-5 py-2 text-[15px] font-semibold text-brand shadow-sm">
          Ontdek de smaken van {brand.region}
        </span>
        <h2 className="heading-display mt-5 text-[42px] text-heading sm:text-[58px]">
          Reserveer een tafel of bestel online
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href={SITE.reserveUrl} variant="primary">
            Reserveren
          </Button>
          <Button href={SITE.orderUrl} variant="white">
            Bestellen
          </Button>
        </div>
      </div>
    </section>
  );
}
