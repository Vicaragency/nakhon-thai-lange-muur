"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * "Rad" met bleeding borden in een waaier: het middelste bord staat groot en
 * hoog (prominent), de borden ernaast steeds kleiner en lager. Klik op het wiel
 * om het één plaats te draaien: de gerechten verschuiven vloeiend zodat telkens
 * een ander bord in het midden komt. Ondersteunt een variabel aantal borden
 * (bv. 3 of 5). Op mobiel toont enkel het centrale bord.
 */
type Dish = { src: string; alt: string };

// Slotstijlen per (signed) positie t.o.v. het midden. Middenbord groot en hoog,
// zijborden kleiner en lager. Slechts 3 zichtbaar; de rest wacht off-screen
// (opacity 0) en schuift van opzij tevoorschijn bij het draaien. De bronfoto's
// zijn genormaliseerd zodat elk gerecht in eenzelfde slot even groot oogt.
const SLOT: Record<string, { transform: string; z: number; opacity: number }> = {
  "0": { transform: "translate(-50%, 0) scale(1)", z: 50, opacity: 1 },
  "1": { transform: "translate(calc(-50% + 30vw), 70px) scale(0.7)", z: 40, opacity: 1 },
  "-1": { transform: "translate(calc(-50% - 30vw), 70px) scale(0.7)", z: 40, opacity: 1 },
  // Off-screen wachtposities (net buiten beeld, doorzichtig).
  offRight: { transform: "translate(calc(-50% + 96vw), 110px) scale(0.55)", z: 0, opacity: 0 },
  offLeft: { transform: "translate(calc(-50% - 96vw), 110px) scale(0.55)", z: 0, opacity: 0 },
};

export function HeroDishes({ dishes }: { dishes: Dish[] }) {
  const [rot, setRot] = useState(0);
  const n = dishes.length;

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-[-70px] h-[560px] sm:bottom-[-90px] sm:h-[620px]">
      <div
        className="pointer-events-auto relative mx-auto h-full max-w-[1440px] cursor-pointer select-none"
        role="button"
        tabIndex={0}
        aria-label="Draai het bordenwiel"
        onClick={() => setRot((r) => r + 1)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setRot((r) => r + 1);
          }
        }}
      >
        {dishes.map((dish, i) => {
          const pos = ((i + rot) % n + n) % n; // 0 .. n-1
          const signed = pos <= n / 2 ? pos : pos - n; // dichtstbijzijnde kant
          // Alleen midden + links + rechts zichtbaar; de rest off-screen op de
          // kant waar ze straks vandaan schuiven.
          const key =
            Math.abs(signed) <= 1
              ? String(signed)
              : signed > 0
                ? "offRight"
                : "offLeft";
          const slot = SLOT[key];
          const isCenter = signed === 0;
          return (
            <div
              key={dish.src}
              className={`absolute bottom-0 left-1/2 aspect-square w-[74vw] max-w-[540px] transition-[transform,opacity] duration-[1400ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${
                isCenter ? "" : "hidden sm:block"
              }`}
              style={{
                transform: slot.transform,
                transformOrigin: "bottom center",
                zIndex: slot.z,
                opacity: slot.opacity,
              }}
            >
              <Image
                src={dish.src}
                alt={dish.alt}
                fill
                // Alleen het bord in het midden is LCP-kandidaat; de andere
                // borden staan buiten beeld en hoeven niet voorgeladen.
                priority={isCenter}
                sizes="520px"
                draggable={false}
                className="pointer-events-none object-contain object-bottom drop-shadow-xl"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
