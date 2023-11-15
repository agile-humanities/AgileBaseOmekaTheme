(function($) {  
  $(document).ready(function() {
    const desktopNav = $('.desktop-nav');

    if (desktopNav) {
      const menuLinks = $('.desktop-nav .navigation').first().children('li').children('a');
      const subMenuContainer = $('.desktop-nav > .sub-menu-container');
      const closeBtn = $('.sub-menu-container .sub-menu-close-btn');
      const hamburgerIcon = $('.desktop-nav > .nav-icons .nav-hamburger');
      const mobileMenu = $('.mobile-menu');
      const mobileMenuCloseBtn = $('.mobile-icons-container .nav-hamburger');
      let isOpen = false;
      let title = '';

      const toggleMobileOpenClass = function() {
        mobileMenu.toggleClass('open-mobile-menu');
      }

      const toggleSubMenu = function() {
        menuLinks.each(function() {
          // on click of the nav links
          $(this).click(function(event) {
            const subMenu = $(this).siblings('ul');
            const downArrow = $('.desktop-nav .navigation').first().children('li.show-down-arrow');
            
            // check if it has a sub menu
            if (subMenu.length && isOpen === false) {
              
              event.preventDefault();
              // add 'open-sub-menu' class to open sub menu
              subMenuContainer.addClass('open-sub-menu');
              // hide the down arrow of a link if another sub menu is open
              downArrow.removeClass('show-down-arrow');
              // add 'open-sub-menu' class on the parent of the clicked link to show down arrow
              $(this).parent().addClass('show-down-arrow');
              
              title = $(this).text().toUpperCase();
              
              isOpen = true;

            } else {

              if (title.toUpperCase() === $(this).text().toUpperCase()) {
                
                downArrow.removeClass('show-down-arrow');
                subMenuContainer.removeClass('open-sub-menu')
                isOpen = false;
                title = '';

              }

              if (title.toUpperCase() !== $(this).text().toUpperCase()) {

                downArrow.removeClass('show-down-arrow');
                $(this).parent().addClass('show-down-arrow');
                title = $(this).text().toUpperCase();

              }
            }
          
          });
        });
        
        // click event listener on the sub menu close button
        closeBtn.click(function() {
          const downArrow = $('.desktop-nav .navigation').first().children('li.show-down-arrow');
          // hide the down arrow
          downArrow.removeClass('show-down-arrow');
          // and close the sub menu
          subMenuContainer.removeClass('open-sub-menu');

          isOpen = false;
          
          title = '';

        });

        // open the mobile menu on click of the hamburger icon
        hamburgerIcon.click(toggleMobileOpenClass);

        // close the mobile menu on click of the close button
        mobileMenuCloseBtn.click(toggleMobileOpenClass);

      }

      toggleSubMenu();
    }
        
  });  
})(jQuery);
