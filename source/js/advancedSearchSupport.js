/**
 *  @file advancedSearchSupport.js
 *  @description Supports the transformation of the advanced search module’s UI into the Agile Collection Browser interface
 *
 */


const searchViewType = localStorage.getItem('search_view_type')

if (searchViewType === null) {
  localStorage.setItem('search_view_type', 'grid');
}


(function($) {

  $(document).ready(function() {
    const mobileFilterButton = $('#mobile-filter-button');
    const mobileCloseButton = $('#browser--mobile-close-btn');
    const mobileBrowseControls = $('#mobile-browse-controls');
    const facetSidebar = $('#browser-sidebar');
    const searchResultsHeader = $('.search-results-header');

    // Mobile browse controls

    mobileFilterButton.on('click',_toggleFilterOverlay);
    mobileCloseButton.on('click',_toggleFilterOverlay)
    // @todo: allow users to click off of filter overlay. To do this you must prevent propagation if a user selects a control element via event.stopPropagation()
    /*
    $('aside.search-facets').on('click',function(){
        if (window.outerWidth <= breakpoint_desktop) {
            _toggleFilterOverlay()
        }
    })
    */
    
    // Hide filter button if filter sidebar doesn’t exist

    if(facetSidebar.length === 0) {
      mobileFilterButton.hide();
    }

    // Position Mobile Paginator
    if (mobileBrowseControls.length > 0) {
      $('.pagination--mobile').appendTo(mobileBrowseControls);
    }

    // Resets the sidebar display status when the window is resized

    $(window).on('resize',() => {
        facetSidebar.attr('style', null)
        mobileCloseButton.attr('style', null)
      });

    function _toggleFilterOverlay() {
      // Set a delay to avoid animation race conditions
      const delay = () => {
        setTimeout(()=>{},window.heartbeat)
      }

      if (facetSidebar.length > 0) {
        facetSidebar.is(':hidden') ?
          facetSidebar.fadeIn(window.heartbeat,delay) :
          facetSidebar.fadeOut(window.heartbeat,delay);
      }
      if (searchResultsHeader.length > 0) {
        searchResultsHeader.is(':hidden') ?
          searchResultsHeader.fadeIn(window.heartbeat,function() { $(this).css('display','flex'); delay()}) :
          searchResultsHeader.fadeOut(window.heartbeat,delay);
      }
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

    // Reset button is not fully implemented. See advanced search module search.js
    $('#facets-reset').on('click', function () {
      const url = window.location.href;
      window.history.pushState({}, '', url.split(/[?#]/)[0]);
      window.location.reload();
    });

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

    // See more/less facet options

    $('.facet').each(function (i) {
      const facet = $(this);
      const visibleOptions = parseInt(facet.attr('data-visible-options'));
      const facetOptions = facet.find('.search-facet-items > *');

      // All items are marked inactive by default
      // Show active options
      if (visibleOptions > 0) {
        facetOptions.each(function (i) {
          if (i<visibleOptions) {
            $(this).css('display','flex');
            $(this).removeClass('inactive');
          }
        });
      } else {
        facetOptions.css('display','flex');
      }

      const facetExpandBtn = facet.find('.facet--expand');
      const facetCollapseBtn = facet.find('.facet--collapse');

      // Show a set of options on click

      facetExpandBtn.on('click',function(e) {
        facet.find('.inactive').each(function (i) {
          if (i<visibleOptions) {
            $(this).css('display','flex');
            $(this).removeClass('inactive');
          }
        });

        // Hide button if there are no more inactive options to show
        if(facet.find('.inactive').length == 0) {
          $(this).hide();
        }

        // Show the “Fewer options” button
        facetCollapseBtn.show()

      })

      // Hide a set of options on click
      facetCollapseBtn.on('click',function(e) {
        const activeOptions = facetOptions.not('.inactive');
        const activeCount = activeOptions.length;
        activeOptions.each(function (i) {
          if (i > activeCount - visibleOptions) {
            $(this).addClass('inactive');
            $(this).css('display','none');
          }
        });

        // Hide collapse button if the minimal set of options are visible
        if(facetOptions.not('.inactive').length <= visibleOptions) {
          $(this).hide();
        }

        // Make sure the “More options” is visible
        facetExpandBtn.show()

      })

    });

  });

})(jQuery);
