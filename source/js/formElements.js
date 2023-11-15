/**
 *  @file pathwaysFormElements.js
 *
 *  Modifications to the PTD form elements
 *
 */

(function($) {

    $(document).ready(function() {
        // Apply Select2 library to select elements.
        // @todo: Need to remove contextual search from multiple select elements

        $('select').select2({
          width: 'element',
          minimumResultsForSearch: 40
        });
    });

})(jQuery);
