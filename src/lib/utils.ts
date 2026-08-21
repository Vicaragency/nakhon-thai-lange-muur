import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** True voor een absolute http(s)-URL (dus: een link naar buiten de site). */
export function isExternalHref(href: string) {
  return /^https?:\/\//.test(href);
}

/**
 * Props om een externe link in een nieuw tabblad te openen. Interne links
 * krijgen niets mee, zodat client-side navigatie blijft werken.
 */
export function externalLinkProps(href: string) {
  return isExternalHref(href)
    ? ({ target: "_blank", rel: "noopener noreferrer" } as const)
    : {};
}
