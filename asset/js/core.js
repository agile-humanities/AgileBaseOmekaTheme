/*!
 * agile-generic-theme v1.0.0
 * Base Omeka theme and front-end development system.
 * (c) 2025 Theme author * MIT License
 * https://github.com/stop14/stop14-themesystem-legacy] */

// _default.js must be loaded first
// All other JS files are concatenated afterwards by Gulp

var heartbeat = 300;

// Sets constants for all theme js files.

var themepath = "/path/to/theme";
var assetpath = themepath + "/assets";
var imagepath = assetpath + "/img";

(function($) {  
  
  $(document).ready(function() {
  
        
  });  
})(jQuery);

(function($) {    
  $(document).ready(function() {
    var style = getComputedStyle(document.body);
        
    window.animation = {};    
    window.animation.heartbeat = style.getPropertyValue('--animation--heartbeat');
    window.animation.slideTransition = style.getPropertyValue('--animation--slidetransition');
    
  });  
})(jQuery);
/**
 * Global Breakpoints
 * Sets global values for breakpoints based on CSS root variables provided by the layout_css_variables SASS component. Must come early in the load order.
 */

var breakpoint_xsml, breakpoint_sml, breakpoint_med, breakpoint_lrg, breakpoint_xlrg, breakpoint_xxlrg, breakpoint_stack, breakpoint_tablet, breakpoint_desktop, breakpoint_ultrawide;

(function($) {    
  $(document).ready(function() {
    var style = getComputedStyle(document.body);
    breakpoint_xsml = style.getPropertyValue('--breakpoint-xsml')
    breakpoint_sml = style.getPropertyValue('--breakpoint-sml')
    breakpoint_med = style.getPropertyValue('--breakpoint-med')
    breakpoint_lrg = style.getPropertyValue('--breakpoint-lrg')
    breakpoint_xlrg = style.getPropertyValue('--breakpoint-xlrg')
    breakpoint_xxlrg = style.getPropertyValue('--breakpoint-xxlrg')
    breakpoint_stack = style.getPropertyValue('--breakpoint-stack')
    breakpoint_tablet = style.getPropertyValue('--breakpoint-tablet')
    breakpoint_desktop = style.getPropertyValue('--breakpoint-desktop')
    breakpoint_ultrawide = style.getPropertyValue('--breakpoint-ultrawide')
  });  
})(jQuery);

/**
 * globalPalette.js
 * Sets global values for colours based on CSS root variables provided by 20_colour SASS component. Must come early in the load order.
 */

(function($) {    
  $(document).ready(function() {
    var style = getComputedStyle(document.body);
        
    window.colours = {};
    window.colours.colour = {};
    window.colours.map = {};
    window.colours.neutrals = {};
    
    var colourGridKeys = ['shade','primary','tint','fade','watermark'];

    for(var i=1; i<10; i++) {
      var neutralKey = i * 10;
      window.colours.colour[i] = style.getPropertyValue('--colour--' + i);
            
      window.colours.neutrals[neutralKey] = style.getPropertyValue('--colour--neutral--' + neutralKey);
      
      window.colours.map[i] = {};
      
      colourGridKeys.forEach(function(key){
        window.colours.map[i][key] = style.getPropertyValue('--colour--' + i + '--' + key);
      });
    }
        
    window.colours.black = style.getPropertyValue('--colour--black');
    window.colours.white = style.getPropertyValue('--colour--white');    
    window.colours.impact = style.getPropertyValue('--colour--impact');    
    window.colours.cta = style.getPropertyValue('--colour--cta'); 
    
    // console.log(window.colours);   
    
  });  
})(jQuery);

/**
 *  @file processAttributes.js
 *  @description Remove all attributes from an element.
 *  With thanks to https://stackoverflow.com/questions/1870441/remove-all-attributes
 */


jQuery.fn.removeAttributes = function() {
  return this.each(function() {
    var attributes = $.map(this.attributes, function(item) {
      return item.name;
    });
    var e = $(this);
    $.each(attributes, function(i, item) {
      e.removeAttr(item);
    });
  });
}

jQuery.fn.stashAttributes = function(prefix) {
  
  prefix = prefix != null ? prefix : 'stash';
  
  return this.each(function() {
    var attributes = $.map(this.attributes, function(item) {
      return item.name;
    });
    var e = $(this);
    $.each(attributes, function(i, item) {
      var stash = e.attr(item);
      e.removeAttr(item);
      e.attr('data-' + prefix + '-' + item,stash);
    });
  });
}
/**
 * Visibility Classes
 * Uses the in-view.js library ( https://www.npmjs.com/package/in-view ) add visibility
 * classes to DOM objects.
 */

jQuery(document).ready(function() {

  const style = getComputedStyle(document.body);
  const propcount = style.getPropertyValue('--visibility-propcount'); // Lets JS know how many properties to expect.
  const reverse = style.getPropertyValue('--visibility-reverse') == 'true' ? true : false;


  if (typeof propcount != 'undefined' && parseInt(propcount) > 0) {
    var visibilityStack = [];

    const visibilityOffset = style.getPropertyValue('--visibility-offset');
    const visibilityThreshold = style.getPropertyValue('--visibility-threshold');

    inView.threshold(visibilityThreshold);
    inView.offset(visibilityOffset);

    for(var i=1;i<=parseInt(propcount);i++) {
      visibilityStack.push(style.getPropertyValue("--visibility-element-" + i));
    }


    jQuery(visibilityStack).each(function(i,selector){
      if(jQuery(selector).length > 0) {

        inView(selector)
          .on('enter', elem => {
            jQuery(elem).addClass('visible');
          })
          .on('exit',elem => {
            if (reverse === true) {
              jQuery(elem).removeClass('visible');
            }
          });
      }
    });
  }
});

/*!
 * jQuery throttle / debounce - v1.1 - 3/7/2010
 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

// Script: jQuery throttle / debounce: Sometimes, less is more!
//
// *Version: 1.1, Last updated: 3/7/2010*
// 
// Project Home - http://benalman.com/projects/jquery-throttle-debounce-plugin/
// GitHub       - http://github.com/cowboy/jquery-throttle-debounce/
// Source       - http://github.com/cowboy/jquery-throttle-debounce/raw/master/jquery.ba-throttle-debounce.js
// (Minified)   - http://github.com/cowboy/jquery-throttle-debounce/raw/master/jquery.ba-throttle-debounce.min.js (0.7kb)
// 
// About: License
// 
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
// 
// About: Examples
// 
// These working examples, complete with fully commented code, illustrate a few
// ways in which this plugin can be used.
// 
// Throttle - http://benalman.com/code/projects/jquery-throttle-debounce/examples/throttle/
// Debounce - http://benalman.com/code/projects/jquery-throttle-debounce/examples/debounce/
// 
// About: Support and Testing
// 
// Information about what version or versions of jQuery this plugin has been
// tested with, what browsers it has been tested in, and where the unit tests
// reside (so you can test it yourself).
// 
// jQuery Versions - none, 1.3.2, 1.4.2
// Browsers Tested - Internet Explorer 6-8, Firefox 2-3.6, Safari 3-4, Chrome 4-5, Opera 9.6-10.1.
// Unit Tests      - http://benalman.com/code/projects/jquery-throttle-debounce/unit/
// 
// About: Release History
// 
// 1.1 - (3/7/2010) Fixed a bug in <jQuery.throttle> where trailing callbacks
//       executed later than they should. Reworked a fair amount of internal
//       logic as well.
// 1.0 - (3/6/2010) Initial release as a stand-alone project. Migrated over
//       from jquery-misc repo v0.4 to jquery-throttle repo v1.0, added the
//       no_trailing throttle parameter and debounce functionality.
// 
// Topic: Note for non-jQuery users
// 
// jQuery isn't actually required for this plugin, because nothing internal
// uses any jQuery methods or properties. jQuery is just used as a namespace
// under which these methods can exist.
// 
// Since jQuery isn't actually required for this plugin, if jQuery doesn't exist
// when this plugin is loaded, the method described below will be created in
// the `Cowboy` namespace. Usage will be exactly the same, but instead of
// $.method() or jQuery.method(), you'll need to use Cowboy.method().

(function(window,undefined){
  '$:nomunge'; // Used by YUI compressor.
  
  // Since jQuery really isn't required for this plugin, use `jQuery` as the
  // namespace only if it already exists, otherwise use the `Cowboy` namespace,
  // creating it if necessary.
  var $ = jQuery || window.jQuery || window.Cowboy || ( window.Cowboy = {} ),
    
    // Internal method reference.
    jq_throttle;
  
  // Method: jQuery.throttle
  // 
  // Throttle execution of a function. Especially useful for rate limiting
  // execution of handlers on events like resize and scroll. If you want to
  // rate-limit execution of a function to a single time, see the
  // <jQuery.debounce> method.
  // 
  // In this visualization, | is a throttled-function call and X is the actual
  // callback execution:
  // 
  // > Throttled with `no_trailing` specified as false or unspecified:
  // > ||||||||||||||||||||||||| (pause) |||||||||||||||||||||||||
  // > X    X    X    X    X    X        X    X    X    X    X    X
  // > 
  // > Throttled with `no_trailing` specified as true:
  // > ||||||||||||||||||||||||| (pause) |||||||||||||||||||||||||
  // > X    X    X    X    X             X    X    X    X    X
  // 
  // Usage:
  // 
  // > var throttled = jQuery.throttle( delay, [ no_trailing, ] callback );
  // > 
  // > jQuery('selector').bind( 'someevent', throttled );
  // > jQuery('selector').unbind( 'someevent', throttled );
  // 
  // This also works in jQuery 1.4+:
  // 
  // > jQuery('selector').bind( 'someevent', jQuery.throttle( delay, [ no_trailing, ] callback ) );
  // > jQuery('selector').unbind( 'someevent', callback );
  // 
  // Arguments:
  // 
  //  delay - (Number) A zero-or-greater delay in milliseconds. For event
  //    callbacks, values around 100 or 250 (or even higher) are most useful.
  //  no_trailing - (Boolean) Optional, defaults to false. If no_trailing is
  //    true, callback will only execute every `delay` milliseconds while the
  //    throttled-function is being called. If no_trailing is false or
  //    unspecified, callback will be executed one final time after the last
  //    throttled-function call. (After the throttled-function has not been
  //    called for `delay` milliseconds, the internal counter is reset)
  //  callback - (Function) A function to be executed after delay milliseconds.
  //    The `this` context and all arguments are passed through, as-is, to
  //    `callback` when the throttled-function is executed.
  // 
  // Returns:
  // 
  //  (Function) A new, throttled, function.
  
  $.throttle = jq_throttle = function( delay, no_trailing, callback, debounce_mode ) {
    // After wrapper has stopped being called, this timeout ensures that
    // `callback` is executed at the proper times in `throttle` and `end`
    // debounce modes.
    var timeout_id,
      
      // Keep track of the last time `callback` was executed.
      last_exec = 0;
    
    // `no_trailing` defaults to falsy.
    if ( typeof no_trailing !== 'boolean' ) {
      debounce_mode = callback;
      callback = no_trailing;
      no_trailing = undefined;
    }
    
    // The `wrapper` function encapsulates all of the throttling / debouncing
    // functionality and when executed will limit the rate at which `callback`
    // is executed.
    function wrapper() {
      var that = this,
        elapsed = +new Date() - last_exec,
        args = arguments;
      
      // Execute `callback` and update the `last_exec` timestamp.
      function exec() {
        last_exec = +new Date();
        callback.apply( that, args );
      };
      
      // If `debounce_mode` is true (at_begin) this is used to clear the flag
      // to allow future `callback` executions.
      function clear() {
        timeout_id = undefined;
      };
      
      if ( debounce_mode && !timeout_id ) {
        // Since `wrapper` is being called for the first time and
        // `debounce_mode` is true (at_begin), execute `callback`.
        exec();
      }
      
      // Clear any existing timeout.
      timeout_id && clearTimeout( timeout_id );
      
      if ( debounce_mode === undefined && elapsed > delay ) {
        // In throttle mode, if `delay` time has been exceeded, execute
        // `callback`.
        exec();
        
      } else if ( no_trailing !== true ) {
        // In trailing throttle mode, since `delay` time has not been
        // exceeded, schedule `callback` to execute `delay` ms after most
        // recent execution.
        // 
        // If `debounce_mode` is true (at_begin), schedule `clear` to execute
        // after `delay` ms.
        // 
        // If `debounce_mode` is false (at end), schedule `callback` to
        // execute after `delay` ms.
        timeout_id = setTimeout( debounce_mode ? clear : exec, debounce_mode === undefined ? delay - elapsed : delay );
      }
    };
    
    // Set the guid of `wrapper` function to the same of original callback, so
    // it can be removed in jQuery 1.4+ .unbind or .die by using the original
    // callback as a reference.
    if ( $.guid ) {
      wrapper.guid = callback.guid = callback.guid || $.guid++;
    }
    
    // Return the wrapper function.
    return wrapper;
  };
  
  // Method: jQuery.debounce
  // 
  // Debounce execution of a function. Debouncing, unlike throttling,
  // guarantees that a function is only executed a single time, either at the
  // very beginning of a series of calls, or at the very end. If you want to
  // simply rate-limit execution of a function, see the <jQuery.throttle>
  // method.
  // 
  // In this visualization, | is a debounced-function call and X is the actual
  // callback execution:
  // 
  // > Debounced with `at_begin` specified as false or unspecified:
  // > ||||||||||||||||||||||||| (pause) |||||||||||||||||||||||||
  // >                          X                                 X
  // > 
  // > Debounced with `at_begin` specified as true:
  // > ||||||||||||||||||||||||| (pause) |||||||||||||||||||||||||
  // > X                                 X
  // 
  // Usage:
  // 
  // > var debounced = jQuery.debounce( delay, [ at_begin, ] callback );
  // > 
  // > jQuery('selector').bind( 'someevent', debounced );
  // > jQuery('selector').unbind( 'someevent', debounced );
  // 
  // This also works in jQuery 1.4+:
  // 
  // > jQuery('selector').bind( 'someevent', jQuery.debounce( delay, [ at_begin, ] callback ) );
  // > jQuery('selector').unbind( 'someevent', callback );
  // 
  // Arguments:
  // 
  //  delay - (Number) A zero-or-greater delay in milliseconds. For event
  //    callbacks, values around 100 or 250 (or even higher) are most useful.
  //  at_begin - (Boolean) Optional, defaults to false. If at_begin is false or
  //    unspecified, callback will only be executed `delay` milliseconds after
  //    the last debounced-function call. If at_begin is true, callback will be
  //    executed only at the first debounced-function call. (After the
  //    throttled-function has not been called for `delay` milliseconds, the
  //    internal counter is reset)
  //  callback - (Function) A function to be executed after delay milliseconds.
  //    The `this` context and all arguments are passed through, as-is, to
  //    `callback` when the debounced-function is executed.
  // 
  // Returns:  
  
  // 
  //  (Function) A new, debounced, function.
  
  $.debounce = function( delay, at_begin, callback ) {
    return callback === undefined
      ? jq_throttle( delay, at_begin, false )
      : jq_throttle( delay, callback, at_begin !== false );
  };
  
})(this);
(function($) {
  $(document).ready(function() {
    function fixIframeAspect() {
        $('iframe').each(function () {
            var aspect = $(this).attr('height') / $(this).attr('width');
            $(this).height($(this).width() * aspect);
        });
    } 
  });
})(jQuery);
/**
 *  @file imageRatio.js
 *
 *  Audits page images and adds a class indicating their width to height ratio.
 *
 *  Requires: imagesloaded and ev-emitter packages (load via NPM).
 *
 */
(function($) {

  $(document).ready(function() {

    // An instance has been found where the imagesLoaded function is returning undefined.
    // This is not consistent – so far it only appears when the Universal Viewer is loaded.
    // @todo: Continue to investigate. In the meantime perform the required checks.

    // Allow local scripts to define containers for image aspect ratio application.

    const scope = typeof imageARScope !== "undefined" ? imageARScope : 'main, #splash, #title';

    $(scope).each(function() {
      if (typeof $(this).imagesLoaded === 'function') {
        $(this).imagesLoaded(function(){
          $(this.images).each(function(i,o) {
            var img = $(o.img);

            var h = o.img.naturalHeight;
            var w = o.img.naturalWidth
            var aspectClass = getImageAspectClass(h,w);

            img.addClass('img-' + aspectClass);

            img.closest('figure').addClass('figure-' + aspectClass);

            if (img.parent('a').length > 0) {
              img.parent('a').addClass('a-' + aspectClass);
            }
          });
        });
      } else {
        console.log('imagesLoaded JS library not found.')
      }
    });

  });

  function getImageAspectClass(h,w) {
    var aspectClass = 'square';

    if (w > h) {
      aspectClass = 'landscape';
    } else if (h > w) {
      aspectClass = 'portrait';
    }

    return aspectClass;
  }
})(jQuery);

function md5cycle(x, k) {
var a = x[0], b = x[1], c = x[2], d = x[3];

a = ff(a, b, c, d, k[0], 7, -680876936);
d = ff(d, a, b, c, k[1], 12, -389564586);
c = ff(c, d, a, b, k[2], 17,  606105819);
b = ff(b, c, d, a, k[3], 22, -1044525330);
a = ff(a, b, c, d, k[4], 7, -176418897);
d = ff(d, a, b, c, k[5], 12,  1200080426);
c = ff(c, d, a, b, k[6], 17, -1473231341);
b = ff(b, c, d, a, k[7], 22, -45705983);
a = ff(a, b, c, d, k[8], 7,  1770035416);
d = ff(d, a, b, c, k[9], 12, -1958414417);
c = ff(c, d, a, b, k[10], 17, -42063);
b = ff(b, c, d, a, k[11], 22, -1990404162);
a = ff(a, b, c, d, k[12], 7,  1804603682);
d = ff(d, a, b, c, k[13], 12, -40341101);
c = ff(c, d, a, b, k[14], 17, -1502002290);
b = ff(b, c, d, a, k[15], 22,  1236535329);

a = gg(a, b, c, d, k[1], 5, -165796510);
d = gg(d, a, b, c, k[6], 9, -1069501632);
c = gg(c, d, a, b, k[11], 14,  643717713);
b = gg(b, c, d, a, k[0], 20, -373897302);
a = gg(a, b, c, d, k[5], 5, -701558691);
d = gg(d, a, b, c, k[10], 9,  38016083);
c = gg(c, d, a, b, k[15], 14, -660478335);
b = gg(b, c, d, a, k[4], 20, -405537848);
a = gg(a, b, c, d, k[9], 5,  568446438);
d = gg(d, a, b, c, k[14], 9, -1019803690);
c = gg(c, d, a, b, k[3], 14, -187363961);
b = gg(b, c, d, a, k[8], 20,  1163531501);
a = gg(a, b, c, d, k[13], 5, -1444681467);
d = gg(d, a, b, c, k[2], 9, -51403784);
c = gg(c, d, a, b, k[7], 14,  1735328473);
b = gg(b, c, d, a, k[12], 20, -1926607734);

a = hh(a, b, c, d, k[5], 4, -378558);
d = hh(d, a, b, c, k[8], 11, -2022574463);
c = hh(c, d, a, b, k[11], 16,  1839030562);
b = hh(b, c, d, a, k[14], 23, -35309556);
a = hh(a, b, c, d, k[1], 4, -1530992060);
d = hh(d, a, b, c, k[4], 11,  1272893353);
c = hh(c, d, a, b, k[7], 16, -155497632);
b = hh(b, c, d, a, k[10], 23, -1094730640);
a = hh(a, b, c, d, k[13], 4,  681279174);
d = hh(d, a, b, c, k[0], 11, -358537222);
c = hh(c, d, a, b, k[3], 16, -722521979);
b = hh(b, c, d, a, k[6], 23,  76029189);
a = hh(a, b, c, d, k[9], 4, -640364487);
d = hh(d, a, b, c, k[12], 11, -421815835);
c = hh(c, d, a, b, k[15], 16,  530742520);
b = hh(b, c, d, a, k[2], 23, -995338651);

a = ii(a, b, c, d, k[0], 6, -198630844);
d = ii(d, a, b, c, k[7], 10,  1126891415);
c = ii(c, d, a, b, k[14], 15, -1416354905);
b = ii(b, c, d, a, k[5], 21, -57434055);
a = ii(a, b, c, d, k[12], 6,  1700485571);
d = ii(d, a, b, c, k[3], 10, -1894986606);
c = ii(c, d, a, b, k[10], 15, -1051523);
b = ii(b, c, d, a, k[1], 21, -2054922799);
a = ii(a, b, c, d, k[8], 6,  1873313359);
d = ii(d, a, b, c, k[15], 10, -30611744);
c = ii(c, d, a, b, k[6], 15, -1560198380);
b = ii(b, c, d, a, k[13], 21,  1309151649);
a = ii(a, b, c, d, k[4], 6, -145523070);
d = ii(d, a, b, c, k[11], 10, -1120210379);
c = ii(c, d, a, b, k[2], 15,  718787259);
b = ii(b, c, d, a, k[9], 21, -343485551);

x[0] = add32(a, x[0]);
x[1] = add32(b, x[1]);
x[2] = add32(c, x[2]);
x[3] = add32(d, x[3]);

}

function cmn(q, a, b, x, s, t) {
a = add32(add32(a, q), add32(x, t));
return add32((a << s) | (a >>> (32 - s)), b);
}

function ff(a, b, c, d, x, s, t) {
return cmn((b & c) | ((~b) & d), a, b, x, s, t);
}

function gg(a, b, c, d, x, s, t) {
return cmn((b & d) | (c & (~d)), a, b, x, s, t);
}

function hh(a, b, c, d, x, s, t) {
return cmn(b ^ c ^ d, a, b, x, s, t);
}

function ii(a, b, c, d, x, s, t) {
return cmn(c ^ (b | (~d)), a, b, x, s, t);
}

function md51(s) {
txt = '';
var n = s.length,
state = [1732584193, -271733879, -1732584194, 271733878], i;
for (i=64; i<=s.length; i+=64) {
md5cycle(state, md5blk(s.substring(i-64, i)));
}
s = s.substring(i-64);
var tail = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
for (i=0; i<s.length; i++)
tail[i>>2] |= s.charCodeAt(i) << ((i%4) << 3);
tail[i>>2] |= 0x80 << ((i%4) << 3);
if (i > 55) {
md5cycle(state, tail);
for (i=0; i<16; i++) tail[i] = 0;
}
tail[14] = n*8;
md5cycle(state, tail);
return state;
}

/* there needs to be support for Unicode here,
 * unless we pretend that we can redefine the MD-5
 * algorithm for multi-byte characters (perhaps
 * by adding every four 16-bit characters and
 * shortening the sum to 32 bits). Otherwise
 * I suggest performing MD-5 as if every character
 * was two bytes--e.g., 0040 0025 = @%--but then
 * how will an ordinary MD-5 sum be matched?
 * There is no way to standardize text to something
 * like UTF-8 before transformation; speed cost is
 * utterly prohibitive. The JavaScript standard
 * itself needs to look at this: it should start
 * providing access to strings as preformed UTF-8
 * 8-bit unsigned value arrays.
 */
function md5blk(s) { /* I figured global was faster.   */
var md5blks = [], i; /* Andy King said do it this way. */
for (i=0; i<64; i+=4) {
  md5blks[i>>2] = s.charCodeAt(i) + (s.charCodeAt(i+1) << 8) + (s.charCodeAt(i+2) << 16) + (s.charCodeAt(i+3) << 24);
}
return md5blks;
}

var hex_chr = '0123456789abcdef'.split('');

function rhex(n)
{
var s='', j=0;
for(; j<4; j++)
s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] + hex_chr[(n >> (j * 8)) & 0x0F];
return s;
}

function hex(x) {
for (var i=0; i<x.length; i++)
x[i] = rhex(x[i]);
return x.join('');
}

function md5(s) {
return hex(md51(s));
}

/* this function is much faster,
so if possible we use it. Some IEs
are the only ones I know of that
need the idiotic second function,
generated by an if clause.  */

function add32(a, b) {
return (a + b) & 0xFFFFFFFF;
}

/*

if (md5('hello') != '5d41402abc4b2a76b9719d911017c592') {
  function add32(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF),
    msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
  }
}*/
/**
 *  @file rollover.js
 *
 *  Handles rollovers in two ways – by file naming convention or by the presence of a
 *  named data attribute on the image.
 *
 *  Method 1: File Naming
 *  Label the neutral state of the image file by appending “_up”, and provide a corresponding
 *  active state image file appended with “_over” in the same folder.
 *
 *  E.g. /path/to/myimage_up.png --> /path/to/myimage_over.png
 *
 *  Method 2: Named attribute
 *  Provide a "data-src-active" attribute in the image tag with a full path to the active
 *  state image.
 *
 *  E.g. <img src='/path/to/myimage.png' data-src-active='/path/to/myactiveimage.png' ... />
 *
 */

var cache = []; // preloader

jQuery(document).ready(function() {
	jQuery('img').each(function() {
		rollover_bind(this);
	});
});


function rollover_bind(e) {
	// Cache images with data-src-active attribute set
  if (typeof jQuery(e).attr('data-src-active') != 'undefined') {
		var cacheimage = document.createElement('img'); // preload
		cacheimage.src = jQuery(e).attr('data-src-active');
		cache.push(cacheimage);
  }
  
	var states = ['_up','_down'];		
	for (i=0;i<states.length;i++) { // bind all listed states
		var src = jQuery(e).attr('src');
		if (src != null) {  		
			jQuery(e).on('mouseover touchstart',function() {  
				var replace ='';
				if (typeof jQuery(this).attr('data-src-active') != 'undefined') {
  				replace = jQuery(this).attr('data-src-active');
  				jQuery(this).attr('data-src',src);
  				jQuery(this).attr('src',replace);
        } else if (src.indexOf(states[i],0) > 0) {
					replace = src.replace('_up','_over');
					jQuery(this).attr('src',replace);
        }
			});
			jQuery(e).on('mouseout touchend',function() {
				var replace ='';
				if (typeof jQuery(this).attr('data-src') != 'undefined') {
  				replace = jQuery(this).attr('data-src');
  				jQuery(this).attr('src',replace);
        } else if (src.indexOf(states[i],0) > 0) {
					replace = src.replace('_over','_up');
					jQuery(this).attr('src',replace);
				}
			});
		}
	}
}