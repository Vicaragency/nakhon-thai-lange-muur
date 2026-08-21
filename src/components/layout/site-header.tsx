"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { cn, externalLinkProps, isExternalHref } from "@/lib/utils";
import { navItems, type Brand } from "@/lib/brands";
import { Logo } from "./logo";

export function SiteHeader({ brand }: { brand: Brand }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const items = navItems(brand);

  // Body-scroll blokkeren wanneer de overlay open is + Esc-toets sluit.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[100]">
      <div className="mx-auto flex w-full max-w-[1320px] items-center justify-between px-6 py-5">
        <div className="pointer-events-auto">
          <Logo brand={brand} />
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Menu openen"
          className="pointer-events-auto flex size-10 items-center justify-center rounded-md bg-brand text-white shadow-sm transition-colors hover:bg-brand-60"
        >
          <Menu className="size-5" />
        </button>
      </div>

      {/* Fullscreen nav-overlay */}
      <div
        className={cn(
          "pointer-events-auto fixed inset-0 z-50 bg-seigaiha-dark transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!open}
        // `inert` haalt de dichte overlay uit de tab-orde en uit de
        // toegankelijkheidsboom: zonder dit blijven de nav-links focusbaar
        // terwijl ze onzichtbaar zijn (aria-hidden + focusbaar = WCAG-fout).
        inert={!open}
      >
        <div className="mx-auto flex h-full w-full max-w-[1320px] flex-col px-6 py-5">
          <div className="flex items-center justify-between">
            <Logo brand={brand} tone="bright" onClick={() => setOpen(false)} />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Menu sluiten"
              className="flex size-10 items-center justify-center rounded-md border border-white/30 text-white transition-colors hover:bg-white/10"
            >
              <X className="size-5" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col items-center justify-center gap-5 pb-16">
            {items.map((item) => {
              const isInternal = !isExternalHref(item.href);
              const active =
                isInternal &&
                (item.href === brand.basePath
                  ? pathname === brand.basePath
                  : pathname.startsWith(item.href));
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  {...externalLinkProps(item.href)}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "heading-display relative text-[44px] leading-none transition-colors sm:text-[56px]",
                    active ? "text-white" : "text-beige-20 hover:text-white",
                  )}
                >
                  {item.label}
                  {active ? (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1 left-1/2 h-[7px] w-[86%] -translate-x-1/2 -rotate-2 rounded-full bg-neon-red"
                    />
                  ) : null}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
