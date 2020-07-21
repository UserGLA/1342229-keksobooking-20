'use strict';

var MIN_X = 25;
var MIN_Y = 130;
var MAX_X = 1175;
var MAX_Y = 630;
var PIN_HEIGHT = 70;
var PIN_WIDTH = 50;
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
        avatar: 'img/avatars/user' + '0' + getRandomNumber(1, MOCK_AVATARS.length) + '.png'
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

/*
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

var renderFeatures = function (container, arr) {
  container.innerHTML = '';
  arr.forEach(function (feature) {
    var li = document.createElement(li);
    li.classList.add('popup__feature', 'popup__feature--' + feature);
    container.appendChild(li);
  });
};

var renderPhotos = function (container, arr) {
  container.innerHTML = '';
  for (var i = 0; i < arr.length; i++) {
    var img = document.createElement('img');
    img.classList.add('popup__photo');
    img.src = arr[i];
    img.style.width = 45 + 'px';
    img.style.height = 40 + 'px';
    container.appendChild(img);
    if (arr[i] === arr[i - 1]) {
      container.removeChild(img);
    }
  }
};

var types = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var createCard = function (pinsarr) {
  var card = cardTemplate.cloneNode(true);
  card.querySelector('.popup__title').textContent = pinsarr.offer.title;
  card.querySelector('.popup__text--address').textContent = pinsarr.offer.address.locationX + ' - ' + pinsarr.offer.address.locationY;
  card.querySelector('.popup__text--price').textContent = pinsarr.offer.price + ' ₽/ночь';
  card.querySelector('.popup__type').textContent = types[pinsarr.offer.type];
  card.querySelector('.popup__text--capacity').textContent = pinsarr.offer.rooms + ' комнаты для ' + pinsarr.offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + pinsarr.offer.checkin + ', выезд до ' + pinsarr.offer.checkout;
  card.querySelector('.popup__description').textContent = pinsarr.offer.description;
  renderPhotos(card.querySelector('.popup__photos'), pinsarr.offer.photos);
  card.querySelector('.popup__avatar').src = pinsarr.author.avatar;
  renderFeatures(card.querySelector('.popup__features'), pinsarr.offer.features);

  return card;
};

var renderCard = function (container, data) {
  for (var i = 0; i < data.length; i++) {
    container.appendChild(createCard(data[i]));
  }
};

renderCard(filrtersElement, pins);
*/

var fieldsetElement = document.querySelectorAll('fieldset');
var formElement = document.querySelectorAll('.map__filter');

for (var i = 0; i < formElement.length; i++) {
  formElement[i].disabled = true;
}

for (i = 0; i < fieldsetElement.length; i++) {
  fieldsetElement[i].disabled = true;
}

var pinMain = document.querySelector('.map__pin--main');

pinMain.addEventListener('mousedown', function () {
  var mapElement = document.querySelector('.map');
  mapElement.classList.remove('map--faded');
  for (i = 0; i < fieldsetElement.length; i++) {
    fieldsetElement[i].disabled = false;
  }
});

var addresElement = document.querySelector('#address');
addresElement.value = pins[0].offer.address.locationX + PIN_WIDTH / 2 + ' ' + (pins[0].offer.address.locationY + PIN_HEIGHT);

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
