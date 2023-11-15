(function($) {  
  $(document).ready(function() {
    
    const fulltextSearch = $('#advanced-search #fulltext_search');
    const queryText = $('#advanced-search .query-text');

    const replacePlaceholder = function(el, placeholderStr) {
      if (el.length) {
        el.attr('placeholder', placeholderStr);
      }
    }

    replacePlaceholder(fulltextSearch, 'Search by keyword');
    replacePlaceholder(queryText, 'Enter Value');


  });  
})(jQuery);