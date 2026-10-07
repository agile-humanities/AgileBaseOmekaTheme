# Colour usage audit — AgileBaseOmekaTheme

Generated 2026-10-06 by `tools/colour-audit.js` from `_00_main_configuration.yml`. Library scanned: `node_modules/stop14-themesystem-legacy/source`. Nothing here is hand-edited; re-run the tool after changes.

## 1. Scope

|  | Files | Colour references | of which variables | hard-coded colours | transparent / currentColor |
|---|---|---|---|---|---|
| Theme SASS (compiled) | 100 | 237 | 221 | 8 | 8 |
| Library SASS compiled into the theme | 170 | 336 | 289 | 32 | 15 |
| Library SASS not in this build | 115 | 166 | 141 | 14 | 11 |

Global variables probed: 479. Holding a colour: 99; holding a colour map: 10. Scoped (non-global) colour variables: 4.

"Role" is the CSS property a reference colours: text (`color`), background, border (incl. outline), svg (fill/stroke), shadow; `var-def` = used to define another variable, `mixin-def` = a mixin parameter default, `mixin-call` = passed to a mixin, `css-var` = emitted as a CSS custom property.

## 2. Palette, black/white and semantic aliases

Declared = what the configuration or SASS says; resolved = the value the compiler produced for this configuration. Uses count references in compiled files (theme / library); roles are for compiled files only.

### Palette slots

| Variable | Declared as | Where | Resolves to | Uses theme | Uses library | Roles (compiled) |
|---|---|---|---|---|---|---|
| `$clr1` | `#00BDD4` | _00_main_configuration.yml:44 | `#00BDD4` | 1 | 7 | border 1, var-def 7 |
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
| `$clr2` | `#BF609B` | _00_main_configuration.yml:45 | `#BF609B` | 13 | 10 | text 8, background 6, border 2, var-def 7 |
| `$clr20` | `#000000` | lib:a_components/10_colours_and_patterns/00_core/_01_configuration_colour_and_patterns.sass:29 | `#000000` | 0 | 1 | var-def 1 |
| `$clr3` | `#0E3A40` | _00_main_configuration.yml:46 | `#0E3A40` | 0 | 7 | var-def 7 |
| `$clr4` | `#EAF3F4` | _00_main_configuration.yml:47 | `#EAF3F4` | 0 | 8 | text 1, var-def 7 |
| `$clr5` | `#D98536` | _00_main_configuration.yml:48 | `#D98536` | 0 | 7 | var-def 7 |
| `$clr6` | `#315FAA` | _00_main_configuration.yml:49 | `#315FAA` | 0 | 7 | var-def 7 |
| `$clr7` | `#7DBF60` | _00_main_configuration.yml:50 | `#7DBF60` | 0 | 7 | var-def 7 |
| `$clr8` | `#E1BB0B` | _00_main_configuration.yml:51 | `#E1BB0B` | 0 | 7 | var-def 7 |
| `$clr9` | `#E5336D` | _00_main_configuration.yml:52 | `#E5336D` | 0 | 7 | var-def 7 |

### Colour roles (section 7.3 of the requirements)

| Variable | Declared as | Where | Resolves to | Uses theme | Uses library | Roles (compiled) |
|---|---|---|---|---|---|---|
| `$brand_primary` | `$clr1` | _00_main_configuration.yml:65 | `#00BDD4` | 0 | 0 |  |
| `$brand_secondary` | `$clr2` | _00_main_configuration.yml:66 | `#BF609B` | 0 | 0 |  |
| `$on_dark` | `$clr4` | _00_main_configuration.yml:62 | `#EAF3F4` | 0 | 0 |  |
| `$on_light` | `$clr3` | _00_main_configuration.yml:63 | `#0E3A40` | 0 | 0 |  |
| `$surface_dark` | `$clr3` | _00_main_configuration.yml:60 | `#0E3A40` | 0 | 0 |  |
| `$surface_light` | `$clr4` | _00_main_configuration.yml:61 | `#EAF3F4` | 0 | 0 |  |
| `$visual_impact` | `$clr5` | _00_main_configuration.yml:64 | `#D98536` | 1 | 0 | background 1 |

### Black and white points

| Variable | Declared as | Where | Resolves to | Uses theme | Uses library | Roles (compiled) |
|---|---|---|---|---|---|---|
| `$black` | `#00171A` | _00_main_configuration.yml:55 | `#00171A` | 45 | 46 | text 37, background 18, border 7, css-var 1, var-def 22, mixin-def 3, mixin-call 1 |
| `$true_black` | `#000000` | _00_main_configuration.yml:57 | `#000000` | 1 | 1 | background 1, mixin-def 1 |
| `$white` | `white` | _00_main_configuration.yml:56 | `white` | 71 | 47 | text 52, background 14, border 9, css-var 1, other 1, var-def 38, mixin-def 1 |

### Semantic aliases

| Variable | Declared as | Where | Resolves to | Uses theme | Uses library | Roles (compiled) |
|---|---|---|---|---|---|---|
| `$bgcolor` | `$white` | _00_main_configuration.yml:69 | `white` | 0 | 1 | background 1 |
| `$cta` | `$clr1` | _00_main_configuration.yml:75 | `#00BDD4` | 12 | 8 | text 7, background 3, shadow 1, css-var 1, var-def 7, mixin-def 1 |
| `$de_activated` | `neutral(30)` | _00_main_configuration.yml:77 | `rgb(178.5, 185.4, 186.3)` | 0 | 0 |  |
| `$de_emphasized` | `neutral(50)` | _00_main_configuration.yml:76 | `rgb(127.5, 139, 140.5)` | 0 | 0 |  |
| `$footer_bg` | `$black` | _00_main_configuration.yml:70 | `#00171A` | 1 | 0 | background 1 |
| `$impact` | `$clr2` | _00_main_configuration.yml:74 | `#BF609B` | 14 | 14 | text 12, background 3, border 3, css-var 1, var-def 9 |
| `$link_colour` | `$black` | _00_main_configuration.yml:78 | `#00171A` | 2 | 5 | text 3, border 2, var-def 2 |
| `$link_colour_active` | `$clr5` | _00_main_configuration.yml:79 | `#D98536` | 15 | 2 | text 13, border 4 |
| `$link_colour_active_reversed` | `neutral(5)` | _00_main_configuration.yml:81 | `rgb(242.25, 243.4, 243.55)` | 8 | 0 | text 5, border 3 |
| `$link_colour_reversed` | `$white` | _00_main_configuration.yml:80 | `white` | 4 | 0 | text 4 |
| `$menu_background` | `transparent` | _00_main_configuration.yml:71 | `transparent` | 3 | 0 | background 3 |
| `$menu_color` | `$black` | _00_main_configuration.yml:280 | `#00171A` | 0 | 0 |  |
| `$welcome_block_bg` | `$black` | _00_main_configuration.yml:278 | `#00171A` | 4 | 0 | background 4 |
| `$welcome_block_color` | `$white` | _00_main_configuration.yml:279 | `white` | 3 | 0 | text 2, border 1 |

### Neutral aliases

| Variable | Declared as | Where | Resolves to | Uses theme | Uses library | Roles (compiled) |
|---|---|---|---|---|---|---|
| `$dark_neutral` | `neutral(70)` | _00_main_configuration.yml:91 | `rgb(76.5, 92.6, 94.7)` | 0 | 2 | border 2 |
| `$darker_neutral` | `neutral(80)` | _00_main_configuration.yml:92 | `rgb(51, 69.4, 71.8)` | 0 | 3 | text 1, var-def 2 |
| `$darkest_neutral` | `neutral(90)` | _00_main_configuration.yml:93 | `rgb(25.5, 46.2, 48.9)` | 0 | 0 |  |
| `$light_neutral` | `neutral(40)` | _00_main_configuration.yml:88 | `rgb(153, 162.2, 163.4)` | 0 | 5 | background 2, var-def 3 |
| `$lighter_neutral` | `neutral(30)` | _00_main_configuration.yml:87 | `rgb(178.5, 185.4, 186.3)` | 0 | 1 | var-def 1 |
| `$lightest_neutral` | `neutral(5)` | _00_main_configuration.yml:86 | `rgb(242.25, 243.4, 243.55)` | 0 | 0 |  |
| `$mid_neutral` | `neutral(60)` | _00_main_configuration.yml:90 | `rgb(102, 115.8, 117.6)` | 0 | 3 | var-def 3 |
| `$neutral` | `neutral()` | _00_main_configuration.yml:89 | `rgb(25.5, 46.2, 48.9)` | 0 | 0 |  |

### Component colour settings (configuration keys)

| Variable | Declared as | Where | Resolves to | Uses theme | Uses library | Roles (compiled) |
|---|---|---|---|---|---|---|
| `$btn_bg_color` | `neutral(20)` | _00_main_configuration.yml:205 | `rgb(204, 208.6, 209.2)` | 0 | 1 | background 1 |
| `$btn_border_color` | `$ui_border_color` | _00_main_configuration.yml:206 | `rgb(153, 162.2, 163.4)` | 0 | 2 | border 2 |
| `$btn_color` | `$black` | _00_main_configuration.yml:204 | `#00171A` | 0 | 1 | text 1 |
| `$btn_hover_bg_color` | `neutral(40)` | _00_main_configuration.yml:209 | `rgb(153, 162.2, 163.4)` | 0 | 1 | background 1 |
| `$btn_hover_border_color` | `neutral(60)` | _00_main_configuration.yml:208 | `rgb(102, 115.8, 117.6)` | 0 | 0 |  |
| `$btn_hover_color` | `$black` | _00_main_configuration.yml:207 | `#00171A` | 0 | 1 | text 1 |
| `$btn_reset_bg_color` | `neutral(30)` | _00_main_configuration.yml:228 | `rgb(178.5, 185.4, 186.3)` | 1 | 1 | background 2 |
| `$btn_reset_border_color` | `neutral(90)` | _00_main_configuration.yml:230 | `rgb(25.5, 46.2, 48.9)` | 0 | 1 | border 1 |
| `$btn_reset_color` | `neutral(90)` | _00_main_configuration.yml:227 | `rgb(25.5, 46.2, 48.9)` | 0 | 1 | text 1 |
| `$btn_reset_hover_bg_color` | `neutral(90)` | _00_main_configuration.yml:232 | `rgb(25.5, 46.2, 48.9)` | 1 | 1 | background 2 |
| `$btn_reset_hover_border_color` | `neutral(90)` | _00_main_configuration.yml:233 | `rgb(25.5, 46.2, 48.9)` | 0 | 1 | border 1 |
| `$btn_reset_hover_color` | `neutral(10)` | _00_main_configuration.yml:231 | `rgb(229.5, 231.8, 232.1)` | 0 | 1 | text 1 |
| `$btn_search_bg_color` | `$white` | _00_main_configuration.yml:220 | `white` | 0 | 1 | background 1 |
| `$btn_search_border_color` | `$ui_border_color` | _00_main_configuration.yml:222 | `rgb(153, 162.2, 163.4)` | 0 | 0 |  |
| `$btn_search_color` | `neutral(60)` | _00_main_configuration.yml:219 | `rgb(102, 115.8, 117.6)` | 0 | 1 | text 1 |
| `$btn_search_hover_bg_color` | `$white` | _00_main_configuration.yml:225 | `white` | 0 | 2 | background 2 |
| `$btn_search_hover_border_color` | `$impact` | _00_main_configuration.yml:224 | `#BF609B` | 0 | 0 |  |
| `$btn_search_hover_color` | `$white` | _00_main_configuration.yml:223 | `white` | 0 | 2 | text 2 |
| `$btn_submit_bg_color` | `$impact` | _00_main_configuration.yml:212 | `#BF609B` | 0 | 2 | background 2 |
| `$btn_submit_border_color` | `$impact` | _00_main_configuration.yml:214 | `#BF609B` | 0 | 2 | border 2 |
| `$btn_submit_color` | `$white` | _00_main_configuration.yml:211 | `white` | 0 | 2 | text 2 |
| `$btn_submit_hover_bg_color` | `mix($white,$impact,10%)` | _00_main_configuration.yml:217 | `rgb(197.4, 111.9, 165)` | 0 | 2 | background 2 |
| `$btn_submit_hover_border_color` | `mix($white,$impact,10%)` | _00_main_configuration.yml:216 | `rgb(197.4, 111.9, 165)` | 0 | 2 | border 2 |
| `$btn_submit_hover_color` | `$white` | _00_main_configuration.yml:215 | `white` | 0 | 2 | text 2 |
| `$circular_audio_background` | `$white` | _00_main_configuration.yml:311 | `white` | 1 | 0 | background 1 |
| `$circular_audio_caption_color` | `$black` | _00_main_configuration.yml:312 | `#00171A` | 2 | 0 | text 2 |
| `$circular_audio_color` | `$cta` | _00_main_configuration.yml:310 | `#00BDD4` | 5 | 0 | svg 5 |
| `$outline_btn_color` | `$mid_neutral` | _00_main_configuration.yml:235 | `rgb(102, 115.8, 117.6)` | 0 | 0 |  |
| `$outline_btn_hover_color` | `$ui_hover_border_color` | _00_main_configuration.yml:236 | `#BF609B` | 0 | 0 |  |
| `$page_marker_background` | `neutral(30)` | _00_main_configuration.yml:293 | `rgb(178.5, 185.4, 186.3)` | 0 | 1 | css-var 1 |
| `$page_marker_background_active` | `$clr2` | _00_main_configuration.yml:295 | `#BF609B` | 0 | 1 | css-var 1 |
| `$page_marker_background_hover` | `$clr2` | _00_main_configuration.yml:294 | `#BF609B` | 0 | 1 | css-var 1 |
| `$row_border_color` | `neutral(10)` | _00_main_configuration.yml:149 | `rgb(229.5, 231.8, 232.1)` | 0 | 0 |  |
| `$row_header_bg` | `neutral(10)` | _00_main_configuration.yml:148 | `rgb(229.5, 231.8, 232.1)` | 0 | 0 |  |
| `$row_zebra_stripe_color` | `neutral(3)` | _00_main_configuration.yml:150 | `rgb(247.35, 248.04, 248.13)` | 0 | 0 |  |
| `$slide_viewer_background` | `$black` | _00_main_configuration.yml:291 | `#00171A` | 0 | 1 | css-var 1 |
| `$transcript_highlight` | `set-color(2,50)` | _00_main_configuration.yml:313 | `rgb(223, 175.5, 205)` | 1 | 0 | background 1 |
| `$transcript_hover` | `set-color(2,30)` | _00_main_configuration.yml:314 | `rgb(235.8, 207.3, 225)` | 1 | 0 | background 1 |
| `$ui_border_color` | `neutral(40)` | _00_main_configuration.yml:172 | `rgb(153, 162.2, 163.4)` | 3 | 5 | border 6, var-def 2 |
| `$ui_form_text_color` | `neutral(90)` | _00_main_configuration.yml:177 | `rgb(25.5, 46.2, 48.9)` | 0 | 0 |  |
| `$ui_hover_border_color` | `$impact` | _00_main_configuration.yml:173 | `#BF609B` | 0 | 6 | border 2, var-def 4 |

### Library colour maps

| Variable | Declared as | Where | Resolves to | Uses theme | Uses library | Roles (compiled) |
|---|---|---|---|---|---|---|
| `$clr1_map` | `(shade: mix($black,$clr1,20%), primary: $clr1, tint: mix($wh` | lib:a_components/10_colours_and_patterns/00_core/_01_configuration_colour_and_patterns.sass:40 | `(shade: rgb(136.8, 136.8, 136.8), primary: #ABABAB, tint: rgb(179.4, 1…` | 0 | 2 | var-def 2 |
| `$clr2_map` | `(shade: mix($black,$clr2,20%), primary: $clr2, tint: mix($wh` | lib:a_components/10_colours_and_patterns/00_core/_01_configuration_colour_and_patterns.sass:41 | `(shade: rgb(191.2, 191.2, 191.2), primary: #EFEFEF, tint: rgb(240.6, 2…` | 0 | 2 | var-def 2 |
| `$clr3_map` | `(shade: mix($black,$clr3,20%), primary: $clr3, tint: mix($wh` | lib:a_components/10_colours_and_patterns/00_core/_01_configuration_colour_and_patterns.sass:42 | `(shade: rgb(40.8, 40.8, 40.8), primary: #333333, tint: rgb(71.4, 71.4,…` | 0 | 2 | var-def 2 |
| `$clr4_map` | `(shade: mix($black,$clr4,20%), primary: $clr4, tint: mix($wh` | lib:a_components/10_colours_and_patterns/00_core/_01_configuration_colour_and_patterns.sass:43 | `(shade: rgb(27.2, 27.2, 27.2), primary: #222222, tint: rgb(56.1, 56.1,…` | 0 | 2 | var-def 2 |
| `$clr5_map` | `(shade: mix($black,$clr5,20%), primary: $clr5, tint: mix($wh` | lib:a_components/10_colours_and_patterns/00_core/_01_configuration_colour_and_patterns.sass:44 | `(shade: rgb(13.6, 13.6, 13.6), primary: #111111, tint: rgb(40.8, 40.8,…` | 0 | 2 | var-def 2 |
| `$clr6_map` | `(shade: mix($black,$clr6,20%), primary: $clr6, tint: mix($wh` | lib:a_components/10_colours_and_patterns/00_core/_01_configuration_colour_and_patterns.sass:45 | `(shade: black, primary: #000000, tint: rgb(25.5, 25.5, 25.5), fade: rg…` | 0 | 2 | var-def 2 |
| `$clr7_map` | `(shade: mix($black,$clr7,20%), primary: $clr7, tint: mix($wh` | lib:a_components/10_colours_and_patterns/00_core/_01_configuration_colour_and_patterns.sass:46 | `(shade: black, primary: #000000, tint: rgb(25.5, 25.5, 25.5), fade: rg…` | 0 | 2 | var-def 2 |
| `$clr8_map` | `(shade: mix($black,$clr8,20%), primary: $clr8, tint: mix($wh` | lib:a_components/10_colours_and_patterns/00_core/_01_configuration_colour_and_patterns.sass:47 | `(shade: black, primary: #000000, tint: rgb(25.5, 25.5, 25.5), fade: rg…` | 0 | 2 | var-def 2 |
| `$clr9_map` | `(shade: mix($black,$clr9,20%), primary: $clr9, tint: mix($wh` | lib:a_components/10_colours_and_patterns/00_core/_01_configuration_colour_and_patterns.sass:48 | `(shade: black, primary: #000000, tint: rgb(25.5, 25.5, 25.5), fade: rg…` | 0 | 2 | var-def 2 |

### Other global colour variables (library components and theme partials)

| Variable | Declared as | Where | Resolves to | Uses theme | Uses library | Roles (compiled) |
|---|---|---|---|---|---|---|
| `$colour_maps` | `$clr1_map $clr2_map $clr3_map $clr4_map $clr5_map $clr6_map ` | lib:a_components/10_colours_and_patterns/root_colour_variables/_colour_root_variables.sass:17 | `(shade: rgb(136.8, 136.8, 136.8), primary: #ABABAB, tint: rgb(179.4, 1…` | 0 | 1 | var-def 1 |
| `$label_color` | `neutral(70)` | sass/30_typography/_general.sass:9 | `rgb(76.5, 92.6, 94.7)` | 1 | 0 | text 1 |
| `$label_reversed_color` | `neutral(30)` | sass/30_typography/_general.sass:11 | `rgb(178.5, 185.4, 186.3)` | 1 | 0 | text 1 |
| `$mobile_menu_background_color` | `$black` | sass/40_ui/_main_navigation_mobile.sass:3 | `#00171A` | 1 | 0 | background 1 |
| `$page_header_border_color` | `neutral(70)` | sass/20_layout/_page_header.sass:11 | `rgb(76.5, 92.6, 94.7)` | 2 | 0 | border 2 |
| `$value_color` | `neutral(90)` | sass/30_typography/_general.sass:10 | `rgb(25.5, 46.2, 48.9)` | 2 | 0 | text 2 |
| `$value_reversed_color` | `neutral(20)` | sass/30_typography/_general.sass:12 | `rgb(204, 208.6, 209.2)` | 1 | 0 | text 1 |


## 3. Palette contrast under the current configuration

WCAG 2 contrast of each colour against the white point and the black point. A colour needs 4.5 against the surface it is text on (3 for large text or UI parts), and the same the other way round when it is a surface for white or black text. This is what a usage recommendation per slot has to be checked against.

| Variable | Value | vs white |  | vs black |  | Used as text | Used as background |
|---|---|---|---|---|---|---|---|
| `$bgcolor` | #ffffff | 1.00 | **fail** | 18.46 | AAA | 0 | 1 |
| `$brand_primary` | #00bdd4 | 2.28 | **fail** | 8.11 | AAA | 0 | 0 |
| `$brand_secondary` | #bf609b | 3.92 | AA large | 4.71 | AA | 0 | 0 |
| `$clr1` | #00bdd4 | 2.28 | **fail** | 8.11 | AAA | 0 | 0 |
| `$clr2` | #bf609b | 3.92 | AA large | 4.71 | AA | 8 | 6 |
| `$clr3` | #0e3a40 | 12.37 | AAA | 1.49 | **fail** | 0 | 0 |
| `$clr4` | #eaf3f4 | 1.13 | **fail** | 16.37 | AAA | 1 | 0 |
| `$clr5` | #d98536 | 2.85 | **fail** | 6.47 | AA | 0 | 0 |
| `$clr6` | #315faa | 6.27 | AA | 2.94 | **fail** | 0 | 0 |
| `$clr7` | #7dbf60 | 2.21 | **fail** | 8.35 | AAA | 0 | 0 |
| `$clr8` | #e1bb0b | 1.86 | **fail** | 9.95 | AAA | 0 | 0 |
| `$clr9` | #e5336d | 4.18 | AA large | 4.42 | AA large | 0 | 0 |
| `$cta` | #00bdd4 | 2.28 | **fail** | 8.11 | AAA | 7 | 3 |
| `$dark_neutral` | #4d5d5f | 6.94 | AA | 2.66 | **fail** | 0 | 0 |
| `$darker_neutral` | #334548 | 10.02 | AAA | 1.84 | **fail** | 1 | 0 |
| `$darkest_neutral` | #1a2e31 | 14.18 | AAA | 1.30 | **fail** | 0 | 0 |
| `$de_activated` | #b3b9ba | 1.98 | **fail** | 9.31 | AAA | 0 | 0 |
| `$de_emphasized` | #808b8d | 3.51 | AA large | 5.26 | AA | 0 | 0 |
| `$footer_bg` | #00171a | 18.46 | AAA | 1.00 | **fail** | 0 | 1 |
| `$impact` | #bf609b | 3.92 | AA large | 4.71 | AA | 12 | 3 |
| `$light_neutral` | #99a2a3 | 2.60 | **fail** | 7.09 | AAA | 0 | 2 |
| `$lighter_neutral` | #b3b9ba | 1.98 | **fail** | 9.31 | AAA | 0 | 0 |
| `$lightest_neutral` | #f2f3f4 | 1.11 | **fail** | 16.66 | AAA | 0 | 0 |
| `$link_colour` | #00171a | 18.46 | AAA | 1.00 | **fail** | 3 | 0 |
| `$link_colour_active` | #d98536 | 2.85 | **fail** | 6.47 | AA | 13 | 0 |
| `$link_colour_active_reversed` | #f2f3f4 | 1.11 | **fail** | 16.66 | AAA | 5 | 0 |
| `$link_colour_reversed` | #ffffff | 1.00 | **fail** | 18.46 | AAA | 4 | 0 |
| `$menu_color` | #00171a | 18.46 | AAA | 1.00 | **fail** | 0 | 0 |
| `$mid_neutral` | #667476 | 4.87 | AA | 3.79 | AA large | 0 | 0 |
| `$neutral` | #1a2e31 | 14.18 | AAA | 1.30 | **fail** | 0 | 0 |
| `$on_dark` | #eaf3f4 | 1.13 | **fail** | 16.37 | AAA | 0 | 0 |
| `$on_light` | #0e3a40 | 12.37 | AAA | 1.49 | **fail** | 0 | 0 |
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
| lib:a_components/40_ui/ui_element_base_v002/13_definitions/_form_elements.sass:102 | text | `$clr4` | `$clr4` |
| lib:a_components/40_ui/ui_element_base_v002/13_definitions/_form_elements.sass:120 | background | `$clr2` | `$clr2` |
| lib:a_components/40_ui/ui_element_base_v002/13_definitions/_form_elements.sass:135 | border | `$clr2` | `$btn_border_width solid $clr2` |
| lib:a_components/40_ui/ui_element_base_v002/_form_ui.sass:37 | border | `$clr2` | `$clr2` |
| 30_typography/_10_definitions.sass:119 | background | `$clr2` | `set-colour(2)` |
| 30_typography/_10_definitions.sass:195 | text | `$clr2` | `set-color(2)` |
| 30_typography/_general.sass:80 | text | `$clr2` | `set-color(2)` |
| 40_ui/12_mixins/_download_icons.sass:13 | text | `$clr2` | `$clr2` |
| 40_ui/_omeka_advanced_search_filters.sass:28 | background | `$clr2` | `set-color(2,5)` |
| 60_site_elements/agile_blocks/_poster.sass:48 | background | `$clr2` | `set-colour(2,10)` |
| 60_site_elements/agile_blocks/_section_introduction.sass:13 | background | `$clr2` | `set-color(2)` |
| 60_site_elements/agile_blocks/_section_list_capsules.sass:5 | background | `$clr2` | `set-color(2)` |
| 60_site_elements/agile_blocks/_quotation.sass:23 | border | `$clr1` | `2px solid set-color(1)` |
| 60_site_elements/_advanced_search_browser.sass:44 | text | `$clr2` | `set-color(2)` |
| 60_site_elements/_capsule.sass:20 | text | `$clr2` | `set-color(2)` |
| 60_site_elements/_item_show.sass:203 | text | `$clr2` | `$clr2` |
| 60_site_elements/_item_with_metadata.sass:41 | text | `$clr2` | `$clr2` |
| 60_site_elements/_item_with_metadata.sass:63 | text | `$clr2` | `$clr2` |

Palette slots never used directly in a rule (only through aliases or the CSS-variable export): `$clr3` (via `$on_light`, `$surface_dark`), `$clr5` (via `$link_colour_active`, `$visual_impact`), `$clr6` (unused), `$clr7` (unused), `$clr8` (unused), `$clr9` (unused).

## 5. Same variable, different roles

A variable used both as a text colour and as a background (or border) has two different contrast obligations: whatever a themer picks for it has to read as text on the page background *and* carry text on top of it. These are the variables that cannot be given one usage recommendation as things stand.

| Variable | As text in | As background in | As border in |
|---|---|---|---|
| `$black` | lib:a_components/30_typography/!fluid_type/_base_typography.sass<br>lib:a_components/30_typography/!fluid_type/_heading_collection.sass<br>lib:a_components/30_typography/standardized_text_collection/_text_collection.sass<br>lib:a_components/40_ui/ui_element_base_v002/_standardized_icons/_icons.sass<br>lib:a_components/40_ui/ui_element_base_v002/13_definitions/_form_elements.sass<br>lib:a_components/40_ui/ui_element_base_v002/_ui_library_support/_component_superfish_navigation.sass<br>lib:a_components/40_ui/ui_element_base_v002/_ui_library_support/_component_form_select2.sass<br>lib:a_components/60_site_elements/figure_normalization/_figure.sass<br>30_typography/_10_definitions.sass<br>30_typography/_general.sass<br>30_typography/_license.sass<br>40_ui/10_components/_card.sass<br>40_ui/10_components/_library_superfish.sass<br>40_ui/10_components/_omeka_search_form_component.sass<br>40_ui/_general.sass<br>40_ui/_omeka_search_form.sass<br>40_ui/_pagination.sass<br>40_ui/_tab_ui.sass<br>60_site_elements/agile_blocks/_poster.sass<br>60_site_elements/agile_blocks/_quotation.sass<br>60_site_elements/_advanced_search_browser.sass<br>60_site_elements/_item_show.sass<br>60_site_elements/_link_cards.sass<br>60_site_elements/_resources_available_downloads.sass<br>60_site_elements/_title_area.sass | lib:a_components/40_ui/ui_element_base_v002/13_definitions/_form_elements.sass<br>30_typography/_10_definitions.sass<br>30_typography/_general.sass<br>40_ui/10_components/_browser_mobile_base.sass<br>60_site_elements/agile_blocks/_poster.sass<br>60_site_elements/agile_blocks/_section_introduction.sass<br>60_site_elements/_capsule.sass<br>60_site_elements/_item_show.sass<br>60_site_elements/_item_showcase.sass<br>60_site_elements/_item_with_metadata.sass<br>60_site_elements/_slide_viewer.sass<br>60_site_elements/_universal_viewer.sass | lib:a_components/30_typography/00_core/12_mixins/_inline_text_link.sass<br>lib:a_components/40_ui/ui_element_base_v002/13_definitions/_form_elements.sass<br>40_ui/10_components/_exposed_facet.sass<br>40_ui/_omeka_search_form.sass<br>60_site_elements/_universal_viewer.sass |
| `$clr2` | 30_typography/_10_definitions.sass<br>30_typography/_general.sass<br>40_ui/12_mixins/_download_icons.sass<br>60_site_elements/_advanced_search_browser.sass<br>60_site_elements/_capsule.sass<br>60_site_elements/_item_show.sass<br>60_site_elements/_item_with_metadata.sass | lib:a_components/40_ui/ui_element_base_v002/13_definitions/_form_elements.sass<br>30_typography/_10_definitions.sass<br>40_ui/_omeka_advanced_search_filters.sass<br>60_site_elements/agile_blocks/_poster.sass<br>60_site_elements/agile_blocks/_section_introduction.sass<br>60_site_elements/agile_blocks/_section_list_capsules.sass | lib:a_components/40_ui/ui_element_base_v002/13_definitions/_form_elements.sass<br>lib:a_components/40_ui/ui_element_base_v002/_form_ui.sass |
| `$cta` | 30_typography/_general.sass<br>40_ui/_omeka_search_form.sass<br>60_site_elements/agile_blocks/_section_introduction.sass<br>60_site_elements/_capsule.sass<br>60_site_elements/_item_showcase.sass<br>60_site_elements/_welcome_block.sass | 30_typography/_general.sass<br>40_ui/_tab_ui.sass |  |
| `$impact` | lib:a_components/40_ui/ui_element_base_v002/_standardized_icons/_icon_mixins.sass<br>lib:a_components/40_ui/ui_element_base_v002/_standardized_icons/_icons.sass<br>30_typography/_10_definitions.sass<br>30_typography/_general.sass<br>40_ui/10_components/_library_superfish.sass<br>40_ui/_omeka_site_page_pagination.sass<br>40_ui/_pagination.sass<br>60_site_elements/agile_blocks/_item_listing_block.sass<br>60_site_elements/_item_show.sass<br>60_site_elements/_preview_block.sass | lib:a_components/40_ui/ui_element_base_v002/_ui_library_support/_component_superfish_navigation.sass<br>60_site_elements/agile_blocks/_poster.sass<br>60_site_elements/_reference_block.sass | 40_ui/10_components/_card.sass<br>40_ui/10_components/_list_item.sass<br>40_ui/10_components/_omeka_search_form_component.sass |
| `$link_colour` | lib:a_components/30_typography/00_core/12_mixins/_inline_text_link.sass<br>lib:a_components/30_typography/standardized_text_collection/_anchor.sass<br>30_typography/_general.sass |  | lib:a_components/30_typography/00_core/12_mixins/_link_underline.sass<br>30_typography/_general.sass |
| `$link_colour_active` | lib:a_components/30_typography/standardized_text_collection/_anchor.sass<br>30_typography/_10_definitions.sass<br>30_typography/_general.sass<br>40_ui/10_components/_exposed_facet.sass<br>40_ui/_extensions.sass<br>40_ui/_wayfinding.sass<br>60_site_elements/_advanced_search_browser.sass<br>60_site_elements/_item_show.sass |  | lib:a_components/30_typography/00_core/12_mixins/_link_underline.sass<br>30_typography/_10_definitions.sass<br>30_typography/_general.sass |
| `$link_colour_active_reversed` | 30_typography/_10_definitions.sass<br>30_typography/_general.sass<br>40_ui/_main_navigation_mobile.sass |  | 30_typography/_10_definitions.sass<br>30_typography/_general.sass |
| `$welcome_block_color` | 60_site_elements/_welcome_block.sass |  | 60_site_elements/_welcome_block.sass |
| `$white` | lib:a_components/40_ui/ui_element_base_v002/_standardized_icons/_icons.sass<br>lib:a_components/40_ui/ui_element_base_v002/13_definitions/_form_elements.sass<br>20_layout/_page_footer.sass<br>30_typography/_10_definitions.sass<br>30_typography/_20_mixin_metadata_block.sass<br>30_typography/_general.sass<br>40_ui/10_components/_browser_display_mode_controls.sass<br>40_ui/10_components/_browser_mobile_base.sass<br>40_ui/_main_navigation_mobile.sass<br>60_site_elements/agile_blocks/_poster.sass<br>60_site_elements/agile_blocks/_section_introduction.sass<br>60_site_elements/agile_blocks/_slideshow_block.sass<br>60_site_elements/_capsule.sass<br>60_site_elements/_item_show.sass<br>60_site_elements/_item_showcase.sass<br>60_site_elements/_item_with_metadata.sass<br>60_site_elements/_slide_item.sass<br>60_site_elements/_reference_block.sass<br>60_site_elements/_resources_for_educators.sass<br>60_site_elements/_title_area.sass<br>60_site_elements/_universal_viewer.sass<br>60_site_elements/_welcome_block.sass | lib:a_components/40_ui/ui_element_base_v002/13_definitions/_form_elements.sass<br>40_ui/10_components/_card.sass<br>40_ui/10_components/_library_superfish.sass<br>40_ui/10_components/_omeka_search_form_component.sass<br>40_ui/_omeka_advanced_search_filters.sass<br>60_site_elements/agile_blocks/_section_list_capsules.sass<br>60_site_elements/_item_show.sass<br>60_site_elements/_map_block.sass<br>60_site_elements/_slide_item.sass<br>60_site_elements/_reference_block.sass<br>60_site_elements/_universal_viewer.sass | lib:a_components/40_ui/ui_element_base_v002/13_definitions/_form_elements.sass<br>40_ui/10_components/_browser_mobile_base.sass<br>60_site_elements/agile_blocks/_section_introduction.sass<br>60_site_elements/_capsule.sass<br>60_site_elements/_slide_item.sass<br>60_site_elements/_welcome_block.sass |


## 6. Per-file colour vocabulary

Which colour variables and hard-coded colours each file draws on. Files reaching for many palette slots, or for literals, are the ones built to their own palette.

| File | Refs | Variables | Hard-coded | Roles |
|---|---|---|---|---|
| 30_typography/_general.sass | 27 | $link_colour $link_colour_active $link_colour_reversed $link_colour_active_reversed $white $clr2 $label_color $label_reversed_color $black $value_color $value_reversed_color $cta $impact |  | text 21, background 3, border 3 |
| 30_typography/_10_definitions.sass | 25 | $black $impact $white $visual_impact $clr2 $link_colour_active $link_colour_reversed $link_colour_active_reversed |  | text 17, background 4, border 4 |
| 60_site_elements/agile_blocks/_section_introduction.sass | 13 | $clr2 $black $white $true_black $cta |  | text 5, background 4, border 3, other 1 |
| 60_site_elements/_item_with_metadata.sass | 11 | $black $clr2 $white | rgba(0, 0, 0, 0) rgba(0,0,0,0.7) rgba(0,0,0, 0.95) | text 7, background 4 |
| 40_ui/_main_navigation_mobile.sass | 9 | $black $white $page_header_border_color $mobile_menu_background_color $link_colour_reversed $link_colour_active_reversed |  | text 6, background 1, border 1, var-def 1 |
| 60_site_elements/_item_show.sass | 9 | $link_colour_active $black $white $circular_audio_background $circular_audio_caption_color $clr2 $impact |  | text 6, background 3 |
| 60_site_elements/_item_showcase.sass | 9 | $black $white $cta | rgba(0, 0, 0, 0) rgba(0,0,0,0.7) rgba(0,0,0, 0.95) | text 5, background 4 |
| 60_site_elements/_slide_item.sass | 8 | $white $black |  | text 4, background 1, border 2, mixin-call 1 |
| 60_site_elements/_welcome_block.sass | 8 | $welcome_block_bg $welcome_block_color $cta $white |  | text 4, background 2, border 2 |
| 40_ui/10_components/_library_superfish.sass | 7 | $menu_background $white $black $impact |  | text 2, background 5 |
| 60_site_elements/_media_circular_audio.sass | 7 | $circular_audio_color $circular_audio_caption_color $transcript_hover |  | text 1, background 1, svg 5 |
| 60_site_elements/_universal_viewer.sass | 7 | $black $white |  | text 2, background 4, border 1 |
| 40_ui/10_components/_browser_mobile_base.sass | 6 | $black $white |  | text 3, background 2, border 1 |
| 60_site_elements/agile_blocks/_poster.sass | 6 | $clr2 $black $impact $white |  | text 2, background 4 |
| 60_site_elements/_capsule.sass | 6 | $black $white $clr2 $cta |  | text 4, background 1, border 1 |
| 40_ui/10_components/_omeka_search_form_component.sass | 5 | $ui_border_color $white $cta $black $impact |  | text 1, background 1, border 2, shadow 1 |
| 40_ui/10_components/_card.sass | 4 | $white $ui_border_color $black $impact |  | text 1, background 1, border 2 |
| 40_ui/_general.sass | 4 | $btn_reset_bg_color $btn_reset_hover_bg_color $black | black | text 1, background 2, border 1 |
| 40_ui/_omeka_search_form.sass | 4 | $black $cta |  | text 2, background 1, border 1 |
| 60_site_elements/_advanced_search_browser.sass | 4 | $clr2 $black $link_colour_active |  | text 4 |
| 60_site_elements/_slide_viewer.sass | 4 | $black |  | background 2, css-var 2 |
| 60_site_elements/_reference_block.sass | 4 | $white $impact |  | text 1, background 3 |
| 40_ui/10_components/_exposed_facet.sass | 3 | $link_colour_active $black |  | text 2, border 1 |
| 40_ui/_pagination.sass | 3 | $black $impact |  | text 2, border 1 |
| 40_ui/_tab_ui.sass | 3 | $black $cta |  | text 2, background 1 |
| 10_colour_and_patterns/_patterns.sass | 2 | $white |  | mixin-def 2 |
| 20_layout/_page_footer.sass | 2 | $white $footer_bg |  | text 1, background 1 |
| 30_typography/_20_mixin_metadata_block.sass | 2 | $white |  | text 2 |
| 40_ui/10_components/_browser_display_mode_controls.sass | 2 | $white |  | text 2 |
| 40_ui/_extensions.sass | 2 | $ui_border_color $link_colour_active |  | text 1, border 1 |
| 40_ui/_omeka_advanced_search_filters.sass | 2 | $clr2 $white |  | background 2 |
| 40_ui/_omeka_site_page_pagination.sass | 2 | $impact |  | text 2 |
| 40_ui/_wayfinding.sass | 2 | $link_colour_active |  | text 2 |
| 60_site_elements/agile_blocks/_section_list_capsules.sass | 2 | $clr2 $white |  | background 2 |
| 60_site_elements/agile_blocks/_slideshow_block.sass | 2 | $white |  | text 1, background 1 |
| 60_site_elements/agile_blocks/_quotation.sass | 2 | $black $clr1 |  | text 1, border 1 |
| 60_site_elements/_discovery_tool.sass | 2 | $welcome_block_bg |  | background 2 |
| 60_site_elements/_resources_available_downloads.sass | 2 | $black | #c0c0bf | text 1, border 1 |
| 60_site_elements/_title_area.sass | 2 | $black $white |  | text 2 |
| 20_layout/_page_header.sass | 1 | $page_header_border_color |  | border 1 |
| 30_typography/_license.sass | 1 | $black |  | text 1 |
| 40_ui/10_components/_list_item.sass | 1 | $impact |  | border 1 |
| 40_ui/12_mixins/_download_icons.sass | 1 | $clr2 |  | text 1 |
| 40_ui/12_mixins/_slide_viewer_integrated_nav.sass | 1 |  |  | css-var 1 |
| 40_ui/12_mixins/_ui_mixins.sass | 1 | $cta |  | mixin-def 1 |
| 60_site_elements/agile_blocks/_item_listing_block.sass | 1 | $impact |  | text 1 |
| 60_site_elements/_card.sass | 1 | $value_color |  | text 1 |
| 60_site_elements/_media_vtt.sass | 1 | $transcript_highlight |  | background 1 |
| 60_site_elements/_link_cards.sass | 1 | $black |  | text 1 |
| 60_site_elements/_map_block.sass | 1 | $white |  | background 1 |
| 60_site_elements/_preview_block.sass | 1 | $impact |  | text 1 |
| 60_site_elements/_resources_for_educators.sass | 1 | $white |  | text 1 |
| lib:a_components/10_colours_and_patterns/00_core/_01_configuration_colour_and_patterns.sass | 111 | $black $clr1 $white $clr2 $clr3 $clr4 $clr5 $clr6 $clr7 $clr8 $clr9 $light_neutral $lighter_neutral $cta | #ababab #efefef #333333 #222222 #111111 #000000 black white red blue | var-def 111 |
| lib:a_components/40_ui/00_core/_04_configuration_ui.sass | 52 | $light_neutral $link_colour $darker_neutral $cta $white $black $impact $mid_neutral $ui_hover_border_color $ui_border_color |  | var-def 52 |
| lib:a_components/40_ui/ui_element_base_v002/13_definitions/_form_elements.sass | 52 | $btn_border_color $btn_bg_color $btn_color $btn_hover_color $btn_hover_bg_color $white $black $clr4 $clr2 $btn_reset_border_color $btn_reset_bg_color $btn_reset_color $btn_reset_hover_color $btn_reset_hover_bg_color $btn_reset_hover_border_color $btn_submit_border_color $btn_submit_bg_color $btn_submit_color $btn_submit_hover_color $btn_submit_hover_bg_color $btn_submit_hover_border_color $btn_search_color $btn_search_bg_color $btn_search_hover_color $btn_search_hover_bg_color $ui_border_color $ui_hover_border_color |  | text 19, background 18, border 15 |
| lib:a_components/10_colours_and_patterns/00_core/11_functions/_set_colour.sass | 32 | $clr1 $clr2 $clr3 $clr4 $clr5 $clr6 $clr7 $clr8 $clr9 $clr10 $clr11 $clr12 $clr13 $clr14 $clr15 $clr16 $clr17 $clr18 $clr19 $clr20 $colourmaps $clr1_map $clr2_map $clr3_map $clr4_map $clr5_map $clr6_map $clr7_map $clr8_map $clr9_map $map |  | var-def 30, control 2 |
| lib:a_components/10_colours_and_patterns/root_colour_variables/_colour_root_variables.sass | 25 | $clr1 $clr2 $clr3 $clr4 $clr5 $clr6 $clr7 $clr8 $clr9 $colours $clr1_map $clr2_map $clr3_map $clr4_map $clr5_map $clr6_map $clr7_map $clr8_map $clr9_map $colour_maps $map $black $white $impact $cta |  | css-var 4, var-def 21 |
| lib:a_components/30_typography/standardized_text_collection/_text_collection.sass | 7 | $dark_neutral $light_neutral $black $darker_neutral |  | text 3, background 2, border 2 |
| lib:a_components/10_colours_and_patterns/common_patterns/_patterns.sass | 6 | $black $true_black |  | background 3, mixin-def 3 |
| lib:a_components/40_ui/ui_element_base_v002/_form_ui.sass | 6 | $clr2 $ui_border_color $ui_hover_border_color | white | background 2, border 3, shadow 1 |
| lib:a_components/40_ui/ui_element_base_v002/_standardized_icons/_icons.sass | 5 | $black $impact $white |  | text 4, background 1 |
| lib:a_components/10_colours_and_patterns/00_core/11_functions/_neutral.sass | 4 | $black $white |  |  |
| lib:a_components/20_layout/00_core/10_vendor/modularscale/modularscale/_respond.scss | 4 | $map |  | var-def 2, mixin-def 1, control 1 |
| lib:a_components/40_ui/ui_element_base_v002/_ui_library_support/_component_superfish_navigation.sass | 4 | $impact $black | rgba(0,0,0,.2) | text 2, background 1, shadow 1 |
| lib:a_components/60_site_elements/slide_viewer/_slide_viewer_component.sass | 4 | $slide_viewer_background $page_marker_background $page_marker_background_hover $page_marker_background_active |  | css-var 4 |
| lib:a_components/30_typography/00_core/12_mixins/_image_bullets.sass | 3 |  |  | border 3 |
| lib:a_components/30_typography/00_core/12_mixins/_link_underline.sass | 2 | $link_colour $link_colour_active |  | border 2 |
| lib:a_components/30_typography/00_core/12_mixins/_multiline_ellipses.sass | 2 |  |  | mixin-def 2 |
| lib:a_components/30_typography/00_core/12_mixins/_inline_text_link.sass | 2 | $link_colour $black |  | text 1, border 1 |
| lib:a_components/40_ui/00_core/12_mixins/_spinner.sass | 2 |  | rgba(0, 0, 0, 0.75) | border 1, mixin-def 1 |
| lib:a_components/30_typography/standardized_text_collection/_anchor.sass | 2 | $link_colour $link_colour_active |  | text 2 |
| lib:a_components/40_ui/ui_element_base_v002/_ui_library_support/_component_form_select2.sass | 2 | $black $ui_border_color |  | text 1, border 1 |
| lib:a_components/10_colours_and_patterns/00_core/11_functions/_hsb.sass | 1 |  | hsla(0, 0, 0, $a) | control 1 |
| lib:a_components/30_typography/00_core/12_mixins/_clearfix.sass | 1 |  | blue | background 1 |
| lib:a_components/30_typography/00_core/12_mixins/_divider_line.sass | 1 | $black |  | mixin-def 1 |
| lib:a_components/30_typography/00_core/12_mixins/_material_design_icons.sass | 1 |  | rgba(0, 0, 0, 0.54) | text 1 |
| lib:a_components/20_layout/standardized_top_level_primitives/_standardized_top_level_primitives.sass | 1 | $bgcolor |  | background 1 |
| lib:a_components/30_typography/!fluid_type/_base_typography.sass | 1 | $black |  | text 1 |
| lib:a_components/30_typography/!fluid_type/_heading_collection.sass | 1 | $black |  | text 1 |
| lib:a_components/40_ui/ui_element_base_v002/_standardized_icons/_icon_mixins.sass | 1 | $impact |  | text 1 |
| lib:a_components/60_site_elements/figure_normalization/_figure.sass | 1 | $black |  | text 1 |


## 7. Hard-coded colours

Colour values written directly instead of taken from a variable. `white`/`black` keywords are included because they bypass `$white`/`$black`.

In rules and mixins (theme 8, library 7):

| Colour | Count | Where (file:line role) |
|---|---|---|
| `white` | 2 | lib:a_components/40_ui/ui_element_base_v002/_form_ui.sass:111 background<br>lib:a_components/40_ui/ui_element_base_v002/_form_ui.sass:117 shadow |
| `rgba(0, 0, 0, 0)` | 2 | 60_site_elements/_item_showcase.sass:34 background in linear-gradient()<br>60_site_elements/_item_with_metadata.sass:30 background in linear-gradient() |
| `rgba(0,0,0,0.7)` | 2 | 60_site_elements/_item_showcase.sass:34 background in linear-gradient()<br>60_site_elements/_item_with_metadata.sass:30 background in linear-gradient() |
| `rgba(0,0,0, 0.95)` | 2 | 60_site_elements/_item_showcase.sass:34 background in linear-gradient()<br>60_site_elements/_item_with_metadata.sass:30 background in linear-gradient() |
| `hsla(0, 0, 0, $a)` | 1 | lib:a_components/10_colours_and_patterns/00_core/11_functions/_hsb.sass:6 control |
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
| `mix()` | 84 | $white ×28, $black ×14, $clr1 ×4, $clr2 ×4, $clr3 ×4, $clr4 ×4, $clr5 ×4, $clr6 ×4, $clr7 ×4, $clr8 ×4, $clr9 ×4, $impact ×4, $cta ×1, $menu_background ×1 |
| `set-colour()` | 10 | $clr2 ×9, $clr1 ×1 |
| `rgba()` | 6 | $black ×3, $true_black ×1, $white ×1, $welcome_block_bg ×1 |
| `map-get()` | 4 | $colourmaps ×2, $map ×2 |
| `ms-function()` | 2 | $map ×2 |
| `nth()` | 2 | $colours ×1, $colour_maps ×1 |
| `linear-gradient()` | 2 | $impact ×1, $black ×1 |


## 9. Text on background: pairs declared in one rule

Only pairs where a rule sets both `color` and a plain `background(-color)` are listed; inherited backgrounds are not seen, so this is a floor, not the whole picture. Ratios are WCAG 2 contrast under the current configuration. AA needs 4.5 for body text and 3 for large text.

| Ratio | Text | Background | Where | Selector |
|---|---|---|---|---|
| **1.00** | `$btn_search_hover_color` #ffffff | `$btn_search_hover_bg_color` #ffffff | lib:a_components/40_ui/ui_element_base_v002/13_definitions/_form_elements.sass:240 | %button-search &:hover |
| **1.00** | `$btn_search_hover_color` #ffffff | `$btn_search_hover_bg_color` #ffffff | lib:a_components/40_ui/ui_element_base_v002/13_definitions/_form_elements.sass:248 | %button-search-clear &:hover |
| **2.28** | `$white` #ffffff | `$cta` #00bdd4 | 30_typography/_general.sass:180 | .lozenge |
| 3.36 * | `$btn_submit_hover_color` #ffffff | `$btn_submit_hover_bg_color` #c570a5 | lib:a_components/40_ui/ui_element_base_v002/13_definitions/_form_elements.sass:197 | %button-submit &:hover |
| 3.36 * | `$btn_submit_hover_color` #ffffff | `$btn_submit_hover_bg_color` #c570a5 | lib:a_components/40_ui/ui_element_base_v002/13_definitions/_form_elements.sass:213 | %button-cta &:hover |
| 3.92 * | `$btn_submit_color` #ffffff | `$btn_submit_bg_color` #bf609b | lib:a_components/40_ui/ui_element_base_v002/13_definitions/_form_elements.sass:192 | %button-submit |
| 3.92 * | `$btn_submit_color` #ffffff | `$btn_submit_bg_color` #bf609b | lib:a_components/40_ui/ui_element_base_v002/13_definitions/_form_elements.sass:206 | %button-cta |
| 3.92 * | `$white` #ffffff | `$impact` #bf609b | 60_site_elements/_reference_block.sass:45 | .reference-block .reference-pagination .pagination-list li.pagination- |
| 4.71 | `$black` #00171a | `$clr2` #bf609b | lib:a_components/40_ui/ui_element_base_v002/13_definitions/_form_elements.sass:119 | %button-standard &:hover |
| 4.87 | `$btn_search_color` #667476 | `$btn_search_bg_color` #ffffff | lib:a_components/40_ui/ui_element_base_v002/13_definitions/_form_elements.sass:224 | %button-search |
| 7.09 | `$black` #00171a | `$light_neutral` #99a2a3 | lib:a_components/30_typography/standardized_text_collection/_text_collection.sass:52 | ins |
| 7.09 | `$black` #00171a | `$light_neutral` #99a2a3 | lib:a_components/30_typography/standardized_text_collection/_text_collection.sass:57 | mark |
| 7.09 | `$btn_hover_color` #00171a | `$btn_hover_bg_color` #99a2a3 | lib:a_components/40_ui/ui_element_base_v002/13_definitions/_form_elements.sass:61 | %button &:hover |
| 7.15 | `$btn_reset_color` #1a2e31 | `$btn_reset_bg_color` #b3b9ba | lib:a_components/40_ui/ui_element_base_v002/13_definitions/_form_elements.sass:151 | %button-reset |
| 11.50 | `$btn_reset_hover_color` #e6e8e8 | `$btn_reset_hover_bg_color` #1a2e31 | lib:a_components/40_ui/ui_element_base_v002/13_definitions/_form_elements.sass:159 | %button-reset &:hover |
| 11.93 | `$btn_color` #00171a | `$btn_bg_color` #ccd1d1 | lib:a_components/40_ui/ui_element_base_v002/13_definitions/_form_elements.sass:49 | %button-base |
| 18.46 | `$white` #ffffff | `$footer_bg` #00171a | 20_layout/_page_footer.sass:11 | body > footer |
| 18.46 | `$white` #ffffff | `$black` #00171a | 30_typography/_10_definitions.sass:61 | %ribbon-black |
| 18.46 | `$white` #ffffff | `$black` #00171a | 60_site_elements/_capsule.sass:11 | .capsule .item-info |
| 18.46 | `$white` #ffffff | `$black` #00171a | 60_site_elements/_item_show.sass:138 | .item.show .item-viewer .media-render &:first-child |
| 18.46 | `$circular_audio_caption_color` #00171a | `$circular_audio_background` #ffffff | 60_site_elements/_item_show.sass:157 | .item.show .item-viewer .media-container &.audio |
| 18.46 | `$welcome_block_color` #ffffff | `$welcome_block_bg` #00171a | 60_site_elements/_welcome_block.sass:62 | #welcome-block |

Pairs that could not be evaluated (compound expressions): 5. Bold = below 3:1; * = between 3:1 and 4.5:1.

## 10. Library specifics

**Colour maps are computed from the library defaults, not from this palette.** `$clrN_map` is defined in the library core, which the theme imports before its own configuration, so the maps (and the `--colour--N--shade/tint/fade/watermark` CSS variables built from them) hold derivatives of the library's grey defaults:

| Map | Resolved value | Palette slot it should follow |
|---|---|---|
| `$clr1_map` | `(shade: rgb(136.8, 136.8, 136.8), primary: #ABABAB, tint: rgb(179.4, 179.4, 179.4), fade: #d5d5d5, watermark: rgb(238.2, 238.2, 238.2))` | `$clr1` = #00BDD4 |
| `$clr2_map` | `(shade: rgb(191.2, 191.2, 191.2), primary: #EFEFEF, tint: rgb(240.6, 240.6, 240.6), fade: #f7f7f7, watermark: rgb(251.8, 251.8, 251.8))` | `$clr2` = #BF609B |
| `$clr3_map` | `(shade: rgb(40.8, 40.8, 40.8), primary: #333333, tint: rgb(71.4, 71.4, 71.4), fade: #999999, watermark: rgb(214.2, 214.2, 214.2))` | `$clr3` = #0E3A40 |
| `$clr4_map` | `(shade: rgb(27.2, 27.2, 27.2), primary: #222222, tint: rgb(56.1, 56.1, 56.1), fade: rgb(144.5, 144.5, 144.5), watermark: rgb(210.8, 210.8, 210.8))` | `$clr4` = #EAF3F4 |
| `$clr5_map` | `(shade: rgb(13.6, 13.6, 13.6), primary: #111111, tint: rgb(40.8, 40.8, 40.8), fade: #888888, watermark: rgb(207.4, 207.4, 207.4))` | `$clr5` = #D98536 |
| `$clr6_map` | `(shade: black, primary: #000000, tint: rgb(25.5, 25.5, 25.5), fade: rgb(127.5, 127.5, 127.5), watermark: #cccccc)` | `$clr6` = #315FAA |
| `$clr7_map` | `(shade: black, primary: #000000, tint: rgb(25.5, 25.5, 25.5), fade: rgb(127.5, 127.5, 127.5), watermark: #cccccc)` | `$clr7` = #7DBF60 |
| `$clr8_map` | `(shade: black, primary: #000000, tint: rgb(25.5, 25.5, 25.5), fade: rgb(127.5, 127.5, 127.5), watermark: #cccccc)` | `$clr8` = #E1BB0B |
| `$clr9_map` | `(shade: black, primary: #000000, tint: rgb(25.5, 25.5, 25.5), fade: rgb(127.5, 127.5, 127.5), watermark: #cccccc)` | `$clr9` = #E5336D |

**Library defaults for the semantic aliases** (from `10_colours_and_patterns/00_core/_01_configuration_colour_and_patterns.sass`): `$impact: red`, `$cta: blue`, `$de_emphasized: $light_neutral`, `$de_activated: $lighter_neutral`, `$link_colour: $cta`, `$bgcolor: $white`, `$footer_bg: $black`. The theme configuration overrides all of them; a theme that omitted one would get `red`/`blue`.

**`$neutral` is overwritten by the library.** It is declared as `neutral()` (= #808b8d) but resolves to #1a2e31 (the value of `$darkest_neutral`): `root_colour_variables/_colour_root_variables.sass` assigns `$neutral` inside a top-level `@for` loop, and SASS treats that as an assignment to the existing global, so the loop's last step (`neutral(90)`) wins. Harmless today only because nothing uses `$neutral`.

**`set-colour()` usage** (compiled): 10 references — 30_typography/_10_definitions.sass, 30_typography/_general.sass, 40_ui/_omeka_advanced_search_filters.sass, 60_site_elements/agile_blocks/_poster.sass, 60_site_elements/agile_blocks/_section_introduction.sass, 60_site_elements/agile_blocks/_section_list_capsules.sass, 60_site_elements/agile_blocks/_quotation.sass, 60_site_elements/_advanced_search_browser.sass, 60_site_elements/_capsule.sass.

**CSS custom properties emitted from colour variables:** 11 declarations in lib:a_components/10_colours_and_patterns/root_colour_variables/_colour_root_variables.sass, lib:a_components/60_site_elements/slide_viewer/_slide_viewer_component.sass, 40_ui/12_mixins/_slide_viewer_integrated_nav.sass, 60_site_elements/_slide_viewer.sass.

**Library files not in this build** that still reference colours: 24 files, 166 references (see occurrences.csv, scope `library-uncompiled`). They matter for the library update, not for this theme.

## 11. Scoped colour variables

Variables declared inside mixins or blocks with a colour value. They are invisible to the configuration and to the probe above.

| Variable | Declared | Value |
|---|---|---|
| `$colourmaps` | lib:a_components/10_colours_and_patterns/00_core/11_functions/_set_colour.sass:13 | `(1: $clr1, 2: $clr2, 3: $clr3, 4: $clr4, 5: $clr5, 6: $clr6, 7: $clr7, 8: $clr8,` |
| `$colourmaps` | lib:a_components/10_colours_and_patterns/00_core/11_functions/_set_colour.sass:20 | `(1: $clr1_map, 2: $clr2_map, 3: $clr3_map, 4: $clr4_map, 5: $clr5_map, 6: $clr6_` |
| `$colours` | lib:a_components/10_colours_and_patterns/root_colour_variables/_colour_root_variables.sass:9 | `$clr1 $clr2 $clr3 $clr4 $clr5 $clr6 $clr7 $clr8  $clr9` |
| `$map` | lib:a_components/10_colours_and_patterns/root_colour_variables/_colour_root_variables.sass:21 | `nth($colour_maps,$i)` |
| `$ui_color` | lib:a_components/40_ui/00_core/_04_configuration_ui.sass:16 | `$darker_neutral` |
| `$ui_color` | lib:a_components/40_ui/00_core/_04_configuration_ui.sass:59 | `$darker_neutral` |

