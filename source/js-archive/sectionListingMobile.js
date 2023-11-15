
(function ($) {
    $(document).ready(function () {

        $('.mobile-page-list > .tab-ui > .active').click(function() {
            $('.mobile-page-control:not(:first-of-type)').toggle();
        });

        $('.mobile-page-list > .tab-ui > .mobile-page-control:first-of-type > .page-list-arrow').click(function () {
            $('.mobile-page-control:not(:first-of-type)').toggle();
        });

    });
})(jQuery);