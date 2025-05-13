(function($) {
  $(document).ready(function() {
    
    var mobileNavIcon = $('#mobile-menu--button, #mobile-menu--close');
    var mobileMenu = $('#mobile-menu--container');
 
    mobileNavIcon.on('click', function () {
    mobileMenu.slideToggle("fast");
  });

  });
  
})(jQuery);



