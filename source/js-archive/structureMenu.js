(function($) {  
  $(document).ready(function() {
    const desktopNav = $('.desktop-nav');

    if (desktopNav) {
      const subMenuContainer = $('.sub-menu-container');
      const menuLinks = $('.desktop-nav .navigation').first().children('li').children('a');
      const subMenu = $('.desktop-nav .navigation').first().children('li').children('ul');
      const mobileNav = $('.mobile-menu .navigation');
      const mobileIconsContainer = $('.mobile-icons-container');
      const logo = $('.desktop-nav .navigation').first();
      const icons = $('.desktop-nav .nav-icons');

      // Add a 'sub-menu' class to the sub menus
      subMenu.addClass('sub-menu');
      
      // Prepend the close button and title to the sub menu container
      subMenuContainer.prepend(`<div class="sub-menu-close-btn-container"><div><span>Close</span><button class="sub-menu-close-btn"></button></div></div>
      <div class="sub-menu-title"><h2>Title</h2><p>In this Section</p></div>`);

      const prependTopLevelLink = (el) => {

        if (el.is(':contains("Glossary")')) {
          el.clone().text("People").prependTo('.sub-menu-container .sub-menu');
        } else {
          el.clone().prependTo('.sub-menu-container .sub-menu');
        }

      }
      
      menuLinks.each(function() {
        // on click of the nav links
        $(this).click(function(event) {
          const subMenu = $(this).siblings('ul');
          const title = $(this).text();
          const subMenuTitle = $('.sub-menu-title h2');

          // check if it has a sub menu
          if (subMenu.length) {
            event.preventDefault();
  
            // replace the sub menu title with the text of the clicked link
            subMenuTitle.text(title);

            // remove an appended sub menu if there is any
            $('.sub-menu-container .sub-menu').remove();

            // append the new sub menu (sibling of the clicked link)
            subMenuContainer.append(subMenu.clone());

            // prepend the top-level link into the sub menu <ul>
            prependTopLevelLink($(this));
          }

        });
      });
      
      // change the class of the mobile navigation to '.mobile-navigation'
      mobileNav.removeClass('navigation').addClass('mobile-navigation');
      
      // clone the logo and the search and user login icons from the desktop-nav to the slide mobile navigation
      logo.clone().prependTo(mobileIconsContainer);
      icons.clone().appendTo(mobileIconsContainer);
      
      // change the title and alt attributes of the hamburger icon in the slide mobile nav
      // because its content has been replaced with the close button image through css.
      const mobileMenuCloseBtn = $('.mobile-icons-container .nav-hamburger');
      mobileMenuCloseBtn.attr({title: 'Close', alt: 'Close the mobile menu'});
      
    }
        
  });  
})(jQuery);
