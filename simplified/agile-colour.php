<?php
/**
 * Colour expressions for the Simplified Agile Base Theme — a standalone copy of AgileThemeTools\Styling\ColourExpression,
 * so the theme can recompute its derived colour roles from the palette without the module. Keep the two in step.
 *
 * Generated into the theme by tools/build-simplified.js from simplified/agile-colour.php in the Advanced theme.
 */

if (!class_exists('AgileSimplifiedColourExpression', false)) {

final class AgileSimplifiedColourExpression
{
    const TEXT_RATIO = 4.5;
    const NAMED = [
        'white' => [255, 255, 255], 'black' => [0, 0, 0], 'red' => [255, 0, 0], 'blue' => [0, 0, 255], 'green' => [0, 128, 0],
        'yellow' => [255, 255, 0], 'orange' => [255, 165, 0], 'purple' => [128, 0, 128], 'gray' => [128, 128, 128], 'grey' => [128, 128, 128],
        'silver' => [192, 192, 192], 'navy' => [0, 0, 128], 'teal' => [0, 128, 128], 'maroon' => [128, 0, 0], 'olive' => [128, 128, 0],
        'aqua' => [0, 255, 255], 'cyan' => [0, 255, 255], 'fuchsia' => [255, 0, 255], 'magenta' => [255, 0, 255], 'lime' => [0, 255, 0],
    ];
    private array $config = [];
    private array $cache = [];
    private array $resolving = [];

    public function __construct(array $config)
    {
        foreach ($config as $key => $value) {
            if (is_scalar($value)) $this->config[$key] = trim((string) $value);
        }
    }

    public static function isDerived(string $value): bool
    {
        return (bool) preg_match('/\b(ensure-contrast|on-colou?r)\s*\(/', $value);
    }

    public function resolve(string $key): ?array
    {
        if (array_key_exists($key, $this->cache)) return $this->cache[$key];
        if (!isset($this->config[$key]) || isset($this->resolving[$key])) return null;
        $this->resolving[$key] = true;
        $colour = $this->evaluate($this->config[$key]);
        unset($this->resolving[$key]);
        return $this->cache[$key] = $colour;
    }

    public function evaluate(string $expression): ?array
    {
        $s = trim($expression, " \t\"'");
        if ($s === '') return null;
        if ($s[0] === '$') return $this->resolve(substr($s, 1));
        if (preg_match('/^#([0-9a-f]{3,8})$/i', $s, $m)) {
            $h = $m[1];
            if (strlen($h) === 3 || strlen($h) === 4) $h = preg_replace('/(.)/', '$1$1', $h);
            if (strlen($h) !== 6 && strlen($h) !== 8) return null;
            return [hexdec(substr($h, 0, 2)), hexdec(substr($h, 2, 2)), hexdec(substr($h, 4, 2)), strlen($h) === 8 ? hexdec(substr($h, 6, 2)) / 255 : 1.0];
        }
        if (preg_match('/^[a-z]+$/i', $s)) {
            $name = strtolower($s);
            if ($name === 'transparent') return [0, 0, 0, 0.0];
            return isset(self::NAMED[$name]) ? array_merge(self::NAMED[$name], [1.0]) : null;
        }
        if (!preg_match('/^([a-z_-]+)\s*\((.*)\)$/is', $s, $m)) return null;
        $fn = strtolower($m[1]);
        $args = self::splitArgs($m[2]);
        switch ($fn) {
            case 'rgb': case 'rgba':
                if (count($args) >= 3 && is_numeric($args[0])) return [(float) $args[0], (float) $args[1], (float) $args[2], isset($args[3]) ? self::number($args[3]) : 1.0];
                if (count($args) === 2) { $c = $this->evaluate($args[0]); return $c ? [$c[0], $c[1], $c[2], self::number($args[1])] : null; }
                return null;
            case 'mix':
                $a = $this->evaluate($args[0] ?? ''); $b = $this->evaluate($args[1] ?? '');
                return $a && $b ? self::mix($a, $b, isset($args[2]) ? self::number($args[2]) : 50) : null;
            case 'neutral':
                $n = isset($args[0]) && $args[0] !== '' ? self::number($args[0]) : 50;
                $dark = isset($args[1]) ? $this->evaluate($args[1]) : $this->resolve('black');
                $light = isset($args[2]) ? $this->evaluate($args[2]) : $this->resolve('white');
                return $dark && $light ? self::mix($dark, $light, $n) : null;
            case 'ensure-contrast':
                $c = $this->evaluate($args[0] ?? ''); $surface = $this->evaluate($args[1] ?? '');
                $ratio = isset($args[2]) && $args[2] !== '' ? self::number($args[2]) : self::TEXT_RATIO;
                $toward = isset($args[3]) && $args[3] !== 'null' ? $this->evaluate($args[3]) : null;
                return $c && $surface ? $this->ensureContrast($c, $surface, $ratio, $toward) : null;
            case 'on-colour': case 'on-color':
                $surface = $this->evaluate($args[0] ?? '');
                $light = isset($args[1]) ? $this->evaluate($args[1]) : $this->resolve('on_dark');
                $dark = isset($args[2]) ? $this->evaluate($args[2]) : $this->resolve('on_light');
                $ratio = isset($args[3]) ? self::number($args[3]) : self::TEXT_RATIO;
                return $surface ? $this->onColour($surface, $light ?: $this->resolve('white'), $dark ?: $this->resolve('black'), $ratio) : null;
            case 'set-colour': case 'set-color':
                $base = $this->resolve('clr' . (int) ($args[0] ?? 1));
                if (!$base) return null;
                $mixer = isset($args[2]) ? $this->evaluate($args[2]) : [255, 255, 255, 1.0];
                return $mixer ? self::mix($base, $mixer, isset($args[1]) ? self::number($args[1]) : 100) : null;
        }
        return null;
    }

    public static function luminance(array $c): float
    {
        $f = function ($v) { $v /= 255; return $v <= 0.03928 ? $v / 12.92 : pow(($v + 0.055) / 1.055, 2.4); };
        return 0.2126 * $f($c[0]) + 0.7152 * $f($c[1]) + 0.0722 * $f($c[2]);
    }
    public static function contrast(array $a, array $b): float
    {
        $la = self::luminance($a); $lb = self::luminance($b);
        return (max($la, $lb) + 0.05) / (min($la, $lb) + 0.05);
    }
    public static function isLight(array $c): bool { return self::luminance($c) > 0.18; }
    public static function mix(array $c1, array $c2, float $weightPercent): array
    {
        $p = $weightPercent / 100; $w = $p * 2 - 1; $a = $c1[3] - $c2[3];
        $w1 = (($w * $a == -1 ? $w : ($w + $a) / (1 + $w * $a)) + 1) / 2; $w2 = 1 - $w1;
        return [$c1[0] * $w1 + $c2[0] * $w2, $c1[1] * $w1 + $c2[1] * $w2, $c1[2] * $w1 + $c2[2] * $w2, $c1[3] * $p + $c2[3] * (1 - $p)];
    }
    public function ensureContrast(array $colour, array $surface, float $ratio = self::TEXT_RATIO, ?array $toward = null): array
    {
        if (self::contrast($colour, $surface) >= $ratio) return $colour;
        if ($toward === null) $toward = self::isLight($surface) ? ($this->resolve('black') ?: [0, 0, 0, 1.0]) : ($this->resolve('white') ?: [255, 255, 255, 1.0]);
        for ($step = 1; $step <= 50; $step++) {
            $candidate = self::mix($toward, $colour, $step * 2);
            if (self::contrast($candidate, $surface) >= $ratio) return $candidate;
        }
        return $toward;
    }
    public function onColour(array $surface, array $light, array $dark, float $ratio = self::TEXT_RATIO): array
    {
        $black = $this->resolve('black') ?: [0, 0, 0, 1.0]; $white = $this->resolve('white') ?: [255, 255, 255, 1.0];
        foreach (self::isLight($surface) ? [$dark, $light, $black, $white] : [$light, $dark, $white, $black] as $candidate) {
            if (self::contrast($candidate, $surface) >= $ratio) return $candidate;
        }
        return self::contrast($black, $surface) >= self::contrast($white, $surface) ? $black : $white;
    }
    public static function toCss(array $c): string
    {
        $whole = abs($c[0] - round($c[0])) < 1e-6 && abs($c[1] - round($c[1])) < 1e-6 && abs($c[2] - round($c[2])) < 1e-6;
        if ($c[3] >= 1 && $whole) return sprintf('#%02x%02x%02x', (int) round($c[0]), (int) round($c[1]), (int) round($c[2]));
        $rgb = implode(', ', array_map(fn ($v) => rtrim(rtrim(number_format($v, 3, '.', ''), '0'), '.'), [$c[0], $c[1], $c[2]]));
        return $c[3] >= 1 ? "rgb($rgb)" : sprintf('rgba(%s, %s)', $rgb, rtrim(rtrim(number_format($c[3], 4, '.', ''), '0'), '.'));
    }
    private static function number(string $s): float { return (float) rtrim(trim($s), '%'); }
    private static function splitArgs(string $s): array
    {
        $args = []; $depth = 0; $current = '';
        foreach (str_split($s) as $ch) {
            if ($ch === '(') $depth++; elseif ($ch === ')') $depth--;
            if ($ch === ',' && $depth === 0) { $args[] = trim($current); $current = ''; continue; }
            $current .= $ch;
        }
        if (trim($current) !== '') $args[] = trim($current);
        return $args;
    }
}

}
