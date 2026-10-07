// Simplified theme: palette and fonts come from this theme's own settings, applied through the CSS variables the
// stylesheet reads (--colour--N, --font-*). Browsers that cannot mix colours in CSS keep the built palette.
$paletteLines = [];
foreach (range(1, 9) as $n) {
    $v = trim((string) $this->themeSetting('clr' . $n, ''));
    if (preg_match('/^#[0-9a-fA-F]{3,8}$/', $v)) $paletteLines[] = "    --colour--{$n}: {$v};";
}
foreach (['basefont' => 'base', 'headingfont' => 'heading', 'altfont' => 'alt', 'codefont' => 'code'] as $fontKey => $fontVar) {
    $v = trim(str_replace([';', '{', '}', '<', '>', '\\'], '', (string) $this->themeSetting($fontKey, '')));
    if ($v !== '') $paletteLines[] = "    --font-{$fontVar}: {$v};";
}
if ($paletteLines) {
    $this->headStyle()->appendStyle("@supports (color: color-mix(in srgb, red, blue)) {\n  :root {\n" . implode("\n", $paletteLines) . "\n  }\n}");
}
