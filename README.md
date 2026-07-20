# TimTim Ceramic

Tolnai Tímea keramikus bemutatkozó, termék- és portfólió weboldala. A statikus honlap bemutatja a TimTim Ceramic kézzel készített alkotásait, állandó termékeit, teljes képgalériát és Netlify Forms alapú kapcsolatfelvételi lehetőséget tartalmaz.

## Technológia

- HTML5
- CSS3
- natív JavaScript
- helyben tárolt Inter webfont
- Netlify Forms
- build lépés nélküli statikus hosting

## Projektstruktúra

- `index.html` – főoldal és kiemelt alkotások
- `bemutatkozas.html` – alkotói bemutatkozás
- `termekek.html` – állandó termékek, árak és egyedi megrendelések
- `galeria.html` – 77 elemes, nagyítható galéria
- `kapcsolat.html` – Netlify-kompatibilis kapcsolatfelvételi űrlap
- `koszonjuk.html` – sikeres űrlapküldés utáni oldal
- `documents/timtim-ceramic-adatkezelesi-tajekoztato.pdf` – adatkezelési tájékoztató
- `css/` – megjelenés és reszponzív töréspontok
- `js/` – mobilmenü, slider és lightbox
- `fonts/` – helyben kiszolgált Inter webfont és licenc
- `images/gallery/thumbs/` – gyorsan betöltődő, tömörített galériaképek
- `images/gallery/full/` – teljes felbontású lightbox képek
- `netlify.toml` – Netlify publish- és biztonsági beállítások
- `site.webmanifest`, `robots.txt`, `sitemap.xml` – webes és keresőmotoros metaadatok

## Helyi fejlesztés

A projekthez nincs szükség csomagtelepítésre vagy build folyamatra. A projekt gyökerében indíts egy egyszerű statikus szervert:

```bash
python3 -m http.server 8080
```

Ezután nyisd meg a `http://localhost:8080/` címet. A HTML fájlok közvetlen megnyitása helyett helyi szerver használata javasolt.

## Tartalomfrissítés

A galéria kevert sorrendű képlistája a `js/gallery.js` elején található. A rács a `images/gallery/thumbs/` képeit tölti be, a lightbox pedig csak megnyitáskor kéri le a megfelelő `images/gallery/full/` fájlt. A főoldali slider képei az `images/slider/`, a Termékek oldal optimalizált képei az `images/products/` mappában találhatók.

## Deployment Netlifyra

1. Pushold a repositoryt GitHubra.
2. A Netlify felületén válaszd az **Add new site → Import an existing project** lehetőséget.
3. Kapcsold össze a GitHub repositoryt.
4. Build command: hagyd üresen.
5. Publish directory: `.`
6. Indítsd el a deploymentet.

A `netlify.toml` már tartalmazza a publish könyvtárat. A kapcsolatfelvételi űrlapot a Netlify automatikusan felismeri a `data-netlify="true"` attribútum alapján.

A sitemap és a robots fájl a kanonikus `https://timtimceramic.hu` domainre mutat.
