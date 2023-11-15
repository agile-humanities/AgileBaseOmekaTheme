/**
 * dropcaps.js
 * applies dropcap styling to 1st letter of any HTML element with the class "dropcap"
 * 
 */
(function($) {   

  $(document).ready(function(){
    var dropcapMapping = $('.drop-cap').toArray().map(p => p.innerHTML);
    var dropcapElements = $('.drop-cap');
    var i;
    for ( i = 0; i < dropcapMapping.length; i ++) {
        var dropcapRemovedLetter = dropcapMapping[i].substring(1);
        var dropcapFirstLetter = dropcapMapping[i].substring(0, 1);
        var fancyLetterAppended = "<img src='./../../../themes/pitts/asset/img/svg/drop-caps/" + dropcapFirstLetter.toLowerCase() + "-drop-caps.svg'/> " + dropcapRemovedLetter; 
        $(dropcapElements[i]).empty().append(fancyLetterAppended);
    }
     
  });
})(jQuery);
