/**
 *  @file collectionBrowser.js
 *
 *  Modifications to the PTD form elements
 *
 */


/*
  Due to a bug in the Advanced Search Module’s search.js the initial state for the browser view type
  is set to "list" regardless of the default configuration. Sadly this does not correct the issue, it merely
  sets the default to "grid". While we set the default mode as a class in the DOM, the document would need to be
  loaded to retrieve this info. By that time the search.js module will already have set the default.

  See /modules/AdvancedSearch/assets/search.js line 275+
  var view_type = localStorage.getItem('search_view_type');
    if (!view_type) {
        view_type = 'list';
    }
 */

const searchViewType = localStorage.getItem('search_view_type')

if (searchViewType === null) {
  localStorage.setItem('search_view_type', 'grid');
}


(function($) {

  $(document).ready(function() {

    // Mobile browse controls

    $('#mobile-filter-button').on('click',_toggleFilterOverlay);
    $('#aside-mobile-close-btn').on('click',_toggleFilterOverlay)
    // @todo: allow users to click off of filter overlay. To do this you must prevent propagation if a user selects a control element via event.stopPropagation()
    /*
    $('aside.search-facets').on('click',function(){
        if (window.outerWidth <= breakpoint_desktop) {
            _toggleFilterOverlay()
        }
    })
    */

    function _toggleFilterOverlay() {
      $('aside.search-facets').slideToggle(window.heartbeat);
      $('.search-results-header').fadeToggle(window.heartbeat).css('display', 'flex');
    }

    // Collection browser support

    let browseViewMode = localStorage.getItem('search_view_type');


    // theme templates now supply the user-configured default mode as a data attribute

    const itemBrowser =$('.item-browser');


    if (browseViewMode === null && itemBrowser.length > 0) {
      browseViewMode = itemBrowser.attr('data-gridlistmode') ?? null;
    }

    if (browseViewMode !== null) {
      const browserUIbuttons =  $('.search-results-header .search-view-type');
      browserUIbuttons.each(function(){
        // Manage active state classes and icons.
        $(this).removeClass('active');
        $(this).find('img').trigger('switchtoinactive').removeClass('active'); // custom trigger in js/rollover.js

        // (Advanced Search Module) browse mode is handled via Javascript. This swaps the icons.

        $(this).on('click',function(e){
          $(this).find('img').trigger('switchtoactive').addClass('active');
          $(this).siblings().each(function(){
            // @todo: img.trigger('switchtoinactive') should work, but it does not.
            const img = $(this).find('img');
            img.attr('src',img.attr('data-src'));
            img.removeClass('active');
          });
        });

        if ($(this).hasClass('search-view-type-' + browseViewMode)) {
          $(this).addClass('active');
          $(this).find('img').trigger('switchtoactive').addClass('active'); // custom trigger in js/rollover.js
        }

      });
    }


    // Modify browse collection search button to conform to design
    $('#form-search').find('button.search-submit').attr('aria-describedby','Submit search request').html('');


    // Open facet details if an item is checked.

    $('.search-facet details').each(function() {
      var open = false;
      $(this).find('input').each(function() {
        if ($(this).is(':checked')) {
          open = true;
        }
      });

      if(open === true) {
        $(this).attr('open','');
      }
    })

  });

})(jQuery);
