# Cubo

Website for **Cubo**, private dining, wilderness feasts and events in Melbourne, Victoria: Australian terroir × Asian heritage.

Plain HTML, CSS and JavaScript. No build step, no dependencies beyond Google Fonts.

## Run locally

Open `index.html` in a browser, or serve the folder so links and fonts behave as they will online:

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Deploy

Upload the whole folder to any static host (GitHub Pages, Netlify, cPanel…). The repository is named `cubo-culinary.github.io`, so with GitHub Pages enabled on `main` it is served at <https://cubo-culinary.github.io>.

## Pages

| File | Page |
|---|---|
| `index.html` | Home |
| `about.html` | About Cubo, philosophy, Meet Michelle (`#michelle`) |
| `experiences.html` | Private dining, wilderness feasts, bespoke gatherings, events, sample menu |
| `gallery.html` | Filterable photo gallery with a full-screen viewer |
| `collaborate.html` | Work with us: collaborations and consulting (`#consulting`) |
| `enquire.html` | Enquiry form ("Plan your gathering") |
| `journal.html` | Kept but not linked from the nav until there are posts |
| `journal-post.html` | Sample layout for a single Journal post (copy per story; `noindex`) |

The header and footer are copied into every page, so a change to either must be made in each HTML file.

After changing `css/style.css`, raise the `?v=` number on its link in every page so browsers fetch the new file instead of a cached one.

## Structure

```
css/style.css   all styles
js/main.js      header on scroll, mobile menu, scroll reveal, gallery filters and viewer, enquiry form
images/         photography, logos, favicon
404.html        page GitHub Pages shows for broken links (uses root-relative paths)
llms.txt        plain-text summary of Cubo for AI tools
```

## Design system

Everything is defined at the top of `css/style.css` in `:root`.

**Colours** (brand guide)

| Token | Value |
|---|---|
| `--ivory` | `#F4EFE6` |
| `--charcoal` | `#1C1B18` |
| `--sienna` (Burnt Sienna) | `#A94F36` |
| `--blue` (Powder Blue) | `#8FA5A8` |
| `--olive` | `#6B6F4A` |

**Type:** Cormorant Garamond (headings) and Jost (text), loaded from Google Fonts. Five sizes only; `--fs-sm` (12px) is the minimum text size.

| Token | Use |
|---|---|
| `--fs-xl` | Page and hero titles |
| `--fs-lg` | Section headings, quote |
| `--fs-md` | Lede, taglines, sub-headings |
| `--fs-body` | Running text, form fields |
| `--fs-sm` | Labels, nav, buttons, captions |

Use the existing classes (`.eyebrow`, `.btn`, `.link-arrow`, `.row`, spacing utilities such as `.pt-s` and `.mt-m`) rather than inline styles. The one inline style kept on purpose is a section's background image, set as `style="--bg:url('../images/…')"`.

## Photo credits

Stock photos from [Unsplash](https://unsplash.com/license), free to use without attribution; listed here so their source is on record.

| File | Used for | Photographer |
|---|---|---|
| `bush-2880.webp`, `bush-1000.webp` | About and sample post headers, home collage, gallery | [Mitchell Luo](https://unsplash.com/photos/Cip_dNOVI0A) |
| `bark-800.webp` | Home collage | [Jude Infantini](https://unsplash.com/photos/mI-QcAP95Ok) |
| `water-2880.webp`, `water-1000.webp` | Gallery header and gallery | [Sven van der Pluijm](https://unsplash.com/photos/52J7km2qTjk) |
| `wattle-800.webp` | Home collage, Journal tile | [E Hillsley](https://unsplash.com/photos/Dg_nlS2dDME) |

## Before launch

- [x] Michelle's portrait (`images/michelle-portrait-*.webp`, from `michelle_portrait.jpg`)
- [ ] Replace the rest of the photography with Cubo's own
- [ ] Replace placeholder text marked `<!-- EDIT -->`: Michelle's story, the sample menu dishes, journal posts
- [ ] Add Michelle's background to "Meet Michelle" on the About page: where Michelle trained or cooked, for how long, and what led to this food (two or three sentences)
- [ ] Connect the enquiry form to a real service
- [ ] Confirm the email address, Instagram/TikTok handles and pricing

## To do

- [ ] Consider adding testimonials or partners (real ones only) to the home page and the Work with us page
  - Partners to add: Plated Narratives, Alkira
- [ ] Build out the Journal page (`journal.html`, currently unlinked)
- [ ] Add the TikTok link to the footer once the account is active

## Once the domain is confirmed

- [ ] Add `robots.txt` and `sitemap.xml` (public pages only, not the Journal or 404)
- [ ] Add a canonical link to every page
- [ ] Add Open Graph and Twitter Card tags, with a 1200×630 preview image
- [ ] Add structured data (JSON-LD) on the home page: business name, founder, Melbourne and Victoria service area, email, both Instagram accounts
- [ ] Use full URLs in `llms.txt`

## Off-site

- [ ] Set up a Google Business Profile as a service-area business (Melbourne and Victoria)
- [ ] Keep the name, email and website link the same across both Instagram bios and the Google profile
- [ ] Add an FAQ once the answers are confirmed: minimum guests, travel area, booking lead time, dietary needs, pricing
- [ ] Collect real reviews on Google, to use as testimonials
