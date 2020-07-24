'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinimg = pinTemplate.querySelector('img');

  var createPin = function (pinsarr) {
    var pin = pinTemplate.cloneNode(true);
    pin.style.left = pinsarr.location.x + 'px';
    pin.style.top = pinsarr.location.y + 'px';
    pinimg.src = pinsarr.author.avatar;
    pinimg.alt = pinsarr.offer.title;

    return pin;
  };

  window.renderPins = function (container, data) {
    for (var i = 0; i < data.length; i++) {
      container.appendChild(createPin(data[i]));
    }
  };
})();
