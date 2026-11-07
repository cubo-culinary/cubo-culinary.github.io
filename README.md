# Cubo

Website for **Cubo**, private dining, wilderness feasts and events in Melbourne, Victoria: Australian terroir × Asian heritage.

Plain HTML, CSS and JavaScript. No build step and no dependencies; the fonts are hosted with the site.

## Run locally

Links between pages leave out `.html` (`/about`, not `/about.html`), so opening the files directly or using `python3 -m http.server` breaks navigation. Use the included server, which resolves those routes and shows `404.html` for missing pages, as GitHub Pages does:

```bash
python3 serve.py
```

Then visit <http://localhost:8000>.

## Deploy

Upload the whole folder to a static host that serves `about.html` at `/about`. GitHub Pages and Netlify do this by default; on other hosts, check before switching. The repository is named `cubo-culinary.github.io`, so with GitHub Pages enabled on `main` it is served at <https://cuboculinary.com.au> (set by the `CNAME` file), and <https://cubo-culinary.github.io> redirects there. The domain's DNS is in Namecheap (A records to GitHub Pages, `www` to `cubo-culinary.github.io`, and GitHub's verification TXT record); keep those records, or the site goes offline.

## Pages

| File | Page |
|---|---|
| `index.html` | Home |
| `about.html` | About Cubo, philosophy, Meet Michelle (`#michelle`) |
| `experiences.html` | Private dining, wilderness feasts, events (bespoke and shared), sample menu |
| `gallery.html` | Photo gallery with a full-screen viewer |
| `collaborate.html` | Work with us: collaborations and consulting (`#consulting`) |
| `enquire.html` | Enquiry form ("Plan your gathering") |
| `journal.html` | Journal: list of posts, newest first |
| `things-that-inspire-the-way-we-cook.html` | First Journal post, by Michelle |
| `journal-post.html` | Template for a new Journal post (not linked; `noindex`). Copy it and follow the checklist at the top of the file |
| `privacy.html` | Privacy policy, linked from the footer and the enquiry form |

The header and footer are copied into every page, so a change to either must be made in each HTML file.

After changing `css/style.css` or `js/main.js`, raise the `?v=` number on its link in every page so browsers fetch the new file instead of a cached one.

When a page's title or description changes, update its `og:title` / `og:description` too. A new public page needs a canonical link, the social tags and a line in `sitemap.xml`.

## Enquiries

The form on the Enquire page posts to [Web3Forms](https://web3forms.com), which emails each enquiry to cuboculinary@gmail.com with the visitor's address as reply-to, so a reply goes straight to them. The access key is in `js/main.js`; it is public by design (it can only send to Cubo's inbox) and can be replaced from the Web3Forms dashboard if it is ever misused. A hidden checkbox catches most spam bots. If sending fails, the visitor sees an error with the email address to write to instead.

The form's website URL in Web3Forms is set to `cuboculinary.com.au/enquire`. If test submissions from `localhost` or `cubo-culinary.github.io` are refused, change that setting while testing.

## Analytics

[Umami Cloud](https://cloud.umami.is), cookieless, so no consent banner is needed. The script is in the `<head>` of every page and only counts visits on `cuboculinary.com.au` and `cubo-culinary.github.io`, not local previews. Besides page views, `js/main.js` records:

| Event | When |
|---|---|
| `Enquiry sent` | Web3Forms confirmed the enquiry was sent, with the chosen experience and occasion |
| `Enquiry failed` | The enquiry did not send (network error or Web3Forms refused it), with the reason |
| `Enquire link` | Any link to the enquiry page, with the page and link text |
| `Instagram link` | Any Instagram link |
| `Email link` | The email address link |
| `Email copied` | A Copy button next to the email address, with the page |
| `Work with us link` | Any link to the Work with us page |

Visitors with ad blockers are not counted, so treat the numbers as a lower bound.

## Structure

```
css/style.css   all styles
js/main.js      header on scroll, mobile menu, scroll reveal, gallery viewer, enquiry form
images/         photography, logos, favicon
fonts/          Cormorant Garamond and Jost (WOFF2) with their licences
404.html        page GitHub Pages shows for broken links (uses root-relative paths)
llms.txt        plain-text summary of Cubo for AI tools
serve.py        local preview server with clean URLs
robots.txt      crawler rules and sitemap location
sitemap.xml     public pages for search engines
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

**Type:** Cormorant Garamond (headings) and Jost (text), self-hosted in `fonts/` (variable WOFF2 files from Google Fonts, SIL Open Font License; the licences sit beside them). The `@font-face` rules are at the top of `css/style.css`. Five sizes only; `--fs-sm` (12px) is the minimum text size.

| Token | Use |
|---|---|
| `--fs-xl` | Page and hero titles |
| `--fs-lg` | Section headings, quote |
| `--fs-md` | Lede, taglines, sub-headings |
| `--fs-body` | Running text, form fields |
| `--fs-sm` | Labels, nav, buttons, captions |

Use the existing classes (`.eyebrow`, `.btn`, `.link-arrow`, `.row`, spacing utilities such as `.pt-s` and `.mt-m`) rather than inline styles. Inline styles are kept for photo crop positions, and for a section's background image, set as `style="--bg:url('../images/…')"`.

## Adding photos

Each new photo gets the same treatment:

1. Crop it to suit where it sits, removing distractions.
2. Export WebP in a desktop and a smaller phone size, named `<name>-<width>.webp`, never wider than the original.
3. Give it a new file name when it replaces a photo, or browsers can keep showing the old one.
4. Use `srcset` and `sizes` on an `<img>`. For a banner, set `--bg` and `--bg-sm` on the section.
5. Check its brightness against the dark page. Photos at about 85 or more out of 255 get the `.dim` class (`.dim.strong` for very bright ones); the About strip uses a brightness filter instead.
6. Delete the original and any photos left unused.

## Photo credits

Stock photos from [Unsplash](https://unsplash.com/license), free to use without attribution; listed here so their source is on record.

| File | Used for | Photographer |
|---|---|---|
| `bush-2880.webp`, `bush-1000.webp`, `bush-800.webp` | About header and its phone version, home collage | [Mitchell Luo](https://unsplash.com/photos/Cip_dNOVI0A) |
| `bark-500.webp` | Home collage | [Jude Infantini](https://unsplash.com/photos/mI-QcAP95Ok) |
| `water-2880.webp`, `water-1000.webp` | Gallery header and its phone version | [Sven van der Pluijm](https://unsplash.com/photos/52J7km2qTjk) |
| `wattle-300.webp` | Home collage | [E Hillsley](https://unsplash.com/photos/Dg_nlS2dDME) |
| `firepit-2400.webp`, `firepit-1200.webp` | Home quote and Experiences header | [R.D. Smith](https://unsplash.com/photos/fire-on-brown-fire-pit-xGtkdXvt4k8) |
| `journal-banner-2400.webp`, `journal-banner-1200.webp` | Journal header | [Prasongsom Punyauppa-path](https://unsplash.com/photos/a-group-of-clay-pots-sitting-next-to-each-other-tByMZdZHMNA) |

## Before launch

- [ ] Have Michelle confirm the dish names, gallery captions and image descriptions, plus "Three small bites" on the sample menu
- [ ] Align Experiences with the services document: curated Private Dining, food-only scope note, Wilderness wording, and the four Events formats

## To do

- [ ] Consider adding testimonials or partners (real ones only) to the home page and the Work with us page
  - Plated Narratives (food photography, <https://www.instagram.com/platednarratives.au/>): credit their photos on the site ("Photography: Plated Narratives") once it is confirmed which are theirs
  - Alkira: add once its link is confirmed
- [ ] Once there are three Journal posts with photos, add a "From the Journal" section to the home page showing the latest three, just after Meet Michelle

## Off-site

- [ ] Set up a Google Business Profile as a service-area business (Melbourne and Victoria)
- [ ] Keep the name, email and website link the same across both Instagram bios and the Google profile
- [ ] Add an FAQ once the answers are confirmed: minimum spend, travel area, booking lead time, dietary needs
- [ ] Collect real reviews on Google, to use as testimonials
