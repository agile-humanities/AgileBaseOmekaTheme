/**
 * darkMode.js
 * 
 */
(function($) {   

  $(document).ready(function(){
  
    function darkOn(){
        $("body").addClass('dark');
        $('.dark-switch > input[type="checkbox"]').prop("checked", true); //sync mobile and desktop btns
    }
  
    function darkOff(){
        $('.dark-switch > input[type="checkbox"]').prop("checked", false); //sync mobile and desktop btns
        $("body").removeClass('dark');
    }
    
    if(localStorage.getItem("darkmode1") === "on"){
        darkOn();
    }
    else if(localStorage.getItem("darkmode1") === "off"){
        darkOff();
    }
  
    $('.dark-switch > input[type="checkbox"]').click(function(){ //dark mode checkbox check
        if($(this).prop("checked") == true){
            localStorage.setItem("darkmode1", "on");
            darkOn();
        }
        else if($(this).prop("checked") == false){
            localStorage.setItem("darkmode1", "off");
            darkOff();
        }
    });
  });
})(jQuery);
