'use strict';

var footer = document.querySelector('.footer-nav');
var actives = footer.querySelectorAll('.active');

actives.forEach(function (active) {
  active.classList.remove('active');
});

var accordionHeading = footer.querySelectorAll('h3');

accordionHeading.forEach(function (item) {
  item.addEventListener('click', function () {
    if (item.classList.contains('active')) {
      item.classList.remove('active');
    } else {
      accordionHeading.forEach(function (element) {
        if (element.classList.contains('active')) {
          element.classList.remove('active');
        }
      });
      item.classList.add('active');
    }

  });
});

function setCursorPosition(pos, e) {
  e.focus();
  if (e.setSelectionRange) {
    e.setSelectionRange(pos, pos);
  } else if (e.createTextRange) {
    var range = e.createTextRange();
    range.collapse(true);
    range.moveEnd('character', pos);
    range.moveStart('character', pos);
    range.select();
  }
}

function mask(e) {
  var self = e.target;
  var matrix = '+7 (___) ___-__-__';
  var i = 0;
  var def = matrix.replace(/\D/g, '');
  var val = self.value.replace(/\D/g, '');
  if (def.length >= val.length) {
    val = def;
  }
  matrix = matrix.replace(/[_\d]/g, function () {
    return val.charAt(i++) || '_';
  });
  self.value = matrix;
  i = matrix.lastIndexOf(val.substr(-1));
  if (i < matrix.length && matrix !== self.placeholder) {
    i++;
  } else {
    i = matrix.indexOf('_');
  }
  setCursorPosition(i, self);
}

window.addEventListener('DOMContentLoaded', function () {
  var inputsTel = document.querySelectorAll('.js-validateTel');

  inputsTel.forEach(function (input) {
    input.addEventListener('input', mask, false);
    input.addEventListener('click', function (e) {
      mask(e);
      setCursorPosition(4, e.target);
    }, false);
  });
});

function inputHandlerName(e) {
  var el = e.target;
  var pattern = /\d/g;

  el.value = el.value.replace(pattern, '');
}

var inputNames = document.querySelectorAll('.js-validateName');

if (inputNames) {
  inputNames.forEach(function (name) {
    name.addEventListener('input', inputHandlerName);
  });
}

var sendForms = document.querySelectorAll('.js-sendForm');

if (sendForms) {
  sendForms.forEach(function (button) {
    button.addEventListener('click', function () {
      var form = button.form;
      var inputName = form.querySelector('.js-validateName');
      var inputTel = form.querySelector('.js-validateTel');
      var textareaComment = form.querySelector('.js-comment');

      var obj = {
        name: inputName.value,
        tel: inputTel.value,
        comment: textareaComment.value,
      };

      var serialObj = JSON.stringify(obj);
      localStorage.setItem('order', serialObj);
    });
  });
}

var modalTriggers = document.querySelectorAll('.js-modalOpen');
var bodyBlackout = document.querySelector('.js-modalBlackout');
var modalCloseBtn = document.querySelector('.js-modalCloseBtn');

var closeModal = function (popup) {
  popup.classList.remove('is--visible');
  bodyBlackout.classList.remove('is-blacked-out');
};

modalTriggers.forEach(function (trigger) {
  trigger.addEventListener('click', function (evt) {
    var popupTrigger = trigger.dataset.popupTrigger;
    var popupModal = document.querySelector('[data-popup-modal=' + popupTrigger + ']');
    var popupFocusInput = trigger.dataset.popupFocusInput;
    var popupFocus = popupModal.querySelector(popupFocusInput);

    if (popupFocus) {
      popupFocus.focus();
    }

    evt.preventDefault();
    popupModal.classList.add('is--visible');
    bodyBlackout.classList.add('is-blacked-out');

    bodyBlackout.addEventListener('click', function () {
      closeModal(popupModal);
    });

    modalCloseBtn.addEventListener('click', function () {
      closeModal(popupModal);
    });
    window.addEventListener('keydown', function (e) {
      if (e.keyCode === 27) {
        if (popupModal.classList.contains('is--visible')) {
          e.preventDefault();
          closeModal(popupModal);
        }
      }
    });
  });
});

var anchors = document.querySelectorAll('a[href*="#"]');

anchors.forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    var blockID = anchor.getAttribute('href').substr(1);

    if (blockID) {
      document.getElementById(blockID).scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
    }
  });
});
