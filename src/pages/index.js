import './index.css';

import Section from "../components/Section.js";
import Card from "../components/Card.js";

import { buttonOpenAddCardPopup, buttonOpenEditProfilePopup, cardsContainer, formElementAdd, formElementEdit, initialCards, objectClass, popupAddCloseButton, popupEditCloseButton, popupImageCloseButton, popupTypeAdd, popupTypeEdit, popupTypeImage, profileDescription, profileName } from "../utils/constants.js";

import { FormValidator } from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

// Добавление карточек
const formAdd = new PopupWithForm(popupTypeAdd, formElementAdd, {
  handleFormSubmit: (element) => {
    const cardsLists = new Section({
      items: [ element ],
      renderer: (item) => {
        const card = new Card({
          data: item,
          handleCardClick: () => {
            const imagePopup = new PopupWithImage(popupTypeImage, { data: item });
            imagePopup.open();
            imagePopup.setEventListeners(popupImageCloseButton);
          }
        }, '#template-card');
        const cardElement = card.createCard();
        cardsLists.addItem(cardElement);
      }
    }, cardsContainer);
    cardsLists.renderItems();
  }
});

formAdd.setEventListeners(popupAddCloseButton);

// Редактирование профиля
const formEdit = new PopupWithForm(popupTypeEdit, formElementEdit, {
  handleFormSubmit: (element) => {
    const userInfo = new UserInfo({name: profileName, descr: profileDescription});
    userInfo.setUserInfo();
  }
});

formEdit.setEventListeners(popupEditCloseButton);

// Карточки из массива
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card({
      data: item,
      handleCardClick: () => {
        const imagePopup = new PopupWithImage(popupTypeImage, { data: item });
        imagePopup.open();
        imagePopup.setEventListeners(popupImageCloseButton);
      },
    },
      '#template-card');
    const cardElement = card.createCard();
    cardsList.addItem(cardElement);
  }
}, cardsContainer);

// Функция для активации валидации
function validation(form) {
  const newValidation = new FormValidator(objectClass, form);
  newValidation.enabledValidation();
  newValidation.resetValidation();
  newValidation.stateToggleButton();
}

validation(formElementEdit);
validation(formElementAdd)

const popupAdd = new Popup(popupTypeAdd);
const popupEdit = new Popup(popupTypeEdit);

// Открытие попапа для добавления карточек
buttonOpenAddCardPopup.addEventListener('click', () => {
  popupAdd.open();
});

// Открытие попапа для редактирования профиля и получения данных из профиля
buttonOpenEditProfilePopup.addEventListener('click', () => {
  popupEdit.open();
  const userInfo = new UserInfo({ name: profileName, descr: profileDescription });
  userInfo.getUserInfo();
});

// Рендеренг карточек
cardsList.renderItems();
