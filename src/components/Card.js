// Класс для создания карточек
export default class Card {
  constructor({ data, handleCardClick }, template) {
    this._name = data.title;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
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
    this._element.querySelector('.card__image').addEventListener('click', () => this._handleCardClick());
    this._element.querySelector('.card__delete-button').addEventListener('click', () => this._removeCard());
  }
}
