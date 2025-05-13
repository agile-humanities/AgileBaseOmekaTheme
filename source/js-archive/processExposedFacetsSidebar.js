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
