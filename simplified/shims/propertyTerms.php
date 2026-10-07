(new class($this) {
    // Stand-in for the Agile Theme Tools propertyTerms helper: term lists from a comma-separated theme setting.
    private $view;
    public function __construct($view) { $this->view = $view; }
    public function fromThemeSetting($key)
    {
        $v = trim((string) $this->view->themeSetting($key, ''));
        return $v === '' ? [] : array_values(array_filter(array_map('trim', explode(',', $v))));
    }
    public function select(array $values, array $terms)
    {
        $out = [];
        foreach ($terms as $term) if (isset($values[$term])) $out[$term] = $values[$term];
        return $out;
    }
    public function sortByLabel(array $values)
    {
        uasort($values, function ($a, $b) {
            return strcasecmp($a['alternate_label'] ?: $a['property']->label(), $b['alternate_label'] ?: $b['property']->label());
        });
        return $values;
    }
})
