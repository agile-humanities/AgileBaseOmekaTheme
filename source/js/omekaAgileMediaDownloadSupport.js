/**
 *  @file omekaAgileMediaDownloadSupport.js
 *
 *  Moves download buttons in the Media Item resource block to the Item header.
 *  See AgileThemeTools/src/Media/FileRenderer/TextRenderer render() for backend.
 */

(function($) {
  $(document).ready(function() {
    if ($('.item-viewer .download-media').length > 0 && $('.item-info .download').length > 0) {
      $('.item-viewer .download-media').each(function() {
        $(this).appendTo($('.item-info .download'));
      });
    }
  })})(jQuery);

