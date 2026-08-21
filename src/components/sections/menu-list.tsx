import { type MenuCategory } from "@/lib/menu";

function Category({ category }: { category: MenuCategory }) {
  // De Thaise/Chinese tekens staan niet bij elk gerecht (de webshop levert ze
  // niet aan). Heeft geen enkel gerecht in deze categorie een teken, dan laten
  // we de kolom weg in plaats van een lege strook te reserveren.
  const hasScripts = category.items.some((item) => item.th);

  return (
    <div className="mb-12">
      <h2 className="mb-5 flex items-baseline gap-3">
        <span className="heading-display text-[30px] text-heading">
          {category.title}
        </span>
        {category.th ? (
          <span className="text-[18px] font-medium text-neon-red">
            {category.th}
          </span>
        ) : null}
      </h2>
      <ul className="space-y-3.5">
        {category.items.map((item, i) => (
          <li
            key={`${item.code}-${item.name}-${i}`}
            className="flex items-baseline gap-3 text-[16px]"
          >
            {item.code ? (
              <span className="w-10 shrink-0 text-ink/45">{item.code}</span>
            ) : null}
            {hasScripts ? (
              <span className="w-24 shrink-0 font-medium text-neon-red">
                {item.th}
              </span>
            ) : null}
            <span className="flex-1 text-ink/90">{item.name}</span>
            <span className="shrink-0 font-semibold text-heading">
              {item.price}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Verdeelt de categorieën over twee kolommen van ongeveer gelijke hoogte,
 * zonder de volgorde te breken: de linkerkolom is een aaneengesloten begin van
 * de lijst, de rechterkolom de rest. Een vaste splitsing op 3 werkt niet: De
 * Lange Muur heeft 18 categorieën waarvan de helft één gerecht bevat, Nakhon
 * Thai er 9 met tot 14 gerechten.
 */
function splitColumns(categories: MenuCategory[]) {
  // Kop plus gerechten, zodat een categorie met één item ook meetelt.
  const weight = (c: MenuCategory) => c.items.length + 2;
  const total = categories.reduce((n, c) => n + weight(c), 0);

  if (categories.length < 2) return { left: categories, right: [] };

  // Kies de splitsing die het hoogteverschil tussen de kolommen minimaliseert.
  let best = 1;
  let bestDiff = Number.POSITIVE_INFINITY;
  let running = 0;
  for (let i = 0; i < categories.length - 1; i++) {
    running += weight(categories[i]);
    const diff = Math.abs(total - running - running);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = i + 1;
    }
  }

  return { left: categories.slice(0, best), right: categories.slice(best) };
}

/** Volledige menukaart in twee kolommen. */
export function MenuList({ categories }: { categories: MenuCategory[] }) {
  const { left, right } = splitColumns(categories);
  return (
    <section className="bg-seigaiha">
      <div className="mx-auto grid w-full max-w-[1180px] gap-x-16 gap-y-0 px-6 py-4 pb-20 lg:grid-cols-2">
        <div>
          {left.map((cat) => (
            <Category key={cat.title} category={cat} />
          ))}
        </div>
        <div>
          {right.map((cat) => (
            <Category key={cat.title} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
}
