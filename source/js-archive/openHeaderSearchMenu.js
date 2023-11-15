//toggles header search menu
(function($) {  
  $(document).ready(function() {
    const mobileSearch = $('.mobile-search');
    const searchIcon = $('.nav-search');
    const headerSearch = $('.header-search');
    const TABLET_BREAKPOINT = 780;
    let windowWidth = $(window).width();

    const toggleOpenClass = function(el, classStr) {
      el.toggleClass(classStr);
    }

    const getWindowWidth = function() {
      $(window).resize($.debounce(100, function() {
        windowWidth = ($(window).width());
      }));
    }

    getWindowWidth();

    searchIcon.click(function(){

      if (windowWidth >= TABLET_BREAKPOINT) {
        mobileSearch.removeClass('open-mobile-search');
        toggleOpenClass(headerSearch, 'open-header-search');
      } else {
        toggleOpenClass(mobileSearch, 'open-mobile-search');
      }

    });

    $(document).click(function (event) {
      const searchIcon = event.target.closest('.nav-search');
      const mobileSearchIsOpen = mobileSearch.hasClass('open-mobile-search');
      const mobileSearchClosestEl = event.target.closest('.mobile-search');
      const headerSearchIsOpen = headerSearch.hasClass('open-header-search');
      const headerSearchClosestEl = event.target.closest('.header-search');
      
      if (!searchIcon && mobileSearchIsOpen === true) {
        
        if (mobileSearchClosestEl) {
          return;
        }

        toggleOpenClass(mobileSearch, 'open-mobile-search');
      }

      if (!searchIcon && headerSearchIsOpen) {
        
        if (headerSearchClosestEl) {
          return;
        }

        toggleOpenClass(headerSearch, 'open-header-search');
      }

    });
        
  });  
})(jQuery);