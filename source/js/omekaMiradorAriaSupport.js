/**
 *  @file ctcMiradorAriaSupport.js
 *
 *  Adds an aria-describedby label to Mirador viewer that points to descriptive text.
 */

(function($) {
  $(document).ready(function() {
    $('#mirador-1').attr('aria-describedby','viewer-description');
  })})(jQuery);
