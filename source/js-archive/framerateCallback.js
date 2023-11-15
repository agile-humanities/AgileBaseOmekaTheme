(function($) {
    $(document).ready(function() {
      function framerateCallback(callback) {
          var waiting = false;
          callback = callback.bind(this);
          return function () {
              if (!waiting) {
                  waiting = true;
                  window.requestAnimationFrame(function () {
                      callback();
                      waiting = false;
                  });
              }
          };
      } 
    });
})(jQuery);
