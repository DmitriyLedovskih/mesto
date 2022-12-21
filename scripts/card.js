// Импорт функции и перемен
import { openPopup, popupTypeImage, popupFigureImage, popupFigureLabel } from './index.js';

// Класс для создания карточек
class Card {
  constructor(data, template) {
    this._name = data.name;
    this._link = data.link;
    this._template = template;
  }

  // Метод для получения Template
  _getTemplate() {
    const templateElement = document.querySelector(this._template).content.querySelector('.card').cloneNode(true);
    return templateElement;
  }

  // Метод для создания карточек
  createCard() {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector('.card__image');
    const cardTitle = this._element.querySelector('.card__title');
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;
    this._setEventListener();
    return this._element;
  }

  // Метод для открытия попапа с изхображением
  _openImagePopup() {
    popupFigureImage.src = this._link;
    popupFigureImage.alt = this._name;
    popupFigureLabel.textContent = this._name;
    openPopup(popupTypeImage);
  }

  // Метода для лайка карточек
  _handleLikeClick() {
    this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
  }

  // Метода для удаления карточек
  _removeCard() {
    this._element.remove();
  }

  // Метод для добавленеия обработчиков события
  _setEventListener() {
    this._element.querySelector('.card__like-button').addEventListener('click', () => this._handleLikeClick());
    this._element.querySelector('.card__image').addEventListener('click', () => this._openImagePopup());
    this._element.querySelector('.card__delete-button').addEventListener('click', () => this._removeCard());
  }
}

export { Card }
