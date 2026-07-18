import Link from "next/link";

import { SITE } from "@/lib/site-config";
import { navItems, type Brand } from "@/lib/brands";
import { DiamondRosette } from "@/components/brand/ornaments";
import { InstagramIcon, FacebookIcon, TiktokIcon } from "@/components/ui/icons";

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <DiamondRosette className="text-beige-40" />
      <h4 className="heading-display text-[19px] text-white">{children}</h4>
    </div>
  );
}

export function SiteFooter({ brand }: { brand: Brand }) {
  const year = new Date().getFullYear();
  const items = navItems(brand);
  return (
    <footer className="mt-auto bg-brand text-white">
      <div className="mx-auto grid w-full max-w-[1320px] gap-14 px-6 py-16 text-center lg:grid-cols-3 lg:gap-8 lg:py-20">
        {/* Contactgegevens */}
        <div>
          <ColumnHeading>Contactgegevens</ColumnHeading>
          <div className="mt-4 space-y-1 text-[15px] text-white/85">
            <p>
              <a href={`tel:${SITE.phoneHref}`} className="hover:text-white">
                {SITE.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${SITE.email}`} className="hover:text-white">
                {SITE.email}
              </a>
            </p>
          </div>
          <div className="mt-5 flex items-center justify-center gap-3">
            {[
              { href: SITE.socials.instagram, label: "Instagram", Icon: InstagramIcon },
              { href: SITE.socials.facebook, label: "Facebook", Icon: FacebookIcon },
              { href: SITE.socials.tiktok, label: "TikTok", Icon: TiktokIcon },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex size-9 items-center justify-center rounded-md bg-white text-brand transition-transform hover:-translate-y-0.5"
              >
                <Icon className="size-[18px]" />
              </a>
            ))}
          </div>
        </div>

        {/* Navigatie */}
        <nav className="flex flex-col items-center justify-center gap-3">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="heading-display text-[26px] leading-none text-white/90 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Adres */}
        <div>
          <ColumnHeading>Adres</ColumnHeading>
          <address className="mt-4 space-y-1 text-[15px] not-italic text-white/85">
            <p>{SITE.address.street}</p>
            <p>
              {SITE.address.postalCode} {SITE.address.city}
            </p>
          </address>
        </div>
      </div>

      {/* Onderbalk */}
      <div className="bg-brand-dark">
        <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-3 px-6 py-4 text-[12px] text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {brand.name} {year}
          </p>
          <div className="flex items-center gap-5">
            <Link href="/algemene-voorwaarden" className="hover:text-white">
              Algemene voorwaarden
            </Link>
            <Link href="/privacy" className="hover:text-white">
              Privacy voorwaarden
            </Link>
          </div>
          <a
            href="https://vicaragency.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            Made by Vicar Agency
          </a>
        </div>
      </div>
    </footer>
  );
}
