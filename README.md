# Garras Astrales Collective — Website

Website for **Garras Astrales Collective**, a cat-only rescue. Plain HTML/CSS/JS — no build step.
Open `index.html` in a browser, or host the folder on GitHub Pages, Netlify, or any static host.

## Pages
| File | Purpose |
|------|---------|
| `index.html` | Home: hero, featured cats, ways to help, impact stats |
| `adopt.html` | All adoptable cats (filter by age), adoption process, fees |
| `get-involved.html` | Foster, volunteer, donate |
| `about.html` | Mission, story, values |
| `contact.html` | Contact form + other contact info |

## Updating the cats
Edit `js/cats.js`. Each cat has a name, age group, traits, story, and optional photo.
Put photos in `assets/cats/` and set `photo: "assets/cats/luna.jpg"`. Set `featured: true` to show a cat on the homepage.

## Still to fill in
- [ ] Vector/high-res logo files from the designer
- [ ] Real cats and photos (`js/cats.js` currently has sample cats)
- [ ] Impact numbers on the homepage (`000`)
- [ ] Adoption fees (`$___` on `adopt.html`)
- [ ] "Our story" on `about.html`
- [ ] Email, location, and social links (header/footer, `contact.html`)
- [ ] Donation + wishlist links (`get-involved.html`)
- [ ] Connect the contact form to a service (e.g. Jotform, Formspree, Netlify Forms) by adding an `action` to the form
- [ ] Local emergency vet resources (`contact.html`)

## Structure
```
css/styles.css   Theme colors live in :root at the top
js/main.js       Nav, stars, cat cards, filters, form
js/cats.js       Cat data
assets/          Logos (see below)
```

## Brand
**Primary logo: Spanish version (Garras Astrales).** The English version (Astral Claws) is saved for later use, such as an English-language page.

| File | Use |
|------|-----|
| `logo-garras-astrales.png` | Primary lockup, for light backgrounds (homepage hero) |
| `logo-garras-astrales-light.png` | Primary lockup, for dark backgrounds (footer) |
| `logo-mark.png` / `logo-mark-light.png` | Cats emblem alone (header, cat-photo placeholder) |
| `favicon.png` | Browser tab icon |
| `logo-astral-claws.png` | English lockup (not used on the site yet) |
| `logo-sheet-original.png` | Original logo sheet as supplied |

The PNGs were cut from the supplied sheet. A vector (SVG) or high-resolution original from the designer would look sharper on large screens.

Colors (from the logo, set in `css/styles.css`): espresso `#3d3431`, amber `#e9a048`, deep amber `#e08f28`, cream `#f8f1ec`, warm gray `#6e6763`.
Fonts: Cormorant Garamond (headings, matches the wordmark) and Nunito Sans (body text).
