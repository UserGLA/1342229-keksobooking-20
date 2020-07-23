'use strict';

(function () {

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

  renderCard(filrtersElement, window.pins);

})();

