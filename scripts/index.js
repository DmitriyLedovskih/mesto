// Импорт класса карточек
import { Card } from "./card.js";
// Импорт массива с данными карточек
import { initialCards } from "./constants.js";
// Импорт класса валидации
import { FormValidator } from "./formValidator.js";

// Переменные для попапа редактирования профиля
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupEditCloseButton = document.querySelector('.popup__close-button_type_edit');
const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const formElementEdit = document.querySelector('.popup__form_type_edit');
const nameInput = formElementEdit.querySelector('.popup__form-input_type_name');
const descriptionInput = formElementEdit.querySelector('.popup__form-input_type_description');
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
// Функция для открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
  popup.addEventListener('click', closeOverlay);
}

// Функция для закрытия попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
  popup.removeEventListener('click', closeOverlay);
}

// Функция для закрытие попапа при клики на оверлей
function closeOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

// Функция для закрытие попапа с помощью клавиши Esc
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// Функция для получения данных с профиля и добавления их в инпуты
function fillInFormInputs() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  validation(formElementEdit);
  openPopup(popupTypeEdit);
}

// Функция для редактирования профиля
function profileEdit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupTypeEdit);
}

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
  validation(formElementAdd);
  closePopup(popupTypeAdd);
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

// Функция для вывода карточек
function renderCard(container, card) {
  container.prepend(card);
}

// Функция для активации валидации
function validation(form) {
  const objectClass = {
    formSelector: '.popup__form',
    inputSelector: '.popup__form-input',
    submitButtonSelector: '.popup__form-button',
    inactiveButtonClass: 'popup__form-button_disabled',
    inputErrorClass: 'popup__form-input_type_error',
    errorClass: 'popup__form-error_visible'
  }

  const newValidation = new FormValidator(objectClass, form);
  newValidation.enabledValidation();
  newValidation.resetValidation();
  newValidation.stateToggleButton();
}

validation(formElementEdit);
validation(formElementAdd);

// Обработчики события когда форма отправлена
formElementEdit.addEventListener('submit', profileEdit);
formElementAdd.addEventListener('submit', addCard);

// Обработчики события при клике
buttonOpenEditProfilePopup.addEventListener('click', () => fillInFormInputs());
popupEditCloseButton.addEventListener('click', () => closePopup(popupTypeEdit));
buttonOpenAddCardPopup.addEventListener('click', () => openPopup(popupTypeAdd));
popupImageCloseButton.addEventListener('click', () => closePopup(popupTypeImage));
popupAddCloseButton.addEventListener('click', () => closePopup(popupTypeAdd));

// Экспорт функций
export { openPopup, popupTypeImage, popupFigureImage, popupFigureLabel }
