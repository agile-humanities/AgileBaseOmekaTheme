/*!
 * agile-generic-theme v2.0.0-dev
 * Base Omeka theme and front-end development system.
 * (c) 2026 
 * MIT License
 * https://github.com/agile-humanities/AgileBaseOmekaTheme.git
 */

/**
 *  @file 00_omekaGeneral.js
 *
 *  Modifications to the PTD form elements
 *
 */



// Apply aspect ratio attributes to images in the following containers. Works with imageRatio.js in themesystem core.
const imageARScope = 'body > header, body > footer, main, #splash, #title';

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

// clears the search form on click of the "x" icon
(function($) {   
  $(document).ready(function(){
    
    function clearSearchForm(searchForm) {
      if (searchForm.length) {
        const clearSearchBtn = searchForm.siblings(".search-form-clear");
        const searchTextInput = searchForm.children("input[type='text']");
        
        clearSearchBtn.on('click', function() {
          searchTextInput.val("");
        });
      };
    };
    
    const welcomeSearchForm = $('#welcome-search #search-form');
    const navSearchForm = $('#nav-search #search-form');
    
    clearSearchForm(welcomeSearchForm);
    clearSearchForm(navSearchForm);

  });
})(jQuery);
/**
 *  @file extendTextUI.js
 *
 *  A mechanism to show and hide additional flowed text
 *
 */   
(function($) {   
  $(document).ready(function() {      
    $('.extended-text').each(function(){
      var bio = $(this).find('.body');
            
      if (bio.length > 0) {
        
        if(bio.children().length > 1) {
          
          
          var first = bio.children().first().clone();
                    
          bio.children().first().remove();
          bio.children().wrapAll('<div class="extended"></div>');
          bio.prepend(first);
          
          var extended = bio.find('.extended');
                    
        
          var expand = $("<a class='extend-ui expand'>Read more</a>");
          var collapse = $("<a class='extend-ui collapse'>Close</a>");
          
          expand.on('click tap',function(){
            extended.slideDown(window.animation.slideTransition);
            expand.fadeOut(window.animation.slideTransition,function(){
              collapse.fadeIn(window.animation.slideTransition).css('display','flex'); // defaults to display: inline ??
            });
          });
          
          collapse.on('click tap',function(){
            extended.slideUp(window.animation.slideTransition);
            collapse.fadeOut(window.animation.slideTransition,function() {
              expand.fadeIn(window.animation.slideTransition);
            });
          });
          
         extended
            .after(expand)
            .after(collapse);
          
        }
      }
      
    });
  });
})(jQuery);

/**
 *  @file formElements.js
 *
 *  Select2 for the theme's own selects, by opt-in: any <select class="agile-select"> (the theme's sort selector,
 *  the item page's linked-resources filter …) that is not also .no-select2 or .chosen-select. Advanced Search
 *  manages its own selects (search-support.js for the Agile search page; Chosen, via the module's script, for the
 *  stock forms and the core advanced search partials that carry .chosen-select). Until the form refactor
 *  (2026-10-08) this applied Select2 to every select on every page, which double-wrapped the Chosen ones.
 *
 */

(function($) {

    $(document).ready(function() {
        $('select.agile-select').not('.no-select2, .chosen-select').each(function() {
          const select = $(this);
          if (select.data('select2')) { return; }
          // 100%, never a pixel width measured at init: the container follows its cell when the window is
          // resized or the phone rotated (the form composition library sets fit cells' widths in CSS).
          select.select2({
            width: '100%',
            minimumResultsForSearch: 40
          });
        });
    });

})(jQuery);

(function ($) {
    $(document).ready(function () {
	    var body = $('body');
	    
	    if ($('#user-bar').length > 0) {
		    body.addClass('has-admin-bar');
	    }
	    
	    if ($('#homepage-splash').length === 0) {
		    body.addClass('has-top-nav');
	    }
    });
    
})(jQuery);




/**
 *  @file menuSuperfish.js
 *
 *  Applies the Superfish menu library to Omeka’s main navigation.
 *  The superfish library is added via npm and its supporting js/css rolled into the asset folder via gulp build.
 *
 */

(function($) {
  $(document).ready(function() {

    // Use superfish for desktop only

    const mainMenu = $('#main-nav > ul');
    mainMenu.addClass('sf-menu');  // Adds default superfish styles

    if (mainMenu.length > 0) {
      mainMenu.superfish({});
    }

  });

})(jQuery);

(function($) {
  $(document).ready(function() {
    
    var mobileNavIcon = $('#mobile-menu--button, #mobile-menu--close');
    var mobileMenu = $('#mobile-menu--container');
 
    mobileNavIcon.on('click', function () {
    mobileMenu.slideToggle("fast");
  });

  });
  
})(jQuery);




/**
 *  @file omekaAgileMediaDownloadSupport.js
 *
 *  Moves download buttons in the Media Item resource block to the Item header.
 *  See AgileThemeTools/src/Media/FileRenderer/TextRenderer render() for backend.
 */

(function($) {
  $(document).ready(function() {
    if ($('.item-viewer .download-media').length > 0 && $('.item-info .download').length > 0) {
      $('.item-viewer .download-media').each(function() {
        $(this).appendTo($('.item-info .download'));
      });
    }
  })})(jQuery);


(function($) {
  $(document).ready(function() {

    const wrappingClasses = ['full-width','inset','inset-text','wide','extra-wide','section-list-cards'];

    $('#content-stack > * > *').each(function() {
      const _this = $(this);
      const children = _this.find('> *');

      children.each(function(){
        const child = $(this);
        wrappingClasses.map(function(className) {
          if (child.hasClass(className)) {
            _this.addClass(className);
          }
        });
      })

    });

  });
})(jQuery);

(function($) {
  $(document).ready(function() {

    const panelNames = ['description', 'metadata', 'transcription'];
    const panelMinHeight = 400;

    // Each tab container is handled on its own, so its tabs only switch its own panels.

    $('.container-with-tabs-and-panels').each(function() {

      const container = $(this);
      const tabs = container.find('a.tab-ui--control');
      const panels = {};

      const present = [];
      panelNames.forEach(function(name) {
        panels[name] = container.find('.' + name + '-panel');
        if (panels[name].length) {
          present.push(name);
        }
      });

      // A single panel (the Summary alone) has no tab bar and nothing to switch.
      if (present.length < 2) {
        return;
      }

      function showPanel(name) {
        present.forEach(function(panelName) {
          panels[panelName].toggle(panelName === name);
        });
        tabs.each(function() {
          $(this).toggleClass('active', $(this).hasClass(name + '-tab'));
        });
      }

      showPanel('description');

      tabs.on('click', function(e) {
        e.preventDefault();
        const tab = $(this);
        const name = panelNames.find(function(panelName) {
          return tab.hasClass(panelName + '-tab');
        });
        if (name) {
          showPanel(name);
        }
      });

      // Legacy Item Header only: hold the panels to the viewer's height and scroll them.
      // The Item Summary block lets its panels size to their content.

      const itemInfo = container.closest('.item-info');

      if (itemInfo.length === 0) {
        return;
      }

      const itemViewer = $('.item-viewer');
      const descriptionPanel = panels.description;
      const metadataPanel = panels.metadata;

      function setPanelHeight() {
        if ($(window).width() < breakpoint_desktop) {
          descriptionPanel.css('height','auto');
          metadataPanel.css('height','auto');
          descriptionPanel.css('overflow-y', 'auto');
          metadataPanel.css('overflow-y', 'auto');
        } else {
          let panelOffset =  descriptionPanel.offset().top - itemInfo.offset().top - 20; // offset needs fudge factor – margin issues?
          let panelBaseHeight = itemViewer.length > 0 && itemViewer.height() > panelMinHeight ? itemViewer.height() : (descriptionPanel.height() > panelMinHeight ? descriptionPanel.height() : panelMinHeight);
          let panelHeight = panelBaseHeight - panelOffset;
          descriptionPanel.height(panelHeight);
          metadataPanel.height(panelHeight);
          descriptionPanel.css('overflow-y', 'scroll');
          metadataPanel.css('overflow-y', 'scroll');
        }
      }

      setPanelHeight();

      $(window).resize($.debounce(100,setPanelHeight));
    });
  });

})(jQuery);

/**
 *  @file ctcMiradorAriaSupport.js
 *
 *  Adds an aria-describedby label to Mirador viewer that points to descriptive text.
 */

(function($) {
  $(document).ready(function() {
    $('#mirador-1').attr('aria-describedby','viewer-description');
  })})(jQuery);

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

            // Indicates where the gaps in the paginator are by comparing values in (sorted) visibleMarkers
            // with the previous one. A value difference of more than 1 indicates a gap.

            const gaps = visibleMarkers.map((a,i) => {
                const prev = i - 1 > -1 ? visibleMarkers[i-1] : null;
                return prev !== null &&  a - prev !== 1 ? a - 1 : null;
            }).filter((a) => a !== null);

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

/**
 *  @file s14FormValidation.js
 *  @library stop14 — written here to graduate with the form composition system (sass/40_ui/10_components/_form_composition).
 *  @description Element-level validation for composed forms (form.s14-form) on the browser's constraint API:
 *    on submit, every invalid control's cell gets .field-has-error, its message in the cell's messages track
 *    (.field-messages), and a summary (.form-messages, role="alert") above the form lists the invalid fields with
 *    links to their cells; the first invalid control takes focus. A cell clears as its control becomes valid again.
 *    Forms that set novalidate="novalidate" and opt in with data-s14-validate get the same without the browser's
 *    own bubbles. Server-side messages (AgileThemeTools View\Helper\FormLayout) use the same classes.
 */
(function () {
  'use strict';

  function cellOf(control) {
    return control.closest('.field, .form-field');
  }

  function labelOf(control, cell) {
    var label = cell && (cell.querySelector('.field-label') || cell.querySelector('legend'));
    return label ? label.textContent.trim() : (control.getAttribute('aria-label') || control.name || control.id || '');
  }

  function messagesOf(cell) {
    var list = cell.querySelector(':scope > .field-messages');
    if (!list) {
      list = document.createElement('ul');
      list.className = 'messages field-messages';
      cell.appendChild(list);
    }
    return list;
  }

  function clearCell(cell) {
    if (!cell) return;
    cell.classList.remove('field-has-error');
    var list = cell.querySelector(':scope > .field-messages[data-client]');
    if (list) list.remove();
    cell.querySelectorAll('[aria-invalid="true"]').forEach(function (c) { c.removeAttribute('aria-invalid'); });
  }

  function markCell(control, cell, message) {
    cell.classList.add('field-has-error');
    control.setAttribute('aria-invalid', 'true');
    var list = messagesOf(cell);
    list.setAttribute('data-client', '1');
    list.innerHTML = '';
    var item = document.createElement('li');
    item.textContent = message;
    list.appendChild(item);
    if (!cell.id) cell.id = (control.id || control.name || 'field').replace(/[^A-Za-z0-9_-]+/g, '-') + '_field';
  }

  function summary(form, entries) {
    var box = form.querySelector(':scope > .form-messages[data-client]');
    if (!entries.length) {
      if (box) box.remove();
      return;
    }
    if (!box) {
      box = document.createElement('div');
      box.className = 'form-messages';
      box.setAttribute('role', 'alert');
      box.setAttribute('data-client', '1');
      form.insertBefore(box, form.firstChild);
    }
    var title = form.getAttribute('data-s14-validate-title') || 'Please check the form';
    box.innerHTML = '';
    var heading = document.createElement('p');
    heading.className = 'form-messages-title';
    heading.textContent = title;
    box.appendChild(heading);
    var list = document.createElement('ul');
    entries.forEach(function (e) {
      var item = document.createElement('li');
      var link = document.createElement('a');
      link.href = '#' + e.cell.id;
      link.textContent = e.label;
      link.addEventListener('click', function (ev) { ev.preventDefault(); e.control.focus(); e.cell.scrollIntoView({block: 'center'}); });
      item.appendChild(link);
      item.appendChild(document.createTextNode(': ' + e.message));
      list.appendChild(item);
    });
    box.appendChild(list);
  }

  function validate(form) {
    var entries = [];
    var controls = form.querySelectorAll('input, select, textarea');
    controls.forEach(function (control) {
      if (control.type === 'hidden' || control.disabled || !control.willValidate) return;
      var cell = cellOf(control);
      if (control.checkValidity()) {
        clearCell(cell);
        return;
      }
      if (!cell) return;
      var message = control.validationMessage || 'Please check this value';
      markCell(control, cell, message);
      if (!entries.some(function (e) { return e.cell === cell; })) {
        entries.push({control: control, cell: cell, label: labelOf(control, cell), message: message});
      }
    });
    summary(form, entries);
    return entries;
  }

  // A form that opts in (data-s14-validate) takes over from the browser's bubbles: novalidate from the start, since
  // the browser checks the form before any submit event fires.
  function adopt(root) {
    (root || document).querySelectorAll('form.s14-form[data-s14-validate]').forEach(function (form) {
      form.setAttribute('novalidate', 'novalidate');
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { adopt(); });
  } else {
    adopt();
  }

  document.addEventListener('submit', function (event) {
    var form = event.target;
    if (!(form instanceof HTMLFormElement) || !form.classList.contains('s14-form')) return;
    var entries = validate(form);
    if (entries.length) {
      event.preventDefault();
      entries[0].control.focus();
    }
  }, true);

  // A form that keeps the browser's own validation still gets its cells marked: the browser fires "invalid" on
  // each failing control before it shows its bubble.
  document.addEventListener('invalid', function (event) {
    var control = event.target;
    var form = control.form;
    if (!form || !form.classList || !form.classList.contains('s14-form') || form.hasAttribute('novalidate')) return;
    var cell = cellOf(control);
    if (cell) markCell(control, cell, control.validationMessage || 'Please check this value');
  }, true);

  // A control that becomes valid clears its own cell; the summary is rebuilt on the next submit.
  document.addEventListener('input', function (event) {
    var control = event.target;
    var form = control.form;
    if (!form || !form.classList || !form.classList.contains('s14-form')) return;
    if (control.checkValidity && control.checkValidity()) clearCell(cellOf(control));
  }, true);
})();

// add the "has-three-cards" class in the featured exhibits block
// when there are three attachments
(function($) {
  $(document).ready(function(){
    const featuredExhibitsBlock = $('.site-link-cards');

    if (featuredExhibitsBlock.length) {
      featuredExhibitsBlock.each(function() {
        const NUMBER_OF_ATTACHMENTS = 3;
        const cards = $(this).children('.link-card');

        if (cards.length === NUMBER_OF_ATTACHMENTS) {
          $(this).addClass('has-three-cards');
        }
      });
    }

    const scrollDownBtn = $('.scroll-down-btn');

    scrollDownBtn.on('click', function() {
      $('html, body').animate({
        scrollTop: featuredExhibitsBlock.offset().top
      });
    });


  });
})(jQuery);

// Adds "slide-full-screen" class to the slideshow on click of the full screen button
(function($) {  
  $(document).ready(function() {
    const slideshow = $('.slideshow');
    
    if (slideshow.length) {
      // function that takes the browser specific full screen event 
      // and document property to access the element in full screen mode
      function changeSlideToFullScreen(fullScreenEvent, fullScreenElementProperty) {
        $(document).on(fullScreenEvent, function(){
          const slickTrack = $('.slick-track');
          
          if (document[fullScreenElementProperty]) {
            const slideshowIsFullscreen = document[fullScreenElementProperty].classList.contains('slideshow');
            
            if (slideshowIsFullscreen) {
              slideshow.slick('reinit');
              slickTrack.addClass('slide-fullscreen');
            };
          };
          
          if (!document[fullScreenElementProperty]) {
            slickTrack.removeClass('slide-fullscreen');
            slideshow.slick('reinit');
          };
        });
      };

      changeSlideToFullScreen('fullscreenchange', 'fullscreenElement');
      // for safari fullscreen
      changeSlideToFullScreen('webkitfullscreenchange', 'webkitFullscreenElement');
   
    };

  });  
})(jQuery);

// handles replacing standard html select box 
(function($) {    
  $(document).ready(function() {
    var mobile = true;
    var toggle = true;
    var $marginLefty = $("#contact")

    $('#splash-contact-btn').click(function(){ 
      var win = window.innerWidth; 
      if (win <= 767) {       
          mobile = true;
          setContact();
      }
      if (win >= 768) {       
          mobile = false; 
          setContact();
      }
    });
function setContact() {
  if (mobile === true){
    $marginLefty.css("margin-left", "unset");
    $marginLefty.css("width", "100%");
    $("#contact").animate({height:'toggle'},350);
    $("#splash-contact-btn").css("opacity", "0.3");
    toggle = toggle === true ? false : true;
  }
  else {
    $("#contact").css("display", "block");
    $("body").css("overflow-x", toggle === true ? "hidden" : "unset");
    $marginLefty.animate({ marginLeft: parseInt($marginLefty.css('marginLeft'),10) == 0 ? $marginLefty.outerWidth() : 0 }).promise()
    .done(function(){hideSplashContact()});
    $("#splash-contact-btn").css("opacity", toggle === true ? "0.3" : "1");
    $("#welcome-block").css("background-position",  parseInt($marginLefty.css('height'),10) == 0 ?  " -9999px" : "right bottom" );
    $("#welcome-block").css("background-position",  parseInt($marginLefty.css('marginLeft'),10) == 0 ?  "right bottom" : "-9999px" );
    toggle = toggle === true ? false : true;
  }
}
      var win = window.innerWidth;
      if (win <= 767) {       
          mobile = true;
          $marginLefty.css("margin-left", "unset");
          $marginLefty.css("width", "100%");
      }
      if (win>= 768) {       
          mobile = false;  
          $marginLefty.css({ marginLeft: parseInt($marginLefty.css('marginLeft'),10) == 0 ? $marginLefty.outerWidth() : 0 });
      }

    $('#contact .close_btn').click(function(){ 
      var win = window.innerWidth;
      if (win <= 767) {       
          mobile = true;
               }
      if (win >= 768) {       
          mobile = false;    
      }
      if (mobile === true){
        $("#contact").animate({height:'toggle'},350);
      }
      else {
        $marginLefty.animate({ marginLeft: parseInt($marginLefty.css('marginLeft'),10) == 0 ? $marginLefty.outerWidth() : 0 }).promise();
      }
      toggle = toggle === true ? false : true;
      $("#splash-contact-btn").css("opacity", "1");
    });

    function hideSplashContact(){
      $("#contact").css("display", parseInt($marginLefty.css('marginLeft'),10) == 0  ? "block" : "none");
    }
  });  
})(jQuery);