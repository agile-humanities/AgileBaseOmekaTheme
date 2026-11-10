# Simplified Agile Base Theme

## Who is this theme for?
This theme is recommended for all Omeka-S site administrators. It offers a clean, minimalist, responsive design with a colour palette inteded for customization through the Theme Settings user interface.

## Why are there two Agile Base Themes?
The Agile Advanced Base Theme is the foundation for Agile’s customized themes and is intended for experienced developers. 

This Simplified theme is intended as a drop-in Omeka-S theme. It needs no modules and no build step, and is configured through ordinary theme settings and CSS. It is derived from the Agile Advanced Base Theme and will evolve alongside it.

## Who made this theme?
This theme was designed and developed by Bill Kennedy at Agile Humanities Agency. It was supported by the [Pitts Theological Library](https://digital.pitts.emory.edu) and the (Creativity and COVID-19)[https://creativityandcovid19.org] project at the Michigan State University.


## Setting it up

1. Copy the folder into `themes/` and choose the theme on the site's **Theme** page.
2. Under **Settings** on that page: upload a logo, pick colours for the palette slots (each slot has a role, described beside it), set fonts if the bundled ones do not suit, and fill in the footer.
3. Colour and font changes apply at once: the stylesheet reads them as CSS variables.

Browsers older than early 2023 cannot mix colours in CSS and show the theme's built-in palette instead of yours.

## Styling further

Put your own CSS in `custom.css`. `asset/css/theme-variables.css` lists every variable the stylesheet reads — the
palette, the derived colours and how they are made, the fonts, and the sizing variables you can read in your own
rules — with notes on which to change.

## With the Agile Theme Tools module

The theme declares itself to the module (`agile_base = "agile-base-simplified"` in `theme.ini`). With the module
installed, its **Colours and fonts** page and its custom-CSS layers (global and per site) work with this theme too,
and the module's pages, blocks and partials — the item browse and item pages, the Agile page blocks, the resource
page blocks, the card display mode — use the Advanced theme's templates, which this theme carries and its stylesheet
was compiled for. With Advanced Search as well, search pages are the Agile search page; without the module they are
Advanced Search's own. What the module adds beyond that (per-site builds, the theme styling form) needs the Advanced
theme.

## What it covers

Core Omeka pages — home, site pages and the core page blocks, item browse and search results, item sets, the item page with Omeka's resource page blocks — in the Advanced theme's layout, typography and cards. Pages and
blocks from modules other than Agile Theme Tools and Advanced Search are not styled by this theme.

## Licence

CeCILL v2.1 — see `LICENSE.txt`.
