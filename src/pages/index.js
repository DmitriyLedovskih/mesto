import './index.css';

import Section from "../components/Section.js";
import Card from "../components/Card.js";

import { buttonOpenAddCardPopup, buttonOpenEditProfilePopup, cardsContainer, descriptionInput, formElementAdd, formElementEdit, initialCards, nameInput, objectClass, popupAddCloseButton, popupEditCloseButton, popupImageCloseButton, popupTypeAdd, popupTypeEdit, popupTypeImage, profileDescription, profileName } from "../utils/constants.js";

import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

// Классы для активации валидации
const formAddValidation = new FormValidator(objectClass, formElementAdd);
formAddValidation.enabledValidation();

const formEditValidation = new FormValidator(objectClass, formElementEdit);
formEditValidation.enabledValidation();

// Добавление карточек
const formAdd = new PopupWithForm(popupTypeAdd, formElementAdd, {
  handleFormSubmit: (element) => {
    createCard(element);
  }
});

formAdd.setEventListeners();

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    createCard(item);
  }
}, cardsContainer);

// Класс для редактирования профиля
const userInfo = new UserInfo(profileName, profileDescription);

// Редактирование профиля
const formEdit = new PopupWithForm(popupTypeEdit, formElementEdit, {
  handleFormSubmit: (element) => {
    userInfo.setUserInfo(element);
  }
});

formEdit.setEventListeners();

// Класс для попапа с изображением
const imagePopup = new PopupWithImage(popupTypeImage);

imagePopup.setEventListeners();

// Функция для создания карточек
function createCard(item) {
  const card = new Card({
    data: item,
    handleCardClick: () => {
      imagePopup.open(item);
    },
  },
    '#template-card');
  const cardElement = card.createCard();
  cardsList.addItem(cardElement);
}

// Открытие попапа для добавления карточек
buttonOpenAddCardPopup.addEventListener('click', () => {
  formAdd.open();
  formAddValidation.resetValidation();
});

// Открытие попапа для редактирования профиля и получения данных из профиля
buttonOpenEditProfilePopup.addEventListener('click', () => {
  formEdit.open();
  nameInput.value = userInfo.getUserInfo().name;
  descriptionInput.value = userInfo.getUserInfo().description;
  formAddValidation.resetValidation();
});

// Рендеренг карточек
cardsList.renderItems();
