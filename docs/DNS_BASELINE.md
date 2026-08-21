# DNS-baseline vóór de domeintransfer

Vastgelegd op **21-08-2026** via DNS-over-HTTPS (dns.google), vóór de transfer van
`nakhonthai.be`, `nakhonthai-brugge.be` en `delangemuur-brugge.be`.

Doel: na elke transfer kan je hiermee vergelijken. Wijkt er iets af dat je niet
zelf gewijzigd hebt, dan heeft de nieuwe registrar zijn eigen standaard-zone
toegepast en moet je die terugzetten.

> ⚠️ Alle drie de domeinen hebben **actieve MX-records**. Een transfer die de
> nameservers reset zet niet alleen de website maar ook de **mail** stil. Dat is
> het grootste risico van deze operatie, groter dan de website.

---

## nakhonthai.be — hoofddomein, hier komt de nieuwe site

Registrar/DNS: **ZXCS** (Nederlandse hoster). Staat los van Hostinger.

| Type | Waarde |
|---|---|
| NS | `ns.zxcs.be.` · `ns.zxcs.eu.` · `ns.zxcs.nl.` |
| A | `185.104.29.158` |
| AAAA | `2a06:2ec0:1::161` |
| MX | `10 mail.nakhonthai.be.` |
| TXT (SPF) | `v=spf1 a mx ip4:185.104.29.158 ip6:2a06:2ec0:1:0:0:0:0:161 include:filter-out.zxcs.nl ~all` |
| TXT (`_dmarc`) | `v=DMARC1; p=none; sp=none;` |
| www | A `185.104.29.158`, AAAA `2a06:2ec0:1::161` |

Wat er nu op staat: alleen een **302-redirect** naar nakhonthai-brugge.be, plus
de **mailserver** voor `info@nakhonthai.be`.

**Let op:** de mailbox draait op de eigen server bij ZXCS (`mail.nakhonthai.be`,
zelfde IP als de redirect). Vraag ZXCS expliciet of die mailbox blijft bestaan
wanneer de domeinregistratie wegtransfereert. Registratie en hosting/mail zijn
aparte producten, maar zitten vaak in één contract.

## nakhonthai-brugge.be — ⛔ NIET aanraken: hier staat het bestelsysteem

Registrar/DNS: **Hostinger** (`dns-parking.com`).

| Type | Waarde |
|---|---|
| NS | `horizon.dns-parking.com.` · `orbit.dns-parking.com.` |
| A | `2.57.91.214` · `84.32.84.143` |
| AAAA | `2a02:4780:84:334b:c00b:834e:a9ac:399c` · `2a02:4780:84:cedc:b310:433c:b4a6:e121` |
| MX | `5 mx1.hostinger.nl.` · `10 mx2.hostinger.nl.` |
| TXT (SPF) | `v=spf1 include:_spf.mail.hostinger.com ~all` |
| www | CNAME `www.nakhonthai-brugge.be.cdn.hstgr.net.` |

Hier draait de WordPress + WooCommerce webshop: `/online-bestellen/` (Thais),
`/order-online/` (Chinees), `/cart/`, `/checkout/`, `/my-account/` en alle
producten. **Nameservers, A/AAAA en MX ongewijzigd laten.**

## delangemuur-brugge.be — tweede WordPress-site

Registrar/DNS: **Hostinger** (`dns-parking.com`).

| Type | Waarde |
|---|---|
| NS | `orbit.dns-parking.com.` · `horizon.dns-parking.com.` |
| A | `92.113.16.88` · `92.113.23.97` |
| AAAA | `2a02:4780:84:e31d:9c9c:5a62:4fe3:8655` · `2a02:4780:84:93b5:1568:a981:a0aa:d861` |
| MX | `5 mx1.hostinger.nl.` · `10 mx2.hostinger.nl.` |
| TXT (SPF) | `v=spf1 include:_spf.mail.hostinger.com ~all` |
| www | CNAME `www.delangemuur-brugge.be.cdn.hstgr.net.` |

Aparte WordPress-installatie ("Welkom in De Lange Muur"). Levert ook een aantal
afbeeldingen aan de bestelpagina's op nakhonthai-brugge.be, dus deze site
zomaar weghalen laat gaten vallen in de webshop.

---

## Veilige volgorde

1. **Vóór de transfer:** bij ZXCS navragen wat er met `info@nakhonthai.be`
   gebeurt. Beslissen waar de mail op termijn hoort (bij ZXCS laten, of naar
   Google Workspace / Microsoft 365 / Hostinger).
2. **Transfereren met de nameservers ongewijzigd.** Na elke transfer deze tabel
   opnieuw controleren (NS, A, AAAA, MX, TXT).
3. **Daarna pas** `nakhonthai.be` naar Vercel wijzen, en dan **alleen het
   A-record en het www-record** aanpassen naar wat Vercel opgeeft.
   **MX en TXT/SPF/DMARC laten staan.**
4. Delegeer de zone **niet** naar de nameservers van Vercel tenzij je daar eerst
   de MX-, SPF- en DMARC-records opnieuw aanmaakt. Vergeet je die, dan valt de
   mail per direct weg. Veiliger is: DNS bij de registrar houden en enkel de
   webrecords wijzigen.
5. `nakhonthai-brugge.be` blijft naar Hostinger wijzen zolang bestellen daar
   draait. Zie LAUNCH_CHECKLIST.md.

## Controleren na elke stap

```bash
for d in nakhonthai.be nakhonthai-brugge.be delangemuur-brugge.be; do
  for t in NS A AAAA MX TXT; do
    echo -n "$d $t: "
    curl -s "https://dns.google/resolve?name=$d&type=$t" \
      | python3 -c "import json,sys;print(' | '.join(a['data'] for a in (json.load(sys.stdin).get('Answer') or [])))"
  done
done
```

Mail testen doe je niet met DNS maar met een echte proefmail naar
`info@nakhonthai.be` vanaf een extern adres (bv. Gmail), en dan controleren of
ze binnenkomt **en** of antwoorden vertrekken.
