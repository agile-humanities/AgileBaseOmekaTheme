# Changelog

All notable changes to the Advanced Agile Base Theme are recorded here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow
[Semantic Versioning](https://semver.org/).

## [2.0.0] — 2026-10-30

First public release of the 2.x line, with Agile Theme Tools 2.0.0. Licence: CeCILL v2.1.

### Added

- Built on stop14-themesystem-legacy 3.x; per-site builds from the Agile Theme Tools admin (Configure theme
  styles, Install theme dependencies, Build this site), builds served from `files/theme-assets/`.
- Nine-colour palette with derived roles and contrast guarantees (README, "Colour Approach").
- Agile search pages for Advanced Search: the nine `view/search/*` templates forward to the module's Agile search
  page, so every search configuration gets the same faceted page; mobile filter panel and list/grid controls.
- Item pages from resource page blocks (Advanced media, heading, downloads, summary, full metadata) in the
  "Above Main" and "Main" regions; Mirador 4 with page links.
- Templates for every Agile Theme Tools block, the card display mode and the slide partials; site-specific
  variants through `sitePartial`.
- Long top menus wrap into right-aligned rows; mobile overlay navigation.
- `tools/build-simplified.js` generates the Simplified Agile Base Theme from this theme.
- `theme.jpg` and `screenshots/`.

### Changed

- The lint step of the gulp build is skipped when `.eslintrc` is absent, so a packaged theme always builds.
- `package.json` licence field: CECILL-2.1.
