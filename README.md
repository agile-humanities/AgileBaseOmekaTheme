# Agile Advanced Base Theme v2.0

## Who is this theme for? 
This theme is for experienced Omeka-S administrators and front-end developers. It is targeted at projects that have demanding design and functional needs. It is recommended that the Advanced Theme be built on a host that provides access to the command line and the ability to install command-line software such as NPM.

**We recommend the Agile Simplified Base Theme for most site administrators.**

## What does this theme do?
This theme works in conjunction with the Agile Theme Tools version 2 module to provide a foundation/scaffold for theme development and Omeka-S site building. It is designed to be integrated with several key modules, including Advanced Media, Advanced Search, Mirador, IIIF Server, and Image Server.

Here is a quick list of some of its features.

- An elegant, minimalist visual approach intended to be customized by theme develpers.
- A built-in design system, with targeted classes to ensure colour contrasts, buttons, icons, form elements, and more.
- A mathematical approach to visual proportion and font sizing based on the the [Modular Scale](https://www.modularscale.com).
- A fully configurable User Interface accessible through Omeka to change fonts, colours, and sizes based on the design system. This UI audits your colours for sufficient contrast between foreground and background elements.
- The ability to create site-specific templates, colour palettes, and fonts (via the Agile Theme Tools modules)
- A number of new content blocks and resource blocks (as outlined in the Agile Theme Tools module)
- New structural concepts, such as page regions (following Drupal’s Region convention) and content Card presentations with thumbnails, descriptions, and metadata.
- A setup script via Easy Admin to build a standard homepage, Advanced Search page, and Item page.
- Integration with the Advanced Media module to provide a flexible approach to media presentation.
- The ability to configure Metadata lists.

## Who made this theme?
This theme was designed and developed by Bill Kennedy at Agile Humanities Agency. It was supported by the [Pitts Theological Library](https://digital.pitts.emory.edu) and the (Creativity and COVID-19)[https://creativityandcovid19.org] project at the Michigan State University.


## How does this theme work?
This theme is based on a SASS library used across many of Agile’s projects. It relies on the Node Package Manager (NPM) and a command-line build system that processes SASS and produces site-specific CSS files. CSS files are saved in the files folder and loaded by the theme.

The Agile Theme Tools module provides a user interface for configuration that runs this the build process as an Omeka-S background job.

# Quickstart: The Standard Agile Install

## What you need

| | Tested with | Notes |
|---|---|---|
| Omeka S | 4.2.1 | 4.2.0 or later |
| PHP | 8.3 | ImageMagick with PDF reading allowed (Debian's policy.xml blocks it; without it PDFs get no thumbnail) |
| Node.js + npm *(Advanced only)* | 16.20 (builds with a warning) | 18 or later recommended; the web server user must be able to run them |
| Solr *(optional)* | 9 | For the "Agile filters with Solr" search page; the other two search pages work without it |

Modules, at the versions the release was tested with (newer minor versions are reported as "ahead of the pinned
version", not blocked):

| Module | Version | Role |
|---|---|---|
| Common | 3.4.94 | Shared library for the Daniel-KM modules; install first |
| Easy Admin | 3.4.50 | Installs the other modules, runs tasks and cron jobs |
| Log | 3.4.42 | Job logs in the admin |
| Reference | 3.4.64 | Facet counts |
| Advanced Search | 3.4.66 | Search pages, facets, the main search form |
| Search Solr *(optional)* | 3.5.75 | Solr engine for Advanced Search (Daniel-KM's: three catalogue entries share the folder name) |
| IIIF Server | 3.6.34 | Manifests for the viewers |
| Image Server | 3.6.26 | Tiles for deep zoom |
| Mirador | 3.4.17 | The item viewer (Mirador 4) |
| Advanced Media | 1.0.0 | Media display blocks, PDF/ePub/audio/transcripts, page links in Mirador, optional media proxy |
| Static Sitemaps | 1.0.0 | Sitemaps as static files |
| Agile Theme Tools | 2.0.0 | Page blocks, item page blocks, cards, search pages, theme styling and builds, site presets |
| Advanced Agile Base Theme / Simplified Agile Base Theme | 2.0.0 | The two themes |

Optional, supported when present: Amazon S3 (file store; activating it makes it the file store), Numeric Data
Types, Item Sets Tree, Mapping, Universal Viewer.

## Steps

1. **Install Omeka S.** Unzip the Omeka S release, point `config/database.ini` at the database, open the site and
   complete the web installer (an administrator account and the installation title).
2. **Common and Easy Admin by hand.** Unzip the two release zips into `modules/`, then on Admin > Modules install
   Common, then Easy Admin. This is the only manual module install.
3. **The rest through Easy Admin.** Easy Admin > Modules lists the omeka.org and Daniel-KM catalogues: install Log,
   Reference, IIIF Server, Image Server, Mirador, Advanced Search, and (for Solr) Search Solr — pick the entry from
   `github.com/Daniel-KM/Omeka-S-module-SearchSolr`. Install Advanced Media, Static Sitemaps and Agile Theme Tools the
   same way once they are listed; until then unzip their release zips into `modules/`. Then on Admin > Modules install
   each, in the order above (Agile Theme Tools last: it checks the others and shows the result on the Modules page).
4. **Themes.** Unzip the Advanced and Simplified theme zips into `themes/` (or use Easy Admin > Themes).
5. **Sites.** Create a site for each theme (Sites > Add site, then its Theme page). Site settings worth setting now:
   the file allowlist, if transcripts are used (Settings > Security: add the `vtt` extension and the `text/vtt`
   media type); the site's logo (Theme page > Edit theme settings).
6. **Solr** *(optional)*: create a core (the rehearsal uses `omeka`), reachable from the web server, e.g.
   `http://localhost:8983/solr/omeka`.
7. **The standard pages.** Easy Admin > Checks and fixes > **Agile site setup**: choose the site, tick the presets
   — *Item pages* (the item page blocks and the Mirador preset), *Homepage* (slide viewer, introduction, three recent
   items), *Search pages* (three search pages with the same facets; with a Solr core URL the Solr page becomes the
   site's main search and is indexed), *Block test pages* (every block, and a section with three child pages) — and run.
   Presets replace pages by slug, so they can be rerun. Add a few items with images to the site first: the homepage
   slides and recent items come from them.
8. **Build the Advanced theme** *(Advanced only)*. Settings > Theme styling and builds: the Node.js executable, if it
   is not on the web server's PATH. Then on the site's Theme page: **Install theme dependencies (npm install)**,
   then **Build this site** (both run as jobs; the page shows the checks, the progress and the result). The built
   stylesheet is served from `files/theme-assets/<theme>/<site>/`; nothing is written inside the theme folder.
   Easy Admin > Checks and fixes > **Theme builds** does the same for every site at once.
9. **Colours and fonts.** Advanced: Theme page > **Configure theme styles** (palette, fonts, type scale, layout),
   save, then **Build this site** again. Simplified: Theme page > **Colours and fonts**; saved colours apply at once,
   no build. Both themes: **Configure resource pages** for the item page blocks, and the site's custom CSS field on
   the Theme page for anything else.
10. **Sitemaps.** Static Sitemaps settings (which sites and resources to include), then generate: Easy Admin >
    Regular tasks, or the cron line from the Static Sitemaps README. Add the sitemap to `robots.txt`.
11. **Check.** Browse the homepage, the three search pages, an item page (Mirador with page links for a multi-page
    item), the block test pages and the sitemap. Admin > Modules shows the dependency audit; the site's Theme page
    shows the build state.

## Optional

- **Amazon S3**: install, configure, run a test upload; Advanced Media's media proxy serves S3 media through the site.
- **Long menus**: the Advanced theme wraps a long top menu into right-aligned rows; test with ten or more pages.
- **Site-specific templates**: copy any template the theme renders through `sitePartial` as `<name>-<site-slug>.phtml`
  to specialise it for one site.
- 
## Notes
- Additional documentation on the SASS theme system to come.

# Additional Details

## Configurability

### Theme Settings
The file has no grouping keys; the order and the comments give these groups. Exact labels:

| Group | Setting | Label | Type / note |
|---|---|---|---|
| Navigation | `nav_depth` | Top Navigation Depth | Number, 0 = all levels |
| Styling | `configurable_site_theme` | Use theme configuration | Checkbox, on by default; enables the styling form and the site build |
| Identity | `logo` | Logo | Asset |
| | `welcome_logo` | Site welcome banner logo | Asset |
| Footer | `footer_logo` | Footer Logo | Asset |
| | `footer` | Footer Content | HTML, default "Powered by Agile Humanities" |
| | `footer_links` | Footer Links | HTML |
| | `subfooter_html` | Sub-footer text | HTML |
| | `copyright` | Copyright statement | HTML |
| | `footer_sponsor_logos` | Footer Sponsor Logos | Asset |
| | `footer_sponsor_html` | Sponsor Area HTML | HTML |
| Related items | `related_items` | Related Items | Number, default 6; "not displayed yet" |
| | `related_items_type` | Related Items Field | Text |
| Metadata | `card_terms` | Card Terms | PropertyList (module element) |
| | `key_terms` | Item Summary Key Terms | PropertyList |
| | `full_metadata_tab` | Full Metadata tab in the Item Summary | Checkbox, off |
| | `full_metadata_terms` | Full Metadata Terms | PropertyList with "add all" |
| Search | `search_placeholder` | Search box placeholder | Text |
| Fonts | `font_embed` | Other font embed code | Text; not for Google fonts |

## Colour Approach

The theme is coloured from nine palette slots, each with a role. Everything else — surfaces, text colours, neutrals, hover states — is derived from them by rule when the theme is built, so a palette change keeps every pairing legible. The palette and the rules live in `_00_main_configuration.yml` (section 01); the rules are evaluated by the Agile Theme Tools module (`src/Styling/ColourExpression.php`, `src/Styling/ColourRoles.php`).

### The palette

| Slot | Role | Default |
|---|---|---|
| `clr1` | Primary brand colour (`brand_primary`, also the primary brand surface) | `#00BDD4` |
| `clr2` | Secondary brand colour (`brand_secondary`, also the secondary brand surface) | `#BF609B` |
| `clr3` | Dark surface (`surface_dark`): panels on the dark side | `#0E3A40` |
| `clr4` | Light surface (`surface_light`): panels on the light side | `#EAF3F4` |
| `clr5` | Visual impact (`visual_impact`): buttons and calls to action | `#D98536` |
| `clr6`–`clr9` | Accents, free for the site's own use | `#315FAA`, `#7DBF60`, `#E1BB0B`, `#E5336D` |

Brand colours are used as the brand gives them: they are tested against every surface, never altered.

### Fixed points and the continuum

| Name | Value | Role |
|---|---|---|
| `black` | `#00171A` | The blackpoint: body text on the light side, the darkest surface |
| `white` | `white` | The whitepoint: body text on the dark side, the page background |
| `true_black` | `#000000` | Reserved for places that need pure black (viewers, overlays) |
| `on_light` / `on_dark` | `$black` / `$white` | Text on the light and dark sides |
| `error_colour` / `error_colour_on_dark` | `#B42318` / `#F97066` | Error text on each side, fixed |

The surfaces form one continuum, `black | surface_dark | surface_light | white`: the page is white and the blackpoint its inverse; the two surfaces are a step in from each end, for panels that stand out without contrasting. Neutrals are mixes along it (`neutral(n)` mixes black and white by percentage).

### Derived roles

| Role | Rule | What it does |
|---|---|---|
| `on_impact` | `on-colour($visual_impact)` | Text on the impact colour: tries the side's text colour, then the other side's, then black and white, and keeps the first that reads |
| `on_brand`, `on_brand_secondary` | `on-colour(...)` of each brand surface | Text on the two brand surfaces, chosen the same way |
| `brand_primary_on_light`, `brand_primary_on_dark` | `ensure-contrast($brand_primary, surface)` | The primary colour as text: unchanged when it reads on that side, otherwise darkened (light side) or lightened (dark side) in 2% steps until it does |
| `brand_secondary_on_light`, `brand_secondary_on_dark` | `ensure-contrast($brand_secondary, surface)` | The same for the secondary colour |

A colour "reads" at a contrast of 4.5:1 or better (the WCAG body-text ratio); a colour counts as light when its luminance is above 0.18. The four `brand_*_on_*` roles can be replaced with a brand-approved tint in the module's styling form; leave them empty for the automatic variant.

### Guaranteed pairs

Eleven pairs are checked at build time and on the styling form, and any below 4.5:1 is reported as a configuration to fix:

| Text | On | |
|---|---|---|
| `black` | `white`, `surface_light` | the blackpoint on the light side |
| `on_light` | `white`, `surface_light` | text on the light side |
| `white` | `black`, `surface_dark` | the whitepoint on the dark side |
| `on_dark` | `black`, `surface_dark` | text on the dark side |
| `on_impact` | `visual_impact` | text on the impact colour |
| `on_brand` | `surface_brand` | text on the primary brand surface |
| `on_brand_secondary` | `surface_brand_secondary` | text on the secondary brand surface |

Brand colours themselves are not guaranteed against every surface. The form shows, for each, where it may be used as it is: as body text, as large text and interface parts, or only as an accent that carries no text.

### How a colour change is applied

| | Advanced theme | Simplified theme |
|---|---|---|
| Where | Site > Theme > **Configure theme styles** (the module's styling form) | Site > Theme > **Colours and fonts** |
| Then | **Save**, then **Build this site**: the build compiles the finished values into the site's stylesheet (no CSS variables in it) | Nothing: the stylesheet reads its palette from CSS variables, and the derived roles are recomputed at once with the same rules |
| Needs | Node.js and npm on the server (see Quickstart) | Nothing beyond PHP |

Deprecated aliases `impact` and `cta` (2026-10-07) still resolve to the brand roles for older stylesheets.

## Licence

CeCILL v2.1 — see `LICENSE.txt`.
