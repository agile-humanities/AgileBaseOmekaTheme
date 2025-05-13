/**
 *  @file omekaProcessAdvancedSearchForm
 *
 *  The advanced search form in Omeka is rather unwieldy and can't be modified.
 *  This does some post-processing to make it a little easier to handle.
 *
 */

(function ($) {
  $(document).ready(function () {

    const searchFormContainer = $('#advanced-search-form');

    if (searchFormContainer.length > 0) {
      // searchFormContainer.find('form > *:nth-child(2):nth-last-child(1)').wrapAll('<details>');
      const form = searchFormContainer.find('form');
      let keywordInput = form.find('> *:first-child');
      let submit = form.find('> *:last-child');

      form.find('> *:first-child').remove();
      form.find('> *:last-child').remove();
      form.find('> *').wrapAll('<details>').wrapAll('<div class="details-container">')
      form.find('details').prepend('<summary>More search options</summary>');

      keywordInput.find('.field-meta label').text('Enter keywords')
      submit.find('button').text('Submit search');
      submit.find('.field-meta').remove(); // remove label. Replace with proper submit text above.
      form.prepend(keywordInput);
      form.append(submit);

    }
  });
})(jQuery);
