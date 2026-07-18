import { type MenuCategory } from "@/lib/menu";
import type { Brand } from "@/lib/brands";

function Category({ category }: { category: MenuCategory }) {
  return (
    <div className="mb-12">
      <h2 className="mb-5 flex items-baseline gap-3">
        <span className="heading-display text-[30px] text-heading">
          {category.title}
        </span>
        <span className="text-[18px] font-medium text-neon-red">
          {category.th}
        </span>
      </h2>
      <ul className="space-y-3.5">
        {category.items.map((item, i) => (
          <li
            key={`${item.code}-${i}`}
            className="flex items-baseline gap-3 text-[16px]"
          >
            <span className="w-10 shrink-0 text-ink/45">{item.code}</span>
            <span className="w-24 shrink-0 font-medium text-neon-red">
              {item.th}
            </span>
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

/** Volledige menukaart in twee kolommen (links 3 categorieën, rechts specialiteiten). */
export function MenuList({ brand }: { brand: Brand }) {
  const left = brand.menu.slice(0, 3);
  const right = brand.menu.slice(3);
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
