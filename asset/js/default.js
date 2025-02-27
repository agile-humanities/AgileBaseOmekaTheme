/*!
 * agile-generic-theme v1.0.0
 * Base Omeka theme and front-end development system.
 * (c) 2025 Theme author * MIT License
 * https://github.com/stop14/stop14-themesystem-legacy] */

/**
 *  @file 00_omekaGeneral.js
 *
 *  Modifications to the PTD form elements
 *
 */



// Apply aspect ratio attributes to images in the following containers. Works with imageRatio.js in themesystem core.
const imageARScope = 'body > header, body > footer, main, #splash, #title';

/* eslint-disable max-len, no-underscore-dangle, no-console, no-control-regex*/

/*
 *    @file 01_masonryCardGrid.js
 *    @description  Adds the masonry library to card grid presentations.
 *    @usage  Add a .masonry-grid class to the card container. Only applies to desktop breakpoints by default
 *      adjust the masonryBreakpoint to breakpoint_mobile or breakpoint_tablet or 0 to change
 */

(function jQ($) {

    $(document).ready(function masonry() {
        let gridGapSize = 16; // should be value of rv($grid_gap_factor), in pixels

        let style = getComputedStyle(document.body);

        const masonryBreakpoint = breakpoint_desktop;

        // Grid gap size is set as a root variable in sass/40_ui/_browser_ui_definitions
        // It is used to ensure that masonry’s calculations work correctly

        if (typeof style.getPropertyValue('--grid-gap-size') !== 'undefined') {
            gridGapSize = parseInt(style.getPropertyValue('--grid-gap-size'));
        }

        const masonryContext = [
          ".masonry-grid"
        ];

        masonryContext.forEach(function masonryEach(selector) {

            let _this = $(selector);

            // Reroll masonry on resize. Works by toggling an attribute on the #collection-list element to trigger
            // the MutationObserver below, which then initializes / resets Masonry.
            // @todo: this should be debounced, but debounce functions aren't working as expected. Masonry may have its
            //   own resize flood control, or there may be some conflicts with the mututationObserver. Either way debounce
            //   functions didn't seem to be called.

            $(window).on("resize", function masonryResize() {
                if (_this.length > 0) {
                    let attr = _this.attr("resize");
                    if (typeof attr !== "undefined" && attr !== false) {
                        _this.removeAttr("resize");
                    } else {
                        _this.attr("resize", "");
                    }
                }
            });

            if (_this.length > 0) {

                function initCollectionBrowserGrid() {

                    if (_this.hasClass("grid") && window.outerWidth >= masonryBreakpoint) {
                        _this.imagesLoaded(function() {
                            _this.masonry({
                                "itemSelector": ".card",
                                "percentPosition": true,
                                "horizontalOrder": true,
                                "gutter": gridGapSize
                            });
                        });
                    }

                    if (_this.hasClass("list") || window.outerWidth < masonryBreakpoint) {

                        if (typeof _this.masonry === "function") {

                            // Note: masonry logs an error here but it's trapped and will not affect subsequent scripts
                            // @todo: figure out how to properly test to see if masonry is initialized

                            _this.masonry("destroy");

}

}

}

                initCollectionBrowserGrid();

                // The “grid” class is added via Javascript, so we need to watch for attribute changes to apply
                // masonry.

                let observer = new MutationObserver(initCollectionBrowserGrid);

                observer.observe(_this[0], {
                    "attributes": true
                });

}

});


    });

}(jQuery));

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
        if(facetSidebar.is(':hidden')) {
          facetSidebar.fadeIn(window.heartbeat,delay);
          mobileCloseButton.fadeIn(window.heartbeat,function() { $(this).css('display','flex'); delay()});
        } else {
          facetSidebar.fadeOut(window.heartbeat,delay);
          mobileCloseButton.fadeOut(window.heartbeat,delay);
        }
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

  });

})(jQuery);

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

/**
 *  @file menuSuperfish.js
 *
 *  Applies the Superfish menu library to Omeka’s main navigation.
 *  The superfish library is added via npm and its supporting js/css rolled into the asset folder via gulp build.
 *
 */

(function($) {
  $(document).ready(function() {

    // Use superfish for desktop only

    const mainMenu = $('#main-nav > ul');
    mainMenu.addClass('sf-menu');  // Adds default superfish styles

    if (mainMenu.length > 0) {
      mainMenu.superfish({});
    }

  });

})(jQuery);

(function($) {
  $(document).ready(function() {

    var mobileNavIcon = $('#mobile-menu--button, #mobile-menu--close');
    var mobileMenu = $('#mobile-menu--container');

    mobileNavIcon.on('click', function () {
    mobileMenu.slideToggle("fast");
  });

  });

})(jQuery);




/**
 *  @file ctcMiradorAriaSupport.js
 *
 *  Adds an aria-describedby label to Mirador viewer that points to descriptive text.
 */

(function($) {
  $(document).ready(function() {
    $('#mirador-1').attr('aria-describedby','viewer-description');
  })})(jQuery);

(function ($) {
    $(document).ready(function () {
        const markers = $('.pagination--bullets');

        if (markers.length > 0) {

            // Data from hidden Omeka paginator fields

            const perPage = parseInt($('.per-page').first().text());
            const totalItems = parseInt($('.number-of-items').first().text());
            const endItemCounter = parseInt($('.end-item-counter').first().text());
            const pageCount = parseInt($('.pagination--count').first().text());
            const activePage = parseInt(markers.find('a.active').attr('data-pagenumber'));

            // An array that lists the markers that should be visible. Shows the first two pages, the last two pagesm
            // and one page around active pages.

            const visibleMarkers = [...new Set([1, 2, activePage, activePage - 1, activePage + 1, pageCount, pageCount - 1])].sort((a,b) => a-b);

            // Indicates where the gaps in the paginator are by comparing values in (sorted) visibleMarkers
            // with the previous one. A value difference of more than 1 indicates a gap.

            const gaps = visibleMarkers.map((a,i) => {
                const prev = i - 1 > -1 ? visibleMarkers[i-1] : null;
                return prev !== null &&  a - prev !== 1 ? a - 1 : null;
            }).filter((a) => a !== null);

            markers.find('li').each(function () {
                const item = $(this);
                const marker = item.find('> a');
                const page = parseInt(marker.attr('data-pagenumber'));
                if (gaps.includes(page)) {
                    item.after("<li class='pagination--gap'>...</li>");
                }

                item.hide();

                if (visibleMarkers.includes(page)) {
                    item.show();
                }

            });
        }

        // change color of diamond marker representing current page
        // var s = $('.start-item-counter').first().text();
        //var t = (s/perPage);
        //var u = Math.ceil(t);
        //$('.bullet-pages > li > a').removeClass('active');
        //$('.bullet-pages').find('> li:nth-of-type(' + u.toString() + ') > a').addClass('active');

    });
})(jQuery);

/**
 *  @file omekaProcessAdvancedSearchForm
 *
 *  The advanced search form in Omeka is rather unwieldy and can't be modified.
 *  This does some post-processing to make it a little easier to handle.
 *
 */

(function ($) {
  $(document).ready(function () {

    const searchFormContainer = $('#advanced-search-form');

    if (searchFormContainer.length > 0) {
      // searchFormContainer.find('form > *:nth-child(2):nth-last-child(1)').wrapAll('<details>');
      const form = searchFormContainer.find('form');
      let keywordInput = form.find('> *:first-child');
      let submit = form.find('> *:last-child');

      form.find('> *:first-child').remove();
      form.find('> *:last-child').remove();
      form.find('> *').wrapAll('<details>').wrapAll('<div class="details-container">')
      form.find('details').prepend('<summary>More search options</summary>');

      keywordInput.find('.field-meta label').text('Enter keywords')
      submit.find('button').text('Submit search');
      submit.find('.field-meta').remove(); // remove label. Replace with proper submit text above.
      form.prepend(keywordInput);
      form.append(submit);

    }
  });
})(jQuery);

/**
 *  @file identifyExposedFacetsSidebar.js
 *  @description Assists in creating am mobile overlay version of the browser sidebar
 */

/** Use Behaviors for Drupal builds **/

if (typeof Drupal !== "undefined") {
  (function ($, Drupal, once) {
    Drupal.behaviors.processExposedFacetsSidebar = {
      attach: function (context, settings) {
        once('facet-block-sidebar', 'aside .block-facets', context).forEach(function (element) {
          const aside = $(element).closest('aside');
          if (aside.length > 0 && !aside.hasClass('browser-sidebar')) {
            aside.addClass('browser-sidebar');
          }
        });
      }
    };

    Drupal.behaviors.processExposedFacetsFilterButton = {
      attach: function (context, settings) {
        once('processed', '.filter.control-icon', context).forEach(function (element) {
          $(element).on('click',function(){
            const browserSidebar = $('body').find('.browser-sidebar');
            browserSidebar.toggleClass('active');
          });
        })
      }
    };
  })(jQuery, Drupal, once);
} else {
  (function ($) {
    $(document).ready(function () {
      $('.filter.control-icon').each(function () {
        $(this).on('click', function () {
          const browserSidebar = $('body').find('.browser-sidebar');
          if (browserSidebar.length > 0) {
            browserSidebar.toggleClass('active');
          }
        });
      });
    });
  })(jQuery);
}

// add the "has-three-cards" class in the featured exhibits block
// when there are three attachments
(function($) {
  $(document).ready(function(){
    const featuredExhibitsBlock = $('.site-link-cards');

    if (featuredExhibitsBlock.length) {
      featuredExhibitsBlock.each(function() {
        const NUMBER_OF_ATTACHMENTS = 3;
        const cards = $(this).children('.link-card');

        if (cards.length === NUMBER_OF_ATTACHMENTS) {
          $(this).addClass('has-three-cards');
        }
      });
    }

    const scrollDownBtn = $('.scroll-down-btn');

    scrollDownBtn.on('click', function() {
      $('html, body').animate({
        scrollTop: featuredExhibitsBlock.offset().top
      });
    });


  });
})(jQuery);

// Adds "slide-full-screen" class to the slideshow on click of the full screen button
(function($) {  
  $(document).ready(function() {
    const slideshow = $('.slideshow');
    
    if (slideshow.length) {
      // function that takes the browser specific full screen event 
      // and document property to access the element in full screen mode
      function changeSlideToFullScreen(fullScreenEvent, fullScreenElementProperty) {
        $(document).on(fullScreenEvent, function(){
          const slickTrack = $('.slick-track');
          
          if (document[fullScreenElementProperty]) {
            const slideshowIsFullscreen = document[fullScreenElementProperty].classList.contains('slideshow');
            
            if (slideshowIsFullscreen) {
              slideshow.slick('reinit');
              slickTrack.addClass('slide-fullscreen');
            };
          };
          
          if (!document[fullScreenElementProperty]) {
            slickTrack.removeClass('slide-fullscreen');
            slideshow.slick('reinit');
          };
        });
      };

      changeSlideToFullScreen('fullscreenchange', 'fullscreenElement');
      // for safari fullscreen
      changeSlideToFullScreen('webkitfullscreenchange', 'webkitFullscreenElement');
   
    };

  });  
})(jQuery);
(function($) { 
  $(document).ready(function() {

    let descriptionPanel = $('.description-panel');
    let transcriptionPanel = $('.transcription-panel');

    if (transcriptionPanel.length > 0) {

      descriptionPanel.show();
      transcriptionPanel.hide();
      const panelHeight = descriptionPanel.height() > 300 ? descriptionPanel.height() : 300;

      descriptionPanel.height(panelHeight);
      transcriptionPanel.height(panelHeight);
      transcriptionPanel.css('overflow-y','scroll');

      $('a.tab').each(function (i, o) {

        $(this).on('click', function (e) {
          e.preventDefault();
          if ($(this).hasClass('description-tab') === true) {
            $('.description-tab').addClass('active-tab');
            $('.info-tab').removeClass('active-tab');
            descriptionPanel.show();
            transcriptionPanel.hide();
          } else {
            $('.info-tab').addClass('active-tab');
            $('.description-tab').removeClass('active-tab');
            transcriptionPanel.show();
            descriptionPanel.hide();
          }
        })
      });
    }
  });
  
})(jQuery);

