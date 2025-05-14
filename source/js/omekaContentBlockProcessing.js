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
