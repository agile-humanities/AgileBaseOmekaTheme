/**
 *  @file extendTextUI.js
 *
 *  A mechanism to show and hide additional flowed text
 *
 */   
(function($) {   
  $(document).ready(function() {      
    $('.extended-text').each(function(){
      var bio = $(this).find('.body');
            
      if (bio.length > 0) {
        
        if(bio.children().length > 1) {
          
          
          var first = bio.children().first().clone();
                    
          bio.children().first().remove();
          bio.children().wrapAll('<div class="extended"></div>');
          bio.prepend(first);
          
          var extended = bio.find('.extended');
                    
        
          var expand = $("<a class='extend-ui expand'>Read more</a>");
          var collapse = $("<a class='extend-ui collapse'>Close</a>");
          
          expand.on('click tap',function(){
            extended.slideDown(window.animation.slideTransition);
            expand.fadeOut(window.animation.slideTransition,function(){
              collapse.fadeIn(window.animation.slideTransition).css('display','flex'); // defaults to display: inline ??
            });
          });
          
          collapse.on('click tap',function(){
            extended.slideUp(window.animation.slideTransition);
            collapse.fadeOut(window.animation.slideTransition,function() {
              expand.fadeIn(window.animation.slideTransition);
            });
          });
          
         extended
            .after(expand)
            .after(collapse);
          
        }
      }
      
    });
  });
})(jQuery);
