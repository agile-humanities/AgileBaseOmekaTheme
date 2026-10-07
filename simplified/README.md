# Simplified Agile Base Theme

A drop-in Omeka S theme by Agile Humanities Agency. It works on any Omeka S 4.2 site, needs no modules and no
build step, and is configured through ordinary theme settings and CSS.

**This theme is generated.** Its stylesheet, scripts, templates and `config/theme.ini` are produced from the
Advanced Agile Base Theme ([AgileBaseOmekaTheme](https://github.com/agile-humanities/AgileBaseOmekaTheme)) by
`tools/build-simplified.js` in that repository, and should not be edited here: changes belong in the Advanced
theme's sources. `GENERATED.json` records which version they came from. The files that are yours to edit are
`custom.css` and `custom.js`, which the generator never overwrites.

## Setting it up

1. Copy the folder into `themes/` and choose the theme on the site's **Theme** page.
2. Under **Settings** on that page: upload a logo, pick colours for the palette slots (each slot has a role, described
   beside it), set fonts if the bundled ones do not suit, and fill in the footer.
3. Colour and font changes apply at once: the stylesheet reads them as CSS variables.

Browsers older than early 2023 cannot mix colours in CSS and show the theme's built-in palette instead of yours.

## Styling further

Put your own CSS in `custom.css`. `asset/css/theme-variables.css` lists every variable the stylesheet reads — the
palette, the derived colours and how they are made, the fonts, and the sizing variables you can read in your own
rules — with notes on which to change.

## With the Agile Theme Tools module

The theme declares itself to the module (`agile_base = "agile-base-simplified"` in `theme.ini`). With the module
installed, its **Colours and fonts** page and its custom-CSS layers (global and per site) work with this theme too.
The module's own blocks render with their basic styles; the Advanced theme is the one that styles them fully.

## What it covers

Core Omeka pages — home, site pages and the core page blocks, item browse and search results, item sets, the
item page with Omeka's resource page blocks — in the Advanced theme's layout, typography and cards. Pages and
blocks from other modules are not styled by this theme.

## Versions

Simplified and Advanced carry the same version number ({{version}}), aligned with Agile Theme Tools 2.x.

## Licence

CeCILL v2.1 — see `LICENSE.txt`.
