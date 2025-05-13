// clears the search form on click of the "x" icon
(function($) {   
  $(document).ready(function(){
    
    function clearSearchForm(searchForm) {
      if (searchForm.length) {
        const clearSearchBtn = searchForm.siblings(".search-form-clear");
        const searchTextInput = searchForm.children("input[type='text']");
        
        clearSearchBtn.on('click', function() {
          searchTextInput.val("");
        });
      };
    };
    
    const welcomeSearchForm = $('#welcome-search #search-form');
    const navSearchForm = $('#nav-search #search-form');
    
    clearSearchForm(welcomeSearchForm);
    clearSearchForm(navSearchForm);

  });
})(jQuery);