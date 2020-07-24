'use strict';

(function () {
  var addressInput = document.querySelector('#address');

  var getAddresPin = function (arr, addressElement) {
    addressElement.value = arr[0].offer.address.locationX + window.PIN_WIDTH / 2 + ' ' + (arr[0].offer.address.locationY + window.PIN_HEIGHT);
  };

  getAddresPin(window.pins, addressInput);

  var roomSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');

  var roomArr = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  function checkRooms(amount) {
    var capacityOptions = capacitySelect.querySelectorAll('option');

    capacityOptions.forEach(function (option) {
      option.disabled = true;
    });

    roomArr[amount].forEach(function (placeAmount) {
      capacityOptions.forEach(function (option) {
        if (Number(option.value) === placeAmount) {
          option.disabled = false;
          option.selected = true;
        }
      });
    });
  }

  roomSelect.addEventListener('change', function (evt) {
    checkRooms(evt.target.value);
  });

})();
