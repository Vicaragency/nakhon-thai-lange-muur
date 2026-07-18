import Image from "next/image";

import type { Brand } from "@/lib/brands";
import { Button } from "@/components/ui/button";
import { OrnamentDivider, ScallopBadge } from "@/components/brand/ornaments";

const SPECIALTIES = [
  {
    src: "/images/dish-duck.jpg",
    alt: "Krokante Thaise eend op bord",
    rotate: "lg:-rotate-2",
  },
  {
    src: "/images/dish-dumplings.jpg",
    alt: "Gestoomde dim sum met orchidee",
    rotate: "",
  },
  {
    src: "/images/dish-stirfry.jpg",
    alt: "Thaise roerbak met verse groenten",
    rotate: "lg:rotate-2",
  },
];

export function MenuHighlight({ brand }: { brand: Brand }) {
  return (
    <section className="relative overflow-hidden bg-brand text-white">
      {/* Maze-lijnpatroon (Figma "07") in de onderste helft, subtiel donkerrood. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 top-[40%] rotate-180 bg-[length:100%_100%] bg-no-repeat"
        style={{ backgroundImage: "url('/patterns/menu-maze.svg')" }}
      />
      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 py-20 lg:py-24">
        <div className="flex flex-col items-center text-center">
          <OrnamentDivider className="mb-4 text-beige-40" />
          <h2 className="heading-display text-[34px] text-white sm:text-[42px]">
            Onze huisspecialiteiten
          </h2>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-[76px]">
          {SPECIALTIES.map((dish, i) => (
            <div key={i} className={`relative ${dish.rotate}`}>
              <div className="relative aspect-[364/291] w-full overflow-hidden rounded-[18px] border-[10px] border-beige-20 shadow-lg lg:border-[13px]">
                <Image
                  src={dish.src}
                  alt={dish.alt}
                  fill
                  sizes="(max-width: 1024px) 90vw, 420px"
                  className="object-cover"
                />
              </div>
              {i === 2 ? (
                <ScallopBadge
                  fill="#ffb648"
                  className="absolute -bottom-7 -left-4 w-24"
                >
                  <span className="text-[18px] font-semibold text-brand-dark">
                    {brand.scripts.tasty}
                  </span>
                  <span className="mt-0.5 text-[10px] font-semibold tracking-wide text-brand-dark">
                    ( TASTY )
                  </span>
                </ScallopBadge>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Button href={`${brand.basePath}/menu`} variant="soft">
            Ontdek het volledige menu
          </Button>
        </div>
      </div>
    </section>
  );
}
