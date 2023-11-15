// toggles browse items view between "card" and "list"
// view is set to card by default
(function($) {  
  $(document).ready(function() {
    const browsePage = $('.browse');

    if (browsePage.length) {

      const browseItemsContainer = $('browse-items-container');
      
      const addViewClass = function(viewTypeStr, classNameStr, classNameToBeRemoved) {
        const view = $('browse-items-container').attr('view');

        if (view === viewTypeStr) {
          browsePage.removeClass(classNameToBeRemoved)
          .addClass(classNameStr);
        }
      }

      // event listener to track changes in the "view" attribute of the browse-items-container component 
      browseItemsContainer.on('item-view-changed', function() {
        // add the "card-view" class and remove "list-view" class on the body if the view attribute is set to "card"
        addViewClass('card', 'card-view', 'list-view');

        // add the "list-view" class and remove "card-view" class on the body if the view attribute is set to "list"
        addViewClass('list', 'list-view', 'card-view');
      });

      const cardViewBtn = $('.card-view-btn');
      const listViewBtn = $('.list-view-btn');

      const onClickOfViewBtn = function() {
        // on click of the view buttons
        $(this).click(() => {
          // change the view attribute of browse-items-container component to the value of the button
          browseItemsContainer.attr('view', $(this).val())
          // trigger the custom event "item-view-changed" to toggle card and list views
          .trigger('item-view-changed');
        });
      }

      cardViewBtn.each(onClickOfViewBtn);
      listViewBtn.each(onClickOfViewBtn);
      
    }
  
  });  
})(jQuery);
