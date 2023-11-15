/**
 *  @file scriptoSupport.js
 *
 *  Provide Scripto content information on item pages.
 *
 *  For some reason the transcribed Scripto HTML is available via the API but NOT as item-level data
 *  (see https://github.com/omeka-s-modules/Scripto/issues/21)
 *
 *  Oddly, a PHP-based API request, e.g. $this->api()->searchOne('items', ['id'=>$item->id()])->getContent()->getJsonLd('o-module-scripto:content'),
 *  does not return the same information as available through the REST endpoint.
 *
 *  This script provides some duct tape to retrieve html via REST.
 *
 *  Usage:
 *  - Requires a container with an #transcript-html id be present.
 *  - Optionally looks for a data-item-id on the container 
 *  - Optionally looks for a data-api-url on the container (provided by $item->apiUrl() method in the show.phtml template)
 *  
 *  If neither parameter exists it will try to get the id from the URL path and look for the standard location of the Omeka S api.
 */

var itemScriptoData;

// handles fullscreen main menu
(function($) {    
  $(document).ready(function() {
    
    if($('#transcript-html').length>0) {
      var transcriptBlock = $('#transcript-html');
      var itemId = transcriptBlock.attr('data-item-id').length > 0 ? transcriptBlock.attr('data-item-id') : window.location.pathname.split('/').pop();
      var apiUrl = transcriptBlock.attr('data-api-url').length > 0 ? transcriptBlock.attr('data-api-url') : '/api/items/' + itemId;
      var html = '';

      console.log(apiUrl);
      
      $.ajax({
        'url': apiUrl,
        'success' :   function (data) {
          itemScriptoData = data['o-module-scripto:content'];

          if (itemScriptoData.length > 0) {

            for (var i=0; i<itemScriptoData.length; i++) {

              // “fullhtml” is a hack to the Scripto module’s Module.php file and does not exist
              // in the released Scripto module. It's intended to overcome a default MySQL
              // configuration limit (see https://stackoverflow.com/questions/2567000/mysql-and-group-concat-maximum-length)
              // that was causing text truncation. This script is intended to fallback
              // to the original value in case the module gets updated.

              if (itemScriptoData[i]['o-module-scripto:html'].length>0) {
                if (typeof itemScriptoData[i]['o-module-scripto:fullhtml'] != 'undefined') {
                  html = html.concat(itemScriptoData[i]['o-module-scripto:fullhtml']);
                } else {
                  html = html.concat(itemScriptoData[i]['o-module-scripto:html']);
                }
                
                if (i>0 && i<itemScriptoData.length) {
                  html = html.concat('<hr />');
                }
              }
            }

            transcriptBlock.html(html);
          }
        }
      });
    }

  });  
})(jQuery);