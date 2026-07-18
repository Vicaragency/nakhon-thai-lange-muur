import { SITE } from "@/lib/site-config";
import type { Brand } from "@/lib/brands";
import { DiamondRosette } from "@/components/brand/ornaments";

function DetailBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center text-center text-brand">
      <DiamondRosette className="text-beige-40" />
      <h3 className="heading-display mt-3 text-[19px] text-heading">{title}</h3>
      <div className="mt-3 space-y-1 text-[15px] text-ink/80">{children}</div>
    </div>
  );
}

export function ContactInfo({ brand }: { brand: Brand }) {
  // Vandaag markeren in de urentabel (ma=0 ... zo=6).
  const todayIndex = (new Date().getDay() + 6) % 7;

  return (
    <section className="bg-beige">
      <div className="mx-auto w-full max-w-[1180px] px-6 pb-20">
        {/* Kaart + openingsuren */}
        <div className="grid overflow-hidden rounded-[24px] bg-white shadow-sm md:grid-cols-2">
          <div className="min-h-[340px]">
            <iframe
              title={`Locatie ${brand.name} op de kaart`}
              src={SITE.mapEmbedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="size-full min-h-[340px] border-0"
            />
          </div>
          <div className="p-7 lg:p-9">
            <div className="flex items-center justify-between">
              <h2 className="heading-display text-[24px] text-heading">
                7 op 7 open
              </h2>
              <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-[13px] font-semibold text-green-700">
                <span className="size-2 rounded-full bg-green-600" />
                Open
              </span>
            </div>
            <ul className="mt-5">
              {SITE.openingHours.map((row, i) => (
                <li
                  key={row.day}
                  className={`grid grid-cols-[1fr_auto_auto] items-center gap-4 rounded-lg px-3 py-2 text-[15px] ${
                    i === todayIndex ? "bg-beige-20 font-semibold" : ""
                  }`}
                >
                  <span className="text-ink/90">{row.day}</span>
                  <span className="tabular-nums text-ink/70">{row.lunch}</span>
                  <span className="tabular-nums text-ink/70">{row.dinner}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Gegevens + adres */}
        <div className="mt-14 grid gap-10 sm:grid-cols-2">
          <DetailBlock title="Contactgegevens">
            <p>
              <a href={`tel:${SITE.phoneHref}`} className="hover:text-brand">
                {SITE.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${SITE.email}`} className="hover:text-brand">
                {SITE.email}
              </a>
            </p>
          </DetailBlock>
          <DetailBlock title="Adres">
            <p>{SITE.address.street}</p>
            <p>
              {SITE.address.postalCode} {SITE.address.city}
            </p>
          </DetailBlock>
        </div>
      </div>
    </section>
  );
}
