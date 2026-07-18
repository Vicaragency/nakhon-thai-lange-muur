// GEGENEREERD CONCEPT: dit privacybeleid is automatisch opgesteld op basis van
// algemene GDPR/AVG-praktijk. Laat het vóór publicatie juridisch nakijken en vul
// de exacte verwerkers en bewaartermijnen aan. Geen definitief juridisch advies.

import type { Metadata } from "next";

import { PageBanner } from "@/components/sections/page-banner";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import { buildMetadata, SITE } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Privacybeleid",
  description:
    "Privacybeleid van Nakhon Thai: welke persoonsgegevens we verwerken bij reservaties en bestellingen, waarom, hoe lang we ze bewaren en welke rechten je hebt onder de GDPR/AVG.",
  path: "/privacy",
});

const laatstBijgewerkt = "10 juli 2026";

interface Block {
  titel: string;
  inhoud: React.ReactNode;
}

const blokken: Block[] = [
  {
    titel: "1. Wie zijn wij?",
    inhoud: (
      <>
        <p>
          {SITE.name} is een Thais restaurant gevestigd te {SITE.address.street},{" "}
          {SITE.address.postalCode} {SITE.address.city}. Wij zijn de
          verwerkingsverantwoordelijke voor de persoonsgegevens die via deze
          website en in het kader van reservaties en bestellingen worden
          verwerkt.
        </p>
        <p>
          Voor vragen over dit beleid of over de verwerking van je gegevens
          bereik je ons via{" "}
          <a href={`mailto:${SITE.email}`} className="underline">
            {SITE.email}
          </a>{" "}
          of op {SITE.phone}.
        </p>
      </>
    ),
  },
  {
    titel: "2. Welke gegevens verwerken wij?",
    inhoud: (
      <>
        <p>
          Wij verwerken enkel de gegevens die noodzakelijk zijn voor onze
          dienstverlening:
        </p>
        <ul>
          <li>
            <strong>Reservaties &amp; bestellingen:</strong> naam, telefoonnummer,
            e-mailadres, aantal personen, datum/tijd en eventuele opmerkingen of
            leveringsadres.
          </li>
          <li>
            <strong>Contact:</strong> de gegevens en de inhoud van een bericht
            dat je ons bezorgt.
          </li>
          <li>
            <strong>Technische gegevens:</strong> beperkte gebruiksgegevens die
            je browser automatisch verzendt (zoals IP-adres en bezochte
            pagina&apos;s), voor zover van toepassing (zie punt 6).
          </li>
        </ul>
      </>
    ),
  },
  {
    titel: "3. Waarvoor gebruiken wij je gegevens?",
    inhoud: (
      <ul>
        <li>het verwerken en opvolgen van je reservatie of bestelling;</li>
        <li>het beantwoorden van je vraag of bericht;</li>
        <li>facturatie, boekhouding en het naleven van wettelijke verplichtingen;</li>
        <li>het beveiligen en verbeteren van onze website en dienstverlening.</li>
      </ul>
    ),
  },
  {
    titel: "4. Op welke rechtsgrond baseren wij ons?",
    inhoud: (
      <ul>
        <li>
          <strong>Uitvoering van een overeenkomst</strong> voor reservaties en
          bestellingen;
        </li>
        <li>
          <strong>Gerechtvaardigd belang</strong> voor het beantwoorden van
          vragen en het beveiligen van de website;
        </li>
        <li>
          <strong>Wettelijke verplichting</strong> voor boekhoud- en fiscale
          verplichtingen;
        </li>
        <li>
          <strong>Toestemming</strong> waar vereist, bijvoorbeeld voor
          niet-noodzakelijke cookies.
        </li>
      </ul>
    ),
  },
  {
    titel: "5. Hoe lang bewaren wij je gegevens?",
    inhoud: (
      <p>
        Wij bewaren je gegevens niet langer dan noodzakelijk. Reservatie- en
        bestelgegevens worden na afhandeling beperkt bewaard voor opvolging;
        facturen en boekhoudkundige stukken bewaren wij gedurende de wettelijke
        termijn van 7 jaar. Nadien worden gegevens verwijderd of geanonimiseerd.
      </p>
    ),
  },
  {
    titel: "6. Cookies",
    inhoud: (
      <p>
        Onze website gebruikt in de eerste plaats functionele cookies die
        noodzakelijk zijn voor de werking en beveiliging. Analytische of andere
        niet-noodzakelijke cookies plaatsen wij enkel met je toestemming. Je kan
        je voorkeuren steeds aanpassen via je browserinstellingen.
      </p>
    ),
  },
  {
    titel: "7. Welke rechten heb je?",
    inhoud: (
      <>
        <p>
          Onder de AVG heb je recht op inzage, correctie, wissing, beperking en
          overdraagbaarheid van je gegevens, en recht van bezwaar. Je kan deze
          rechten uitoefenen via{" "}
          <a href={`mailto:${SITE.email}`} className="underline">
            {SITE.email}
          </a>
          .
        </p>
        <p>
          Je hebt ook het recht een klacht in te dienen bij de Belgische
          Gegevensbeschermingsautoriteit, Drukpersstraat 35, 1000 Brussel (
          <a
            href="https://www.gegevensbeschermingsautoriteit.be"
            className="underline"
          >
            www.gegevensbeschermingsautoriteit.be
          </a>
          ).
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Privacybeleid", path: "/privacy" },
        ])}
      />
      <PageBanner title="Privacybeleid" />
      <section className="bg-beige">
        <div className="mx-auto w-full max-w-[820px] px-6 pb-24 text-[15px] leading-[1.65] text-ink/85 [&_a]:text-brand [&_h2]:heading-display [&_h2]:text-[20px] [&_h2]:text-heading [&_li]:mb-1.5 [&_p]:mb-3.5 [&_strong]:text-heading [&_ul]:mb-3.5 [&_ul]:list-disc [&_ul]:pl-5">
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
