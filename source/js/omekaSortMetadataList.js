$(document).ready(function() {
  function sortElements() {
    // Select all elements to be sorted (adjust selector based on your needs)
    var elements = $('.metadata-list .property[data-sort]');
    
    // Sort elements based on the data-sort attribute
    elements.sort(function(a, b) {
      var textA = $(a).attr('data-sort').toString().toUpperCase(); // Convert to string and uppercase for case-insensitive sorting
      var textB = $(b).attr('data-sort').toString().toUpperCase();

      return textA.localeCompare(textB); // Compare alphabetically
    });

    // Reorder the elements in the DOM
    $.each(elements, function(index, element) {
      $(element).parent().append(element); // Append each element back into the parent in the new order
    });
  }

  // Call the function to sort elements
  sortElements();
});
