"use client";

import Image from "next/image";
import { useRef, useState } from "react";

/**
 * Sleepbaar "rad" met drie bleeding borden. Het middelste bord staat groot en
 * hoog (prominent), de twee zijborden kleiner en lager. Sleep (met muis of
 * vinger) horizontaal om het wiel te draaien: de gerechten verschuiven dan van
 * plaats zodat telkens een ander bord in het midden komt. Op mobiel toont enkel
 * het centrale bord (verticaal scrollen blijft werken).
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

// Sleepafstand (px) per stap-rotatie.
const STEP = 90;

export function HeroDishes() {
  // rot=2 zet het schelpgerecht (bord 1) in het midden bij het laden.
  const [rot, setRot] = useState(2);
  const [dragging, setDragging] = useState(false);
  const anchorX = useRef(0);
  const active = useRef(false);

  const onDown = (e: React.PointerEvent) => {
    active.current = true;
    setDragging(true);
    anchorX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onMove = (e: React.PointerEvent) => {
    if (!active.current) return;
    const dx = e.clientX - anchorX.current;
    if (dx <= -STEP) {
      setRot((r) => r + 1); // naar links slepen → wiel draait vooruit
      anchorX.current = e.clientX;
    } else if (dx >= STEP) {
      setRot((r) => r - 1); // naar rechts slepen → wiel draait terug
      anchorX.current = e.clientX;
    }
  };

  const end = () => {
    active.current = false;
    setDragging(false);
  };

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-[-70px] h-[560px] sm:bottom-[-90px] sm:h-[620px]">
      <div
        className={`pointer-events-auto relative mx-auto h-full max-w-[1440px] touch-pan-y select-none ${
          dragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={end}
        onPointerCancel={end}
      >
        {DISHES.map((dish, i) => {
          const slotIndex = ((i + rot) % 3 + 3) % 3;
          const slot = SLOTS[slotIndex];
          const isSide = slotIndex !== 0;
          return (
            <div
              key={dish.src}
              className={`absolute bottom-0 left-1/2 aspect-square w-[78vw] max-w-[560px] transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
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
