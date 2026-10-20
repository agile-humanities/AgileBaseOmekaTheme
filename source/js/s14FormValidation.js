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
