(function($) {
  $(document).ready(function() {
    
    var mobileNavIcon = $('.nav-hamburger, .mobile-close');
    var mobileMenu = $('.mobile-container');
 
    mobileNavIcon.on('click', function () {
    mobileMenu.slideToggle("fast");
  });

  });
  
})(jQuery);



