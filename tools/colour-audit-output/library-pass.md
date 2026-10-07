# Library pass: direct uses of the fixed points and the old aliases (report only)

Generated 2026-10-07 from the colour audit of `stop14-themesystem-legacy` (the edited checkout, as copied into the theme). Nothing changed. Each use gets a suggested disposition under the continuum `$black | $surface-dark | $surface-light | $white`: canvas uses stay; text and borders on a side can take the side's text colour so a designer may soften them; brand aliases and direct slots move to the brand roles.

| | Compiled into the theme | Not in this build |
|---|---|---|
| `$black` | 49 | 35 |
| `$white` | 34 | 38 |
| `$true_black` | 1 | 0 |
| `$impact` / `$cta` | 22 | 9 |
| link aliases | 9 | 1 |
| direct slots `$clrN` | 36 | 12 |

## Suggested dispositions (compiled files)

| Disposition | Uses |
|---|---|
| configuration default — keep | 48 |
| role machinery | 35 |
| text on the light side → $on-light | 14 |
| function/control logic — keep | 12 |
| the roles check itself — keep | 8 |
| link alias — follows the theme configuration; keep | 7 |
| mixin parameter default — keep | 4 |
| border on the light side → $on-light or neutral() | 4 |
| direct slot → brand role | 4 |
| text on the dark side → $on-dark | 3 |
| → $brand-secondary-on-light/dark | 3 |
| export — keep | 2 |
| → $brand-secondary | 2 |
| canvas — keep, or $surface-light if it is a panel | 2 |
| → $brand-primary | 1 |
| border on the dark side → $on-dark | 1 |
| canvas inverse — keep, or $surface-dark if it is a panel | 1 |

## Files compiled into the theme

### `10_colours_and_patterns/00_core/11_functions/_contrast.sass`

| Line | Property | Role | Token | Value | Selector | Disposition |
|---|---|---|---|---|---|---|
| 68 | $toward | var-def | `$black` | `if(is-light($surface), $black, $white)` | @function ensure-contrast @if $toward == null (in =ensure-contrast) | role machinery (functions and exports) — keep |
| 68 | $toward | var-def | `$white` | `if(is-light($surface), $black, $white)` | @function ensure-contrast @if $toward == null (in =ensure-contrast) | role machinery (functions and exports) — keep |
| 78 | $candidates | var-def | `$black` | `if(is-light($surface), ($dark, $light, $black, $wh` | @function on-colour (in =on-colour) | role machinery (functions and exports) — keep |
| 78 | $candidates | var-def | `$white` | `if(is-light($surface), ($dark, $light, $black, $wh` | @function on-colour (in =on-colour) | role machinery (functions and exports) — keep |
| 78 | $candidates | var-def | `$white` | `if(is-light($surface), ($dark, $light, $black, $wh` | @function on-colour (in =on-colour) | role machinery (functions and exports) — keep |
| 78 | $candidates | var-def | `$black` | `if(is-light($surface), ($dark, $light, $black, $wh` | @function on-colour (in =on-colour) | role machinery (functions and exports) — keep |
| 82 | @return | control | `$black` | ` if(contrast($black, $surface) >= contrast($white,` | @function on-colour (in =on-colour) | function/control logic — keep |
| 82 | @return | control | `$white` | ` if(contrast($black, $surface) >= contrast($white,` | @function on-colour (in =on-colour) | function/control logic — keep |
| 82 | @return | control | `$black` | ` if(contrast($black, $surface) >= contrast($white,` | @function on-colour (in =on-colour) | function/control logic — keep |
| 82 | @return | control | `$white` | ` if(contrast($black, $surface) >= contrast($white,` | @function on-colour (in =on-colour) | function/control logic — keep |

### `10_colours_and_patterns/00_core/11_functions/_neutral.sass`

| Line | Property | Role | Token | Value | Selector | Disposition |
|---|---|---|---|---|---|---|
| 7 | neutral | function-def | `$black` | `($intensity: 50, $dark: $black,$light: $white)` | @function neutral (in =neutral) | function/control logic — keep |
| 7 | neutral | function-def | `$white` | `($intensity: 50, $dark: $black,$light: $white)` | @function neutral (in =neutral) | function/control logic — keep |
| 12 | neutral_mix | function-def | `$black` | `($intensity: 50%, $dark: $black,$light: $white)` | @function neutral_mix (in =neutral_mix) | function/control logic — keep |
| 12 | neutral_mix | function-def | `$white` | `($intensity: 50%, $dark: $black,$light: $white)` | @function neutral_mix (in =neutral_mix) | function/control logic — keep |

### `10_colours_and_patterns/00_core/11_functions/_set_colour.sass`

| Line | Property | Role | Token | Value | Selector | Disposition |
|---|---|---|---|---|---|---|
| 13 | $colourmaps | var-def | `$clr1` | `(1: $clr1, 2: $clr2, 3: $clr3, 4: $clr4, 5: $clr5,` | @function set-colour @if is-int($intensity) (in =set-colour) | role machinery (functions and exports) — keep |
| 13 | $colourmaps | var-def | `$clr2` | `(1: $clr1, 2: $clr2, 3: $clr3, 4: $clr4, 5: $clr5,` | @function set-colour @if is-int($intensity) (in =set-colour) | role machinery (functions and exports) — keep |
| 13 | $colourmaps | var-def | `$clr3` | `(1: $clr1, 2: $clr2, 3: $clr3, 4: $clr4, 5: $clr5,` | @function set-colour @if is-int($intensity) (in =set-colour) | role machinery (functions and exports) — keep |
| 13 | $colourmaps | var-def | `$clr4` | `(1: $clr1, 2: $clr2, 3: $clr3, 4: $clr4, 5: $clr5,` | @function set-colour @if is-int($intensity) (in =set-colour) | role machinery (functions and exports) — keep |
| 13 | $colourmaps | var-def | `$clr5` | `(1: $clr1, 2: $clr2, 3: $clr3, 4: $clr4, 5: $clr5,` | @function set-colour @if is-int($intensity) (in =set-colour) | role machinery (functions and exports) — keep |
| 13 | $colourmaps | var-def | `$clr6` | `(1: $clr1, 2: $clr2, 3: $clr3, 4: $clr4, 5: $clr5,` | @function set-colour @if is-int($intensity) (in =set-colour) | role machinery (functions and exports) — keep |
| 13 | $colourmaps | var-def | `$clr7` | `(1: $clr1, 2: $clr2, 3: $clr3, 4: $clr4, 5: $clr5,` | @function set-colour @if is-int($intensity) (in =set-colour) | role machinery (functions and exports) — keep |
| 13 | $colourmaps | var-def | `$clr8` | `(1: $clr1, 2: $clr2, 3: $clr3, 4: $clr4, 5: $clr5,` | @function set-colour @if is-int($intensity) (in =set-colour) | role machinery (functions and exports) — keep |
| 13 | $colourmaps | var-def | `$clr9` | `(1: $clr1, 2: $clr2, 3: $clr3, 4: $clr4, 5: $clr5,` | @function set-colour @if is-int($intensity) (in =set-colour) | role machinery (functions and exports) — keep |
| 13 | $colourmaps | var-def | `$clr10` | `(1: $clr1, 2: $clr2, 3: $clr3, 4: $clr4, 5: $clr5,` | @function set-colour @if is-int($intensity) (in =set-colour) | role machinery (functions and exports) — keep |
| 13 | $colourmaps | var-def | `$clr11` | `(1: $clr1, 2: $clr2, 3: $clr3, 4: $clr4, 5: $clr5,` | @function set-colour @if is-int($intensity) (in =set-colour) | role machinery (functions and exports) — keep |
| 13 | $colourmaps | var-def | `$clr12` | `(1: $clr1, 2: $clr2, 3: $clr3, 4: $clr4, 5: $clr5,` | @function set-colour @if is-int($intensity) (in =set-colour) | role machinery (functions and exports) — keep |
| 13 | $colourmaps | var-def | `$clr13` | `(1: $clr1, 2: $clr2, 3: $clr3, 4: $clr4, 5: $clr5,` | @function set-colour @if is-int($intensity) (in =set-colour) | role machinery (functions and exports) — keep |
| 13 | $colourmaps | var-def | `$clr14` | `(1: $clr1, 2: $clr2, 3: $clr3, 4: $clr4, 5: $clr5,` | @function set-colour @if is-int($intensity) (in =set-colour) | role machinery (functions and exports) — keep |
| 13 | $colourmaps | var-def | `$clr15` | `(1: $clr1, 2: $clr2, 3: $clr3, 4: $clr4, 5: $clr5,` | @function set-colour @if is-int($intensity) (in =set-colour) | role machinery (functions and exports) — keep |
| 13 | $colourmaps | var-def | `$clr16` | `(1: $clr1, 2: $clr2, 3: $clr3, 4: $clr4, 5: $clr5,` | @function set-colour @if is-int($intensity) (in =set-colour) | role machinery (functions and exports) — keep |
| 13 | $colourmaps | var-def | `$clr17` | `(1: $clr1, 2: $clr2, 3: $clr3, 4: $clr4, 5: $clr5,` | @function set-colour @if is-int($intensity) (in =set-colour) | role machinery (functions and exports) — keep |
| 13 | $colourmaps | var-def | `$clr18` | `(1: $clr1, 2: $clr2, 3: $clr3, 4: $clr4, 5: $clr5,` | @function set-colour @if is-int($intensity) (in =set-colour) | role machinery (functions and exports) — keep |
| 13 | $colourmaps | var-def | `$clr19` | `(1: $clr1, 2: $clr2, 3: $clr3, 4: $clr4, 5: $clr5,` | @function set-colour @if is-int($intensity) (in =set-colour) | role machinery (functions and exports) — keep |
| 13 | $colourmaps | var-def | `$clr20` | `(1: $clr1, 2: $clr2, 3: $clr3, 4: $clr4, 5: $clr5,` | @function set-colour @if is-int($intensity) (in =set-colour) | role machinery (functions and exports) — keep |
| 22 | @return | control | `$black` | ` (shade: mix($black,$base,20%), primary: $base, ti` | @function colour-map (in =colour-map) | function/control logic — keep |
| 22 | @return | control | `$white` | ` (shade: mix($black,$base,20%), primary: $base, ti` | @function colour-map (in =colour-map) | function/control logic — keep |
| 22 | @return | control | `$white` | ` (shade: mix($black,$base,20%), primary: $base, ti` | @function colour-map (in =colour-map) | function/control logic — keep |
| 22 | @return | control | `$white` | ` (shade: mix($black,$base,20%), primary: $base, ti` | @function colour-map (in =colour-map) | function/control logic — keep |

### `10_colours_and_patterns/00_core/_01_configuration_colour_and_patterns.sass`

| Line | Property | Role | Token | Value | Selector | Disposition |
|---|---|---|---|---|---|---|
| 73 | $surface-light | var-def | `$white` | `$white` |  | configuration default — keep |
| 74 | $surface-dark | var-def | `$black` | `$black` |  | configuration default — keep |
| 75 | $on-light | var-def | `$black` | `$black` |  | configuration default — keep |
| 76 | $on-dark | var-def | `$white` | `$white` |  | configuration default — keep |
| 77 | $visual-impact | var-def | `$clr5` | `$clr5` |  | configuration default — keep |
| 78 | $brand-primary | var-def | `$clr1` | `$clr1` |  | configuration default — keep |
| 79 | $brand-secondary | var-def | `$clr2` | `$clr2` |  | configuration default — keep |
| 101 | $bgcolor | var-def | `$white` | `$white` |  | configuration default — keep |
| 102 | $footer_bg | var-def | `$black` | `$black` |  | configuration default — keep |
| 110 | $link_colour | var-def | `$cta` | `$cta` |  | configuration default — keep |

### `10_colours_and_patterns/colour_roles/_colour_roles.sass`

| Line | Property | Role | Token | Value | Selector | Disposition |
|---|---|---|---|---|---|---|
| 41 | assert-contrast | mixin-call | `$black` | `($black, $white, $contrast-text, 'black on white (` | =check-colour-roles (in =check-colour-roles) | the roles check itself — keep |
| 41 | assert-contrast | mixin-call | `$white` | `($black, $white, $contrast-text, 'black on white (` | =check-colour-roles (in =check-colour-roles) | the roles check itself — keep |
| 42 | assert-contrast | mixin-call | `$black` | `($black, $surface-light, $contrast-text, 'black on` | =check-colour-roles (in =check-colour-roles) | the roles check itself — keep |
| 43 | assert-contrast | mixin-call | `$white` | `($on-light, $white, $contrast-text, 'on-light on w` | =check-colour-roles (in =check-colour-roles) | the roles check itself — keep |
| 45 | assert-contrast | mixin-call | `$white` | `($white, $black, $contrast-text, 'white on black')` | =check-colour-roles (in =check-colour-roles) | the roles check itself — keep |
| 45 | assert-contrast | mixin-call | `$black` | `($white, $black, $contrast-text, 'white on black')` | =check-colour-roles (in =check-colour-roles) | the roles check itself — keep |
| 46 | assert-contrast | mixin-call | `$white` | `($white, $surface-dark, $contrast-text, 'white on ` | =check-colour-roles (in =check-colour-roles) | the roles check itself — keep |
| 47 | assert-contrast | mixin-call | `$black` | `($on-dark, $black, $contrast-text, 'on-dark on bla` | =check-colour-roles (in =check-colour-roles) | the roles check itself — keep |

### `10_colours_and_patterns/common_patterns/_patterns.sass`

| Line | Property | Role | Token | Value | Selector | Disposition |
|---|---|---|---|---|---|---|
| 7 | gradient-overlay-dark | mixin-def | `$black` | `($angle: 180deg, $stop: 66%, $colour: $black)` | =gradient-overlay-dark (in =gradient-overlay-dark) | mixin parameter default — keep (callers choose) |
| 27 | overlay-dark | mixin-def | `$black` | `($colour: $black, $stop: 66%, $angle: 180deg)` | =overlay-dark (in =overlay-dark) | mixin parameter default — keep (callers choose) |
| 30 | gradient-overlay-slide | mixin-def | `$true_black` | `($colour: $true_black, $stop: 40%, $angle: 0deg)` | =gradient-overlay-slide (in =gradient-overlay-slide) | mixin parameter default — keep (callers choose) |

### `10_colours_and_patterns/root_colour_variables/_colour_root_variables.sass`

| Line | Property | Role | Token | Value | Selector | Disposition |
|---|---|---|---|---|---|---|
| 13 | $s14-root-colours | var-def | `$clr1` | `$clr1 $clr2 $clr3 $clr4 $clr5 $clr6 $clr7 $clr8 $c` |  | role machinery (functions and exports) — keep |
| 13 | $s14-root-colours | var-def | `$clr2` | `$clr1 $clr2 $clr3 $clr4 $clr5 $clr6 $clr7 $clr8 $c` |  | role machinery (functions and exports) — keep |
| 13 | $s14-root-colours | var-def | `$clr3` | `$clr1 $clr2 $clr3 $clr4 $clr5 $clr6 $clr7 $clr8 $c` |  | role machinery (functions and exports) — keep |
| 13 | $s14-root-colours | var-def | `$clr4` | `$clr1 $clr2 $clr3 $clr4 $clr5 $clr6 $clr7 $clr8 $c` |  | role machinery (functions and exports) — keep |
| 13 | $s14-root-colours | var-def | `$clr5` | `$clr1 $clr2 $clr3 $clr4 $clr5 $clr6 $clr7 $clr8 $c` |  | role machinery (functions and exports) — keep |
| 13 | $s14-root-colours | var-def | `$clr6` | `$clr1 $clr2 $clr3 $clr4 $clr5 $clr6 $clr7 $clr8 $c` |  | role machinery (functions and exports) — keep |
| 13 | $s14-root-colours | var-def | `$clr7` | `$clr1 $clr2 $clr3 $clr4 $clr5 $clr6 $clr7 $clr8 $c` |  | role machinery (functions and exports) — keep |
| 13 | $s14-root-colours | var-def | `$clr8` | `$clr1 $clr2 $clr3 $clr4 $clr5 $clr6 $clr7 $clr8 $c` |  | role machinery (functions and exports) — keep |
| 13 | $s14-root-colours | var-def | `$clr9` | `$clr1 $clr2 $clr3 $clr4 $clr5 $clr6 $clr7 $clr8 $c` |  | role machinery (functions and exports) — keep |
| 30 | --colour--black | css-var | `$black` | `#{$black}` | #{$rootvar} | export — keep |
| 31 | --colour--white | css-var | `$white` | `#{$white}` | #{$rootvar} | export — keep |
| 32 | --colour--impact | css-var | `$impact` | `#{$impact}` | #{$rootvar} | → $brand-secondary (UI/accent) |
| 33 | --colour--cta | css-var | `$cta` | `#{$cta}` | #{$rootvar} | → $brand-primary (UI/accent) |

### `30_typography/!fluid_type/_base_typography.sass`

| Line | Property | Role | Token | Value | Selector | Disposition |
|---|---|---|---|---|---|---|
| 7 | color | text | `$black` | `$black` | html | text on the light side → $on-light (keeps the default, lets a designer soften it) |

### `30_typography/!fluid_type/_heading_collection.sass`

| Line | Property | Role | Token | Value | Selector | Disposition |
|---|---|---|---|---|---|---|
| 5 | color | text | `$black` | `$black` | h1, h2, h3, h4, h5, h6 | text on the light side → $on-light (keeps the default, lets a designer soften it) |

### `30_typography/00_core/12_mixins/_divider_line.sass`

| Line | Property | Role | Token | Value | Selector | Disposition |
|---|---|---|---|---|---|---|
| 2 | divider-line | mixin-def | `$black` | `($border-width: 1px, $border-style: solid, $border` | =divider-line (in =divider-line) | mixin parameter default — keep (callers choose) |

### `30_typography/00_core/12_mixins/_inline_text_link.sass`

| Line | Property | Role | Token | Value | Selector | Disposition |
|---|---|---|---|---|---|---|
| 12 | color | text | `$link_colour` | `$link_colour` | =inline-text-link (in =inline-text-link) | link alias — follows the theme configuration; keep |
| 19 | border-bottom-color | border | `$black` | `$black` | =inline-text-link &:hover, &:active (in =inline-text-link) | border on the light side → $on-light or neutral() |

### `30_typography/00_core/12_mixins/_link_underline.sass`

| Line | Property | Role | Token | Value | Selector | Disposition |
|---|---|---|---|---|---|---|
| 9 | border-bottom | border | `$link_colour` | `1px solid $link_colour` | =link-underline (in =link-underline) | link alias — follows the theme configuration; keep |
| 13 | border-bottom | border | `$link_colour_active` | `1px solid $link_colour_active` | =link-underline-active (in =link-underline-active) | link alias — follows the theme configuration; keep |

### `30_typography/standardized_text_collection/_anchor.sass`

| Line | Property | Role | Token | Value | Selector | Disposition |
|---|---|---|---|---|---|---|
| 15 | color | text | `$link_colour` | `$link_colour` | a | link alias — follows the theme configuration; keep |
| 21 | color | text | `$link_colour_active` | `$link_colour_active` | a &:hover, &:active | link alias — follows the theme configuration; keep |
| 24 | color | text | `$link_colour_reversed` | `$link_colour_reversed` | a | link alias — follows the theme configuration; keep |
| 27 | color | text | `$link_colour_active_reversed` | `$link_colour_active_reversed` | a &:hover, &:active | link alias — follows the theme configuration; keep |

### `30_typography/standardized_text_collection/_text_collection.sass`

| Line | Property | Role | Token | Value | Selector | Disposition |
|---|---|---|---|---|---|---|
| 53 | color | text | `$black` | `$black` | ins | text on the light side → $on-light (keeps the default, lets a designer soften it) |
| 58 | color | text | `$black` | `$black` | mark | text on the light side → $on-light (keeps the default, lets a designer soften it) |

### `40_ui/00_core/_04_configuration_ui.sass`

| Line | Property | Role | Token | Value | Selector | Disposition |
|---|---|---|---|---|---|---|
| 14 | $ui_hover_border_color | var-def | `$link_colour` | `$link_colour` |  | configuration default — keep |
| 34 | $btn_color | var-def | `$cta` | `$cta` |  | configuration default — keep |
| 35 | $btn_bg_color | var-def | `$white` | `$white` |  | configuration default — keep |
| 36 | $btn_border_color | var-def | `$cta` | `$cta` |  | configuration default — keep |
| 37 | $btn_hover_color | var-def | `$black` | `$black` |  | configuration default — keep |
| 38 | $btn_hover_border_color | var-def | `$black` | `$black` |  | configuration default — keep |
| 39 | $btn_hover_bg_color | var-def | `$white` | `$white` |  | configuration default — keep |
| 41 | $btn_submit_color | var-def | `$white` | `$white` |  | configuration default — keep |
| 42 | $btn_submit_bg_color | var-def | `$impact` | `$impact` |  | configuration default — keep |
| 43 | $btn_submit_border_color | var-def | `$impact` | `$impact` |  | configuration default — keep |
| 44 | $btn_submit_hover_color | var-def | `$white` | `$white` |  | configuration default — keep |
| 45 | $btn_submit_hover_border_color | var-def | `$impact` | `mix($impact,$black,10%)` |  | configuration default — keep |
| 45 | $btn_submit_hover_border_color | var-def | `$black` | `mix($impact,$black,10%)` |  | configuration default — keep |
| 46 | $btn_submit_hover_bg_color | var-def | `$impact` | `mix($impact,$black,10%)` |  | configuration default — keep |
| 46 | $btn_submit_hover_bg_color | var-def | `$black` | `mix($impact,$black,10%)` |  | configuration default — keep |
| 57 | $ui_hover_border_color | var-def | `$link_colour` | `$link_colour` |  | configuration default — keep |
| 77 | $btn_color | var-def | `$cta` | `$cta` |  | configuration default — keep |
| 78 | $btn_bg_color | var-def | `$white` | `$white` |  | configuration default — keep |
| 79 | $btn_border_color | var-def | `$cta` | `$cta` |  | configuration default — keep |
| 80 | $btn_hover_color | var-def | `$black` | `$black` |  | configuration default — keep |
| 81 | $btn_hover_border_color | var-def | `$black` | `$black` |  | configuration default — keep |
| 82 | $btn_hover_bg_color | var-def | `$white` | `$white` |  | configuration default — keep |
| 84 | $btn_submit_color | var-def | `$white` | `$white` |  | configuration default — keep |
| 85 | $btn_submit_bg_color | var-def | `$impact` | `$impact` |  | configuration default — keep |
| 86 | $btn_submit_border_color | var-def | `$impact` | `$impact` |  | configuration default — keep |
| 87 | $btn_submit_hover_color | var-def | `$white` | `$white` |  | configuration default — keep |
| 88 | $btn_submit_hover_border_color | var-def | `$impact` | `mix($impact,$black,10%)` |  | configuration default — keep |
| 88 | $btn_submit_hover_border_color | var-def | `$black` | `mix($impact,$black,10%)` |  | configuration default — keep |
| 89 | $btn_submit_hover_bg_color | var-def | `$impact` | `mix($impact,$black,10%)` |  | configuration default — keep |
| 89 | $btn_submit_hover_bg_color | var-def | `$black` | `mix($impact,$black,10%)` |  | configuration default — keep |
| 104 | $ui_hover_border_color | var-def | `$impact` | `$impact` |  | configuration default — keep |
| 139 | $btn_color | var-def | `$black` | `$black` |  | configuration default — keep |
| 146 | $btn_submit_color | var-def | `$white` | `$white` |  | configuration default — keep |
| 147 | $btn_submit_bg_color | var-def | `$cta` | `$cta` |  | configuration default — keep |
| 149 | $btn_submit_border_color | var-def | `$cta` | `$cta` |  | configuration default — keep |
| 150 | $btn_submit_hover_color | var-def | `$white` | `$white` |  | configuration default — keep |
| 154 | $btn_search_color | var-def | `$black` | `$black` |  | configuration default — keep |
| 158 | $btn_search_hover_color | var-def | `$black` | `$black` |  | configuration default — keep |

### `40_ui/ui_element_base_v002/13_definitions/_form_elements.sass`

| Line | Property | Role | Token | Value | Selector | Disposition |
|---|---|---|---|---|---|---|
| 77 | border | border | `$white` | `solid $white $btn_border_width` | %button-reverse | border on the dark side → $on-dark |
| 82 | border | border | `$black` | `$btn_border_width solid $black` | %button-feature-cta | border on the light side → $on-light or neutral() |
| 83 | color | text | `$black` | `$black` | %button-feature-cta | text on the light side → $on-light (keeps the default, lets a designer soften it) |
| 88 | color | text | `$black` | `$black !important` | %button-feature-cta a | text on the light side → $on-light (keeps the default, lets a designer soften it) |
| 92 | color | text | `$black` | `$black` | %button-ghost | text on the light side → $on-light (keeps the default, lets a designer soften it) |
| 103 | color | text | `$clr4` | `$clr4` | %button-ghost &:hover | direct slot → brand role (brand-*-on-light/dark) |
| 107 | background-color | background | `$black` | `$black` | %button-text | canvas inverse — keep, or $surface-dark if it is a panel |
| 117 | color | text | `$white` | `$white` | %button-standard | text on the dark side → $on-dark |
| 121 | color | text | `$black` | `$black` | %button-standard &:hover | text on the light side → $on-light (keeps the default, lets a designer soften it) |
| 122 | background-color | background | `$clr2` | `$clr2` | %button-standard &:hover | direct slot → brand role (raw brand colour, UI/accent class) |
| 127 | color | text | `$white` | `$white` | %button-link | text on the dark side → $on-dark |
| 136 | border | border | `$clr2` | `$btn_border_width solid $clr2` | %button-outline &:hover | direct slot → brand role (raw brand colour, UI/accent class) |
| 165 | color | text | `$black` | `$black` | %button-more | text on the light side → $on-light (keeps the default, lets a designer soften it) |
| 181 | border-bottom | border | `$black` | `2px solid $black` | %button-more a | border on the light side → $on-light or neutral() |
| 185 | border-bottom | border | `$black` | `2px solid $black` | %button-more a &:hover | border on the light side → $on-light or neutral() |
| 262 | background-color | background | `$white` | `$white` | %input-text | canvas — keep, or $surface-light if it is a panel |
| 265 | background-color | background | `$white` | `$white` | %input-text | canvas — keep, or $surface-light if it is a panel |

### `40_ui/ui_element_base_v002/_form_ui.sass`

| Line | Property | Role | Token | Value | Selector | Disposition |
|---|---|---|---|---|---|---|
| 42 | border-color | border | `$clr2` | `$clr2` | input:focus | direct slot → brand role (raw brand colour, UI/accent class) |

### `40_ui/ui_element_base_v002/_standardized_icons/_icon_mixins.sass`

| Line | Property | Role | Token | Value | Selector | Disposition |
|---|---|---|---|---|---|---|
| 94 | color | text | `$impact` | `$impact` | =icon-with-label &:hover, &:active (in =icon-with-label) | → $brand-secondary-on-light/dark |

### `40_ui/ui_element_base_v002/_standardized_icons/_icons.sass`

| Line | Property | Role | Token | Value | Selector | Disposition |
|---|---|---|---|---|---|---|
| 34 | color | text | `$black` | `$black` | %icon-label | text on the light side → $on-light (keeps the default, lets a designer soften it) |
| 43 | color | text | `$impact` | `$impact` | %icon &:hover | → $brand-secondary-on-light/dark |
| 46 | color | text | `$white` | `$white` | %icon | text on the dark side → $on-dark |
| 49 | color | text | `$impact` | `$impact` | %icon &:hover | → $brand-secondary-on-light/dark |

### `40_ui/ui_element_base_v002/_ui_library_support/_component_form_select2.sass`

| Line | Property | Role | Token | Value | Selector | Disposition |
|---|---|---|---|---|---|---|
| 40 | color | text | `$black` | `$black` | .select2-container.select2-container--default .select2-resul | text on the light side → $on-light (keeps the default, lets a designer soften it) |

### `40_ui/ui_element_base_v002/_ui_library_support/_component_superfish_navigation.sass`

| Line | Property | Role | Token | Value | Selector | Disposition |
|---|---|---|---|---|---|---|
| 109 | background-color | background | `$impact` | `$impact` | .sf-menu .sf-depth-1 li &:hover | → $brand-secondary (UI/accent) |
| 112 | color | text | `$black` | `$black` | .sf-menu .sf-depth-1 li a, a:hover | text on the light side → $on-light (keeps the default, lets a designer soften it) |
| 118 | color | text | `$black` | `$black` | .sf-menu .sf-depth-2 a | text on the light side → $on-light (keeps the default, lets a designer soften it) |

### `60_site_elements/figure_normalization/_figure.sass`

| Line | Property | Role | Token | Value | Selector | Disposition |
|---|---|---|---|---|---|---|
| 11 | color | text | `$black` | `$black` | figcaption | text on the light side → $on-light (keeps the default, lets a designer soften it) |

## Library files not in this build

### `30_typography/body_text_anchor_1/_body_text_anchor.sass`

| Line | Property | Role | Token | Value | Selector | Disposition |
|---|---|---|---|---|---|---|
| 2 | color | text | `$link_colour` | `$link_colour` | p > a, p li > a, blockquote > a | link alias — follows the theme configuration; keep |

### `30_typography/standardized_tables/_definition_data_table.sass`

| Line | Property | Role | Token | Value | Selector | Disposition |
|---|---|---|---|---|---|---|
| 30 | background-color | background | `$white` | `$white` | %data-table-zebra tbody tr &:nth-child(2n-1) td | canvas — keep, or $surface-light if it is a panel |

### `30_typography/standardized_typography/_base_typography.sass`

| Line | Property | Role | Token | Value | Selector | Disposition |
|---|---|---|---|---|---|---|
| 7 | color | text | `$black` | `$black` | html | text on the light side → $on-light (keeps the default, lets a designer soften it) |

### `30_typography/standardized_typography/_heading_collection.sass`

| Line | Property | Role | Token | Value | Selector | Disposition |
|---|---|---|---|---|---|---|
| 5 | color | text | `$black` | `$black` | h1, h2, h3, h4, h5, h6 | text on the light side → $on-light (keeps the default, lets a designer soften it) |
| 12 | color | text | `$black` | `$black` | h1, h2, h3, h4, h5, h6 > a | text on the light side → $on-light (keeps the default, lets a designer soften it) |

### `40_ui/dark_mode/_dark_mode.sass`

| Line | Property | Role | Token | Value | Selector | Disposition |
|---|---|---|---|---|---|---|
| 3 | background | background | `$black` | `$black` | body &.dark | canvas inverse — keep, or $surface-dark if it is a panel |
| 4 | color | text | `$white` | `$white` | body &.dark | text on the dark side → $on-dark |
| 6 | color | text | `$white` | `$white` | body &.dark h1, h2, h3, h4, h5, h6 | text on the dark side → $on-dark |
| 8 | color | text | `$white` | `$white` | body &.dark h1>a, h2>a, h3>a, h4>a, h5>a, h6>a | text on the dark side → $on-dark |
| 12 | background | background | `$white` | `$white` | body &.dark .site-guide-cont i | canvas — keep, or $surface-light if it is a panel |
| 17 | color | text | `$white` | `$white` | body &.dark select | text on the dark side → $on-dark |
| 30 | color | text | `$white` | `$white` | body &.dark .btn | text on the dark side → $on-dark |
| 31 | border-color | border | `$white` | `$white` | body &.dark .btn | border on the dark side → $on-dark |
| 33 | background-color | background | `$black` | `$black` | body &.dark .btn &:hover | canvas inverse — keep, or $surface-dark if it is a panel |
| 36 | color | text | `$white` | `$white` | body &.dark .browse-controls .advanced-search | text on the dark side → $on-dark |
| 38 | color | text | `$white` | `$white` | body &.dark a | text on the dark side → $on-dark |
| 42 | background-color | background | `$black` | `$black` | body &.dark #homepage-splash .resource.introduction .introdu | canvas inverse — keep, or $surface-dark if it is a panel |
| 44 | color | text | `$black` | `$black` | body &.dark option | text on the light side → $on-light (keeps the default, lets a designer soften it) |
| 50 | color | text | `$white` | `$white` | body &.dark #advanced-search .value input | text on the dark side → $on-dark |
| 52 | color | text | `$white` | `$white` | body &.dark .remove-value | text on the dark side → $on-dark |
| 60 | background | background | `$black` | `$black` | body &.dark #feature-tier-3 | canvas inverse — keep, or $surface-dark if it is a panel |
| 62 | background | background | `$black` | `$black` | body &.dark #feature-tier-1 | canvas inverse — keep, or $surface-dark if it is a panel |
| 66 | color | text | `$white` | `$white` | body &.dark #homepage-splash .down-arrow span | text on the dark side → $on-dark |
| 102 | background-color | background | `$clr1` | `$clr1` | input:checked + .slider | direct slot → brand role (raw brand colour, UI/accent class) |
| 105 | box-shadow | shadow | `$clr1` | `0 0 1px $clr1` | input:focus + .slider | direct slot → brand role (raw brand colour, UI/accent class) |
| 115 | background-color | background | `$black` | `$black!important` | .tl-timenav | canvas inverse — keep, or $surface-dark if it is a panel |
| 118 | border-color | border | `$black` | `$black!important` | .tl-timeaxis-background | border on the light side → $on-light or neutral() |
| 121 | border-color | border | `$white` | `$white!important` | .tl-timeaxis-tick &:before | border on the dark side → $on-dark |
| 123 | color | text | `$white` | `$white!important` | .tl-timeaxis-tick-text | text on the dark side → $on-dark |
| 126 | background | background | `$white` | `$white` | .tl-slide &.tl-slide-titleslide | canvas — keep, or $surface-light if it is a panel |

### `40_ui/ui_element_base/12_mixins/_ui_patterns.sass`

| Line | Property | Role | Token | Value | Selector | Disposition |
|---|---|---|---|---|---|---|
| 26 | color | text | `$impact` | `$impact` | =icon-base @if $active_state &:hover, &.active (in =icon-base) | → $brand-secondary-on-light/dark |
| 56 | color | text | `$impact` | `$impact` | =background-icon-base @if $active_state &:hover, &.active (in =background-icon-base) | → $brand-secondary-on-light/dark |

### `40_ui/ui_element_base/12_mixins/_ui_patterns_deprecated.sass`

| Line | Property | Role | Token | Value | Selector | Disposition |
|---|---|---|---|---|---|---|
| 139 | background-icon | mixin-def | `$black` | `($background: $black, $size: $btn_icon_size, $posi` | =background-icon (in =background-icon) | mixin parameter default — keep (callers choose) |
| 145 | button-icon | mixin-def | `$black` | `($background: $black, $size: $btn_icon_size)` | =button-icon (in =button-icon) | mixin parameter default — keep (callers choose) |
| 148 | arrow-rotate | mixin-def | `$black` | `($background: $black, $size: $btn_icon_size)` | =arrow-rotate (in =arrow-rotate) | mixin parameter default — keep (callers choose) |
| 154 | icon | mixin-def | `$black` | `($background: $black, $size: rv(0))` | =icon (in =icon) | mixin parameter default — keep (callers choose) |
| 160 | form-close | mixin-def | `$black` | `($background: $black)` | =form-close (in =form-close) | mixin parameter default — keep (callers choose) |

### `40_ui/ui_element_base/13_definitions/_form_elements.sass`

| Line | Property | Role | Token | Value | Selector | Disposition |
|---|---|---|---|---|---|---|
| 42 | color | text | `$clr4` | `set-color(4)` | %link &:hover | direct slot → brand role (brand-*-on-light/dark) |
| 89 | border | border | `$white` | `solid $white $btn_border_width` | %button-reverse | border on the dark side → $on-dark |
| 96 | border | border | `$black` | `$btn_border_width solid $black` | %button-feature-cta | border on the light side → $on-light or neutral() |
| 97 | color | text | `$black` | `$black` | %button-feature-cta | text on the light side → $on-light (keeps the default, lets a designer soften it) |
| 102 | color | text | `$black` | `$black !important` | %button-feature-cta a | text on the light side → $on-light (keeps the default, lets a designer soften it) |
| 106 | color | text | `$black` | `$black` | %button-ghost | text on the light side → $on-light (keeps the default, lets a designer soften it) |
| 117 | color | text | `$clr4` | `$clr4` | %button-ghost &:hover | direct slot → brand role (brand-*-on-light/dark) |
| 132 | background | background | `$black` | `$black` | %button-reset &:hover | canvas inverse — keep, or $surface-dark if it is a panel |
| 139 | background | background | `$black` | `$black` | %button-text | canvas inverse — keep, or $surface-dark if it is a panel |
| 150 | color | text | `$white` | `$white` | %button-standard | text on the dark side → $on-dark |
| 154 | color | text | `$black` | `$black` | %button-standard &:hover | text on the light side → $on-light (keeps the default, lets a designer soften it) |
| 155 | background | background | `$clr2` | `$clr2` | %button-standard &:hover | direct slot → brand role (raw brand colour, UI/accent class) |
| 160 | color | text | `$white` | `$white` | %button-link | text on the dark side → $on-dark |
| 170 | border | border | `$clr2` | `$btn_border_width solid $clr2` | %button-outline &:hover | direct slot → brand role (raw brand colour, UI/accent class) |
| 174 | background | background | `$clr3` | `$clr3` | %button-cta | direct slot → brand role (raw brand colour, UI/accent class) |
| 175 | color | text | `$white` | `$white` | %button-cta | text on the dark side → $on-dark |
| 206 | color | text | `$black` | `$black` | %button-more | text on the light side → $on-light (keeps the default, lets a designer soften it) |
| 222 | border-bottom | border | `$black` | `2px solid $black` | %button-more a | border on the light side → $on-light or neutral() |
| 226 | border-bottom | border | `$black` | `2px solid $black` | %button-more a &:hover | border on the light side → $on-light or neutral() |
| 270 | background-color | background | `$clr1` | `set-color(1)` | %button-search-submit | direct slot → brand role (raw brand colour, UI/accent class) |
| 283 | background-color | background | `$black` | `set-color(1,90,$black)` | %button-search-submit &:hover | canvas inverse — keep, or $surface-dark if it is a panel |
| 283 | background-color | background | `$clr1` | `set-color(1,90,$black)` | %button-search-submit &:hover | direct slot → brand role (raw brand colour, UI/accent class) |
| 336 | color | text | `$white` | `$white` | %ui-icon-tab-controls | text on the dark side → $on-dark |
| 349 | color | text | `$white` | `$white` | %ui-icon-tab-controls label | text on the dark side → $on-dark |
| 400 | color | text | `$clr4` | `set-color(4)` | %internal-links a &:hover | direct slot → brand role (brand-*-on-light/dark) |
| 424 | color | text | `$white` | `$white` | %content-warning &:before | text on the dark side → $on-dark |

### `60_site_elements/drupal_better_exposed_filters/_component_views_bef_search_field.sass`

| Line | Property | Role | Token | Value | Selector | Disposition |
|---|---|---|---|---|---|---|
| 14 | background-color | background | `$white` | `$white` | .views-exposed-form.bef-exposed-form form | canvas — keep, or $surface-light if it is a panel |
| 118 | background-color | background | `$white` | `$white` | .views-exposed-form.bef-exposed-form form | canvas — keep, or $surface-light if it is a panel |

### `60_site_elements/drupal_general_support/_component_drupal_advanced_search_form.sass`

| Line | Property | Role | Token | Value | Selector | Disposition |
|---|---|---|---|---|---|---|
| 48 | background-color | background | `$impact` | `$impact` | .pager__link--is-active | → $brand-secondary (UI/accent) |

### `60_site_elements/drupal_general_support/_component_drupal_contextual_menu.sass`

| Line | Property | Role | Token | Value | Selector | Disposition |
|---|---|---|---|---|---|---|
| 23 | background-color | background | `$black` | `$black` | .contextual-region .contextual .contextual-links | canvas inverse — keep, or $surface-dark if it is a panel |
| 26 | background-color | background | `$black` | `$black` | .contextual-region .contextual .contextual-links li | canvas inverse — keep, or $surface-dark if it is a panel |
| 29 | color | text | `$white` | `$white` | .contextual-region .contextual .contextual-links a | text on the dark side → $on-dark |
| 30 | background-color | background | `$black` | `$black` | .contextual-region .contextual .contextual-links a | canvas inverse — keep, or $surface-dark if it is a panel |

### `60_site_elements/drupal_general_support/_component_drupal_local_tasks.sass`

| Line | Property | Role | Token | Value | Selector | Disposition |
|---|---|---|---|---|---|---|
| 70 | color | text | `$black` | `$black` | .block-local-tasks-block > ul li a &:focus | text on the light side → $on-light (keeps the default, lets a designer soften it) |

### `60_site_elements/drupal_status_messages/_status_messages.sass`

| Line | Property | Role | Token | Value | Selector | Disposition |
|---|---|---|---|---|---|---|
| 51 | background-color | background | `$impact` | `color.adjust($impact,$lightness: 30%)` | .messages &--error | → $brand-secondary (UI/accent) |
| 52 | color | text | `$impact` | `$impact` | .messages &--error | → $brand-secondary-on-light/dark |
| 56 | color | text | `$impact` | `$impact` | .messages &--error &:before | → $brand-secondary-on-light/dark |

### `60_site_elements/legacy_libraries/12_mixins/_figure_colour_wash.sass`

| Line | Property | Role | Token | Value | Selector | Disposition |
|---|---|---|---|---|---|---|
| 1 | figure-colour-wash | mixin-def | `$cta` | `($colour: $cta, $subcolour: $lightest_neutral,$was` | =figure-colour-wash (in =figure-colour-wash) | mixin parameter default — keep (callers choose) |
| 56 | set-wash-colour | mixin-def | `$cta` | `($colour: $cta)` | =set-wash-colour (in =set-wash-colour) | mixin parameter default — keep (callers choose) |
| 69 | figure-colour-wash | mixin-call | `$white` | `($colour,$white)` | =figure-neutral-wash (in =figure-neutral-wash) | neutral wash mixes toward white — keep |

### `60_site_elements/legacy_libraries/13_definitions/_figure_hover.sass`

| Line | Property | Role | Token | Value | Selector | Disposition |
|---|---|---|---|---|---|---|
| 33 | background-color | background | `$clr2` | `set-colour(2,'tint')` | %figure-hover &:after | direct slot → brand role (raw brand colour, UI/accent class) |
| 75 | background-color | background | `$clr2` | `set-colour(2,'watermark')` | %figcaption-hover &:after | direct slot → brand role (raw brand colour, UI/accent class) |

### `60_site_elements/legacy_libraries/13_definitions/_figure_zoom_caption.sass`

| Line | Property | Role | Token | Value | Selector | Disposition |
|---|---|---|---|---|---|---|
| 29 | background-color | background | `$white` | `$white` | %figure-hidden-caption figcaption | canvas — keep, or $surface-light if it is a panel |

### `60_site_elements/legacy_libraries/13_definitions/_img_polaroid.sass`

| Line | Property | Role | Token | Value | Selector | Disposition |
|---|---|---|---|---|---|---|
| 3 | background-color | background | `$white` | `$white` | %img-polaroid | canvas — keep, or $surface-light if it is a panel |

### `60_site_elements/legacy_libraries/13_definitions/_paginators.sass`

| Line | Property | Role | Token | Value | Selector | Disposition |
|---|---|---|---|---|---|---|
| 11 | background-color | background | `$impact` | `$impact` | %paginator-circle-link &:hover, &:active, &.current | → $brand-secondary (UI/accent) |

### `60_site_elements/legacy_libraries/13_definitions/_standardized_footer.sass`

| Line | Property | Role | Token | Value | Selector | Disposition |
|---|---|---|---|---|---|---|
| 11 | background-color | background | `$black` | `$black` | %standardized-footer | canvas inverse — keep, or $surface-dark if it is a panel |
| 12 | color | text | `$white` | `$white` | %standardized-footer | text on the dark side → $on-dark |

### `60_site_elements/legacy_libraries/13_definitions/_standardized_masthead.sass`

| Line | Property | Role | Token | Value | Selector | Disposition |
|---|---|---|---|---|---|---|
| 6 | background-color | background | `$black` | `$black` | %standardized-masthead | canvas inverse — keep, or $surface-dark if it is a panel |
| 14 | color | text | `$white` | `$white` | %standardized-masthead &, > *, > * * | text on the dark side → $on-dark |
| 28 | color | text | `$white` | `$white` | %standardized-masthead ul:not(.contextual-links) a | text on the dark side → $on-dark |
| 55 | standardized-masthead | mixin-def | `$black` | `($height: $masthead_height,$typefactor: 0,$padding` | =standardized-masthead (in =standardized-masthead) | mixin parameter default — keep (callers choose) |
| 55 | standardized-masthead | mixin-def | `$white` | `($height: $masthead_height,$typefactor: 0,$padding` | =standardized-masthead (in =standardized-masthead) | mixin parameter default — keep (callers choose) |
| 69 | @if | control | `$black` | ` $bgcolor != $black` | =standardized-masthead @if $bgcolor != $black (in =standardized-masthead) | function/control logic — keep |
| 72 | @if | control | `$white` | ` $text_colour != $white` | =standardized-masthead @if $text_colour != $white (in =standardized-masthead) | function/control logic — keep |

### `60_site_elements/legacy_libraries/13_definitions/_standardized_mobile_nav.sass`

| Line | Property | Role | Token | Value | Selector | Disposition |
|---|---|---|---|---|---|---|
| 62 | border-top | border | `$white` | `2px solid $white` | %standardized-mobile-nav-block | border on the dark side → $on-dark |
| 79 | color | text | `$white` | `$white` | %standardized-mobile-nav-block li | text on the dark side → $on-dark |
| 95 | color | text | `$white` | `$white` | %standardized-mobile-nav-block li a | text on the dark side → $on-dark |
| 101 | color | text | `$white` | `$white` | %standardized-mobile-nav-block li a &.is-active | text on the dark side → $on-dark |

