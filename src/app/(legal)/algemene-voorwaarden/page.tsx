// GEGENEREERD CONCEPT: deze algemene voorwaarden zijn automatisch opgesteld op
// basis van gangbare praktijk voor een restaurant. Laat ze vóór publicatie
// juridisch nakijken en afstemmen op de effectieve werking. Geen juridisch advies.

import type { Metadata } from "next";

import { PageBanner } from "@/components/sections/page-banner";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import { buildMetadata, SITE } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Algemene voorwaarden",
  description:
    "Algemene voorwaarden van Nakhon Thai: reservaties, bestellingen en afhaling, prijzen, betaling, allergenen en aansprakelijkheid.",
  path: "/algemene-voorwaarden",
});

const laatstBijgewerkt = "10 juli 2026";

interface Block {
  titel: string;
  inhoud: React.ReactNode;
}

const blokken: Block[] = [
  {
    titel: "1. Toepassing",
    inhoud: (
      <p>
        Deze algemene voorwaarden zijn van toepassing op elke reservatie,
        bestelling en afhaling bij {SITE.name}, {SITE.address.street},{" "}
        {SITE.address.postalCode} {SITE.address.city}. Door te reserveren of te
        bestellen aanvaard je deze voorwaarden.
      </p>
    ),
  },
  {
    titel: "2. Reservaties",
    inhoud: (
      <p>
        Reservaties kunnen telefonisch of via de website worden gemaakt en zijn
        pas definitief na bevestiging door het restaurant. Gelieve ons tijdig te
        verwittigen bij annulatie of wijziging. Bij laattijdig niet-opdagen
        behouden wij ons het recht voor de tafel na 15 minuten vrij te geven.
      </p>
    ),
  },
  {
    titel: "3. Bestellingen en afhaling",
    inhoud: (
      <p>
        Bestellingen om af te halen of te laten leveren worden bevestigd met een
        vermoedelijke tijd. Gerechten worden vers bereid; drukte kan de
        wachttijd beïnvloeden. Eventuele minimumbedragen of leveringsvoorwaarden
        worden bij de bestelling meegedeeld.
      </p>
    ),
  },
  {
    titel: "4. Prijzen en betaling",
    inhoud: (
      <p>
        Alle prijzen zijn uitgedrukt in euro en inclusief btw. Prijzen kunnen
        worden aangepast; de op het moment van bestelling geldende prijzen zijn
        van toepassing. Betaling gebeurt ter plaatse of bij afhaling/levering via
        de aangeboden betaalmethodes.
      </p>
    ),
  },
  {
    titel: "5. Allergenen",
    inhoud: (
      <p>
        Onze gerechten kunnen allergenen bevatten. Heb je een allergie of
        intolerantie, meld dit dan steeds vóór je bestelling zodat wij je correct
        kunnen informeren. Wij kunnen sporen van allergenen in de keuken niet
        volledig uitsluiten.
      </p>
    ),
  },
  {
    titel: "6. Aansprakelijkheid",
    inhoud: (
      <p>
        {SITE.name} kan niet aansprakelijk worden gesteld voor schade die het
        gevolg is van onjuiste of onvolledige informatie die door de klant werd
        verstrekt, noch voor overmacht. Onze aansprakelijkheid is in elk geval
        beperkt tot het bedrag van de betrokken bestelling.
      </p>
    ),
  },
  {
    titel: "7. Klachten",
    inhoud: (
      <p>
        Klachten kunnen worden gemeld via{" "}
        <a href={`mailto:${SITE.email}`} className="underline">
          {SITE.email}
        </a>{" "}
        of op {SITE.phone}. Wij behandelen elke klacht zo snel mogelijk. Op deze
        voorwaarden is het Belgische recht van toepassing.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Algemene voorwaarden", path: "/algemene-voorwaarden" },
        ])}
      />
      <PageBanner title="Algemene voorwaarden" />
      <section className="bg-beige">
        <div className="mx-auto w-full max-w-[820px] px-6 pb-24 text-[15px] leading-[1.65] text-ink/85 [&_a]:text-brand [&_h2]:heading-display [&_h2]:text-[20px] [&_h2]:text-heading [&_p]:mb-3.5">
          {blokken.map((blok) => (
            <div key={blok.titel} className="mb-9">
              <h2 className="mb-3">{blok.titel}</h2>
              {blok.inhoud}
            </div>
          ))}
          <p className="mt-6 border-t border-border pt-6 text-[14px] text-ink/55">
            Laatst bijgewerkt: {laatstBijgewerkt}.
          </p>
        </div>
      </section>
    </>
  );
}
