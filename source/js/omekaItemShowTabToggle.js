(function($) {
  $(document).ready(function() {

    const panelNames = ['description', 'metadata', 'transcription'];
    const panelMinHeight = 400;

    // Each tab container is handled on its own, so its tabs only switch its own panels.

    $('.container-with-tabs-and-panels').each(function() {

      const container = $(this);
      const tabs = container.find('a.tab-ui--control');
      const panels = {};

      panelNames.forEach(function(name) {
        panels[name] = container.find('.' + name + '-panel');
      });

      if (panels.metadata.length === 0) {
        return;
      }

      function showPanel(name) {
        panelNames.forEach(function(panelName) {
          panels[panelName].toggle(panelName === name);
        });
        tabs.each(function() {
          $(this).toggleClass('active', $(this).hasClass(name + '-tab'));
        });
      }

      showPanel('description');

      tabs.on('click', function(e) {
        e.preventDefault();
        const tab = $(this);
        const name = panelNames.find(function(panelName) {
          return tab.hasClass(panelName + '-tab');
        });
        if (name) {
          showPanel(name);
        }
      });

      // Legacy Item Header only: hold the panels to the viewer's height and scroll them.
      // The Item Summary block lets its panels size to their content.

      const itemInfo = container.closest('.item-info');

      if (itemInfo.length === 0) {
        return;
      }

      const itemViewer = $('.item-viewer');
      const descriptionPanel = panels.description;
      const metadataPanel = panels.metadata;

      function setPanelHeight() {
        if ($(window).width() < breakpoint_desktop) {
          descriptionPanel.css('height','auto');
          metadataPanel.css('height','auto');
          descriptionPanel.css('overflow-y', 'auto');
          metadataPanel.css('overflow-y', 'auto');
        } else {
          let panelOffset =  descriptionPanel.offset().top - itemInfo.offset().top - 20; // offset needs fudge factor – margin issues?
          let panelBaseHeight = itemViewer.length > 0 && itemViewer.height() > panelMinHeight ? itemViewer.height() : (descriptionPanel.height() > panelMinHeight ? descriptionPanel.height() : panelMinHeight);
          let panelHeight = panelBaseHeight - panelOffset;
          descriptionPanel.height(panelHeight);
          metadataPanel.height(panelHeight);
          descriptionPanel.css('overflow-y', 'scroll');
          metadataPanel.css('overflow-y', 'scroll');
        }
      }

      setPanelHeight();

      $(window).resize($.debounce(100,setPanelHeight));
    });
  });

})(jQuery);
