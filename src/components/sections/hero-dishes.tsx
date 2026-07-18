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

// Slotstijlen per (signed) positie t.o.v. het midden. 0 = midden (waaier).
const SLOT: Record<string, { transform: string; z: number; opacity: number }> = {
  "0": { transform: "translate(-50%, 0) scale(1)", z: 50, opacity: 1 },
  "1": { transform: "translate(calc(-50% + 20vw), 34px) scale(0.82)", z: 40, opacity: 1 },
  "-1": { transform: "translate(calc(-50% - 20vw), 34px) scale(0.82)", z: 40, opacity: 1 },
  "2": { transform: "translate(calc(-50% + 38vw), 84px) scale(0.62)", z: 30, opacity: 1 },
  "-2": { transform: "translate(calc(-50% - 38vw), 84px) scale(0.62)", z: 30, opacity: 1 },
  hidden: { transform: "translate(-50%, 200px) scale(0.4)", z: 0, opacity: 0 },
};

export function HeroDishes({ dishes }: { dishes: Dish[] }) {
  const [rot, setRot] = useState(0);
  const n = dishes.length;

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-[-35px] h-[540px] sm:bottom-[-45px] sm:h-[580px]">
      <div
        className="pointer-events-auto relative mx-auto h-full max-w-[1600px] cursor-pointer select-none"
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
          const slot = SLOT[String(signed)] ?? SLOT.hidden;
          const isCenter = signed === 0;
          return (
            <div
              key={dish.src}
              className={`absolute bottom-0 left-1/2 aspect-square w-[70vw] max-w-[480px] transition-[transform,opacity] duration-[1400ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${
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
                priority
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
