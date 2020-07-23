'use strict';

(function () {
  var fieldsetElement = document.querySelectorAll('fieldset');
  var formElement = document.querySelectorAll('.map__filter');
  var listElement = document.querySelector('.map__pins');

  function toggleForm(boolean, element) {
    element.forEach(function (el) {
      el.disabled = boolean;
    });
  }

  toggleForm(true, fieldsetElement);
  toggleForm(true, formElement);

  var pinMain = document.querySelector('.map__pin--main');
  var mapElement = document.querySelector('.map');

  pinMain.addEventListener('mousedown', function () {
    mapElement.classList.remove('map--faded');
    toggleForm(false, fieldsetElement);
    toggleForm(false, formElement);
    window.renderPins(listElement, window.pins);
  });
})();
