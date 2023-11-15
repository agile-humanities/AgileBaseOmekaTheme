// Structures the fixed bottom menu in the Browse page

(function($) {  
  $(document).ready(function() {
    
    const mobileBrowseControls = $('.mobile-browse-controls');

    if (mobileBrowseControls.length) {
    
    const mobilePaginationContainer = $('.mobile-browse-controls .pagination');
    const mobileViewOptions = $('.mobile-browse-controls .view-options');
    const pageBullets = $('.mobile-browse-controls .page-bullets');
    const mobileBrowseControlsContainer = $('.mobile-browse-controls');
    let mobileBrowseControlsHeight = $('.mobile-browse-controls').innerHeight();

    const updateBrowserFooterHeight = function() {
      // on load, update the value of the custom css variable to set the bottom padding of the footer to the height of the mobile browse menu
      $(':root').css('--mobile-controls-container-height', `${mobileBrowseControlsHeight.toString()}px`);
  
      $(window).on('resize', $.debounce(100, function() {
        mobileBrowseControlsHeight = $('.mobile-browse-controls').innerHeight();
        // on window resize, update the value of the custom css variable to set the bottom padding of the footer to the height of the mobile browse menu
        $(':root').css('--mobile-controls-container-height', `${mobileBrowseControlsHeight.toString()}px`);
      }));
    }

    updateBrowserFooterHeight();

    // move the view buttons after the page arrows
    mobileViewOptions.appendTo(mobilePaginationContainer);

    // move the page bullets at the end of the container
    pageBullets.appendTo(mobileBrowseControlsContainer);

    }

  });  
})(jQuery);
