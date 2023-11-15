(function($) {  
  $(document).ready(function() {  
    if ($('body.welcome').length > 0) { 
      
      function setViewerSlides() {
        var viewer = $('.homepage-introduction slide-viewer');  
        
        if (viewer.length > 0) {
          
          // Set <slide-viewer> slides per row to 1 on mobile and tablet
                    
          if ($(window).width() < breakpoint_desktop) {
            viewer.attr('option-slidesperrow',1);
          } else if (viewer.attr('option-slidesperrow') !== 3) { // do not set if it's at its default.
            viewer.attr('option-slidesperrow',3);
          }
        }      
      }
      
      $(window).on('resize', $.debounce(100,setViewerSlides));
      setViewerSlides();
    }
  });  
})(jQuery);