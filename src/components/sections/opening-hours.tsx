"use client";

import { useSyncExternalStore } from "react";

import { SITE } from "@/lib/site-config";

/**
 * Openingsurentabel met "vandaag"-markering en een open/gesloten-badge.
 *
 * Waarom een client component: de pagina's zijn statisch geprerenderd, dus een
 * `new Date()` op de server bevriest op het bouwmoment (dan staat er voor altijd
 * dezelfde dag gemarkeerd en altijd "Open"). We lezen de klok daarom via
 * useSyncExternalStore, en expliciet in de tijdzone van het restaurant
 * (Europe/Brussels) zodat een bezoeker uit een andere tijdzone hetzelfde ziet
 * als de zaak zelf.
 */

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/** "2:1085" = dinsdag, 18u05 in Brugge. Een string, zodat React 'm kan vergelijken. */
function brusselsSnapshot(): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Brussels",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const dayIndex = WEEKDAYS.indexOf(get("weekday"));
  // Intl geeft bij hour12:false middernacht als "24" terug.
  const minutes = (Number(get("hour")) % 24) * 60 + Number(get("minute"));
  return `${dayIndex}:${minutes}`;
}

/** Op de server (en tijdens hydratie) is er nog geen klok: geen markering. */
function serverSnapshot(): null {
  return null;
}

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 30_000);
  return () => clearInterval(id);
}

/** "18:00 - 23:00" -> [1080, 1380] in minuten na middernacht. */
function toRange(range: string): [number, number] {
  const [from, to] = range.split(" - ").map((time) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  });
  return [from, to];
}

export function OpeningHours() {
  const snapshot = useSyncExternalStore(
    subscribe,
    brusselsSnapshot,
    serverSnapshot,
  );

  const [dayIndex, minutes] = snapshot
    ? snapshot.split(":").map(Number)
    : [-1, -1];
  const today = dayIndex >= 0 ? SITE.openingHours[dayIndex] : null;
  const isOpen = today
    ? [today.lunch, today.dinner].some((range) => {
        const [from, to] = toRange(range);
        return minutes >= from && minutes < to;
      })
    : null;

  return (
    <div className="p-7 lg:p-9">
      <div className="flex min-h-8 items-center justify-between">
        <h2 className="heading-display text-[24px] text-heading">7 op 7 open</h2>
        {isOpen === null ? null : (
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[13px] font-semibold ${
              isOpen ? "bg-green-100 text-green-700" : "bg-beige-20 text-brand"
            }`}
          >
            <span
              className={`size-2 rounded-full ${
                isOpen ? "bg-green-600" : "bg-brand/60"
              }`}
            />
            {isOpen ? "Nu open" : "Nu gesloten"}
          </span>
        )}
      </div>
      <ul className="mt-5">
        {SITE.openingHours.map((row, i) => (
          <li
            key={row.day}
            className={`grid grid-cols-[1fr_auto_auto] items-center gap-4 rounded-lg px-3 py-2 text-[15px] ${
              i === dayIndex ? "bg-beige-20 font-semibold" : ""
            }`}
          >
            <span className="text-ink/90">{row.day}</span>
            <span className="tabular-nums text-ink/70">{row.lunch}</span>
            <span className="tabular-nums text-ink/70">{row.dinner}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
