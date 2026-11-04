# Cubo

Website for **Cubo**, private dining, wilderness feasts and events in Melbourne, Victoria: Australian terroir × Asian heritage.

Plain HTML, CSS and JavaScript. No build step, no dependencies beyond Google Fonts.

## Run locally

Links between pages leave out `.html` (`/about`, not `/about.html`), so opening the files directly or using `python3 -m http.server` breaks navigation. Use the included server, which resolves those routes and shows `404.html` for missing pages, as GitHub Pages does:

```bash
python3 serve.py
```

Then visit <http://localhost:8000>.

## Deploy

Upload the whole folder to a static host that serves `about.html` at `/about`. GitHub Pages and Netlify do this by default; on other hosts, check before switching. The repository is named `cubo-culinary.github.io`, so with GitHub Pages enabled on `main` it is served at <https://cubo-culinary.github.io>, and at the custom domain <https://cuboculinary.com.au> once that is pointed at it.

## Pages

| File | Page |
|---|---|
| `index.html` | Home |
| `about.html` | About Cubo, philosophy, Meet Michelle (`#michelle`) |
| `experiences.html` | Private dining, wilderness feasts, events (bespoke and shared), sample menu |
| `gallery.html` | Filterable photo gallery with a full-screen viewer |
| `collaborate.html` | Work with us: collaborations and consulting (`#consulting`) |
| `enquire.html` | Enquiry form ("Plan your gathering") |
| `journal.html` | Kept but not linked from the nav until there are posts |
| `journal-post.html` | Sample layout for a single Journal post (copy per story; `noindex`) |
| `privacy.html` | Privacy policy, linked from the footer and the enquiry form |

The header and footer are copied into every page, so a change to either must be made in each HTML file.

After changing `css/style.css` or `js/main.js`, raise the `?v=` number on its link in every page so browsers fetch the new file instead of a cached one.

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
js/main.js      header on scroll, mobile menu, scroll reveal, gallery filters and viewer, enquiry form
images/         photography, logos, favicon
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
- [ ] Replace placeholder text marked `<!-- EDIT -->`: the sample menu dishes, journal posts
- [x] Add Michelle's background to "Meet Michelle" on the About page: where Michelle trained or cooked, for how long, and what led to this food (two or three sentences)
- [x] Connect the enquiry form to a real service (Web3Forms)
- [ ] Review the Privacy page (`privacy.html`) and confirm it matches how Cubo handles enquiries
- [x] Confirm the email address and Instagram handles (pricing stays off the site)

## To do

- [ ] Consider adding testimonials or partners (real ones only) to the home page and the Work with us page
  - Partners to add: Plated Narratives, Alkira
- [ ] Build out the Journal page (`journal.html`, currently unlinked)

## Domain: cuboculinary.com.au

- [x] Add `robots.txt` and `sitemap.xml` (public pages only, not the Journal or 404)
- [x] Add a canonical link to every public page, using the clean URL (`/about`, not `/about.html`), since GitHub Pages serves both
- [x] Add Open Graph and Twitter Card tags, with a 1200×630 preview image (`images/share-1200x630.jpg`)
- [x] Add structured data (JSON-LD) on the home page: business, Michelle as chef and founder, Melbourne and Victoria service area, email, both Instagram accounts
- [x] Use full URLs in `llms.txt`
- [ ] Point the domain at GitHub Pages at the registrar: A records for `cuboculinary.com.au` to 185.199.108.153, 185.199.109.153, 185.199.110.153 and 185.199.111.153, and a CNAME for `www` to `cubo-culinary.github.io`
- [ ] Once `dig cuboculinary.com.au +short` shows those four addresses, add a `CNAME` file at the root containing `cuboculinary.com.au` and push. Not before: GitHub then redirects cubo-culinary.github.io to the domain, so a domain that does not resolve yet takes the site offline
- [ ] In the repository's Settings → Pages, enter `cuboculinary.com.au` as the custom domain and turn on Enforce HTTPS once it is offered
- [ ] Once live, submit `https://cuboculinary.com.au/sitemap.xml` in Google Search Console and check a share preview (for example by pasting a link into a message)
- [ ] When a page's title or description changes, update its `og:title` / `og:description` too; new public pages need a canonical link, the social tags and a line in `sitemap.xml`

## Off-site

- [ ] Set up a Google Business Profile as a service-area business (Melbourne and Victoria)
- [ ] Keep the name, email and website link the same across both Instagram bios and the Google profile
- [ ] Add an FAQ once the answers are confirmed: minimum spend, travel area, booking lead time, dietary needs
- [ ] Collect real reviews on Google, to use as testimonials
