'use strict';

var MIN_X = 50;
var MIN_Y = 130;
var MAX_X = 1150;
var MAX_Y = 630;
var MOCK_TIMES = ['12:00', '13:00', '14:00'];
var MOCK_AVATARS = ['01', '02', '03', '04', '05', '06', '07', '08'];
var MOCK_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var MOCK_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var MOCK_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomStroke = function (data) {
  var rand = Math.floor(Math.random() * data.length);
  return data[rand];
};

var generatePin = function (amount) {
  var pinsArray = [];

  for (var i = 0; i < amount; i++) {
    pinsArray[i] = {
      author: {
        avatar: 'img/avatars/user' + MOCK_AVATARS[i] + '.png'
      },
      offer: {
        title: 'заголовок предложения',
        address: {
          locationX: 'getRandomNumber(MIN_X, MAX_X)',
          locationY: 'getRandomNumber(MIN_Y, MAX_Y)'
        },
        price: 1000,
        type: getRandomStroke(MOCK_TYPES),
        rooms: 3,
        guests: 5,
        checkin: getRandomStroke(MOCK_TIMES),
        checkout: getRandomStroke(MOCK_TIMES),
        features: getRandomStroke(MOCK_FEATURES),
        description: 'описание',
        photos: getRandomStroke(MOCK_PHOTOS)
      },
      location: {
        x: getRandomNumber(MIN_X, MAX_X),
        y: getRandomNumber(MIN_Y, MAX_Y)
      }
    };
  }
  return pinsArray;
};

var pins = generatePin(8);

var mapElement = document.querySelector('.map');
mapElement.classList.remove('map--faded');

var listElement = document.querySelector('.map__pins');
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

var renderPins = function (container, data) {
  for (var i = 0; i < data.length; i++) {
    container.appendChild(createPin(data[i]));
  }
};

renderPins(listElement, pins);

