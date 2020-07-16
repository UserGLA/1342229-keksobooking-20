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
        avatar: 'img/avatars/user' + MOCK_AVATARS[i] + '.png'
      },
      offer: {
        title: 'заголовок предложения',
        address: {
          locationX: getRandomNumber(MIN_X, MAX_X),
          locationY: getRandomNumber(MIN_Y, MAX_Y)
        },
        price: getRandomNumber(1000, 10000),
        type: getRandomStroke(MOCK_TYPES),
        rooms: getRandomNumber(1, 5),
        guests: getRandomNumber(1, 5),
        checkin: getRandomStroke(MOCK_TIMES),
        checkout: getRandomStroke(MOCK_TIMES),
        features: getRandomArr(MOCK_FEATURES),
        description: 'описание',
        photos: getRandomArr(MOCK_PHOTOS)
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

var filrtersElement = document.querySelector('.map__filters-container');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var card = cardTemplate.cloneNode(true);
mapElement.insertBefore(card, filrtersElement);

card.querySelector('.popup__title').textContent = pins[0].offer.title;
card.querySelector('.popup__text--address').textContent = pins[0].offer.address.locationX + ' - ' + pins[0].offer.address.locationY;
card.querySelector('.popup__text--price').textContent = pins[0].offer.price + ' ₽/ночь';
card.querySelector('.popup__type').textContent = pins[0].offer.type;
card.querySelector('.popup__text--capacity').textContent = pins[0].offer.rooms + ' комнаты для ' + pins[0].offer.guests + ' гостей';
card.querySelector('.popup__text--time').textContent = 'Заезд после ' + pins[0].offer.checkin + ', выезд до ' + pins[0].offer.checkout;
card.querySelector('.popup__description').textContent = pins[0].offer.description;
card.querySelector('.popup__photo').src = pins[0].offer.photos;
card.querySelector('.popup__avatar').src = pins[0].author.avatar;

var cardElements = card.querySelectorAll('.popup__features');
var children = cardElements[0].children;

for (var i = children.length - 1; i >= 0; i--) {
  var child = children[i];
  child.parentElement.removeChild(child);
}


