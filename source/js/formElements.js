/**
 *  @file formElements.js
 *
 *  Select2 for the theme's own selects, by opt-in: any <select class="agile-select"> (the theme's sort selector,
 *  the item page's linked-resources filter …) that is not also .no-select2 or .chosen-select. Advanced Search
 *  manages its own selects (search-support.js for the Agile search page; Chosen, via the module's script, for the
 *  stock forms and the core advanced search partials that carry .chosen-select). Until the form refactor
 *  (2026-10-08) this applied Select2 to every select on every page, which double-wrapped the Chosen ones.
 *
 */

(function($) {

    $(document).ready(function() {
        $('select.agile-select').not('.no-select2, .chosen-select').each(function() {
          const select = $(this);
          if (select.data('select2')) { return; }
          select.select2({
            width: 'element',
            minimumResultsForSearch: 40
          });
        });
    });

})(jQuery);
