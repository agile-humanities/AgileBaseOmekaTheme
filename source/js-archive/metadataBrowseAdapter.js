// the following is used to adapt Metadata Browse urls to lead to the Discover page

(function ($) {
    $(document).ready(function () {
    
    // only run if siteSearchPage var is present
    if (siteSearchPage !== "undefined") {

        // for each occurence of Metadata Browse link...
        $('.metadata-browse-direct-link').each(function() {
            
            $(this).attr('href', function(i, href) {

                // get end value original of URL, to be used in new URL
                var lastIndex = href.lastIndexOf('=');
                var subject = href.substr(lastIndex);
                
                // reroute to Discover page and attach end of original URL
                var newUrl = (siteSearchPage + '?limit[dcterms_subject_ss][0]' + subject);
                
                // replace original URL with new URL
                $(this).attr('href', newUrl)
            })
        })
    } 

    });
})(jQuery);