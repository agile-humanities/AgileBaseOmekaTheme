# Form composition (stop14)

The form composition system organises form elements into aligned rows and columns. It is written in this theme
(`source/sass/40_ui/10_components/_form_composition.sass` — the placeholders and mixins; `source/sass/40_ui/
_form_composition.sass` — the classes) to graduate into stop14-themesystem-legacy. The plan and the reasoning are in
the workspace's `_form_library_plan_README.md`.

## Vocabulary

```
form.s14-form                         the composed form (any container can be composed)
  .form-messages                      validation summary (role="alert"), above the rows — optional
  .form-columns > .form-column        two columns, 50/50 from tablet, stacked below (left first) — optional
    .form-row                         1–6 cells; --form-cells: N (or .form-row--N; hand-written rows are counted)
      .field                          a cell: Omeka's row — .field-meta (label) + .inputs (control)
                                      [+ .field-description] [+ ul.field-messages]
      .field.form-cell--fit           content width (actions, short selects)
      .field.form-cell--w4            4 characters wide (also 2, 6, 8, 12, 20)
      fieldset.field.field-group      a radio / checkbox group: legend = label, options inline;
                                      .form-cell--options-stacked stacks them
  .form-actions                       buttons, left-aligned, content width
```

Modifiers on a row: `.form-row--fit-last`, `.form-row--fit-first` (the common fit cases for hand-written rows),
`.form-row--stack` (one column at every width). A row with other fit cells sets its own tracks:
`style="--form-row-columns: auto auto minmax(0, 1fr) auto"`.

## How alignment works

A row is a CSS grid with equal columns and one gap. Each cell is a subgrid spanning the row's four tracks — label,
control, description, messages — with each child pinned to its track. Labels align, controls align, a long
description or an error message pushes the whole row taller, and a cell without a label still puts its control on
the control line. Browsers without subgrid get a flex fallback with a one-line label slot (there is no polyfill for
subgrid; support is Firefox 71+, Safari 16+, Chrome 117+).

Spacing: the row has one column gap and no row gutter, so a cell's empty tracks (no description, no message) take
no space — the only spacing below a control line is the next row's margin. The label, description and messages
carry their own spacing as margins (`$form_cell_track_gap`, the yml `text_element_spacing`); lines of cells
(stacked below tablet, wrapped at tablet) are spaced by a margin on the cells that start a line; rows by
`.form-row + .form-row`. (Measured before the change: 37px of dead space under every control line, from the two
empty tracks' gutters.)

Breakpoints: below `$tablet` every row stacks; from `$tablet`, rows of 4–6 cells wrap two per line, and inside
`.form-columns` any row above `form_columns_max_cells` (yml, 2) wraps two per line at every width; from `$desktop`
rows render as declared.

The cell is the sizing authority: text inputs, selects, textareas, Select2 and Chosen containers fill it. Checkboxes
and radios keep their size.

## The writer

AgileThemeTools' `formLayout($form)` composes a Laminas form into this vocabulary (`View\Helper\FormLayout`,
`renderComposed()`). The order of authority: an explicit spec `['rows' => [['q'], ['a', 'b', 'c'], 'actions']]`
(a row may be `['names' => [...], 'fit' => ['c'], 'stack' => true]`); then each element's own hint
`'form_layout' => ['cell' => 'fit'|'full'|'compact'|'w4', 'row' => 'new', 'options_stacked' => true]` in its
options; then the packing rules — full-width kinds (text without a `size`, search, textarea, multi-text, double
range, collection, fieldset, unknown, a group of more than 4 options) take a row each; compact kinds (select, number,
checkbox, range, short text, small group) fill rows of up to `max_cells` (3). Buttons go to `.form-actions`
(`'actions_outside' => true` when the template places them); hidden elements render after the rows. The writer sets
`--form-cells` and `--form-row-columns`, so the stylesheet never counts.

## Validation

Server side: elements with messages get `.field-has-error` and their messages in `ul.field-messages` (the fourth
track); the writer renders `.form-messages` above the rows from the form's messages, each a link to its cell.
Client side: `source/js/s14FormValidation.js` does the same on submit from the browser's constraint API (required,
type, pattern, min/max) for any `form.s14-form`, clears a cell as its control becomes valid, and focuses the first
invalid control. Add `data-s14-validate` to suppress the browser's own bubbles. Tokens: `error_colour`,
`error_colour_on_dark` (yml).

## Fixture

`dev-tools/sample-forms.php` builds the page "Sample: forms" on the test sites: rows of 1–6 cells, alignment cases,
fit cells, groups, two columns, actions and a validation demo.
