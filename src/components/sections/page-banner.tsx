import { OrnamentDivider } from "@/components/brand/ornaments";

/** Paginakop op crème seigaiha-achtergrond (Menu, Contact, ...). */
export function PageBanner({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-seigaiha">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col items-center px-6 pt-36 pb-16 text-center lg:pt-40">
        <OrnamentDivider className="mb-4" />
        <h1 className="heading-display text-[48px] text-heading sm:text-[68px]">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-3 max-w-[560px] text-[17px] text-ink/70">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}
