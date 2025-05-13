
// handles replacing standard html select box 
(function($) {    
  $(document).ready(function() {
    var mobile = true;
    var toggle = true;
    var $marginLefty = $("#contact")

    $('#splash-contact-btn').click(function(){ 
      var win = window.innerWidth; 
      if (win <= 767) {       
          mobile = true;
          setContact();
      }
      if (win >= 768) {       
          mobile = false; 
          setContact();
      }
    });
function setContact() {
  if (mobile === true){
    $marginLefty.css("margin-left", "unset");
    $marginLefty.css("width", "100%");
    $("#contact").animate({height:'toggle'},350);
    $("#splash-contact-btn").css("opacity", "0.3");
    toggle = toggle === true ? false : true;
  }
  else {
    $("#contact").css("display", "block");
    $("body").css("overflow-x", toggle === true ? "hidden" : "unset");
    $marginLefty.animate({ marginLeft: parseInt($marginLefty.css('marginLeft'),10) == 0 ? $marginLefty.outerWidth() : 0 }).promise()
    .done(function(){hideSplashContact()});
    $("#splash-contact-btn").css("opacity", toggle === true ? "0.3" : "1");
    $("#welcome-block").css("background-position",  parseInt($marginLefty.css('height'),10) == 0 ?  " -9999px" : "right bottom" );
    $("#welcome-block").css("background-position",  parseInt($marginLefty.css('marginLeft'),10) == 0 ?  "right bottom" : "-9999px" );
    toggle = toggle === true ? false : true;
  }
}
      var win = window.innerWidth;
      if (win <= 767) {       
          mobile = true;
          $marginLefty.css("margin-left", "unset");
          $marginLefty.css("width", "100%");
      }
      if (win>= 768) {       
          mobile = false;  
          $marginLefty.css({ marginLeft: parseInt($marginLefty.css('marginLeft'),10) == 0 ? $marginLefty.outerWidth() : 0 });
      }

    $('#contact .close_btn').click(function(){ 
      var win = window.innerWidth;
      if (win <= 767) {       
          mobile = true;
               }
      if (win >= 768) {       
          mobile = false;    
      }
      if (mobile === true){
        $("#contact").animate({height:'toggle'},350);
      }
      else {
        $marginLefty.animate({ marginLeft: parseInt($marginLefty.css('marginLeft'),10) == 0 ? $marginLefty.outerWidth() : 0 }).promise();
      }
      toggle = toggle === true ? false : true;
      $("#splash-contact-btn").css("opacity", "1");
    });

    function hideSplashContact(){
      $("#contact").css("display", parseInt($marginLefty.css('marginLeft'),10) == 0  ? "block" : "none");
    }
  });  
})(jQuery);