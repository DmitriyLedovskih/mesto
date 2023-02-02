import './index.css';

import Section from "../components/Section.js";
import Card from "../components/Card.js";

import { buttonOpenAddCardPopup, buttonOpenAvatarPopup, buttonOpenEditProfilePopup, cardsContainer, descriptionInput, formButtonAdd, formButtonAvatar, formButtonDelete, formButtonEdit, formElementAdd, formElementAvatar, formElementDelete, formElementEdit, nameInput, objectClass, popupTypeAdd, popupTypeAvatar, popupTypeDelete, popupTypeEdit, popupTypeImage, profileAvatar, profileDescription, profileName } from "../utils/constants.js";

import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from '../components/Api';
import PopupWithSubmit from '../components/PopupWithSubmit';

// Классы для активации валидации
const formAddValidation = new FormValidator(objectClass, formElementAdd);
formAddValidation.enabledValidation();

const formEditValidation = new FormValidator(objectClass, formElementEdit);
formEditValidation.enabledValidation();

const formAvatarValidation = new FormValidator(objectClass, formElementAvatar);
formAvatarValidation.enabledValidation();

// Класс api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: '35b7582a-9aef-4479-9408-c27ee8593bdb',
    'Content-Type': 'application/json'
  }
});

// Метод для получения карточек
api.getInitialCards()
  .then(result => {
    cardsList.renderItems(result);
  })
  .catch(err => {
    console.log(err);
  });

// Метод для получения данных пользователя
const owner = api.getProfileInfo()
  .then(result => {
    userInfo.setUserInfo(result);
    profileAvatar.src = result.avatar;
    return result;
  })
  .catch(err => {
    console.log(err);
  });

// Добавление карточек
const formAdd = new PopupWithForm(popupTypeAdd, formElementAdd, {
  handleFormSubmit: (element) => {
    formButtonAdd.textContent = 'Сохранение...';
    api.addCard(element)
    .then(result => {
      createCard(result);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      setTimeout(function () {
        formButtonAdd.textContent = 'Создать';
        formAdd.close();
      }, 500);
    });
  }
});

formAdd.setEventListeners();

// Класс для отрисовки карточек
const cardsList = new Section({
  renderer: (item) => {
    createCard(item);
  }
}, cardsContainer);

// Класс для редактирования профиля
const userInfo = new UserInfo(profileName, profileDescription);

// Редактирование профиля
const formEdit = new PopupWithForm(popupTypeEdit, formElementEdit, {
  handleFormSubmit: (element) => {
    formButtonEdit.textContent = 'Сохранение...';
    userInfo.setUserInfo(element);
    api.profileEdit(element)
    .then(result => {
      return result;
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      setTimeout(function () {
        formButtonEdit.textContent = 'Сохранить';
        formEdit.close();
      }, 500);
    });
  }
});

formEdit.setEventListeners();

// Класс для попапа с изображением
const imagePopup = new PopupWithImage(popupTypeImage);

imagePopup.setEventListeners();

// Класс для попапа удлаления карточек
const deletePopup = new PopupWithSubmit(popupTypeDelete, formElementDelete, {
  handleSubmit: (data, card) => {
    formButtonDelete.textContent = 'Удаление...';
    api.deleteCard(data._id)
      .then(result => {
        card.remove();
        return result;
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setTimeout(function () {
          formButtonDelete.textContent = 'Да';
          deletePopup.close();
        }, 500);
      })
  }
});

// Функция для создания карточек
function createCard(item) {
  const card = new Card({
    data: item,
    handleCardClick: () => {
      imagePopup.open(item);
    },
    handleDeleteCard: () => {
      deletePopup.open();
      deletePopup.setEventListeners(item, cardElement);
    },
    handleLikeCard: (evt) => {
      if (evt.target.classList.contains('card__like-button_active')) {
        api.deleteLikeCard(item._id)
          .then(result => {
            card.likeCounter(result);
            card.likeRemove();
            return result;
          })
          .catch(err => {
            console.log(err);
          })
      } else {
        api.handleLikeCard(item._id)
          .then(result => {
            card.likeCounter(result);
            card.likeAdd();
            return result;
          })
          .catch(err => {
            console.log(err);
          });
          evt.target.classList.add('card__like-button_active')
      }
    }
  },
  owner,
    '#template-card',
    );
  const cardElement = card.createCard();
  card.likeCounter(item);
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
  descriptionInput.value = userInfo.getUserInfo().about;
  formAddValidation.resetValidation();
});

// Редоктирования аватара
const popupAvatar = new PopupWithForm(popupTypeAvatar, formElementAvatar, {
  handleFormSubmit: (element) => {
    formButtonAvatar.textContent = 'Сохранение...';
    profileAvatar.src = element.avatar;
    api.editAvatar(element)
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setTimeout(function () {
          formButtonAvatar.textContent = 'Сохранить';
          popupAvatar.close();
        }, 500);
      });
    }
});

popupAvatar.setEventListeners();

buttonOpenAvatarPopup.addEventListener('click', () => {
  popupAvatar.open();
  formAvatarValidation.resetValidation();
});

// Рендеренг карточек
// cardsList.renderItems();
