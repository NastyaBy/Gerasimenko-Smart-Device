'use strict'

var footer = document.querySelector('.footer-nav');
var actives = footer.querySelectorAll('.active');

actives.forEach(function (active) {
  active.classList.remove('active');
});

var accordionHeading = footer.querySelectorAll('h3');

accordionHeading.forEach(function (item) {
  item.addEventListener('click', function () {
    accordionHeading.forEach(function (element) {
     if(element.classList.contains('active')) {
       element.classList.remove('active')
     }
    });

    item.classList.add('active');
  });
});
