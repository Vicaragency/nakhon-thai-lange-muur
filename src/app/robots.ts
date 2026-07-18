import type { MetadataRoute } from "next";

// ⚠️ PRE-LAUNCH: volledige site staat op noindex / disallow.
// Bij het koppelen van het echte domein: zet dit terug naar toestaan
// (verwijder de disallow en de noindex in src/app/(site)/layout.tsx).
// Zie LAUNCH_CHECKLIST.md.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: "/",
      },
    ],
  };
}
