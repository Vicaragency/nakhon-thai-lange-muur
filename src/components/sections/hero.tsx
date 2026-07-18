import Image from "next/image";

import { SITE } from "@/lib/site-config";
import type { Brand } from "@/lib/brands";
import { Button } from "@/components/ui/button";

export function Hero({ brand }: { brand: Brand }) {
  return (
    <section className="relative isolate min-h-[760px] overflow-hidden bg-seigaiha lg:min-h-[900px]">
      {/* Verticale hang-ornamenten uit Figma (desktop) */}
      <img
        src="/images/hero-ornament.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-[17%] top-[150px] hidden h-[230px] xl:block"
      />
      <img
        src="/images/hero-ornament.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-[17%] top-[150px] hidden h-[230px] xl:block"
      />

      {/* Tekstblok */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1320px] flex-col items-center px-6 pt-28 text-center lg:pt-32">
        <span className="inline-block rounded-full bg-beige-20 px-5 py-2 text-[15px] font-semibold text-brand">
          {brand.eyebrow}
        </span>

        <h1 className="heading-display mt-6 max-w-[900px] text-[40px] text-heading sm:text-[50px] lg:text-[60px]">
          {brand.heroTitle[0]}
          <br />
          {brand.heroTitle[1]}
        </h1>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button href={SITE.reserveUrl} variant="primary">
            Reserveren
          </Button>
          <Button href={SITE.orderUrl} variant="soft">
            Bestellen
          </Button>
        </div>
      </div>

      {/* Food-laag — geometrie 1:1 uit Figma (Hero-instance 231:25459).
          Borden bloeden groot vanaf de onderrand; alleen de bovenkant is
          zichtbaar. Hover tilt een bord omhoog zodat het volledig in beeld komt. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[-57px] h-[689px]">
        {/* Volledige schermbreedte (geen max-w) → zijborden bloeden tot de schermrand. */}
        <div className="relative h-full w-full overflow-hidden">
          {/* linkerschotel (dim sum) — bloedt vanuit de linkerhoek */}
          <div className="pointer-events-auto absolute bottom-[-188px] left-[-6.32%] right-[73.61%] hidden aspect-[471/487] transition-transform duration-300 ease-out will-change-transform hover:z-30 hover:-translate-y-12 sm:block">
            <Image
              src="/images/cta-dumplings.png"
              alt="Thaise dim sum in een kom"
              fill
              sizes="480px"
              className="object-contain object-top"
            />
          </div>
          {/* centraal schelpgerecht — begrensd op max-w-1440 en gecentreerd,
              zodat het op brede schermen niet mee-groeit over de knoppen/titel. */}
          <div className="absolute inset-0 mx-auto max-w-[1440px]">
            <div className="pointer-events-auto absolute bottom-[-260px] left-[28.47%] right-[26.74%] aspect-[645/656] transition-transform duration-300 ease-out will-change-transform hover:z-30 hover:-translate-y-12">
              <Image
                src="/images/hero-scallops.png"
                alt="Gestoomde sint-jakobsschelpen met orchidee"
                fill
                priority
                sizes="660px"
                className="object-contain object-top"
              />
            </div>
          </div>
          {/* rechterschotel (soep) — bloedt vanuit de rechterhoek */}
          <div className="pointer-events-auto absolute bottom-[-331px] left-[71.6%] right-[-20.42%] hidden aspect-[703/686] transition-transform duration-300 ease-out will-change-transform hover:z-30 hover:-translate-y-12 sm:block">
            <Image
              src="/images/cta-soup.png"
              alt="Pittige Thaise soep"
              fill
              sizes="700px"
              className="object-contain object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
