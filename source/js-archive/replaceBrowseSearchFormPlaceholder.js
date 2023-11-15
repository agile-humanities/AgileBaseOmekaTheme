(function($) {  
  $(document).ready(function() {
    const browsePage = $('.browse');

    if (browsePage.length) {

      const searchTextInput = $('#search-form input[type=text]');
      searchTextInput.attr('placeholder', 'Search for items');

    }
  });  
})(jQuery);