import type { MetadataRoute } from "next";

import { SITE } from "@/lib/site-config";

/**
 * Sitemap met alle statische routes.
 *
 * PRE-LAUNCH: de volledige site staat op noindex / disallow (zie
 * src/app/robots.ts + src/app/(site)/layout.tsx). Deze sitemap is al opgesteld
 * zodat ze bij domeinkoppeling meteen ingediend kan worden. Zie LAUNCH_CHECKLIST.md.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");
  const now = new Date();

  const routes: {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }[] = [
    { path: "/", changeFrequency: "monthly", priority: 1 },
    // Nakhon Thai (Thaise keuken)
    { path: "/nakhon-thai", changeFrequency: "weekly", priority: 0.9 },
    { path: "/nakhon-thai/menu", changeFrequency: "weekly", priority: 0.8 },
    { path: "/nakhon-thai/contact", changeFrequency: "monthly", priority: 0.7 },
    // De Lange Muur (Chinese keuken)
    { path: "/de-lange-muur", changeFrequency: "weekly", priority: 0.9 },
    { path: "/de-lange-muur/menu", changeFrequency: "weekly", priority: 0.8 },
    { path: "/de-lange-muur/contact", changeFrequency: "monthly", priority: 0.7 },
    // Gedeelde juridische pagina's
    { path: "/privacy", changeFrequency: "yearly", priority: 0.2 },
    { path: "/algemene-voorwaarden", changeFrequency: "yearly", priority: 0.2 },
  ];

  return routes.map((route) => ({
    url: `${base}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
