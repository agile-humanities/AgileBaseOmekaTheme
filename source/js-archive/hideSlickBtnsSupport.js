(function($) {  
  $(document).ready(function() {
    const slideshow = $('.slideshow');
    const slideshowBlock = $('.slideshow-block');

    if (slideshow.length) {
      const introSlide = $('.slide-introduction');
      
      // Adds the "slide-has-intro" class to the slideshow-block container if slideshow has an Introduction
      if (introSlide.length) {
        slideshowBlock.addClass('slide-has-intro');
      }

      slideshow.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        //currentSlide is undefined on init -- set it to 1 in this case, otherwise add 1 (because currentSlide is 0 based)
        // Add a custom attribute of currentSlide="<slide number>" to the slideshow-block
        setTimeout(() => {
          let currentSlide = slideshow.slick('slickCurrentSlide').toString();
          $(this).closest(slideshowBlock).attr('currentSlide', currentSlide);

        }, 0);
      });
    }

  });  
})(jQuery);