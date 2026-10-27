# Developing the Advanced Agile Base Theme

Read this before building anything. It covers what the build paths are, where each one writes, why generated
files live where they do, and how the Simplified theme is derived from this one.

## The two themes

- **Advanced Agile Base Theme** (this repository): the full theme — SASS built on the `stop14-themesystem-legacy`
  library, per-site builds, every setting. Requires the Agile Theme Tools module and its stack.
- **Simplified Agile Base Theme**: generated from this repository. Plain CSS that reads its palette and fonts from
  CSS variables, a small template subset, no build system, no module requirement. Its themers work in CSS.

The two share one source: this one. Fix things here, then regenerate.

## Build paths and where they write

| Build | Who runs it, when | Command | Writes to |
|---|---|---|---|
| Default build | A developer, before a release | `gulp build` | `./asset/` — committed, and shipped in the release zip |
| Variable-driven build | A developer, when the output must take CSS variables | `gulp build --variables` | `./asset/`, rewritten by `tools/css-variables.js` |
| Alternative configs | A developer working on several looks | `gulp build --config name`, `gulp build --all` | `./asset-<name>/` (legacy; still served if present) |
| Per-site build | An admin (Theme page or Easy Admin), or `build-site-themes.php` on the server | the module's build manager | `files/theme-assets/<theme>/<site>/…` |
| Colours and fonts, custom CSS | An admin, on save | none | `files/theme-assets/custom/*.css` |

The public site resolves assets in this order: the site's own build in `files/`, then a legacy `asset-<slug>`
inside the theme, then `./asset/`. Templates must therefore use the module's `siteAssetUrl` helper, never core's
`assetUrl`, for anything that can differ per site.

### The rule

**Never build into a theme folder on a server.** Everything generated at run time on a server — site builds,
custom CSS, the palette stylesheet — goes to `files/`. Everything generated at release time by us — this theme's
`./asset/` and the whole of the Simplified theme — goes into the theme and ships in the zip.

### Why generated files live in `files/`

- Omeka guarantees the web server can write there. The theme folder is deployed by a different user; building
  into it meant permission churn between root, the deploy user and www-data, and builds that failed silently.
- A theme update replaces the theme folder (Easy Admin's installer does this outright). Builds in `files/` survive.
- Deployed code stays apart from generated state: a build cannot dirty a checkout, and the theme's git status
  stays clean.
- Each build is staged (`<site>.building`), verified, then swapped in; the previous build is kept as `.previous`,
  a failed one as `.failed` with its log; a manifest records what it was built from.

The costs: nothing outside the module knows to look in `files/` (hence `siteAssetUrl`), there are two places to
check when debugging what a site serves, generated assets end up in `files/` backups, and a server that fronts
`files/` with nginx and X-Accel must serve `/files/theme-assets/` from disk. Omeka's own `.htaccess` serves any
existing file directly, so the Advanced Media proxy route is never reached for a build.

## The configuration file

`_00_main_configuration.yml` is converted to SASS at build time (js-yaml, in a temporary directory on the load
path; nothing is generated inside `source/`). Two rules the build will not warn you about:

- **Define a key before you use it.** The theme system evaluates a key when it is read, so `masthead_clearance:
  rv($edge_padding_factor)` written above `edge_padding_factor` takes the library's default. A plain build and a
  site build then differ, because a site build evaluates the whole file a second time. `tools/css-variables.js`
  compares the two and warns.
- **A partial alternative config does not cascade.** An `alt-config` file that sets only `clr2` does not change
  `impact: $clr2`. The module's site builds write the whole configuration, so they are unaffected; hand-written
  files should list every key that should follow.
- **Quote colours.** `clr1: #00BDD4` is a YAML comment; write `clr1: "#00BDD4"`.

## Deriving the Simplified theme

Planned (requirement D6 of the generic distribution); the pieces that exist are marked.

1. `gulp build --variables` — the plain build, then `tools/css-variables.js` rewrites the stylesheet so palette
   and fonts read from CSS variables, and writes `theme-variables.css` for themers. *Exists.*
2. A generator copies into the Simplified repository: `asset/` (CSS, scripts, fonts, images), the template
   subset, and a `theme.ini` declaring `agile_base = "agile-base-simplified"`. *To build.*
3. The Simplified repository commits `asset/` — there it is the product — and releases a zip.

End users of the Simplified theme never build. They use the module's "Colours and fonts" page (output in
`files/`), the custom CSS fields, or edit the CSS in a fork.

`tools/css-variables.js` is kept self-contained because it is expected to move into the
`stop14-themesystem-legacy` library once stable. Details in `tools/README.md`.

## Commands

```bash
npm install                              # once, in the theme folder (in the container on this project)
gulp build                               # default build → ./asset
gulp build --variables                   # the same, then CSS variables
gulp build --all                         # default + every alt-config/*.yml, summary, non-zero exit on failure
gulp sass                                # styles only
node tools/css-variables.js --verify     # prove the variable rewrite against a real rebuild with a random palette
```

On a server, as the web server's user, from the Omeka root:

```bash
sudo -u www-data php modules/AgileThemeTools/data/scripts/build-site-themes.php --all
```

On this project the builds run inside the Docker container (`docker exec -w /var/www/html/themes/<theme> …`):
the host's `node_modules` holds Linux binaries.

## Where things are documented

- Theme identity keys (`agile_*` in `theme.ini`) and forking: the module's `docs/THEME-IDENTITY.md`.
- The two styling pages and the palette stylesheet: the module's `docs/STYLING.md`.
- Per-site builds, the build panel and the command-line script: the module's `docs/THEME-BUILD.md`.
- Modules the stack depends on and their tested versions: the module's `docs/DEPENDENCIES.md`.
- Site-specific template variants (`<template>-<site-slug>.phtml`): `view/common/block-layout/section-introduction-title-example-site.phtml`.
