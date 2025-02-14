// Adds "slide-full-screen" class to the slideshow on click of the full screen button
(function($) {  
  $(document).ready(function() {
    const slideshow = $('.slideshow');
    
    if (slideshow.length) {
      // function that takes the browser specific full screen event 
      // and document property to access the element in full screen mode
      function changeSlideToFullScreen(fullScreenEvent, fullScreenElementProperty) {
        $(document).on(fullScreenEvent, function(){
          const slickTrack = $('.slick-track');
          
          if (document[fullScreenElementProperty]) {
            const slideshowIsFullscreen = document[fullScreenElementProperty].classList.contains('slideshow');
            
            if (slideshowIsFullscreen) {
              slideshow.slick('reinit');
              slickTrack.addClass('slide-fullscreen');
            };
          };
          
          if (!document[fullScreenElementProperty]) {
            slickTrack.removeClass('slide-fullscreen');
            slideshow.slick('reinit');
          };
        });
      };

      changeSlideToFullScreen('fullscreenchange', 'fullscreenElement');
      // for safari fullscreen
      changeSlideToFullScreen('webkitfullscreenchange', 'webkitFullscreenElement');
   
    };

  });  
})(jQuery);