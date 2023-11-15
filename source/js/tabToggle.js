(function($) { 
  $(document).ready(function() {

    let descriptionPanel = $('.description-panel');
    let transcriptionPanel = $('.transcription-panel');

    if (transcriptionPanel.length > 0) {

      descriptionPanel.show();
      transcriptionPanel.hide();
      const panelHeight = descriptionPanel.height() > 300 ? descriptionPanel.height() : 300;

      descriptionPanel.height(panelHeight);
      transcriptionPanel.height(panelHeight);
      transcriptionPanel.css('overflow-y','scroll');

      $('a.tab').each(function (i, o) {

        $(this).on('click', function (e) {
          e.preventDefault();
          if ($(this).hasClass('description-tab') === true) {
            $('.description-tab').addClass('active-tab');
            $('.info-tab').removeClass('active-tab');
            descriptionPanel.show();
            transcriptionPanel.hide();
          } else {
            $('.info-tab').addClass('active-tab');
            $('.description-tab').removeClass('active-tab');
            transcriptionPanel.show();
            descriptionPanel.hide();
          }
        })
      });
    }
  });
  
})(jQuery);

