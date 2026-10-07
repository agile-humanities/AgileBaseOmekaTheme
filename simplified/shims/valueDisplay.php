(function ($value, array $options = []) {
    // Stand-in for the Agile Theme Tools valueDisplay helper: Omeka's own HTML for a value, without links when asked.
    if ($value === null || $value === '') return '';
    if (!is_object($value) || !method_exists($value, 'asHtml')) return htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8');
    $html = $value->asHtml();
    return array_key_exists('link', $options) && !$options['link'] ? strip_tags($html) : $html;
})
