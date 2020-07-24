'use strict';

(function () {

  window.MIN_X = 25;
  window.MIN_Y = 130;
  window.MAX_X = 1175;
  window.MAX_Y = 630;
  window.PIN_HEIGHT = 70;
  window.PIN_WIDTH = 50;
  window.MOCK_TIMES = ['12:00', '13:00', '14:00'];
  window.MOCK_AVATARS = ['01', '02', '03', '04', '05', '06', '07', '08'];
  window.MOCK_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  window.MOCK_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  window.MOCK_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var getRandomStroke = function (data) {
    var rand = Math.floor(Math.random() * data.length);
    return data[rand];
  };

  var getRandomArr = function (amount) {
    var arrElement = [];
    for (var i = 0; i < getRandomNumber(1, amount.length); i++) {
      arrElement[i] = getRandomStroke(amount);
    }
    return arrElement;
  };

  var generatePin = function (amount) {
    var pinsArray = [];

    for (var i = 0; i < amount; i++) {
      pinsArray[i] = {
        author: {
          avatar: 'img/avatars/user' + '0' + getRandomNumber(1, window.MOCK_AVATARS.length) + '.png'
        },
        offer: {
          title: 'заголовок предложения',
          address: {
            locationX: getRandomNumber(window.MIN_X, window.MAX_X),
            locationY: getRandomNumber(window.MIN_Y, window.MAX_Y)
          },
          price: getRandomNumber(1000, 10000),
          type: getRandomStroke(window.MOCK_TYPES),
          rooms: getRandomNumber(1, 5),
          guests: getRandomNumber(1, 5),
          checkin: getRandomStroke(window.MOCK_TIMES),
          checkout: getRandomStroke(window.MOCK_TIMES),
          features: getRandomArr(window.MOCK_FEATURES),
          description: 'описание',
          photos: getRandomArr(window.MOCK_PHOTOS)
        },
        location: {
          x: getRandomNumber(window.MIN_X, window.MAX_X),
          y: getRandomNumber(window.MIN_Y, window.MAX_Y)
        }
      };
    }
    return pinsArray;
  };

  window.pins = generatePin(8);

})();
