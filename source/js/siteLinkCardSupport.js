// add the "has-three-cards" class in the featured exhibits block
// when there are three attachments
(function($) {
  $(document).ready(function(){
    const featuredExhibitsBlock = $('.site-link-cards');

    if (featuredExhibitsBlock.length) {
      featuredExhibitsBlock.each(function() {
        const NUMBER_OF_ATTACHMENTS = 3;
        const cards = $(this).children('.link-card');

        if (cards.length === NUMBER_OF_ATTACHMENTS) {
          $(this).addClass('has-three-cards');
        }
      });
    }

    const scrollDownBtn = $('.scroll-down-btn');

    scrollDownBtn.on('click', function() {
      $('html, body').animate({
        scrollTop: featuredExhibitsBlock.offset().top
      });
    });


  });
})(jQuery);
