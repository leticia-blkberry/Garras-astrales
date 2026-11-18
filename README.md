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
assets/logo.svg  Placeholder logo
```
