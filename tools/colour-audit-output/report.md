# Colour usage audit — AgileBaseOmekaTheme

Generated 2026-10-07 by `tools/colour-audit.js` from `_00_main_configuration.yml`. Library scanned: `node_modules/stop14-themesystem-legacy/source`. Nothing here is hand-edited; re-run the tool after changes.

## 1. Scope

|  | Files | Colour references | of which variables | hard-coded colours | transparent / currentColor |
|---|---|---|---|---|---|
| Theme SASS (compiled) | 100 | 238 | 222 | 8 | 8 |
| Library SASS compiled into the theme | 173 | 311 | 264 | 32 | 15 |
| Library SASS not in this build | 116 | 166 | 141 | 14 | 11 |

Global variables probed: 504. Holding a colour: 124; holding a colour map: 0. Scoped (non-global) colour variables: 5.

"Role" is the CSS property a reference colours: text (`color`), background, border (incl. outline), svg (fill/stroke), shadow; `var-def` = used to define another variable, `mixin-def` = a mixin parameter default, `mixin-call` = passed to a mixin, `css-var` = emitted as a CSS custom property.

## 2. Palette, black/white and semantic aliases

Declared = what the configuration or SASS says; resolved = the value the compiler produced for this configuration. Uses count references in compiled files (theme / library); roles are for compiled files only.

### Palette slots

| Variable | Declared as | Where | Resolves to | Uses theme | Uses library | Roles (compiled) |
|---|---|---|---|---|---|---|
| `$clr1` | `#00BDD4` | _00_main_configuration.yml:44 | `#00BDD4` | 0 | 3 | var-def 3 |
| `$clr10` | `#000000` | lib:a_components/10_colours_and_patterns/00_core/_01_configuration_colour_and_patterns.sass:19 | `#000000` | 0 | 1 | var-def 1 |
| `$clr11` | `#000000` | lib:a_components/10_colours_and_patterns/00_core/_01_configuration_colour_and_patterns.sass:20 | `#000000` | 0 | 1 | var-def 1 |
| `$clr12` | `#000000` | lib:a_components/10_colours_and_patterns/00_core/_01_configuration_colour_and_patterns.sass:21 | `#000000` | 0 | 1 | var-def 1 |
| `$clr13` | `#000000` | lib:a_components/10_colours_and_patterns/00_core/_01_configuration_colour_and_patterns.sass:22 | `#000000` | 0 | 1 | var-def 1 |
| `$clr14` | `#000000` | lib:a_components/10_colours_and_patterns/00_core/_01_configuration_colour_and_patterns.sass:23 | `#000000` | 0 | 1 | var-def 1 |
| `$clr15` | `#000000` | lib:a_components/10_colours_and_patterns/00_core/_01_configuration_colour_and_patterns.sass:24 | `#000000` | 0 | 1 | var-def 1 |
| `$clr16` | `#000000` | lib:a_components/10_colours_and_patterns/00_core/_01_configuration_colour_and_patterns.sass:25 | `#000000` | 0 | 1 | var-def 1 |
| `$clr17` | `#000000` | lib:a_components/10_colours_and_patterns/00_core/_01_configuration_colour_and_patterns.sass:26 | `#000000` | 0 | 1 | var-def 1 |
| `$clr18` | `#000000` | lib:a_components/10_colours_and_patterns/00_core/_01_configuration_colour_and_patterns.sass:27 | `#000000` | 0 | 1 | var-def 1 |
| `$clr19` | `#000000` | lib:a_components/10_colours_and_patterns/00_core/_01_configuration_colour_and_patterns.sass:28 | `#000000` | 0 | 1 | var-def 1 |
| `$clr2` | `#BF609B` | _00_main_configuration.yml:45 | `#BF609B` | 2 | 3 | background 2, var-def 3 |
| `$clr20` | `#000000` | lib:a_components/10_colours_and_patterns/00_core/_01_configuration_colour_and_patterns.sass:29 | `#000000` | 0 | 1 | var-def 1 |
| `$clr3` | `#0E3A40` | _00_main_configuration.yml:46 | `#0E3A40` | 0 | 2 | var-def 2 |
| `$clr4` | `#EAF3F4` | _00_main_configuration.yml:47 | `#EAF3F4` | 0 | 2 | var-def 2 |
| `$clr5` | `#D98536` | _00_main_configuration.yml:48 | `#D98536` | 0 | 3 | var-def 3 |
| `$clr6` | `#315FAA` | _00_main_configuration.yml:49 | `#315FAA` | 0 | 2 | var-def 2 |
| `$clr7` | `#7DBF60` | _00_main_configuration.yml:50 | `#7DBF60` | 0 | 2 | var-def 2 |
| `$clr8` | `#E1BB0B` | _00_main_configuration.yml:51 | `#E1BB0B` | 0 | 2 | var-def 2 |
| `$clr9` | `#E5336D` | _00_main_configuration.yml:52 | `#E5336D` | 0 | 2 | var-def 2 |

### Colour roles (section 7.3 of the requirements)

| Variable | Declared as | Where | Resolves to | Uses theme | Uses library | Roles (compiled) |
|---|---|---|---|---|---|---|
| `$brand_primary` | `$clr1` | _00_main_configuration.yml:69 | `#00BDD4` | 2 | 0 | border 1, shadow 1 |
| `$brand_secondary` | `$clr2` | _00_main_configuration.yml:70 | `#BF609B` | 5 | 0 | background 2, border 3 |
| `$on_dark` | `$white` | _00_main_configuration.yml:66 | `white` | 54 | 0 | text 46, border 8 |
| `$on_impact` | `on-colour($visual_impact)` | _00_main_configuration.yml:73 | `#00171A` | 0 | 0 |  |
| `$on_light` | `$black` | _00_main_configuration.yml:67 | `#00171A` | 26 | 0 | text 23, border 3 |
| `$surface_dark` | `$clr3` | _00_main_configuration.yml:64 | `#0E3A40` | 0 | 0 |  |
| `$surface_light` | `$clr4` | _00_main_configuration.yml:65 | `#EAF3F4` | 0 | 0 |  |
| `$visual_impact` | `$clr5` | _00_main_configuration.yml:68 | `#D98536` | 1 | 0 | background 1 |

### Black and white points

| Variable | Declared as | Where | Resolves to | Uses theme | Uses library | Roles (compiled) |
|---|---|---|---|---|---|---|
| `$black` | `#00171A` | _00_main_configuration.yml:55 | `#00171A` | 19 | 31 | background 18, css-var 1, var-def 18, mixin-def 3, mixin-call 5, control 3 |
| `$true_black` | `#000000` | _00_main_configuration.yml:57 | `#000000` | 1 | 1 | background 1, mixin-def 1 |
| `$white` | `white` | _00_main_configuration.yml:56 | `white` | 14 | 30 | background 14, css-var 1, other 1, var-def 16, mixin-def 1, mixin-call 4, control 5 |

### Semantic aliases

| Variable | Declared as | Where | Resolves to | Uses theme | Uses library | Roles (compiled) |
|---|---|---|---|---|---|---|
| `$bgcolor` | `$white` | _00_main_configuration.yml:85 | `white` | 0 | 1 | background 1 |
| `$cta` | `$brand_primary` | _00_main_configuration.yml:94 | `#00BDD4` | 1 | 8 | css-var 1, var-def 7, mixin-def 1 |
| `$de_activated` | `neutral(30)` | _00_main_configuration.yml:96 | `rgb(178.5, 185.4, 186.3)` | 0 | 0 |  |
| `$de_emphasized` | `neutral(50)` | _00_main_configuration.yml:95 | `rgb(127.5, 139, 140.5)` | 0 | 0 |  |
| `$footer_bg` | `$black` | _00_main_configuration.yml:86 | `#00171A` | 1 | 0 | background 1 |
| `$impact` | `$brand_secondary` | _00_main_configuration.yml:93 | `#BF609B` | 0 | 10 | css-var 1, var-def 9 |
| `$link_colour` | `$on_light` | _00_main_configuration.yml:97 | `#00171A` | 2 | 5 | text 3, border 2, var-def 2 |
| `$link_colour_active` | `$brand_primary_on_light` | _00_main_configuration.yml:98 | `rgb(0, 119.28, 133.88)` | 15 | 2 | text 13, border 4 |
| `$link_colour_active_reversed` | `$brand_primary_on_dark` | _00_main_configuration.yml:100 | `#00BDD4` | 8 | 1 | text 6, border 3 |
| `$link_colour_reversed` | `$on_dark` | _00_main_configuration.yml:99 | `white` | 4 | 1 | text 5 |
| `$menu_background` | `transparent` | _00_main_configuration.yml:87 | `transparent` | 3 | 0 | background 3 |
| `$menu_color` | `$on_light` | _00_main_configuration.yml:299 | `#00171A` | 0 | 0 |  |
| `$welcome_block_bg` | `$black` | _00_main_configuration.yml:297 | `#00171A` | 4 | 0 | background 4 |
| `$welcome_block_color` | `$on_dark` | _00_main_configuration.yml:298 | `white` | 3 | 0 | text 2, border 1 |

### Neutral aliases

| Variable | Declared as | Where | Resolves to | Uses theme | Uses library | Roles (compiled) |
|---|---|---|---|---|---|---|
| `$dark_neutral` | `neutral(70)` | _00_main_configuration.yml:110 | `rgb(76.5, 92.6, 94.7)` | 0 | 2 | border 2 |
| `$darker_neutral` | `neutral(80)` | _00_main_configuration.yml:111 | `rgb(51, 69.4, 71.8)` | 0 | 3 | text 1, var-def 2 |
| `$darkest_neutral` | `neutral(90)` | _00_main_configuration.yml:112 | `rgb(25.5, 46.2, 48.9)` | 0 | 0 |  |
| `$light_neutral` | `neutral(40)` | _00_main_configuration.yml:107 | `rgb(153, 162.2, 163.4)` | 0 | 5 | background 2, var-def 3 |
| `$lighter_neutral` | `neutral(30)` | _00_main_configuration.yml:106 | `rgb(178.5, 185.4, 186.3)` | 0 | 1 | var-def 1 |
| `$lightest_neutral` | `neutral(5)` | _00_main_configuration.yml:105 | `rgb(242.25, 243.4, 243.55)` | 0 | 0 |  |
| `$mid_neutral` | `neutral(60)` | _00_main_configuration.yml:109 | `rgb(102, 115.8, 117.6)` | 0 | 3 | var-def 3 |
| `$neutral` | `neutral()` | _00_main_configuration.yml:108 | `rgb(127.5, 139, 140.5)` | 0 | 0 |  |

### Component colour settings (configuration keys)

| Variable | Declared as | Where | Resolves to | Uses theme | Uses library | Roles (compiled) |
|---|---|---|---|---|---|---|
| `$brand_primary_on_dark` | `ensure-contrast($brand_primary, $surface_dark)` | _00_main_configuration.yml:75 | `#00BDD4` | 5 | 0 | text 5 |
| `$brand_primary_on_light` | `ensure-contrast($brand_primary, $surface_light)` | _00_main_configuration.yml:74 | `rgb(0, 119.28, 133.88)` | 2 | 0 | text 2 |
| `$brand_secondary_on_dark` | `ensure-contrast($brand_secondary, $surface_dark)` | _00_main_configuration.yml:77 | `rgb(206.36, 134.16, 179)` | 3 | 0 | text 3 |
| `$brand_secondary_on_light` | `ensure-contrast($brand_secondary, $surface_light)` | _00_main_configuration.yml:76 | `rgb(160.44, 84.32, 134.36)` | 14 | 0 | text 14 |
| `$btn_bg_color` | `neutral(20)` | _00_main_configuration.yml:224 | `rgb(204, 208.6, 209.2)` | 0 | 1 | background 1 |
| `$btn_border_color` | `$ui_border_color` | _00_main_configuration.yml:225 | `rgb(153, 162.2, 163.4)` | 0 | 2 | border 2 |
| `$btn_color` | `$on_light` | _00_main_configuration.yml:223 | `#00171A` | 0 | 1 | text 1 |
| `$btn_hover_bg_color` | `neutral(40)` | _00_main_configuration.yml:228 | `rgb(153, 162.2, 163.4)` | 0 | 1 | background 1 |
| `$btn_hover_border_color` | `neutral(60)` | _00_main_configuration.yml:227 | `rgb(102, 115.8, 117.6)` | 0 | 0 |  |
| `$btn_hover_color` | `$on_light` | _00_main_configuration.yml:226 | `#00171A` | 0 | 1 | text 1 |
| `$btn_reset_bg_color` | `neutral(30)` | _00_main_configuration.yml:247 | `rgb(178.5, 185.4, 186.3)` | 1 | 1 | background 2 |
| `$btn_reset_border_color` | `neutral(90)` | _00_main_configuration.yml:249 | `rgb(25.5, 46.2, 48.9)` | 0 | 1 | border 1 |
| `$btn_reset_color` | `neutral(90)` | _00_main_configuration.yml:246 | `rgb(25.5, 46.2, 48.9)` | 0 | 1 | text 1 |
| `$btn_reset_hover_bg_color` | `neutral(90)` | _00_main_configuration.yml:251 | `rgb(25.5, 46.2, 48.9)` | 1 | 1 | background 2 |
| `$btn_reset_hover_border_color` | `neutral(90)` | _00_main_configuration.yml:252 | `rgb(25.5, 46.2, 48.9)` | 0 | 1 | border 1 |
| `$btn_reset_hover_color` | `neutral(10)` | _00_main_configuration.yml:250 | `rgb(229.5, 231.8, 232.1)` | 0 | 1 | text 1 |
| `$btn_search_bg_color` | `$white` | _00_main_configuration.yml:239 | `white` | 0 | 1 | background 1 |
| `$btn_search_border_color` | `$ui_border_color` | _00_main_configuration.yml:241 | `rgb(153, 162.2, 163.4)` | 0 | 0 |  |
| `$btn_search_color` | `neutral(70)` | _00_main_configuration.yml:238 | `rgb(76.5, 92.6, 94.7)` | 0 | 1 | text 1 |
| `$btn_search_hover_bg_color` | `$white` | _00_main_configuration.yml:244 | `white` | 0 | 2 | background 2 |
| `$btn_search_hover_border_color` | `$brand_secondary` | _00_main_configuration.yml:243 | `#BF609B` | 0 | 0 |  |
| `$btn_search_hover_color` | `$on_light` | _00_main_configuration.yml:242 | `#00171A` | 0 | 2 | text 2 |
| `$btn_submit_bg_color` | `$visual_impact` | _00_main_configuration.yml:231 | `#D98536` | 0 | 2 | background 2 |
| `$btn_submit_border_color` | `$visual_impact` | _00_main_configuration.yml:233 | `#D98536` | 0 | 2 | border 2 |
| `$btn_submit_color` | `$on_impact` | _00_main_configuration.yml:230 | `#00171A` | 0 | 2 | text 2 |
| `$btn_submit_hover_bg_color` | `mix($white,$visual_impact,10%)` | _00_main_configuration.yml:236 | `rgb(220.8, 145.2, 74.1)` | 0 | 2 | background 2 |
| `$btn_submit_hover_border_color` | `mix($white,$visual_impact,10%)` | _00_main_configuration.yml:235 | `rgb(220.8, 145.2, 74.1)` | 0 | 2 | border 2 |
| `$btn_submit_hover_color` | `on-colour(mix($white,$visual_impact,10%))` | _00_main_configuration.yml:234 | `#00171A` | 0 | 2 | text 2 |
| `$circular_audio_background` | `$white` | _00_main_configuration.yml:330 | `white` | 1 | 0 | background 1 |
| `$circular_audio_caption_color` | `$on_light` | _00_main_configuration.yml:331 | `#00171A` | 2 | 0 | text 2 |
| `$circular_audio_color` | `$brand_primary` | _00_main_configuration.yml:329 | `#00BDD4` | 5 | 0 | svg 5 |
| `$on_brand` | `on-colour($surface_brand)` | _00_main_configuration.yml:80 | `#00171A` | 2 | 0 | text 2 |
| `$on_brand_secondary` | `on-colour($surface_brand_secondary)` | _00_main_configuration.yml:82 | `#00171A` | 2 | 0 | text 2 |
| `$outline_btn_color` | `$mid_neutral` | _00_main_configuration.yml:254 | `rgb(102, 115.8, 117.6)` | 0 | 0 |  |
| `$outline_btn_hover_color` | `$ui_hover_border_color` | _00_main_configuration.yml:255 | `#BF609B` | 0 | 0 |  |
| `$page_marker_background` | `neutral(30)` | _00_main_configuration.yml:312 | `rgb(178.5, 185.4, 186.3)` | 0 | 1 | css-var 1 |
| `$page_marker_background_active` | `$brand_secondary` | _00_main_configuration.yml:314 | `#BF609B` | 0 | 1 | css-var 1 |
| `$page_marker_background_hover` | `$brand_secondary` | _00_main_configuration.yml:313 | `#BF609B` | 0 | 1 | css-var 1 |
| `$row_border_color` | `neutral(10)` | _00_main_configuration.yml:168 | `rgb(229.5, 231.8, 232.1)` | 0 | 0 |  |
| `$row_header_bg` | `neutral(10)` | _00_main_configuration.yml:167 | `rgb(229.5, 231.8, 232.1)` | 0 | 0 |  |
| `$row_zebra_stripe_color` | `neutral(3)` | _00_main_configuration.yml:169 | `rgb(247.35, 248.04, 248.13)` | 0 | 0 |  |
| `$slide_viewer_background` | `$black` | _00_main_configuration.yml:310 | `#00171A` | 0 | 1 | css-var 1 |
| `$surface_brand` | `$brand_primary` | _00_main_configuration.yml:79 | `#00BDD4` | 3 | 0 | background 3 |
| `$surface_brand_secondary` | `$brand_secondary` | _00_main_configuration.yml:81 | `#BF609B` | 3 | 0 | background 3 |
| `$transcript_highlight` | `set-color(2,50)` | _00_main_configuration.yml:332 | `rgb(223, 175.5, 205)` | 1 | 0 | background 1 |
| `$transcript_hover` | `set-color(2,30)` | _00_main_configuration.yml:333 | `rgb(235.8, 207.3, 225)` | 1 | 0 | background 1 |
| `$ui_border_color` | `neutral(40)` | _00_main_configuration.yml:191 | `rgb(153, 162.2, 163.4)` | 3 | 5 | border 6, var-def 2 |
| `$ui_form_text_color` | `neutral(90)` | _00_main_configuration.yml:196 | `rgb(25.5, 46.2, 48.9)` | 0 | 0 |  |
| `$ui_hover_border_color` | `$brand_secondary` | _00_main_configuration.yml:192 | `#BF609B` | 0 | 6 | border 2, var-def 4 |

### Other global colour variables (library components and theme partials)

| Variable | Declared as | Where | Resolves to | Uses theme | Uses library | Roles (compiled) |
|---|---|---|---|---|---|---|
| `$brand-primary` | `$clr1` | lib:a_components/10_colours_and_patterns/00_core/_01_configuration_colour_and_patterns.sass:80 | `#00BDD4` | 0 | 5 | css-var 1, var-def 3, control 1 |
| `$brand-primary-on-dark` | `ensure-contrast($brand-primary, $surface-dark)` | lib:a_components/10_colours_and_patterns/00_core/_01_configuration_colour_and_patterns.sass:84 | `#00BDD4` | 0 | 1 | css-var 1 |
| `$brand-primary-on-light` | `ensure-contrast($brand-primary, $surface-light)` | lib:a_components/10_colours_and_patterns/00_core/_01_configuration_colour_and_patterns.sass:83 | `rgb(0, 119.28, 133.88)` | 0 | 2 | text 1, css-var 1 |
| `$brand-secondary` | `$clr2` | lib:a_components/10_colours_and_patterns/00_core/_01_configuration_colour_and_patterns.sass:81 | `#BF609B` | 0 | 7 | border 2, css-var 1, var-def 3, control 1 |
| `$brand-secondary-on-dark` | `ensure-contrast($brand-secondary, $surface-dark)` | lib:a_components/10_colours_and_patterns/00_core/_01_configuration_colour_and_patterns.sass:86 | `rgb(206.36, 134.16, 179)` | 0 | 3 | text 2, css-var 1 |
| `$brand-secondary-on-light` | `ensure-contrast($brand-secondary, $surface-light)` | lib:a_components/10_colours_and_patterns/00_core/_01_configuration_colour_and_patterns.sass:85 | `rgb(160.44, 84.32, 134.36)` | 0 | 2 | text 1, css-var 1 |
| `$label_color` | `neutral(70)` | sass/30_typography/_general.sass:9 | `rgb(76.5, 92.6, 94.7)` | 1 | 0 | text 1 |
| `$label_reversed_color` | `neutral(30)` | sass/30_typography/_general.sass:11 | `rgb(178.5, 185.4, 186.3)` | 1 | 0 | text 1 |
| `$mobile_menu_background_color` | `$black` | sass/40_ui/_main_navigation_mobile.sass:3 | `#00171A` | 1 | 0 | background 1 |
| `$on-brand` | `on-colour($surface-brand)` | lib:a_components/10_colours_and_patterns/00_core/_01_configuration_colour_and_patterns.sass:88 | `#00171A` | 0 | 2 | css-var 1, mixin-call 1 |
| `$on-brand-secondary` | `on-colour($surface-brand-secondary)` | lib:a_components/10_colours_and_patterns/00_core/_01_configuration_colour_and_patterns.sass:90 | `#00171A` | 0 | 3 | text 1, css-var 1, mixin-call 1 |
| `$on-dark` | `$white` | lib:a_components/10_colours_and_patterns/00_core/_01_configuration_colour_and_patterns.sass:78 | `white` | 0 | 8 | text 3, border 1, css-var 1, mixin-call 2 |
| `$on-impact` | `on-colour($visual-impact)` | lib:a_components/10_colours_and_patterns/00_core/_01_configuration_colour_and_patterns.sass:82 | `#00171A` | 0 | 2 | css-var 1, mixin-call 1 |
| `$on-light` | `$black` | lib:a_components/10_colours_and_patterns/00_core/_01_configuration_colour_and_patterns.sass:77 | `#00171A` | 0 | 21 | text 13, border 4, css-var 1, mixin-call 2 |
| `$page_header_border_color` | `neutral(70)` | sass/20_layout/_page_header.sass:11 | `rgb(76.5, 92.6, 94.7)` | 2 | 0 | border 2 |
| `$surface-brand` | `$brand-primary` | lib:a_components/10_colours_and_patterns/00_core/_01_configuration_colour_and_patterns.sass:87 | `#00BDD4` | 0 | 3 | css-var 1, var-def 1, mixin-call 1 |
| `$surface-brand-secondary` | `$brand-secondary` | lib:a_components/10_colours_and_patterns/00_core/_01_configuration_colour_and_patterns.sass:89 | `#BF609B` | 0 | 5 | background 2, css-var 1, var-def 1, mixin-call 1 |
| `$surface-dark` | `$black` | lib:a_components/10_colours_and_patterns/00_core/_01_configuration_colour_and_patterns.sass:76 | `#0E3A40` | 0 | 5 | css-var 1, var-def 2, mixin-call 2 |
| `$surface-light` | `$white` | lib:a_components/10_colours_and_patterns/00_core/_01_configuration_colour_and_patterns.sass:75 | `#EAF3F4` | 0 | 5 | css-var 1, var-def 2, mixin-call 2 |
| `$value_color` | `neutral(90)` | sass/30_typography/_general.sass:10 | `rgb(25.5, 46.2, 48.9)` | 2 | 0 | text 2 |
| `$value_reversed_color` | `neutral(20)` | sass/30_typography/_general.sass:12 | `rgb(204, 208.6, 209.2)` | 1 | 0 | text 1 |
| `$visual-impact` | `$clr5` | lib:a_components/10_colours_and_patterns/00_core/_01_configuration_colour_and_patterns.sass:79 | `#D98536` | 0 | 3 | css-var 1, var-def 1, mixin-call 1 |


## 3. Palette contrast under the current configuration

WCAG 2 contrast of each colour against the white point and the black point. A colour needs 4.5 against the surface it is text on (3 for large text or UI parts), and the same the other way round when it is a surface for white or black text. This is what a usage recommendation per slot has to be checked against.

| Variable | Value | vs white |  | vs black |  | Used as text | Used as background |
|---|---|---|---|---|---|---|---|
| `$bgcolor` | #ffffff | 1.00 | **fail** | 18.46 | AAA | 0 | 1 |
| `$brand_primary` | #00bdd4 | 2.28 | **fail** | 8.11 | AAA | 0 | 0 |
| `$brand_secondary` | #bf609b | 3.92 | AA large | 4.71 | AA | 0 | 2 |
| `$clr1` | #00bdd4 | 2.28 | **fail** | 8.11 | AAA | 0 | 0 |
| `$clr2` | #bf609b | 3.92 | AA large | 4.71 | AA | 0 | 2 |
| `$clr3` | #0e3a40 | 12.37 | AAA | 1.49 | **fail** | 0 | 0 |
| `$clr4` | #eaf3f4 | 1.13 | **fail** | 16.37 | AAA | 0 | 0 |
| `$clr5` | #d98536 | 2.85 | **fail** | 6.47 | AA | 0 | 0 |
| `$clr6` | #315faa | 6.27 | AA | 2.94 | **fail** | 0 | 0 |
| `$clr7` | #7dbf60 | 2.21 | **fail** | 8.35 | AAA | 0 | 0 |
| `$clr8` | #e1bb0b | 1.86 | **fail** | 9.95 | AAA | 0 | 0 |
| `$clr9` | #e5336d | 4.18 | AA large | 4.42 | AA large | 0 | 0 |
| `$cta` | #00bdd4 | 2.28 | **fail** | 8.11 | AAA | 0 | 0 |
| `$dark_neutral` | #4d5d5f | 6.94 | AA | 2.66 | **fail** | 0 | 0 |
| `$darker_neutral` | #334548 | 10.02 | AAA | 1.84 | **fail** | 1 | 0 |
| `$darkest_neutral` | #1a2e31 | 14.18 | AAA | 1.30 | **fail** | 0 | 0 |
| `$de_activated` | #b3b9ba | 1.98 | **fail** | 9.31 | AAA | 0 | 0 |
| `$de_emphasized` | #808b8d | 3.51 | AA large | 5.26 | AA | 0 | 0 |
| `$footer_bg` | #00171a | 18.46 | AAA | 1.00 | **fail** | 0 | 1 |
| `$impact` | #bf609b | 3.92 | AA large | 4.71 | AA | 0 | 0 |
| `$light_neutral` | #99a2a3 | 2.60 | **fail** | 7.09 | AAA | 0 | 2 |
| `$lighter_neutral` | #b3b9ba | 1.98 | **fail** | 9.31 | AAA | 0 | 0 |
| `$lightest_neutral` | #f2f3f4 | 1.11 | **fail** | 16.66 | AAA | 0 | 0 |
| `$link_colour` | #00171a | 18.46 | AAA | 1.00 | **fail** | 3 | 0 |
| `$link_colour_active` | #007786 | 5.26 | AA | 3.51 | AA large | 13 | 0 |
| `$link_colour_active_reversed` | #00bdd4 | 2.28 | **fail** | 8.11 | AAA | 6 | 0 |
| `$link_colour_reversed` | #ffffff | 1.00 | **fail** | 18.46 | AAA | 5 | 0 |
| `$menu_color` | #00171a | 18.46 | AAA | 1.00 | **fail** | 0 | 0 |
| `$mid_neutral` | #667476 | 4.87 | AA | 3.79 | AA large | 0 | 0 |
| `$neutral` | #808b8d | 3.51 | AA large | 5.26 | AA | 0 | 0 |
| `$on_dark` | #ffffff | 1.00 | **fail** | 18.46 | AAA | 46 | 0 |
| `$on_impact` | #00171a | 18.46 | AAA | 1.00 | **fail** | 0 | 0 |
| `$on_light` | #00171a | 18.46 | AAA | 1.00 | **fail** | 23 | 0 |
| `$surface_dark` | #0e3a40 | 12.37 | AAA | 1.49 | **fail** | 0 | 0 |
| `$surface_light` | #eaf3f4 | 1.13 | **fail** | 16.37 | AAA | 0 | 0 |
| `$true_black` | #000000 | 21.00 | AAA | 1.14 | **fail** | 0 | 1 |
| `$visual_impact` | #d98536 | 2.85 | **fail** | 6.47 | AA | 0 | 1 |
| `$welcome_block_bg` | #00171a | 18.46 | AAA | 1.00 | **fail** | 0 | 4 |
| `$welcome_block_color` | #ffffff | 1.00 | **fail** | 18.46 | AAA | 2 | 0 |

Black point `$black` = #00171a, white point `$white` = #ffffff; their mutual contrast is 18.46.

## 4. Direct palette-slot references in rules

Rules that name a numbered slot (`$clr2`) rather than a semantic alias. These are the places where a component has bound itself to one position in the palette: change the palette order and the component changes meaning.

| Where | Role | Slot | Declaration |
|---|---|---|---|
| 40_ui/_omeka_advanced_search_filters.sass:28 | background | `$clr2` | `set-color(2,5)` |
| 60_site_elements/agile_blocks/_poster.sass:48 | background | `$clr2` | `set-colour(2,10)` |

Palette slots never used directly in a rule (only through aliases or the CSS-variable export): `$clr1` (via `$brand-primary`, `$brand_primary`), `$clr3` (via `$surface_dark`), `$clr4` (via `$surface_light`), `$clr5` (via `$visual-impact`, `$visual_impact`), `$clr6` (unused), `$clr7` (unused), `$clr8` (unused), `$clr9` (unused).

## 5. Same variable, different roles

A variable used both as a text colour and as a background (or border) has two different contrast obligations. The canvas pair (`$black`, `$white`), the surfaces and the on-* roles are left out: on the continuum each of them is both a surface and a text colour by design. What remains cannot be given one usage recommendation.

| Variable | As text in | As background in | As border in |
|---|---|---|---|
| `$link_colour` | lib:a_components/30_typography/00_core/12_mixins/_inline_text_link.sass<br>lib:a_components/30_typography/standardized_text_collection/_anchor.sass<br>30_typography/_general.sass |  | lib:a_components/30_typography/00_core/12_mixins/_link_underline.sass<br>30_typography/_general.sass |
| `$link_colour_active` | lib:a_components/30_typography/standardized_text_collection/_anchor.sass<br>30_typography/_10_definitions.sass<br>30_typography/_general.sass<br>40_ui/10_components/_exposed_facet.sass<br>40_ui/_extensions.sass<br>40_ui/_wayfinding.sass<br>60_site_elements/_advanced_search_browser.sass<br>60_site_elements/_item_show.sass |  | lib:a_components/30_typography/00_core/12_mixins/_link_underline.sass<br>30_typography/_10_definitions.sass<br>30_typography/_general.sass |
| `$link_colour_active_reversed` | lib:a_components/30_typography/standardized_text_collection/_anchor.sass<br>30_typography/_10_definitions.sass<br>30_typography/_general.sass<br>40_ui/_main_navigation_mobile.sass |  | 30_typography/_10_definitions.sass<br>30_typography/_general.sass |
| `$welcome_block_color` | 60_site_elements/_welcome_block.sass |  | 60_site_elements/_welcome_block.sass |


## 6. Per-file colour vocabulary

Which colour variables and hard-coded colours each file draws on. Files reaching for many palette slots, or for literals, are the ones built to their own palette.

| File | Refs | Variables | Hard-coded | Roles |
|---|---|---|---|---|
| 30_typography/_general.sass | 27 | $link_colour $link_colour_active $link_colour_reversed $link_colour_active_reversed $on_dark $brand_secondary_on_light $label_color $label_reversed_color $on_light $value_color $value_reversed_color $brand_primary_on_light $surface_brand $on_brand $black |  | text 21, background 3, border 3 |
| 30_typography/_10_definitions.sass | 25 | $on_light $brand_secondary_on_light $on_dark $black $visual_impact $brand_secondary $link_colour_active $link_colour_reversed $link_colour_active_reversed |  | text 17, background 4, border 4 |
| 60_site_elements/agile_blocks/_section_introduction.sass | 14 | $surface_brand_secondary $on_brand_secondary $black $on_dark $true_black $white $brand_primary_on_dark |  | text 6, background 4, border 3, other 1 |
| 60_site_elements/_item_with_metadata.sass | 11 | $black $brand_secondary_on_dark $on_dark | rgba(0, 0, 0, 0) rgba(0,0,0,0.7) rgba(0,0,0, 0.95) | text 7, background 4 |
| 40_ui/_main_navigation_mobile.sass | 9 | $black $on_dark $page_header_border_color $mobile_menu_background_color $link_colour_reversed $link_colour_active_reversed |  | text 6, background 1, border 1, var-def 1 |
| 60_site_elements/_item_show.sass | 9 | $link_colour_active $black $on_dark $circular_audio_background $circular_audio_caption_color $white $on_light $brand_secondary_on_light |  | text 6, background 3 |
| 60_site_elements/_item_showcase.sass | 9 | $black $on_dark $brand_primary_on_dark | rgba(0, 0, 0, 0) rgba(0,0,0,0.7) rgba(0,0,0, 0.95) | text 5, background 4 |
| 60_site_elements/_slide_item.sass | 8 | $white $on_dark $black |  | text 4, background 1, border 2, mixin-call 1 |
| 60_site_elements/_welcome_block.sass | 8 | $welcome_block_bg $welcome_block_color $brand_primary_on_dark $on_dark |  | text 4, background 2, border 2 |
| 40_ui/10_components/_library_superfish.sass | 7 | $menu_background $white $on_light $brand_secondary_on_light |  | text 2, background 5 |
| 60_site_elements/_media_circular_audio.sass | 7 | $circular_audio_color $circular_audio_caption_color $transcript_hover |  | text 1, background 1, svg 5 |
| 60_site_elements/_universal_viewer.sass | 7 | $black $on_dark $white $on_light |  | text 2, background 4, border 1 |
| 40_ui/10_components/_browser_mobile_base.sass | 6 | $black $on_dark |  | text 3, background 2, border 1 |
| 60_site_elements/agile_blocks/_poster.sass | 6 | $clr2 $on_light $brand_secondary $black $on_dark |  | text 2, background 4 |
| 60_site_elements/_capsule.sass | 6 | $black $on_dark $brand_secondary_on_dark $brand_primary_on_dark |  | text 4, background 1, border 1 |
| 40_ui/10_components/_omeka_search_form_component.sass | 5 | $ui_border_color $white $brand_primary $on_light $brand_secondary |  | text 1, background 1, border 2, shadow 1 |
| 40_ui/10_components/_card.sass | 4 | $white $ui_border_color $on_light $brand_secondary |  | text 1, background 1, border 2 |
| 40_ui/_general.sass | 4 | $btn_reset_bg_color $btn_reset_hover_bg_color $on_light | black | text 1, background 2, border 1 |
| 40_ui/_omeka_search_form.sass | 4 | $on_light $brand_primary_on_light |  | text 2, background 1, border 1 |
| 60_site_elements/_advanced_search_browser.sass | 4 | $brand_secondary_on_light $on_light $link_colour_active |  | text 4 |
| 60_site_elements/_slide_viewer.sass | 4 | $black |  | background 2, css-var 2 |
| 60_site_elements/_reference_block.sass | 4 | $white $on_brand_secondary $surface_brand_secondary |  | text 1, background 3 |
| 40_ui/10_components/_exposed_facet.sass | 3 | $link_colour_active $on_light |  | text 2, border 1 |
| 40_ui/_pagination.sass | 3 | $on_light $brand_secondary_on_light |  | text 2, border 1 |
| 40_ui/_tab_ui.sass | 3 | $on_light $surface_brand |  | text 2, background 1 |
| 10_colour_and_patterns/_patterns.sass | 2 | $white |  | mixin-def 2 |
| 20_layout/_page_footer.sass | 2 | $on_dark $footer_bg |  | text 1, background 1 |
| 30_typography/_20_mixin_metadata_block.sass | 2 | $on_dark |  | text 2 |
| 40_ui/10_components/_browser_display_mode_controls.sass | 2 | $on_dark |  | text 2 |
| 40_ui/_extensions.sass | 2 | $ui_border_color $link_colour_active |  | text 1, border 1 |
| 40_ui/_omeka_advanced_search_filters.sass | 2 | $clr2 $white |  | background 2 |
| 40_ui/_omeka_site_page_pagination.sass | 2 | $brand_secondary_on_light |  | text 2 |
| 40_ui/_wayfinding.sass | 2 | $link_colour_active |  | text 2 |
| 60_site_elements/agile_blocks/_section_list_capsules.sass | 2 | $surface_brand_secondary $white |  | background 2 |
| 60_site_elements/agile_blocks/_slideshow_block.sass | 2 | $on_dark |  | text 1, background 1 |
| 60_site_elements/agile_blocks/_quotation.sass | 2 | $on_light $brand_primary |  | text 1, border 1 |
| 60_site_elements/_discovery_tool.sass | 2 | $welcome_block_bg |  | background 2 |
| 60_site_elements/_resources_available_downloads.sass | 2 | $on_light | #c0c0bf | text 1, border 1 |
| 60_site_elements/_title_area.sass | 2 | $on_light $on_dark |  | text 2 |
| 20_layout/_page_header.sass | 1 | $page_header_border_color |  | border 1 |
| 30_typography/_license.sass | 1 | $on_light |  | text 1 |
| 40_ui/10_components/_list_item.sass | 1 | $brand_secondary |  | border 1 |
| 40_ui/12_mixins/_download_icons.sass | 1 | $brand_secondary_on_light |  | text 1 |
| 40_ui/12_mixins/_slide_viewer_integrated_nav.sass | 1 |  |  | css-var 1 |
| 40_ui/12_mixins/_ui_mixins.sass | 1 | $cta |  | mixin-def 1 |
| 60_site_elements/agile_blocks/_item_listing_block.sass | 1 | $brand_secondary_on_light |  | text 1 |
| 60_site_elements/_card.sass | 1 | $value_color |  | text 1 |
| 60_site_elements/_media_vtt.sass | 1 | $transcript_highlight |  | background 1 |
| 60_site_elements/_link_cards.sass | 1 | $on_light |  | text 1 |
| 60_site_elements/_map_block.sass | 1 | $white |  | background 1 |
| 60_site_elements/_preview_block.sass | 1 | $brand_secondary_on_light |  | text 1 |
| 60_site_elements/_resources_for_educators.sass | 1 | $on_dark |  | text 1 |
| lib:a_components/40_ui/00_core/_04_configuration_ui.sass | 52 | $light_neutral $link_colour $darker_neutral $cta $white $black $impact $mid_neutral $ui_hover_border_color $ui_border_color |  | var-def 52 |
| lib:a_components/40_ui/ui_element_base_v002/13_definitions/_form_elements.sass | 52 | $btn_border_color $btn_bg_color $btn_color $btn_hover_color $btn_hover_bg_color $on-dark $on-light $brand-primary-on-light $black $on-brand-secondary $surface-brand-secondary $brand-secondary $btn_reset_border_color $btn_reset_bg_color $btn_reset_color $btn_reset_hover_color $btn_reset_hover_bg_color $btn_reset_hover_border_color $btn_submit_border_color $btn_submit_bg_color $btn_submit_color $btn_submit_hover_color $btn_submit_hover_bg_color $btn_submit_hover_border_color $btn_search_color $btn_search_bg_color $btn_search_hover_color $btn_search_hover_bg_color $ui_border_color $white $ui_hover_border_color |  | text 19, background 18, border 15 |
| lib:a_components/10_colours_and_patterns/00_core/_01_configuration_colour_and_patterns.sass | 50 | $white $black $clr5 $clr1 $clr2 $visual-impact $brand-primary $surface-light $surface-dark $brand-secondary $surface-brand $surface-brand-secondary $light_neutral $lighter_neutral $cta | #ababab #efefef #333333 #222222 #111111 #000000 black white red blue | var-def 50 |
| lib:a_components/10_colours_and_patterns/root_colour_variables/_colour_root_variables.sass | 29 | $clr1 $clr2 $clr3 $clr4 $clr5 $clr6 $clr7 $clr8 $clr9 $black $white $impact $cta $surface-light $on-light $surface-dark $on-dark $visual-impact $on-impact $brand-primary $brand-primary-on-light $brand-primary-on-dark $brand-secondary $brand-secondary-on-light $brand-secondary-on-dark $surface-brand $on-brand $surface-brand-secondary $on-brand-secondary |  | css-var 20, var-def 9 |
| lib:a_components/10_colours_and_patterns/00_core/11_functions/_set_colour.sass | 25 | $clr1 $clr2 $clr3 $clr4 $clr5 $clr6 $clr7 $clr8 $clr9 $clr10 $clr11 $clr12 $clr13 $clr14 $clr15 $clr16 $clr17 $clr18 $clr19 $clr20 $colourmaps $black $white |  | var-def 20, control 5 |
| lib:a_components/10_colours_and_patterns/colour_roles/_colour_roles.sass | 24 | $brand-primary $brand-secondary $black $white $surface-light $on-light $surface-dark $on-dark $on-impact $visual-impact $on-brand $surface-brand $on-brand-secondary $surface-brand-secondary |  | mixin-call 22, control 2 |
| lib:a_components/10_colours_and_patterns/00_core/11_functions/_contrast.sass | 17 | $toward $black $white $on-dark $on-light $candidates |  | var-def 7, control 7 |
| lib:a_components/30_typography/standardized_text_collection/_text_collection.sass | 7 | $dark_neutral $light_neutral $on-light $darker_neutral |  | text 3, background 2, border 2 |
| lib:a_components/10_colours_and_patterns/common_patterns/_patterns.sass | 6 | $black $true_black |  | background 3, mixin-def 3 |
| lib:a_components/40_ui/ui_element_base_v002/_form_ui.sass | 6 | $brand-secondary $ui_border_color $ui_hover_border_color | white | background 2, border 3, shadow 1 |
| lib:a_components/40_ui/ui_element_base_v002/_standardized_icons/_icons.sass | 5 | $on-light $brand-secondary-on-dark $on-dark |  | text 4, background 1 |
| lib:a_components/10_colours_and_patterns/00_core/11_functions/_neutral.sass | 4 | $black $white |  |  |
| lib:a_components/30_typography/standardized_text_collection/_anchor.sass | 4 | $link_colour $link_colour_active $link_colour_reversed $link_colour_active_reversed |  | text 4 |
| lib:a_components/40_ui/ui_element_base_v002/_ui_library_support/_component_superfish_navigation.sass | 4 | $surface-brand-secondary $on-light | rgba(0,0,0,.2) | text 2, background 1, shadow 1 |
| lib:a_components/60_site_elements/slide_viewer/_slide_viewer_component.sass | 4 | $slide_viewer_background $page_marker_background $page_marker_background_hover $page_marker_background_active |  | css-var 4 |
| lib:a_components/30_typography/00_core/12_mixins/_image_bullets.sass | 3 |  |  | border 3 |
| lib:a_components/30_typography/00_core/12_mixins/_link_underline.sass | 2 | $link_colour $link_colour_active |  | border 2 |
| lib:a_components/30_typography/00_core/12_mixins/_multiline_ellipses.sass | 2 |  |  | mixin-def 2 |
| lib:a_components/30_typography/00_core/12_mixins/_inline_text_link.sass | 2 | $link_colour $on-light |  | text 1, border 1 |
| lib:a_components/40_ui/00_core/12_mixins/_spinner.sass | 2 |  | rgba(0, 0, 0, 0.75) | border 1, mixin-def 1 |
| lib:a_components/40_ui/ui_element_base_v002/_ui_library_support/_component_form_select2.sass | 2 | $on-light $ui_border_color |  | text 1, border 1 |
| lib:a_components/10_colours_and_patterns/00_core/11_functions/_hsb.sass | 1 |  | hsla(0, 0, 0, $a) | control 1 |
| lib:a_components/30_typography/00_core/12_mixins/_clearfix.sass | 1 |  | blue | background 1 |
| lib:a_components/30_typography/00_core/12_mixins/_divider_line.sass | 1 | $black |  | mixin-def 1 |
| lib:a_components/30_typography/00_core/12_mixins/_material_design_icons.sass | 1 |  | rgba(0, 0, 0, 0.54) | text 1 |
| lib:a_components/20_layout/standardized_top_level_primitives/_standardized_top_level_primitives.sass | 1 | $bgcolor |  | background 1 |
| lib:a_components/30_typography/!fluid_type/_base_typography.sass | 1 | $on-light |  | text 1 |
| lib:a_components/30_typography/!fluid_type/_heading_collection.sass | 1 | $on-light |  | text 1 |
| lib:a_components/40_ui/ui_element_base_v002/_standardized_icons/_icon_mixins.sass | 1 | $brand-secondary-on-light |  | text 1 |
| lib:a_components/60_site_elements/figure_normalization/_figure.sass | 1 | $on-light |  | text 1 |


## 7. Hard-coded colours

Colour values written directly instead of taken from a variable. `white`/`black` keywords are included because they bypass `$white`/`$black`.

In rules and mixins (theme 8, library 7):

| Colour | Count | Where (file:line role) |
|---|---|---|
| `white` | 2 | lib:a_components/40_ui/ui_element_base_v002/_form_ui.sass:118 background<br>lib:a_components/40_ui/ui_element_base_v002/_form_ui.sass:124 shadow |
| `rgba(0, 0, 0, 0)` | 2 | 60_site_elements/_item_showcase.sass:34 background in linear-gradient()<br>60_site_elements/_item_with_metadata.sass:30 background in linear-gradient() |
| `rgba(0,0,0,0.7)` | 2 | 60_site_elements/_item_showcase.sass:34 background in linear-gradient()<br>60_site_elements/_item_with_metadata.sass:30 background in linear-gradient() |
| `rgba(0,0,0, 0.95)` | 2 | 60_site_elements/_item_showcase.sass:34 background in linear-gradient()<br>60_site_elements/_item_with_metadata.sass:30 background in linear-gradient() |
| `hsla(0, 0, 0, $a)` | 1 | lib:a_components/10_colours_and_patterns/00_core/11_functions/_hsb.sass:8 control |
| `blue` | 1 | lib:a_components/30_typography/00_core/12_mixins/_clearfix.sass:17 background |
| `rgba(0, 0, 0, 0.54)` | 1 | lib:a_components/30_typography/00_core/12_mixins/_material_design_icons.sass:4 text |
| `rgba(0, 0, 0, 0.75)` | 1 | lib:a_components/40_ui/00_core/12_mixins/_spinner.sass:1 mixin-def |
| `rgba(0,0,0,.2)` | 1 | lib:a_components/40_ui/ui_element_base_v002/_ui_library_support/_component_superfish_navigation.sass:52 shadow |
| `black` | 1 | 40_ui/_general.sass:42 border |
| `#c0c0bf` | 1 | 60_site_elements/_resources_available_downloads.sass:5 border |

In variable declarations: 25, of which 25 are the library's own palette defaults (`$clr1`–`$clr20`, `$black`, `$white`, `$impact: red`, `$cta: blue`); the rest: none.

## 8. Transforms applied to palette colours

Every `mix()`, `rgba()`, `lighten()` … applied to a palette variable creates a derived colour that no setting controls and no contrast check sees. `neutral()` is the library's sanctioned way to derive greys; everything else is ad hoc.

| Function | Uses | On which variables |
|---|---|---|
| `mix()` | 17 | $black ×6, $white ×4, $impact ×4, $toward ×1, $surface_brand ×1, $menu_background ×1 |
| `ensure-contrast()` | 8 | $brand-primary ×2, $surface-light ×2, $surface-dark ×2, $brand-secondary ×2 |
| `rgba()` | 6 | $black ×3, $true_black ×1, $white ×1, $welcome_block_bg ×1 |
| `if()` | 4 | $black ×2, $white ×2 |
| `on-colour()` | 3 | $visual-impact ×1, $surface-brand ×1, $surface-brand-secondary ×1 |
| `contrast()` | 2 | $black ×1, $white ×1 |
| `in()` | 2 | $brand-primary ×1, $brand-secondary ×1 |
| `set-colour()` | 2 | $clr2 ×2 |
| `linear-gradient()` | 2 | $brand_secondary ×1, $black ×1 |
| `map-get()` | 1 | $colourmaps ×1 |


## 9. Text on background: pairs declared in one rule

Only pairs where a rule sets both `color` and a plain `background(-color)` are listed; inherited backgrounds are not seen, so this is a floor, not the whole picture. Ratios are WCAG 2 contrast under the current configuration. AA needs 4.5 for body text and 3 for large text.

| Ratio | Text | Background | Where | Selector |
|---|---|---|---|---|
| 4.71 | `$on-brand-secondary` #00171a | `$surface-brand-secondary` #bf609b | lib:a_components/40_ui/ui_element_base_v002/13_definitions/_form_elements.sass:121 | %button-standard &:hover |
| 4.71 | `$on_brand_secondary` #00171a | `$surface_brand_secondary` #bf609b | 60_site_elements/agile_blocks/_section_introduction.sass:13 | .section-intro-block:not(.region-splash) .title-area |
| 4.71 | `$on_brand_secondary` #00171a | `$surface_brand_secondary` #bf609b | 60_site_elements/_reference_block.sass:45 | .reference-block .reference-pagination .pagination-list li.pagination- |
| 6.47 | `$btn_submit_color` #00171a | `$btn_submit_bg_color` #d98536 | lib:a_components/40_ui/ui_element_base_v002/13_definitions/_form_elements.sass:193 | %button-submit |
| 6.47 | `$btn_submit_color` #00171a | `$btn_submit_bg_color` #d98536 | lib:a_components/40_ui/ui_element_base_v002/13_definitions/_form_elements.sass:207 | %button-cta |
| 6.94 | `$btn_search_color` #4d5d5f | `$btn_search_bg_color` #ffffff | lib:a_components/40_ui/ui_element_base_v002/13_definitions/_form_elements.sass:225 | %button-search |
| 7.09 | `$on-light` #00171a | `$light_neutral` #99a2a3 | lib:a_components/30_typography/standardized_text_collection/_text_collection.sass:52 | ins |
| 7.09 | `$on-light` #00171a | `$light_neutral` #99a2a3 | lib:a_components/30_typography/standardized_text_collection/_text_collection.sass:57 | mark |
| 7.09 | `$btn_hover_color` #00171a | `$btn_hover_bg_color` #99a2a3 | lib:a_components/40_ui/ui_element_base_v002/13_definitions/_form_elements.sass:62 | %button &:hover |
| 7.15 | `$btn_reset_color` #1a2e31 | `$btn_reset_bg_color` #b3b9ba | lib:a_components/40_ui/ui_element_base_v002/13_definitions/_form_elements.sass:152 | %button-reset |
| 7.24 | `$btn_submit_hover_color` #00171a | `$btn_submit_hover_bg_color` #dd914a | lib:a_components/40_ui/ui_element_base_v002/13_definitions/_form_elements.sass:198 | %button-submit &:hover |
| 7.24 | `$btn_submit_hover_color` #00171a | `$btn_submit_hover_bg_color` #dd914a | lib:a_components/40_ui/ui_element_base_v002/13_definitions/_form_elements.sass:214 | %button-cta &:hover |
| 8.11 | `$on_brand` #00171a | `$surface_brand` #00bdd4 | 30_typography/_general.sass:180 | .lozenge |
| 11.50 | `$btn_reset_hover_color` #e6e8e8 | `$btn_reset_hover_bg_color` #1a2e31 | lib:a_components/40_ui/ui_element_base_v002/13_definitions/_form_elements.sass:160 | %button-reset &:hover |
| 11.93 | `$btn_color` #00171a | `$btn_bg_color` #ccd1d1 | lib:a_components/40_ui/ui_element_base_v002/13_definitions/_form_elements.sass:58 | %button |
| 18.46 | `$btn_search_hover_color` #00171a | `$btn_search_hover_bg_color` #ffffff | lib:a_components/40_ui/ui_element_base_v002/13_definitions/_form_elements.sass:241 | %button-search &:hover |
| 18.46 | `$btn_search_hover_color` #00171a | `$btn_search_hover_bg_color` #ffffff | lib:a_components/40_ui/ui_element_base_v002/13_definitions/_form_elements.sass:249 | %button-search-clear &:hover |
| 18.46 | `$on_dark` #ffffff | `$footer_bg` #00171a | 20_layout/_page_footer.sass:11 | body > footer |
| 18.46 | `$on_dark` #ffffff | `$black` #00171a | 30_typography/_10_definitions.sass:61 | %ribbon-black |
| 18.46 | `$on_dark` #ffffff | `$black` #00171a | 60_site_elements/_capsule.sass:11 | .capsule .item-info |
| 18.46 | `$on_dark` #ffffff | `$black` #00171a | 60_site_elements/_item_show.sass:138 | .item.show .item-viewer .media-render &:first-child |
| 18.46 | `$circular_audio_caption_color` #00171a | `$circular_audio_background` #ffffff | 60_site_elements/_item_show.sass:157 | .item.show .item-viewer .media-container &.audio |
| 18.46 | `$welcome_block_color` #ffffff | `$welcome_block_bg` #00171a | 60_site_elements/_welcome_block.sass:62 | #welcome-block |

Pairs that could not be evaluated (compound expressions): 5. Bold = below 3:1; * = between 3:1 and 4.5:1.

## 10. Library specifics

**Library defaults for the semantic aliases** (from `10_colours_and_patterns/00_core/_01_configuration_colour_and_patterns.sass`): `$impact: red`, `$cta: blue`, `$de_emphasized: $light_neutral`, `$de_activated: $lighter_neutral`, `$link_colour: $cta`, `$bgcolor: $white`, `$footer_bg: $black`. The theme configuration overrides all of them; a theme that omitted one would get `red`/`blue`.

**`$neutral` is overwritten by the library.** It is declared as `neutral()` (= #7c979a) but resolves to #808b8d: `root_colour_variables/_colour_root_variables.sass` assigns `$neutral` inside a top-level `@for` loop, and SASS treats that as an assignment to the existing global, so the loop's last step (`neutral(90)`) wins. Harmless today only because nothing uses `$neutral`.

**`set-colour()` usage** (compiled): 2 references — 40_ui/_omeka_advanced_search_filters.sass, 60_site_elements/agile_blocks/_poster.sass.

**CSS custom properties emitted from colour variables:** 27 declarations in lib:a_components/10_colours_and_patterns/root_colour_variables/_colour_root_variables.sass, lib:a_components/60_site_elements/slide_viewer/_slide_viewer_component.sass, 40_ui/12_mixins/_slide_viewer_integrated_nav.sass, 60_site_elements/_slide_viewer.sass.

**Library files not in this build** that still reference colours: 24 files, 166 references (see occurrences.csv, scope `library-uncompiled`). They matter for the library update, not for this theme.

## 11. Scoped colour variables

Variables declared inside mixins or blocks with a colour value. They are invisible to the configuration and to the probe above.

| Variable | Declared | Value |
|---|---|---|
| `$candidates` | lib:a_components/10_colours_and_patterns/00_core/11_functions/_contrast.sass:78 | `if(is-light($surface), ($dark, $light, $black, $white), ($light, $dark, $white, ` |
| `$colourmaps` | lib:a_components/10_colours_and_patterns/00_core/11_functions/_set_colour.sass:13 | `(1: $clr1, 2: $clr2, 3: $clr3, 4: $clr4, 5: $clr5, 6: $clr6, 7: $clr7, 8: $clr8,` |
| `$s14-root-colours` | lib:a_components/10_colours_and_patterns/root_colour_variables/_colour_root_variables.sass:13 | `$clr1 $clr2 $clr3 $clr4 $clr5 $clr6 $clr7 $clr8 $clr9` |
| `$toward` | lib:a_components/10_colours_and_patterns/00_core/11_functions/_contrast.sass:68 | `if(is-light($surface), $black, $white)` |
| `$ui_color` | lib:a_components/40_ui/00_core/_04_configuration_ui.sass:16 | `$darker_neutral` |
| `$ui_color` | lib:a_components/40_ui/00_core/_04_configuration_ui.sass:59 | `$darker_neutral` |

