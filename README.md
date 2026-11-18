# Garras Astrales Collective — Website

Website for **Garras Astrales Collective**, a cat-only rescue. Plain HTML/CSS/JS — no build step.
Open `index.html` in a browser to preview. Hosted on **SiteGround** (see below).

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
- [x] Instagram link
- [ ] Email and location (header/footer, `contact.html`)
- [ ] Donation + wishlist links (`get-involved.html`)
- [ ] Set the two email addresses at the top of `contact.php`
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

## Publishing on SiteGround

The site is plain files, so any SiteGround plan works. `contact.php` sends the contact form by email using SiteGround's built-in mail.

**1. Upload the files**
1. In SiteGround, open **Site Tools** for your domain, then **Site → File Manager**.
2. Open `public_html`. If SiteGround put a default `index.html` there, delete it.
3. Upload `garras-astrales-site.zip` (made with the command below), right-click it, choose **Extract**, then delete the zip.
   `index.html` should sit directly inside `public_html`, not in a subfolder.
   `.htaccess` starts with a dot, so File Manager may hide it. Turn on "show hidden files" to check it's there.

Other ways in: **Site → FTP Accounts** (FileZilla, etc.) or **Devs → Git** on plans that include it.

**2. Set up the contact form email**
1. **Email → Accounts**: create a sending address on your domain, e.g. `website@yourdomain.org`.
2. In File Manager, edit `contact.php` and set `$TO` (where messages should go) and `$FROM` (that new address).
3. Send a test message from the Contact page. Check spam the first time.

**3. HTTPS**
**Security → SSL Manager**: make sure a free Let's Encrypt certificate is installed. `.htaccess` then redirects every visitor to `https://`.

**Making the upload zip** (from the project folder):
```
zip -r garras-astrales-site.zip . -x '.git/*' 'README.md' 'assets/logo-sheet-original.png'
```
For later updates, upload just the changed files to the same place in `public_html`, replacing the old ones.

### Server files
| File | Purpose |
|------|---------|
| `contact.php` | Emails contact-form messages; includes spam protection |
| `.htaccess` | HTTPS redirect, 404 page, caching, hides private files |
| `404.html` | "Page not found" page |
