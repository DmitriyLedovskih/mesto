// Импорт массива с данными карточек
import { initialCards } from './constants.js';
// Импорт функций
import { openPopup, closePopup } from './index.js';

// Переменные для куда нужно вывести карточки
const cardsContainer = document.querySelector('.cards');
// Переменные для попапа добавления карточек
const popupTypeAdd = document.querySelector('.popup_type_add');
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
const popupAddCloseButton = document.querySelector('.popup__close-button_type_add');
const formElementAdd = document.querySelector('.popup__form_type_add');
const titleInput = formElementAdd.querySelector('.popup__form-input_type_title');
const linkInput = formElementAdd.querySelector('.popup__form-input_type_link');
// Переменные для попапа с изображениями
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImageCloseButton = document.querySelector('.popup__close-button_type_image');
const popupFigureImage = document.querySelector('.popup__figure-image');
const popupFigureLabel = document.querySelector('.popup__figure-label');

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
  _cardLike() {
    this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
  }

  // Метода для удаления карточек
  _removeCard() {
    this._element.remove();
  }

  // Метод для добавленеия обработчиков события
  _setEventListener() {
    this._element.querySelector('.card__like-button').addEventListener('click', () => this._cardLike());
    this._element.querySelector('.card__image').addEventListener('click', () => this._openImagePopup());
    this._element.querySelector('.card__delete-button').addEventListener('click', () => this._removeCard());
  }
}

// Функция для получения данных с массива
function renderInitialCards() {
  initialCards.forEach(data => {
    const card = new Card(data, '#template-card');
    const cardElement = card.createCard();
    renderCard(cardsContainer, cardElement);
  });
}

renderInitialCards();

// Функция для добавления карточек
function addCard(evt) {
  evt.preventDefault();

  const card = new Card(
    {
      name: titleInput.value,
      link: linkInput.value
    }, '#template-card');
  const cardElement = card.createCard();
  renderCard(cardsContainer, cardElement);
  formElementAdd.reset();
  const popupButton = evt.submitter;
  popupButton.classList.add('popup__form-button_disabled');
  popupButton.disabled = true;
  closePopup(popupTypeAdd);
}

// Функция для вывода карточек
function renderCard(container, card) {
  container.prepend(card);
}

// Обработчик события когда форма отправлена
formElementAdd.addEventListener('submit', addCard);

// Обработчики события при клике
buttonOpenAddCardPopup.addEventListener('click', () => openPopup(popupTypeAdd));
popupImageCloseButton.addEventListener('click', () => closePopup(popupTypeImage));
popupAddCloseButton.addEventListener('click', () => closePopup(popupTypeAdd));
