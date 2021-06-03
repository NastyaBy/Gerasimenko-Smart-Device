'use strict';

// акардион
var footer = document.querySelector('.footer-nav');
var actives = footer.querySelectorAll('.active');

actives.forEach(function (active) {
  active.classList.remove('active');
});

var accordionHeading = footer.querySelectorAll('h3');

accordionHeading.forEach(function (item) {
  item.addEventListener('click', function () {
    accordionHeading.forEach(function (element) {
      if (element.classList.contains('active')) {
        element.classList.remove('active');
      }
    });

    item.classList.add('active');
  });
});

// маски валидации input
// валидации телефона
function setCursorPosition(pos, e) {
  e.focus();
  if (e.setSelectionRange) e.setSelectionRange(pos, pos);
  else if (e.createTextRange) {
    var range = e.createTextRange();
    range.collapse(true);
    range.moveEnd("character", pos);
    range.moveStart("character", pos);
    range.select()
  }
}

function mask(e) {
  //console.log('mask',e);
  var matrix = '+7 (___) ___-__-__',// .defaultValue
    i = 0,
    def = matrix.replace(/\D/g, ""),
    val = this.value.replace(/\D/g, "");
  def.length >= val.length && (val = def);
  matrix = matrix.replace(/[_\d]/g, function(a) {
    return val.charAt(i++) || "_"
  });
  this.value = matrix;
  i = matrix.lastIndexOf(val.substr(-1));
  i < matrix.length && matrix != this.placeholder ? i++ : i = matrix.indexOf("_");
  setCursorPosition(i, this)
}

window.addEventListener("DOMContentLoaded", function() {
  var inputsTel = document.querySelectorAll(".js-validateTel");

  inputsTel.forEach( function (input) {
    input.addEventListener("input", mask, false);
    input.addEventListener("focus", setCursorPosition(3, input), false);
    }
  )
});

// валидации имени
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

// активация кнопки отправки
var forms = document.querySelectorAll('.js-form');

if (forms) {
  forms.forEach(function (form) {
    var accord = form.querySelector('.js-accord');
    var sendForm = form.querySelector('.js-sendForm');

    if (accord) {
      accord.addEventListener('change', function (e) {
        sendForm.disabled = !e.target.checked;
      });
    }
  });
}

// отправка формы
var sendForms = document.querySelectorAll('.js-sendForm');

if (sendForms) {
  sendForms.forEach(function (button) {
    button.addEventListener('click', function () {
      var form = button.form
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

// открытие модального окна
const modalTriggers = document.querySelectorAll('.js-modalOpen');
const bodyBlackout = document.querySelector('.js-modalBlackout');
const modalCloseBtn = document.querySelector('.js-modalCloseBtn');

const clearFormErrors = () => {
  const errorMessages = Array.prototype.slice.call(
    document.querySelectorAll('.form-input__error'));

  errorMessages.forEach( function (errorMessage) {
    errorMessage.parentNode.removeChild(errorMessage);
  });
};

const closeModal = function (popup) {
  popup.classList.remove('is--visible');
  bodyBlackout.classList.remove('is-blacked-out');

  clearFormErrors()
}

modalTriggers.forEach(function (trigger) {
  trigger.addEventListener('click', function (evt) {
    const popupTrigger = trigger.dataset.popupTrigger;
    const popupModal = document.querySelector(`[data-popup-modal="${popupTrigger}"]`);

    evt.preventDefault();
    popupModal.classList.add('is--visible');
    bodyBlackout.classList.add('is-blacked-out');

    bodyBlackout.addEventListener('click', function () {
      closeModal(popupModal);
    });

    modalCloseBtn.addEventListener('click', function () {
      closeModal(popupModal);
    });
    window.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        if (popupModal.classList.contains('is--visible')) {
          evt.preventDefault();
          closeModal(popupModal);
        }
      }
    });
  });
});

// плавное прокручивание якорной ссылки
var anchors = document.querySelectorAll('a[href*="#"]');

anchors.forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    var blockID = anchor.getAttribute('href').substr(1);

    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
});
