import { Star } from "lucide-react";

import type { Brand } from "@/lib/brands";
import { GoogleG } from "@/components/ui/icons";

export function Reviews({ brand }: { brand: Brand }) {
  const REVIEWS = brand.reviews;
  return (
    <section className="bg-yellow">
      <div className="mx-auto w-full max-w-[1320px] px-6 py-16 lg:py-20">
        <div className="rounded-[28px] bg-beige-20 px-6 py-12 lg:px-14">
          <h2 className="heading-display text-center text-[36px] text-heading sm:text-[46px]">
            Wat onze klanten zeggen
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {REVIEWS.map((review) => (
              <figure
                key={review.name}
                className="flex flex-col rounded-2xl bg-beige p-7 shadow-sm"
              >
                <div className="flex gap-1 text-yellow">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="size-5 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink/80">
                  {review.text}
                </blockquote>
                <figcaption className="mt-6 flex items-center justify-between">
                  <span className="font-semibold text-brand">{review.name}</span>
                  <GoogleG className="size-5" />
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
