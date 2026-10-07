# Theme tools

## css-variables.js

Makes the compiled stylesheet take its palette and fonts from CSS variables, so they can be changed in the
browser — by a few lines of CSS — without rebuilding the theme. The SASS is not touched.

**Where it is used.** This is the output path of the Simplified Agile Base Theme, whose themers work in CSS: its
stylesheet is this tool's output. The Advanced theme builds plain compiled CSS by default — its themers configure
the theme system through the admin and rebuild, or edit the SASS — and runs the tool only when asked:

```bash
gulp build --variables          # build, then rewrite the stylesheet (works with --config/--dest and --all too)
npm run build:variables         # the same
```

**Future home.** Once stable, this belongs in the `stop14-themesystem-legacy` library, beside the colour
functions whose output it traces, so every theme built on the library can produce variable-driven CSS the same way.

```bash
node tools/css-variables.js            # writes asset/css/style.vars.css and a report; changes nothing else
node tools/css-variables.js --verify   # also proves it against a real build with a random palette
node tools/css-variables.js --write    # replaces asset/css/style.css and style.min.css
```

It needs the theme's `node_modules` and takes a minute or two: it compiles the styles once per palette colour
and font in `_00_main_configuration.yml`.

### What it does

The theme system works out every colour while it builds, so the built CSS holds finished values. The tool
compiles the styles again and again, each time with one palette colour or font changed, and watches which values
move and by how much. A value that moves with `clr2` follows `clr2`; one that moves 20% as far is 20% `clr2`
mixed with something else. Each such value is then replaced with a variable:

- a palette colour used as it is becomes `var(--colour--2)`;
- a mix becomes its own variable, defined once from the palette with CSS `color-mix()`. The library's names are
  kept where they exist (`--colour--neutral--20`), the rest are numbered (`--colour--derived-3`);
- a font list becomes `var(--font-base)`, `var(--font-heading)` and so on.

Sizes and spacing are left alone. They come from the modular scale and need a build.

### Restyling without a build

Set the palette variables after the theme's stylesheet:

```css
@supports (color: color-mix(in srgb, red, blue)) {
  :root {
    --colour--1: #663399;
    --colour--8: #1a1a2e;
    --font-heading: Georgia, serif;
  }
}
```

The `@supports` line matters. Browsers older than early 2023 cannot mix colours in CSS; for them every derived
colour keeps its built value. Wrapping the palette the same way gives those browsers the built palette throughout
rather than half of each.

### The report

`asset/css/style.vars.report.json` lists the inputs, every derived colour and how it is made, and anything the
tool could not explain. It is worth reading after changing SASS:

- **unexplained** — a value follows the palette but not as a simple mix (for example through `lighten()`), so it
  could not be made a variable and stays as built;
- **warnings** — the configuration refers to a key before the line that defines it;
- colours that follow nothing are hard-coded somewhere in the SASS.

`--verify` builds the theme with a random palette and compares every colour with what the variables give for the
same palette. It exits with an error if any differ.

## colour-audit.js

Inventories the theme's colour variables and traces where each is used — in the theme's SASS and in the parts of
`stop14-themesystem-legacy` that compile into it. It is the measuring instrument for the colour-roles work: run it
before and after a change to see whether colour usage became more consistent.

```bash
node tools/colour-audit.js                    # writes tools/colour-audit-output/{report.md, occurrences.csv, inventory.json}
node tools/colour-audit.js --out <dir>        # elsewhere
node tools/colour-audit.js --library <path>   # scan another checkout of the library (default: node_modules)
```

It compiles the theme once, exactly as gulp does, to learn which files are in the build, then once more with a probe
that prints every global variable's value, so colour variables are found by what they hold rather than by name. Each
file is then read line by line and every colour reference is classified by the property it colours (text, background,
border, SVG, shadow), or as an alias definition or mixin argument. The report also lists hard-coded colours, the
transforms (`mix`, `rgba` …) applied to palette colours, WCAG contrast of each colour against the white and black
points, and text/background pairs declared in one rule. Nothing in the theme is changed.

## build-simplified.js

Generates the **Simplified Agile Base Theme** from this theme (generic requirements D6/D7, decision 9: the Simplified
theme is derived, never hand-maintained). Default target: the sibling folder `../AgileBaseOmekaThemeSimplified`.

```bash
npm run build:simplified                                  # build with CSS variables, then generate
node tools/build-simplified.js --container <docker name>  # run the build inside the Omeka container
node tools/build-simplified.js --from <asset dir>         # reuse an existing --variables build
node tools/build-simplified.js --templates-only           # only the templates and theme.ini
node tools/build-simplified.js --target <dir>             # generate somewhere else
```

What it produces: `asset/` (the `--variables` build: stylesheet with `--colour--N`/`--font-*` variables,
`theme-variables.css`, scripts, fonts, images), a subset of `view/` for core Omeka pages and core blocks,
`config/theme.ini`, `README.md`, `GENERATED.json`, and a `custom.css`/`custom.js` created once and never overwritten.

The template subset is rewritten, not copied: every line that depends on Agile Theme Tools or another module is
replaced by a listed, exact substitution (per-site asset URLs → the theme's assets; the module's `valueDisplay`,
`propertyTerms` and `textSummary` helpers → inline stand-ins from `simplified/shims/`; Advanced Search's search
page → core item browse with full-text search; the module's font and custom-CSS injection → palette and fonts from
the theme's own settings, plus the module's CSS layers only when the module is present). A rewrite that no longer
matches, or any surviving module helper call, stops the generation with the file and line, so a change in the
Advanced templates cannot ship module code to the Simplified theme unnoticed.

Sources for the generated parts live in `simplified/`: `theme.ini` (settings for the palette slots by role,
fonts, logo, footer, card terms), `README.md`, `custom.css`, `shims/*.php`.
