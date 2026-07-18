import { cn } from "@/lib/utils";
import { OrnamentDivider } from "@/components/brand/ornaments";

/**
 * Gecentreerde sectiekop: sier-divider + optionele pill-badge + display-titel.
 * `title` mag ReactNode zijn zodat een deel in een accentkleur kan staan.
 */
export function SectionHeading({
  label,
  title,
  className,
  headingClassName,
}: {
  label?: string;
  title: React.ReactNode;
  className?: string;
  headingClassName?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      <OrnamentDivider className="mb-4" />
      {label ? (
        <span className="mb-4 inline-block rounded-full bg-beige-20 px-4 py-1.5 text-[14px] font-semibold text-brand">
          {label}
        </span>
      ) : null}
      <h2
        className={cn(
          "heading-display text-[40px] text-heading sm:text-[52px]",
          headingClassName,
        )}
      >
        {title}
      </h2>
    </div>
  );
}
