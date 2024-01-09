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
