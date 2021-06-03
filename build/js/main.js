'use strict';

// акардион
var footer = document.querySelector('.footer-nav');
var actives = footer.querySelectorAll('.active');

actives.forEach(function(active) {
  active.classList.remove('active');
});

var accordionHeading = footer.querySelectorAll('h3');

accordionHeading.forEach(function(item) {
  item.addEventListener('click', function() {
    accordionHeading.forEach(function(element) {
      if (element.classList.contains('active')) {
        element.classList.remove('active');
      }
    });

    item.classList.add('active');
  });
});

// маски валидации input
// валидации телефона
window.addEventListener('DOMContentLoaded', function() {
  function setCursorPosition(pos, elem) {
    elem.focus();
    if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
    else if (elem.createTextRange) {
      var range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  }

  function mask(event) {
    var matrix = '+7 (___) ___ ____',
      i = 0,
      def = matrix.replace(/\D/g, ''),
      val = this.value.replace(/\D/g, '');

    if (def.length >= val.length) val = def;
    this.value = matrix.replace(/./g, function(a) {
      return /[_\d]/.test(a) && i < val.length ?
        val.charAt(i++) :
        i >= val.length ? '' : a;
    });

    if (event.type === 'blur') {
      if (this.value.length === 2) this.value = '';
    } else setCursorPosition(this.value.length, this);
  }

  var inputTels = document.querySelectorAll('.js-validateTel');

  if (inputTels) {
    inputTels.forEach(function(tel) {
      tel.addEventListener('input', mask, false);
      tel.addEventListener('focus', mask, false);
      tel.addEventListener('blur', mask, false);
    });

  }
});

// валидации имени
function inputHandlerName(e) {
  var el = e.target;
  var pattern = /\d/g;

  el.value = el.value.replace(pattern, '');
}

var inputNames = document.querySelectorAll('.js-validateName');

if (inputNames) {
  inputNames.forEach(function(name) {
    name.addEventListener('input', inputHandlerName);
  });
}

// активация кнопки отправки
var forms = document.querySelectorAll('.js-form');

if (forms) {
  forms.forEach(function(form) {
    var accord = form.querySelector('.js-accord');
    var sendForm = form.querySelector('.js-sendForm');

    if (accord) {
      accord.addEventListener('change', function(e) {
        sendForm.disabled = !e.target.checked
      })
    }
  });
}

// отправка формы
var sendForms = document.querySelectorAll('.js-sendForm');
var comment = document.querySelectorAll('.js-comment');

if (sendForms) {
  sendForms.forEach(function(form) {
    form.addEventListener('click', function() {

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
};

// открытие модального окна

const modalTriggers = document.querySelectorAll('.js-modalOpen');
const bodyBlackout = document.querySelector('.js-modalBlackout');
const modalCloseBtn = document.querySelector('.js-modalCloseBtn');
const success = document.querySelector('.js-success');

const clearFormErrors = () => {
  const errorMessages = Array.prototype.slice.call(
    document.querySelectorAll('.form-input__error'));

  errorMessages.forEach((errorMessage) => {
    errorMessage.parentNode.removeChild(errorMessage);
  });
};

const closeModal = (popup) => {
  popup.classList.remove('is--visible');
  bodyBlackout.classList.remove('is-blacked-out');
  success.classList.remove('modal__success--show');

  clearFormErrors()
}

modalTriggers.forEach(trigger => {
  trigger.addEventListener('click', (evt) => {
    const popupTrigger = trigger.dataset.popupTrigger;
    const popupModal = document.querySelector(`[data-popup-modal="${popupTrigger}"]`);

    evt.preventDefault();
    popupModal.classList.add('is--visible');
    bodyBlackout.classList.add('is-blacked-out');

    bodyBlackout.addEventListener('click', () => {
      closeModal(popupModal);
    });

    modalCloseBtn.addEventListener('click', () => {
      closeModal(popupModal);
    });
    window.addEventListener('keydown', (evt) => {
      if (evt.keyCode === 27) {
        if (popupModal.classList.contains('is--visible')) {
          evt.preventDefault();
          closeModal(popupModal);
        }
      }
    });
  });
});
