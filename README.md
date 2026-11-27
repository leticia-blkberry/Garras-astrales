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
| `credits.html` | Credits for the icons, video and photos (linked from the footer) |
| `cat.html` | One page per cat, e.g. `cat.html?c=kaya`, built from `js/cats.js` (the name becomes the link: "Orión" → `orion`) |

## Updating the cats
Edit `js/cats.js`; each cat automatically gets a card on the Adopt page and its own page at `cat.html?c=<name>`. Each cat has a name, age group, traits, story, and optional photo.
Put photos in `assets/cats/` and set `photo: "assets/cats/luna.jpg"`. Set `featured: true` to show a cat on the homepage.

## Still to fill in
- [ ] Vector/high-res logo files from the designer
- [ ] Photos of Kaya, Beba and Gris (`assets/cats/`), and a fuller description of Gris
- [x] Impact numbers on the homepage (update in `index.html`, the `stat` blocks)
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

Homepage hero: the logo emblem acts as a window onto `assets/hero-cat.mp4` (720p, 12 s, no sound, 1.6 MB). `assets/logo-mask.png` cuts the video to the emblem's shape, and the video plays in its natural colours. `assets/hero-cat-poster.jpg` shows while the video loads.
Source: "A cat walking in jungle" from Pexels (https://www.pexels.com/video/a-cat-walking-in-jungle-13825391/). Free under the Pexels license; credit is appreciated but not required.

Homepage "How you can help" icons: `assets/icons/*.mp4` (looping, with a white background that `mix-blend-mode: multiply` drops) and `*.png` stills for visitors who turn off motion. Recolored to the logo's espresso and amber from Flaticon's free animated icons [cat](https://www.flaticon.com/free-animated-icon/cat_17092353), [pet love](https://www.flaticon.com/free-animated-icon/pet-love_17539345) and [altruism](https://www.flaticon.com/free-animated-icon/altruism_18654308). Flaticon's free licence requires a visible credit. The credit is on `credits.html`, linked as "Credits" in every page's footer. Keep that page and link unless you subscribe to Flaticon Premium.

Colors (set in `css/styles.css`): page background `#EDE8D0`, cards `#F7F4E8`, plus the logo's espresso `#3d3431`, amber `#e9a048`, deep amber `#e08f28`, cream `#f8f1ec` (light text on dark areas) and warm gray `#6e6763`.
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


## Accessibility (WCAG 2.1 AA / ADA)
The site is built to meet WCAG 2.1 level AA, the standard used for ADA compliance. Keep these in place when editing:
- **Contrast:** text on light backgrounds uses `--ink`, `--muted` or `--amber-text` (`#8a4b0b`). The bright amber (`--amber`, `--amber-deep`) is only for text on dark backgrounds or for decoration, never for text on cream.
- **Logo shadow (all pages):** near the end of each page it shrinks onto the footer logo's emblem, takes on its colours, and hands over to the real footer logo (positions in `EMBLEM_IN_LOCKUP` in `js/main.js`; re-measure them if the footer logo image changes). the emblem silhouette that follows the visitor down the page is capped at 7% opacity (`MAX_OPACITY` in `js/main.js`). `--muted` was darkened to `#5f5854` so grey text stays above 4.5:1 even where the shadow passes behind it; raise the opacity only after re-checking contrast. It is hidden for reduced motion and when animations are paused.
- **Motion:** every page has a "Pause animations" button in the top bar that stops all video and animation and remembers the choice. Visitors whose device asks for reduced motion start paused. Any new looping video or animation must respect the `motion-paused` class.
- **Keyboard:** "Skip to content" is the first tab stop, every control has a visible focus ring (espresso on light areas, amber on dark ones), and the phone menu is a real button.
- **Headings** must fit on one or two lines, never three, at any screen width. The homepage headline size is tuned for this; keep new headings short or check them at phone and desktop widths.
- **Structure:** one `h1` per page, headings in order, landmarks for top bar, header, nav, main and footer.
- **Links and forms:** links that open a new tab say so to screen readers, and every form field has a label; required ones say "(required)".
- **Images and video:** decorative images have empty `alt`; the hero and icon videos are silent and hidden from screen readers.

Checked with axe-core 4.10 (no violations at desktop and phone width on every page). Automated tools catch only part of WCAG, so a manual check with a screen reader (VoiceOver or NVDA) is worth doing before launch, and again whenever real cat photos are added: each needs meaningful `alt` text (set from the cat's name automatically).

## Mobile and screen sizes
Checked on every page (including cat pages) at every width from 280px to 2000px in 20px steps, plus common phone and tablet sizes: no sideways scrolling, nothing sticking out, no text under 12px, headings never longer than two lines, and every button or link at least 24×24px. The phone menu opens and closes with the Menu button, closes with Escape (focus returns to the button) or a tap outside, and resets when the window is widened to desktop.
