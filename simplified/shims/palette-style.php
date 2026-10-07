// Simplified theme: palette and fonts come from this theme's own settings, applied through the CSS variables the
// stylesheet reads (--colour--N, --font-*). When a palette colour changes, the derived colour roles (on_impact,
// brand_primary_on_light …) are recomputed from the new palette with the build's own maths (agile-colour.php), since
// they follow the palette by rule, not by proportion. Browsers that cannot mix colours in CSS keep the built palette.
$paletteLines = [];
$paletteChanged = false;
$agileColourConfig = __AGILE_COLOUR_CONFIG__; // the theme's colour configuration, baked in by the generator
foreach (range(1, 9) as $n) {
    $v = trim((string) $this->themeSetting('clr' . $n, ''));
    if (preg_match('/^#[0-9a-fA-F]{3,8}$/', $v) && strcasecmp($v, (string) ($agileColourConfig['clr' . $n] ?? '')) !== 0) {
        $paletteLines[] = "    --colour--{$n}: {$v};";
        $agileColourConfig['clr' . $n] = $v;
        $paletteChanged = true;
    }
}
if ($paletteChanged && is_file(__DIR__ . '/../../agile-colour.php')) {
    require_once __DIR__ . '/../../agile-colour.php';
    $agileEvaluator = new AgileSimplifiedColourExpression($agileColourConfig);
    foreach ($agileColourConfig as $agileKey => $agileValue) {
        if (AgileSimplifiedColourExpression::isDerived((string) $agileValue) && ($agileColour = $agileEvaluator->resolve($agileKey))) {
            $paletteLines[] = '    --colour--' . str_replace('_', '-', $agileKey) . ': ' . AgileSimplifiedColourExpression::toCss($agileColour) . ';';
        }
    }
}
foreach (['basefont' => 'base', 'headingfont' => 'heading', 'altfont' => 'alt', 'codefont' => 'code'] as $fontKey => $fontVar) {
    $v = trim(str_replace([';', '{', '}', '<', '>', '\\'], '', (string) $this->themeSetting($fontKey, '')));
    if ($v !== '') $paletteLines[] = "    --font-{$fontVar}: {$v};";
}
if ($paletteLines) {
    $this->headStyle()->appendStyle("@supports (color: color-mix(in srgb, red, blue)) {\n  :root {\n" . implode("\n", $paletteLines) . "\n  }\n}");
}
