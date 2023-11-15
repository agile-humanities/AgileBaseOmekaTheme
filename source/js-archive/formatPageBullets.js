(function ($) {
  $(document).ready(function () {
    const pageBulletsContainer = $('.page-bullets').last();
    
    if (pageBulletsContainer.length) {
      // create an array of all the page bullets
      const allPageBulletsArr = jQuery.makeArray($('> li', pageBulletsContainer));
      const totalPagesCount = parseInt($('.page-count').first().text().split(' ').splice(-1));
      const mobileControlsPageBulletsContainer = $('.mobile-browse-controls .page-bullets');
      const mobileControlsPageBulletsArr = jQuery.makeArray($('li', mobileControlsPageBulletsContainer));
      
      const getActivePageNum = function() {
        const perPage = parseInt($('.per-page').first().text());
        const s = parseInt($('.start-item-counter').first().text());
        const t = (s/perPage);
        const u = Math.ceil(t);
        return u;
      }

      const getTenPagesArr = function(arr, activePage, totalPages) {
        if (activePage <= 5) {
          return arr.filter((bullet, index) => index >= 0 && index <= 9);
        }
        
        if (activePage >= (totalPages - 5)) {
          return arr.filter((bullet, index) => index >= (totalPages - 10) && index < totalPages);
        }     
        
        const firstFiveBullets =  arr.filter((bullet, index) => index < activePage && index >= (activePage - 5));
        
        const lastFiveBullets = arr.filter((bullet, index) => index >= activePage && index <= (activePage + 4));

        // combine the first five and last five bullets into one array
        return [...firstFiveBullets, ...lastFiveBullets];
      }
      
      const appendPageBullets = function(pageBulletsContainer, pageBulletsArr){
        pageBulletsContainer.empty().append(...pageBulletsArr);
      }
      
      const activePageNum = getActivePageNum();
      const tenPagesArr = getTenPagesArr(allPageBulletsArr, activePageNum, totalPagesCount);
      const mobiletenPagesArr = getTenPagesArr(mobileControlsPageBulletsArr, activePageNum, totalPagesCount);

      appendPageBullets(pageBulletsContainer, tenPagesArr);
      appendPageBullets(mobileControlsPageBulletsContainer , mobiletenPagesArr);

    }
  });
})(jQuery);