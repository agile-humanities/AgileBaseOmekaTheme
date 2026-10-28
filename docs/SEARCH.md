# Search in the Advanced theme

Advanced Search owns searching (configurations, filters, engines, suggestions). Agile Theme Tools ships the Agile
search page as templates under its `view/search/agile/` (the module's `docs/SEARCH.md`). This theme's job is to
make sure that **every** Advanced Search configuration on a site renders as that page, whatever an administrator
sets on it, and to style the page.

## The template overrides

Omeka searches a theme's `view/` before any module's, so this theme's `view/search/` overrides the templates
Advanced Search renders by default:

| Advanced Search template | rendered as |
|---|---|
| `search/search` (the page, when the configuration names no theme template) | `search/agile/search` |
| `search/search-form-main`, `search/search-form-main-headers` (the stock form adapter) | `search/agile/form`, `search/agile/form-headers` |
| `search/results`, `search/results-header-footer`, `search/facets-list` | the Agile partials of the same name |
| `search/facet-actives`, `search/facet-checkboxes`, `search/facet-links` | the Agile partials of the same name |

Each override is one line: it forwards the variables Advanced Search passes to the Agile partial. There is still
one implementation, in the module; the theme decides that it is the only one a visitor sees.

Consequences:

- **The configuration Advanced Search creates at install (`find`, the stock form and page) looks right out of
  the box.** Nothing has to be switched to the Agile form adapter or the Agile template for the page to be styled.
- **The form adapter and the theme-template setting make no visual difference on this theme.** Choosing *Agile
  Theme Tools* as the form still has a purpose on other themes (it gives them the Agile form and page); here it
  is harmless either way.
- **Other display settings keep working.** The Agile partials read the same configuration keys the stock
  templates do: where the sort, pagination, per-page, filter and grid/list controls sit (header, footer, both,
  none), the facet position (before or after the results) and mode (button or link), the active-facet, refine
  and expand options, the labels, the suggester. An administrator can change them on the configuration page and
  the page stays coherent. Facet types the Agile partials do not draw themselves (ranges, selects) are rendered by
  Advanced Search's own partials and styled by this theme's facet rules.
- **The Simplified theme and third-party themes are untouched.** They have no `view/search/` and get Advanced
  Search's stock page, which is theirs to style. Agile Theme Tools does not impose the Agile markup on them.

## Keeping up with Advanced Search

Advanced Search is pinned in the module's dependency manifest (`config/dependencies.php`; the tested version is
what the M5 install rehearsal ran). Its templates change between releases, so the Agile partials are reconciled
with the stock ones whenever the pin moves:

1. `dev-tools/search-template-diff.py` (in the generic workspace) compares the interface of each stock template
   with its Agile counterpart: the configuration keys read, the partials rendered, the view variables and helpers
   used. Anything the stock template uses that the Agile one does not is listed, so the reconciliation is a
   checklist.
2. The dependency audit (Admin > Modules, and Easy Admin > Check and fix > Agile modules) warns when the installed
   Advanced Search is newer than the pinned one, with the note that templates may have changed.

## Styling

The page's markup is the module's; the rules are this theme's, in `source/sass/40_ui/` (`_form_advanced_search`,
`_facets`, `_form_composition` and the search parts of the layout files). The form is laid out by the form
composition library (`docs/FORM-COMPOSITION.md`); facets, chips and the results header follow the design review
(`_design_review_2026-10-19_README.md` in the workspace, sections G and H).
