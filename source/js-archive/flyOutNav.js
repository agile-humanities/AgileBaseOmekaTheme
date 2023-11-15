
(function($) {  
  
$(document).ready(function(){
    // toggle main flyout menu
    var isOpen = false;
    $("#nav-tools > a:first-child").click(function(){
        $(this).attr("href", "#") //temp
        $("#main-nav-block").animate({width:'toggle'},window.animation.heartbeat); //left - right toggle animation
    });
    $("section").click(function(){
        $("#main-nav-block").animate({width:'hide'},window.animation.heartbeat); // hide on click body section
    });
    $("footer").click(function(){
        $("#main-nav-block").animate({width:'hide'},window.animation.heartbeat); // hide on click footer section
    });
    $("a:not(#nav-tools > a:first-child, .close_btn, #block-ddhi-main-menu > ul > li > a, #block-ddhi-main-menu > ul > li > ul > li > a) ").click(function(){
        $("#main-nav-block").animate({width:'hide'},window.animation.heartbeat); 
    });
    $("#main-nav-block > .close_btn").click(function(){
        $("#main-nav-block").animate({width:'hide'},window.animation.heartbeat); // close btn
    });
    // function setOpen() {
    //     console.log("DSDS")
    //     isOpen = isOpen ? false : true;
    //     setTimeout(function(){ 
    //         if (isOpen){
    //             //select all links except menu links to hide on click
    //             $("a:not(#nav-tools > a:first-child, .close_btn, #block-ddhi-main-menu > ul > li > a, #block-ddhi-main-menu > ul > li > ul > li > a) ").click(function(){
    //                 $("#main-nav-block").animate({width:'hide'},window.animation.heartbeat, setOpen()); 
    //             });
    //             $("header").click(function(){
    //                 $("#main-nav-block").animate({width:'hide'},window.animation.heartbeat, setOpen()); //left - right toggle animation
    //             });
    //             // $("body").click(function(event) {
    //             //     if (event.target.id != "main-nav-block") {
    //             //         $("#main-nav-block").animate({width:'hide'},window.animation.heartbeat, setOpen()); //close if anywhere cept nav is clicked
    //             //     }
    //             // });
    //         }
    //         else {
    //             //remove click handlers
    //             $("a:not(#nav-tools > a:first-child, .close_btn, #block-ddhi-main-menu > ul > li > a, #block-ddhi-main-menu > ul > li > ul > li > a) ").off("click");
    //             $("header").off("click");
    //             // $("body").off("click");
    //         }
    //     }, 200);

    // }

    $("#block-ddhi-search  input[type=submit]").val(" "); //temp remove text from search submit




});})(jQuery);