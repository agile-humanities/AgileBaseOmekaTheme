(function($) { 
  $(document).ready(function() {

    $('.description-panel').show();
    $('.informations-panel').hide();

      $('a.tab').each(function() {
        $(this).on('click', function(e) {
          e.preventDefault();
          let descriptionTab = $(this).hasClass('description-tab');
          if (descriptionTab === true){
            $('.description-tab').addClass('active-tab');
            $('.info-tab').removeClass('active-tab');
            $('.description-panel').show();
            $('.informations-panel').hide();
          } else if (descriptionTab === false){
            $('.info-tab').addClass('active-tab');
            $('.description-tab').removeClass('active-tab');
            $('.informations-panel').show();
            $('.description-panel').hide();
          }
        })
      });
  });
})(jQuery);