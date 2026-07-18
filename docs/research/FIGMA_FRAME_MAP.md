# Figma Frame Map — Metaalbewerking Meirlaen

Bestand: `WgIpbUteng1whyW94wFwu5` (pagina `0:1` "Preperation").
Lees een frame met de Figma MCP: `get_design_context` / `get_screenshot` / `get_metadata`
met de nodeId hieronder.

> Tip: `get_metadata` op de hele pagina overschrijdt de tokenlimiet. Target altijd een
> concreet frame (of sub-sectie). Voor exacte CSS-waarden: `get_design_context` op een
> sub-node met `excludeScreenshot: true`.

## Bron van waarheid
Het bord `202:54` ("Website") bevat vier lagen: `old` (huidige site), `new` (mockups +
wireframes), **`917:8954` "High fidelity"** en **`949:54` "Copywriting Check"**.
→ We bouwen op **"Copywriting Check"** (`949:54`): identieke schermen als High fidelity,
maar met de finale copy. Node-IDs hieronder komen allemaal uit dat cluster.

## Pagina-frames (cluster `949:54`, alle 1440px breed)
| Node ID | Pagina | Route (voorstel) |
|---|---|---|
| `949:4357` | Home | `/` |
| `949:4647` | Dienst — CNC draaien | `/diensten/cnc-draaien` |
| `949:4950` | Dienst — CNC frezen | `/diensten/cnc-frezen` |
| `949:5251` | Dienst — 3D printing | `/diensten/3d-printing` |
| `949:5552` | Machinepark | `/machinepark` |
| `952:5853` | Materialen | `/materialen` |
| `952:6581` | Over ons | `/over-ons` |
| `953:54` | Realisaties | `/realisaties` |
| `957:54` | Nieuws (overzicht) | `/nieuws` |
| `957:282` | Nieuws detail 1 | `/nieuws/[slug]` |
| `957:509` | Nieuws detail 2 | `/nieuws/[slug]` |
| `964:738` | Nieuws detail 3 | `/nieuws/[slug]` |
| `969:54` | Nieuws detail 4 | `/nieuws/[slug]` |
| `977:54` | Jobs | `/jobs` |
| `977:293` | Contact | `/contact` |

## Home — sectie-nodes (`949:4357`)
| Node ID | Sectie |
|---|---|
| header (flat, y≈35–101) | Sticky mega-nav: 2 rijen links + "Contact us"-pill |
| `949:4363` + hero-teksten | Hero: donkere industriële foto, uppercase kop, subtekst, CTA's, brochure-mockup |
| `949:4398` + `949:4506/4513/4520/4527` | "Ons productie-proces" — 4 genummerde stapkaarten (01–04) |
| `949:4534` | CTA-band (avatars + "Offerte op maat") |
| `949:4404/4463/4458` blokken | Diensten: CNC draaien / CNC frezen / 3D printing (alternerend beeld+tekst) |
| `949:4466` + machinekaarten | Machinepark: horizontale carousel Mazak-machines |
| `949:4446` + `949:4451/4452/4453` | Nieuws & updates: 3 kaarten (bento, wisselende hoogtes) |
| `949:4566` | Footer: kolommen (Bedrijf / Diensten / Contact) + socials + groot MEIRLAEN-woordmerk |

## Bedrijfsgegevens (uit het ontwerp)
- Adres: **Ambachtsweg 31, 9820 Merelbeke**
- Tel: **+32 9 324 33 33** · E-mail: **info@meirlaen-bvba.be**
- BTW: **BE0458 739 328**
- Footer: "© 2026 Meirlaen Metaalbewerking · Made by VICAR Agency"

## Machinepark (merken/modellen uit home-carousel)
Mazak Quick Turn 250 MY · Mazak VTC 800 · Mazak CV5 500 · Mazak Integrex J 200 S · …
(volledige lijst op `/machinepark`-frame `949:5552`). Partners: **Mazak**, **Keyence** (meetinstrumenten).
