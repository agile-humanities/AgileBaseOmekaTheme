(function($) {
  $(document).ready(function() {

    const descriptionPanel = $('.description-panel');
    const metadataPanel = $('.metadata-panel');
    const itemInfo = $('.item-info');
    const itemViewer = $('.item-viewer');
    const panelMinHeight = 400;


    if (metadataPanel.length > 0) {

      descriptionPanel.show();
      metadataPanel.hide();

      function setPanelHeight() {
        if ($(window).width() < breakpoint_desktop) {
          descriptionPanel.css('height','auto')
          metadataPanel.height('height','auto');
          descriptionPanel.css('overflow-y', 'auto');
          metadataPanel.css('overflow-y', 'auto');
        } else {
          let panelOffset =  descriptionPanel.offset().top - itemInfo.offset().top - 20; // offset needs fudge factor – margin issues?
          let panelBaseHeight = itemViewer.length > 0 && itemViewer.height() > panelMinHeight ? itemViewer.height() : (descriptionPanel.height() > panelMinHeight ? descriptionPanel.height() : 300);
          let panelHeight = panelBaseHeight - panelOffset;
          descriptionPanel.height(panelHeight);
          metadataPanel.height(panelHeight);
          descriptionPanel.css('overflow-y', 'scroll');
          metadataPanel.css('overflow-y', 'scroll');
        }
      }

      setPanelHeight();

      $(window).resize($.debounce(100,setPanelHeight));



      $('a.tab-ui--control').each(function (i, o) {

        $(this).on('click', function (e) {
          e.preventDefault();
          if ($(this).hasClass('description-tab') === true) {
            $('.description-tab').addClass('active');
            $('.metadata-tab').removeClass('active');
            descriptionPanel.show();
            metadataPanel.hide();
          } else {
            $('.metadata-tab').addClass('active');
            $('.description-tab').removeClass('active');
            metadataPanel.show();
            descriptionPanel.hide();
          }
        })
      });
    }
  });

})(jQuery);

