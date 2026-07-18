import { cn } from "@/lib/utils";

/**
 * Kleine sierlijke divider boven sectiekoppen: het lotus-motief uit Figma
 * ("Isolatiemodus", drie petals tussen twee lijntjes met eindpunten).
 * Neemt currentColor over; standaard beige-40 op crème achtergronden.
 */
export function OrnamentDivider({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 105.56 24.78"
      className={cn("h-[25px] w-[106px] text-beige-40", className)}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M52.69 24.7L52.21 24.16C51.92 23.84 45.19 16.23 45.19 7.5C45.19 3.37 48.56 0.01 52.69 0.01C56.82 0.01 60.18 3.37 60.18 7.5C60.18 16.23 53.46 23.84 53.17 24.16L52.69 24.7ZM52.69 1.3C49.27 1.3 46.49 4.08 46.49 7.49C46.49 14.41 51.15 20.79 52.69 22.71C54.23 20.79 58.88 14.4 58.88 7.49C58.88 4.07 56.1 1.3 52.69 1.3Z" />
      <path d="M46.57 24.78L45.85 24.72C45.5 24.69 37.3 23.91 32.46 18.73C30.14 16.24 30.27 12.33 32.76 10C35.25 7.68 39.16 7.81 41.48 10.29C46.32 15.47 46.56 23.7 46.56 24.05L46.58 24.78H46.57ZM36.97 9.63C35.78 9.63 34.58 10.06 33.64 10.94C31.68 12.78 31.57 15.87 33.4 17.83C37.08 21.77 43.1 23 45.21 23.32C45.03 21.2 44.21 15.12 40.52 11.18C39.56 10.16 38.26 9.64 36.96 9.64L36.97 9.63Z" />
      <path d="M58.87 24.78L58.89 24.05C58.89 23.7 59.13 15.47 63.97 10.29C65.1 9.09 66.62 8.39 68.27 8.34C69.91 8.29 71.49 8.87 72.69 10C75.18 12.33 75.31 16.24 72.99 18.73C68.15 23.91 59.94 24.69 59.6 24.72L58.88 24.78H58.87ZM68.48 9.63C68.42 9.63 68.37 9.63 68.31 9.63C67.01 9.67 65.81 10.22 64.92 11.17C61.24 15.11 60.41 21.19 60.23 23.31C62.34 22.99 68.35 21.76 72.04 17.82C73.87 15.86 73.77 12.77 71.8 10.93C70.89 10.08 69.72 9.62 68.48 9.62V9.63Z" />
      <path d="M22.12 17.17H0.65C0.29 17.17 0 16.88 0 16.52C0 16.16 0.29 15.87 0.65 15.87H22.12C22.48 15.87 22.77 16.16 22.77 16.52C22.77 16.88 22.48 17.17 22.12 17.17Z" />
      <path d="M23.96 19.02C22.58 19.02 21.47 17.9 21.47 16.53C21.47 15.16 22.59 14.04 23.96 14.04C25.33 14.04 26.45 15.16 26.45 16.53C26.45 17.9 25.33 19.02 23.96 19.02ZM23.96 15.33C23.3 15.33 22.77 15.87 22.77 16.52C22.77 17.17 23.31 17.71 23.96 17.71C24.61 17.71 25.15 17.17 25.15 16.52C25.15 15.87 24.61 15.33 23.96 15.33Z" />
      <path d="M104.91 17.17H83.44C83.08 17.17 82.79 16.88 82.79 16.52C82.79 16.16 83.08 15.87 83.44 15.87H104.91C105.27 15.87 105.56 16.16 105.56 16.52C105.56 16.88 105.27 17.17 104.91 17.17Z" />
      <path d="M81.6 19.02C80.22 19.02 79.11 17.9 79.11 16.53C79.11 15.16 80.23 14.04 81.6 14.04C82.97 14.04 84.09 15.16 84.09 16.53C84.09 17.9 82.97 19.02 81.6 19.02ZM81.6 15.33C80.94 15.33 80.41 15.87 80.41 16.52C80.41 17.17 80.95 17.71 81.6 17.71C82.25 17.71 82.79 17.17 82.79 16.52C82.79 15.87 82.25 15.33 81.6 15.33Z" />
    </svg>
  );
}

/**
 * Rozet-icoon boven de "Contactgegevens" / "Adres" koppen (footer + contact):
 * het medaillon uit Figma ("Isolatiemodus", dubbele ring met vierpuntige ster).
 */
export function DiamondRosette({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={cn("h-10 w-10 text-current", className)}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.9966 35.0712C11.8491 35.0712 5.22381 28.4459 5.22381 20.2984C5.22381 12.1509 11.8558 5.53227 19.9966 5.53227C28.1375 5.53227 34.7695 12.1576 34.7695 20.3051C34.7695 28.4526 28.1442 35.078 19.9966 35.078V35.0712ZM19.9966 6.40402C12.3319 6.40402 6.09556 12.6404 6.09556 20.3051C6.09556 27.9698 12.3319 34.2062 19.9966 34.2062C27.6614 34.2062 33.8977 27.9698 33.8977 20.3051C33.8977 12.6404 27.6614 6.40402 19.9966 6.40402Z" />
      <path d="M19.9966 40C8.97234 40 0 31.0277 0 19.9966C0 8.96563 8.97234 0 19.9966 0C31.021 0 39.9933 8.97234 39.9933 19.9966C39.9933 31.021 31.021 39.9933 19.9966 39.9933V40ZM19.9966 0.871752C9.45515 0.871752 0.871752 9.45515 0.871752 19.9966C0.871752 30.5381 9.45515 39.1215 19.9966 39.1215C30.5381 39.1215 39.1215 30.5381 39.1215 19.9966C39.1215 9.45515 30.5448 0.871752 19.9966 0.871752Z" />
      <path d="M20.4325 33.9648H19.5608C19.5608 26.6689 13.6262 20.7343 6.33026 20.7343V19.8625H6.39061C13.653 19.829 19.5541 13.9078 19.5541 6.63202H20.4258C20.4258 13.9279 26.3604 19.8625 33.6563 19.8625V20.7343H33.596C26.3336 20.7678 20.4325 26.689 20.4325 33.9648ZM9.81727 20.3051C14.7997 21.5792 18.7225 25.5021 19.9966 30.4845C21.264 25.5021 25.1936 21.5792 30.176 20.3051C25.1936 19.031 21.2707 15.1081 19.9966 10.1257C18.7293 15.1081 14.7997 19.031 9.81727 20.3051Z" />
    </svg>
  );
}

/**
 * Verticale Thaise hang-ornament (dangling lantern) voor de flanken van de hero.
 */
export function ThaiLantern({ className }: { className?: string }) {
  const medallion = (cy: number) => (
    <g key={cy}>
      <circle cx="22" cy={cy} r="14" stroke="currentColor" strokeWidth="1" />
      <circle cx="22" cy={cy} r="8.5" stroke="currentColor" strokeWidth="1" />
      <path
        d="M22 12.5 26 22l-4 9.5L18 22l4-9.5Z"
        transform={`translate(0 ${cy - 22})`}
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
      <circle cx="22" cy={cy} r="2" fill="currentColor" />
    </g>
  );
  return (
    <svg
      viewBox="0 0 44 232"
      className={cn("h-full w-11 text-beige-40", className)}
      fill="none"
      aria-hidden="true"
    >
      {/* hanger */}
      <circle cx="22" cy="8" r="6" stroke="currentColor" strokeWidth="1" />
      <path d="M22 14v9" stroke="currentColor" strokeWidth="1" />
      {medallion(45)}
      <path d="M22 59v9" stroke="currentColor" strokeWidth="1" />
      {medallion(90)}
      <path d="M22 104v9" stroke="currentColor" strokeWidth="1" />
      {medallion(135)}
      {/* tassel */}
      <path d="M22 149v12" stroke="currentColor" strokeWidth="1" />
      <path d="M16 161h12" stroke="currentColor" strokeWidth="1" />
      <path
        d="M17 161v40M20.5 161v44M24 161v44M27 161v40"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <circle cx="22" cy="209" r="2.5" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/**
 * Bloemvormige (scalloped) sticker-badge zoals de "HOMEMADE" / "DEAL" / "TASTY"
 * stickers uit het ontwerp. De schulprand is opgebouwd uit petals rond een
 * centrale schijf; de tekst (children) staat gecentreerd bovenop.
 */
export function ScallopBadge({
  fill = "#ed3fa6",
  className,
  children,
  petals = 13,
}: {
  fill?: string;
  className?: string;
  petals?: number;
  children: React.ReactNode;
}) {
  const size = 100;
  const c = size / 2;
  const ringR = 34;
  const petalR = 12;
  const items = Array.from({ length: petals }, (_, i) => {
    const a = (i / petals) * Math.PI * 2;
    return { x: c + ringR * Math.cos(a), y: c + ringR * Math.sin(a) };
  });
  return (
    <div className={cn("relative aspect-square", className)}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0 size-full drop-shadow-sm"
        aria-hidden="true"
      >
        {items.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={petalR} fill={fill} />
        ))}
        <circle cx={c} cy={c} r={ringR + 3} fill={fill} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center leading-none">
        {children}
      </div>
    </div>
  );
}
