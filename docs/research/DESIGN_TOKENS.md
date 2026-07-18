# Design Tokens — Metaalbewerking Meirlaen

Geëxtraheerd uit het Figma "Copywriting Check"-cluster (1440px artboard). Sommige
px-waarden zijn afgeleid van een 1440-artboard (bv. `16.77px`) — afronden naar een
propere schaal.

## Typografie
- **Ontwerp-font:** Helvetica / Helvetica Neue (Regular + Bold).
- **Web-substituut:** **Inter** (via `next/font/google`, `--font-inter`), met fallback
  `"Helvetica Neue", Helvetica, Arial, sans-serif`.
- Koppen zijn **uppercase + bold**, strak (tracking licht negatief).
- Schaal (afgerond): hero-display ~54–64px, section-title ~40px, card-heading ~25px,
  lead ~20px, body **17px** (artboard 16.77), small 14/13px, micro 12px.

## Kleuren
| Token | Hex / RGB | Gebruik |
|---|---|---|
| **brand blue** | `#2772B6` (rgb 39,114,182) | primaire blauw, accenten, links, gradient-eind |
| **navy** | `#113250` (rgb 17,50,80) | donkere secties, gradient-start |
| **accent orange** | `#F08A01` | CTA-tekst ("Offerte op maat"), highlights |
| white | `#ffffff` | tekst op donker, kaart/pill-vlakken |
| near-black | `#0e1a24` / `#111` | koppen op licht |
| gray | `#6c6c6c` | secundaire tekst |
| light-gray | `#e8e8e8` / `#f4f4f4` | borders, muted vlakken |

**Donkere secties = gradient**: `linear-gradient(~155–182deg, #113250, #2772B6)`
met zachte, wazige cirkel-"glows" (radial ellipses) als decoratie.

## Radii
- **Pills/buttons:** `rounded-full` (artboard 32–35px op ~42px hoogte).
- **Kaarten / grote beeldblokken:** ~16–29px (`rounded-2xl` … `rounded-3xl`).
- **Kleine kaart-panelen (proceskaart):** ~5px in artboard → gebruik `rounded-xl` visueel,
  maar de proceskaart-achtergrond zelf is `rounded-[5px]` (checken per sectie).
- **Avatars / ronde iconen:** `rounded-full`.

## Buttons
- **Primair (op donker):** witte pill + oranje tekst + rond icoon met pijl. `rounded-full`.
- **Outline (op donker):** transparante pill met witte rand + witte tekst ("Contact us").
- **Op licht:** blauwe pill met rond wit/licht arrow-icoon ("Offerte op maat", "Ontdek …").
- Alle pills: `h-[42px]`, klein circulair arrow-affordance links.

## Layout
- Artboard 1440px; inner container ~1320px (`max-w-[1320px]`), zijmarge ~60px (`px-[60px]`).
- Alternerende diensten-blokken (beeld links/rechts), grote `rounded` foto's.
- Machinepark: horizontale scroll/carousel van kaarten (~422px breed).
- Nieuws: bento-grid, 3 kaarten met wisselende hoogtes.

## Implementatie
Tokens toevoegen aan `src/app/globals.css` (`--brand`, `--navy`, `--accent`, …) bovenop
de bestaande oklch-neutralschaal van de template. Lichte basis-thema; donkere secties zijn
component-niveau (gradient-wrappers), geen globale dark mode.
