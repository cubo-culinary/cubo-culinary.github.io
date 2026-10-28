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
| `experiences.html` | Private chef, private dining, wilderness feasts, bespoke gatherings, events, sample menu |
| `gallery.html` | Filterable photo gallery with a full-screen viewer |
| `collaborate.html` | Work with us: collaborations and consulting (`#consulting`) |
| `enquire.html` | Enquiry form ("Plan your gathering") |
| `journal.html` | Kept but not linked from the nav until there are posts |

The header and footer are copied into every page, so a change to either must be made in each HTML file.

## Structure

```
css/style.css   all styles
js/main.js      header on scroll, mobile menu, scroll reveal, gallery filters and viewer, enquiry form
images/         photography, logos, favicon
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

## Before launch

- [ ] Replace photography with Cubo's own, starting with Michelle's portrait (`images/michelle.jpg`)
- [ ] Replace placeholder text marked `<!-- EDIT -->`: Michelle's story, the sample menu dishes, journal posts
- [ ] Add Michelle's background to "Meet Michelle" on the About page: where Michelle trained or cooked, for how long, and what led to this food (two or three sentences)
- [ ] Connect the enquiry form to a real service
- [ ] Confirm the email address, Instagram/TikTok handles and pricing

## To do

- [ ] Consider adding testimonials or partners to the home page (real ones only)
- [ ] Build out the Journal page (`journal.html`, currently unlinked)
- [ ] Add the TikTok link to the footer once the account is active
