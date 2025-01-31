/* eslint-disable max-len, no-underscore-dangle, no-console, no-control-regex*/

/*
 *    @file 01_masonryCardGrid.js
 *    @description  Adds the masonry library to card grid presentations.
 *    @usage  Add a .masonry-grid class to the card container. Only applies to desktop breakpoints by default
 *      adjust the masonryBreakpoint to breakpoint_mobile or breakpoint_tablet or 0 to change
 */

(function jQ($) {

    $(document).ready(function masonry() {
        let gridGapSize = 16; // should be value of rv($grid_gap_factor), in pixels

        let style = getComputedStyle(document.body);

        const masonryBreakpoint = breakpoint_desktop;

        // Grid gap size is set as a root variable in sass/40_ui/_browser_ui_definitions
        // It is used to ensure that masonry’s calculations work correctly

        if (typeof style.getPropertyValue('--grid-gap-size') !== 'undefined') {
            gridGapSize = parseInt(style.getPropertyValue('--grid-gap-size'));
        }

        const masonryContext = [
          ".masonry-grid"
        ];

        masonryContext.forEach(function masonryEach(selector) {

            let _this = $(selector);

            // Reroll masonry on resize. Works by toggling an attribute on the #collection-list element to trigger
            // the MutationObserver below, which then initializes / resets Masonry.
            // @todo: this should be debounced, but debounce functions aren't working as expected. Masonry may have its
            //   own resize flood control, or there may be some conflicts with the mututationObserver. Either way debounce
            //   functions didn't seem to be called.

            $(window).on("resize", function masonryResize() {
                if (_this.length > 0) {
                    let attr = _this.attr("resize");
                    if (typeof attr !== "undefined" && attr !== false) {
                        _this.removeAttr("resize");
                    } else {
                        _this.attr("resize", "");
                    }
                }
            });

            if (_this.length > 0) {

                function initCollectionBrowserGrid() {

                    if (_this.hasClass("grid") && window.outerWidth >= masonryBreakpoint) {
                        _this.imagesLoaded(function() {
                            _this.masonry({
                                "itemSelector": ".card",
                                "percentPosition": true,
                                "horizontalOrder": true,
                                "gutter": gridGapSize
                            });
                        });
                    }

                    if (_this.hasClass("list") || window.outerWidth < masonryBreakpoint) {

                        if (typeof _this.masonry === "function") {

                            // Note: masonry logs an error here but it's trapped and will not affect subsequent scripts
                            // @todo: figure out how to properly test to see if masonry is initialized

                            _this.masonry("destroy");

}

}

}

                initCollectionBrowserGrid();

                // The “grid” class is added via Javascript, so we need to watch for attribute changes to apply
                // masonry.

                let observer = new MutationObserver(initCollectionBrowserGrid);

                observer.observe(_this[0], {
                    "attributes": true
                });

}

});


    });

}(jQuery));
