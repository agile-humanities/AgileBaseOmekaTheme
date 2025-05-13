(function ($) {
    $(document).ready(function () {
	    var body = $('body');
	    
	    if ($('#user-bar').length > 0) {
		    body.addClass('has-admin-bar');
	    }
	    
	    if ($('#homepage-splash').length === 0) {
		    body.addClass('has-top-nav');
	    }
    });
    
})(jQuery);



