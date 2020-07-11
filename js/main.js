'use strict';

var MIN_X = 50;
var MIN_Y = 70;
var MAX_X = 1150;
var MAX_Y = 634;
var CHEKIN = ['12:00', '13:00', '14:00'];
var CHCKOUT = ['12:00', '13:00', '14:00'];
var number = ['01', '02', '03', '04', '05', '06', '07', '08'];
var characteristic = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var type = ['palace', 'flat', 'house', 'bungalo'];
var photo = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var author = [];

for (var i = 0; i < number.length; i++) {
  var avatar = 'img/avatars/user' + number[i] + '.png';
  author[i] = avatar;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var getRandomStroke = function (data) {
  var rand = Math.floor(Math.random() * data.length);
  return data[rand];
};

var offer = {
  title: 'заголовок предложения',
  address: getRandomNumber(MIN_X, MAX_X) + ',' + getRandomNumber(MIN_Y, MAX_Y),
  price: 1000,
  type: getRandomStroke(type),
  rooms: getRandomNumber(1, 3),
  checking: getRandomStroke(CHEKIN),
  checkout: getRandomStroke(CHCKOUT),
  features: getRandomStroke(characteristic),
  description: 'строка с описанием',
  photos: getRandomStroke(photo)
};

var MAP = document.querySelector('.map');
MAP.classList.remove('map--faded');

var ListElement = document.querySelector('.map__pins');
var PinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var Pinimg = PinTemplate.querySelector('img');

for (i = 0; i < number.length - 1; i++) {
  var Pin = PinTemplate.cloneNode(true);
  Pin.style.left = getRandomNumber(MIN_X, MAX_X) + 'px';
  Pin.style.top = getRandomNumber(MIN_Y, MAX_Y) + 'px';
  Pinimg.src = author[i];
  Pinimg.alt = offer.title;

  ListElement.appendChild(Pin);
}

