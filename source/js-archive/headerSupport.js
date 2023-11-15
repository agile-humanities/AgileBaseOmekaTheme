(function ($) {
  $(document).ready(function () {
    const body = $('body');
    
    if ($('#user-bar').length > 0) {
      body.addClass('has-admin-bar');
    }
    
  });
  
})(jQuery);