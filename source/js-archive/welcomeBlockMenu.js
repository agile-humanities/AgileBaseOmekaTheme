// structures the .desktop-nav .navigation elements
console.log('yo');

(function($) {
  $(document).ready(function() {
    const welcomeBlock = $('#welcome-block');
    const bottomMenuContainer = $('#main_menu');

    console.log('hola');
    // if window is on the homepage
    if (welcomeBlock.length) {
      const pdcMenu = bottomMenuContainer.find('.navigation');
            console.log(bottomMenuContainer);

      const pdcMenuCopy = pdcMenu.clone().addClass('welcome-pdc-menu');
      const welcomeIntro = $('#welcome-block .introductory-text');
      // inserts a clone of the PDC menu in the homepage welcome block
      pdcMenuCopy.insertBefore(welcomeIntro);

     /*   const browserWidthOnPageLoad = $(window).width();
      const DESKTOP_MIN_BREAKPOINT = 810;

      function hideElement(element) {
        element.css('display', 'none');
      }

      function showElement(element) {
        element.css('display', '');
      }

      // check browser width on page load
      // if on desktop
      if (browserWidthOnPageLoad >= DESKTOP_MIN_BREAKPOINT) {
        // hide the PDC menu on the homepage
        hideElement(bottomMenuContainer);
      } else {
        showElement(bottomMenuContainer);
      }

      // listen for browser resize
      $(window).on('resize', function() {
        let browserWidth = $(this).width();
        // if on desktop
        if (browserWidth >= DESKTOP_MIN_BREAKPOINT) {
          // hide the PDC menu on the homepage
          hideElement(bottomMenuContainer);
        } else {
          showElement(bottomMenuContainer);
        }
      });*/
    }
  });
})(jQuery);
