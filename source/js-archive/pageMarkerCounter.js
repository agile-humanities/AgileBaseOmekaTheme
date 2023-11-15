(function ($) {
  $(document).ready(function () {

      const perPage = $('.per-page').first().text();
      
      // change color of bullet representing current page 
      const s = $('.start-item-counter').first().text();
      const t = (s/perPage);
      const u = Math.ceil(t);
      $('.page-bullets > li > a').removeClass('active');

      const activePage = $('.page-bullets').find(`> li > a[data-pageNumber='${u}']`);
      const activePageNumber = activePage.next('.page-number').last();
      activePage.addClass('active');
      activePageNumber.addClass('active');

  });
})(jQuery);