// displays panel based on li click


(function ($) {
    $(document).ready(function () {

        // $('.tab-panel').not(':first').hide();
        // $('.tab-control > span').not(':first').addClass('inactive-span');

        // $('.tab-control').click(function() {
        //     let i = 1
        //     let x = ($('.tab-control').index(this));
        //     let t = (i + x)

        //     $('.tab-panel').hide();
        //     $('.tab-panel:nth-of-type(' + t + ')').show();

        //     $('.tab-control > a').removeClass('active');
        //     $('.tab-control:nth-of-type(' + t + ') > a').addClass('active');

        //     $('.tab-control > span').addClass('inactive-span');
        //     $('.tab-control:nth-of-type(' + t + ') > span').removeClass('inactive-span');
        // })

        // for browse page panels:
        $('.list-view-panel').hide();
        $('.list-view-tab-control > span').addClass('inactive-span');

        $('.browse-page-tab-control').click(function () {
            let i = 1
            let x = ($('.tab-control').index(this));
            let t = (i + x)

            $('.tab-panel').hide();
            $('.tab-panel:nth-of-type(' + t + ')').show();

            $('.browse-page-tab-control > a').removeClass('active');
            $('.browse-page-tab-control:nth-of-type(' + t + ') > a').addClass('active');

            $('.browse-page-tab-control > span').addClass('inactive-span');
            $('.browse-page-tab-control:nth-of-type(' + t + ') > span').removeClass('inactive-span');
        })

        $('.browse-page-tab-control').keypress(function () {
            let i = 1
            let x = ($('.tab-control').index(this));
            let t = (i + x)

            $('.tab-panel').hide();
            $('.tab-panel:nth-of-type(' + t + ')').show();

            $('.browse-page-tab-control > a').removeClass('active');
            $('.browse-page-tab-control:nth-of-type(' + t + ') > a').addClass('active');

            $('.browse-page-tab-control > span').addClass('inactive-span');
            $('.browse-page-tab-control:nth-of-type(' + t + ') > span').removeClass('inactive-span');
        })

        // for individual item pages
        $('.summary-panel').show();
        $('.full-metadata-panel').hide();
        $('.related-items-panel').hide();
        $('.item-page-tab-control > span').not(':first').addClass('inactive-span');

        $('.item-page-tab-control').click(function() {
            let i = 1
            let x = ($('.tab-control').index(this));
            let t = (i + x)

            $('.tab-panel').hide();
            $('.tab-panel:nth-of-type(' + t + ')').show();

            $('.item-page-tab-control > a').removeClass('active');
            $('.item-page-tab-control:nth-of-type(' + t + ') > a').addClass('active');

            $('.item-page-tab-control > span').addClass('inactive-span');
            $('.item-page-tab-control:nth-of-type(' + t + ') > span').removeClass('inactive-span');
        })

        $('.item-page-tab-control').keypress(function () {
            let i = 1
            let x = ($('.tab-control').index(this));
            let t = (i + x)

            $('.tab-panel').hide();
            $('.tab-panel:nth-of-type(' + t + ')').show();

            $('.item-page-tab-control > a').removeClass('active');
            $('.item-page-tab-control:nth-of-type(' + t + ') > a').addClass('active');

            $('.item-page-tab-control > span').addClass('inactive-span');
            $('.item-page-tab-control:nth-of-type(' + t + ') > span').removeClass('inactive-span');
        })

        // for discover page panels:
        $('.discover-search-item-view > span').addClass('inactive-span');

        $('.discover-page-tab-control').click(function () {
            let i = 1
            let x = ($('.tab-control').index(this));
            let t = (i + x)

            $('.tab-panel').hide();
            $('.tab-panel:nth-of-type(' + t + ')').show();

            $('.discover-page-tab-control > a').removeClass('active');
            $('.discover-page-tab-control:nth-of-type(' + t + ') > a').addClass('active');

            $('.discover-page-tab-control > span').addClass('inactive-span');
            $('.discover-page-tab-control:nth-of-type(' + t + ') > span').removeClass('inactive-span');
        })

        $('.discover-page-tab-control').keypress(function () {
            let i = 1
            let x = ($('.tab-control').index(this));
            let t = (i + x)

            $('.tab-panel').hide();
            $('.tab-panel:nth-of-type(' + t + ')').show();

            $('.discover-page-tab-control > a').removeClass('active');
            $('.discover-page-tab-control:nth-of-type(' + t + ') > a').addClass('active');

            $('.discover-page-tab-control > span').addClass('inactive-span');
            $('.discover-page-tab-control:nth-of-type(' + t + ') > span').removeClass('inactive-span');
        })

        // for item with metadata panels:
        $('.information-panel').hide();
        $('.information-panel-tab-control > span').addClass('inactive-span');

        $('.description-panel-tab-control').click(function () {
            $('.information-panel').hide();
            $('.description-panel').show();
            $('.information-panel-tab-control > span').addClass('inactive-span');
            $('.description-panel-tab-control > span').removeClass('inactive-span');
            $('.description-panel-tab-control > a').addClass('active');
            $('.information-panel-tab-control > a').removeClass('active');
        });

        $('.description-panel-tab-control').keypress(function () {
            $('.information-panel').hide();
            $('.description-panel').show();
            $('.information-panel-tab-control > span').addClass('inactive-span');
            $('.description-panel-tab-control > span').removeClass('inactive-span');
            $('.description-panel-tab-control > a').addClass('active');
            $('.information-panel-tab-control > a').removeClass('active');
        });

        $('.information-panel-tab-control').click(function () {
            $('.information-panel').show();
            $('.description-panel').hide();
            $('.information-panel-tab-control > span').removeClass('inactive-span');
            $('.description-panel-tab-control > span').addClass('inactive-span');
            $('.description-panel-tab-control > a').removeClass('active');
            $('.information-panel-tab-control > a').addClass('active');
        });

        $('.information-panel-tab-control').keypress(function () {
            $('.information-panel').show();
            $('.description-panel').hide();
            $('.information-panel-tab-control > span').removeClass('inactive-span');
            $('.description-panel-tab-control > span').addClass('inactive-span');
            $('.description-panel-tab-control > a').removeClass('active');
            $('.information-panel-tab-control > a').addClass('active');
        });
    });
})(jQuery);