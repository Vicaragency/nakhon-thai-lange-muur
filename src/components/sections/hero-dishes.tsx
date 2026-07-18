"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * "Rad" met drie bleeding borden. Het middelste bord staat groot en hoog
 * (prominent), de twee zijborden kleiner en lager. Klik op het wiel om het één
 * plaats te draaien: de gerechten verschuiven vloeiend zodat telkens een ander
 * bord in het midden komt. Op mobiel toont enkel het centrale bord.
 */
const DISHES = [
  { src: "/images/cta-dumplings.png", alt: "Dim sum in een kom" },
  { src: "/images/hero-scallops.png", alt: "Gestoomde sint-jakobsschelpen met orchidee" },
  { src: "/images/cta-soup.png", alt: "Pittige soep met verse kruiden" },
];

// Slot 0 = midden (groot + hoog + vooraan), 1 = rechts, 2 = links (kleiner + lager).
const SLOTS = [
  { transform: "translate(-50%, 0) scale(1)", z: 30 },
  { transform: "translate(calc(-50% + 30vw), 70px) scale(0.7)", z: 15 },
  { transform: "translate(calc(-50% - 30vw), 70px) scale(0.7)", z: 15 },
];

export function HeroDishes() {
  // rot=2 zet het schelpgerecht (bord 1) in het midden bij het laden.
  const [rot, setRot] = useState(2);

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
        {DISHES.map((dish, i) => {
          const slotIndex = ((i + rot) % 3 + 3) % 3;
          const slot = SLOTS[slotIndex];
          const isSide = slotIndex !== 0;
          return (
            <div
              key={dish.src}
              className={`absolute bottom-0 left-1/2 aspect-square w-[78vw] max-w-[560px] transition-transform duration-[1400ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${
                isSide ? "hidden sm:block" : ""
              }`}
              style={{
                transform: slot.transform,
                transformOrigin: "bottom center",
                zIndex: slot.z,
              }}
            >
              <Image
                src={dish.src}
                alt={dish.alt}
                fill
                priority={i === 1}
                sizes="560px"
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
