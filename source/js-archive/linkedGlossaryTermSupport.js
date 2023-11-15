(function($) {  
  $(document).ready(function() {
    const glossaryTerm = $('.dl-item a');

    if (glossaryTerm.length) {
      glossaryTerm.addClass('anchor-offset');
    }
        
  });  
})(jQuery);