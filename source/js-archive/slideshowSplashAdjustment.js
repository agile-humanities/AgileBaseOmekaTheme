// Slideshow content type relies on views to render slideshow in splash area. In this instance the default h2 tag on the title slide should be the page’s h1 tag.

(function($) {  
  
  $(document).ready(function() {   
    if($('#block-slideshow-page-header-block').length > 0) {
      var titleCaption = $('#block-slideshow-page-header-block .slide-title .caption');
      var titleElement = titleCaption.find('h2');
      var title = titleElemenet.text();
      titleElement.remove();
      titleCaption.prepend('<h1>' + title + '<h1>');
    }        
  });  
})(jQuery);