(new class {
    // Stand-in for the Agile Theme Tools textSummary helper: a plain-text excerpt of the given length.
    public function summarize($text, $length = 600)
    {
        $text = trim(preg_replace('/\s+/', ' ', strip_tags((string) $text)));
        return mb_strlen($text) > $length ? rtrim(mb_substr($text, 0, $length)) . '…' : $text;
    }
})
