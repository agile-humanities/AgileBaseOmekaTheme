(function ($) {
    $(document).ready(function () {
        const markers = $('.pagination--bullets');

        if (markers.length > 0) {

            // Data from hidden Omeka paginator fields

            const perPage = parseInt($('.per-page').first().text());
            const totalItems = parseInt($('.number-of-items').first().text());
            const endItemCounter = parseInt($('.end-item-counter').first().text());
            const pageCount = parseInt($('.pagination--count').first().text());
            const activePage = parseInt(markers.find('a.active').attr('data-pagenumber'));

            // An array that lists the markers that should be visible. Shows the first two pages, the last two pagesm
            // and one page around active pages.

            const visibleMarkers = [...new Set([1, 2, activePage, activePage - 1, activePage + 1, pageCount, pageCount - 1])].sort((a,b) => a-b);

            console.log(parseInt(markers.find('a.active').attr('data-pagenumber')));
            console.log(visibleMarkers);

            // Indicates where the gaps in the paginator are by comparing values in (sorted) visibleMarkers
            // with the previous one. A value difference of more than 1 indicates a gap.

            const gaps = visibleMarkers.map((a,i) => {
                const prev = i - 1 > -1 ? visibleMarkers[i-1] : null;
                return prev !== null &&  a - prev !== 1 ? a - 1 : null;
            }).filter((a) => a !== null);

            console.log(gaps);

            markers.find('li').each(function () {
                const item = $(this);
                const marker = item.find('> a');
                const page = parseInt(marker.attr('data-pagenumber'));
                if (gaps.includes(page)) {
                    item.after("<li class='pagination--gap'>...</li>");
                }

                item.hide();

                if (visibleMarkers.includes(page)) {
                    item.show();
                }

            });
        }

        // change color of diamond marker representing current page
        // var s = $('.start-item-counter').first().text();
        //var t = (s/perPage);
        //var u = Math.ceil(t);
        //$('.bullet-pages > li > a').removeClass('active');
        //$('.bullet-pages').find('> li:nth-of-type(' + u.toString() + ') > a').addClass('active');

    });
})(jQuery);
