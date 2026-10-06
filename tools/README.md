# Theme tools

## css-variables.js

Makes the compiled stylesheet take its palette and fonts from CSS variables, so they can be changed in the
browser — by a few lines of CSS — without rebuilding the theme. The SASS is not touched.

```bash
node tools/css-variables.js            # writes asset/css/style.vars.css and a report; changes nothing else
node tools/css-variables.js --verify   # also proves it against a real build with a random palette
node tools/css-variables.js --write    # replaces asset/css/style.css and style.min.css
npm run release-css                    # full build, then --write --verify
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
