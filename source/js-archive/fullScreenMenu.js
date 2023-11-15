
// handles fullscreen main menu
(function($) {    
  $(document).ready(function() {
    $(".nav-items .js-form-submit").val(" ");
    $('#top-menu-btn').click(function(){ 
      $('.main-nav').fadeToggle();
    });

  });  
})(jQuery);