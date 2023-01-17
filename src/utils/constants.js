// Массив с данными карточек которые отображаются при загрузке
export const initialCards = [
  {
    title: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    title: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    title: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    title: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    title: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    title: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Переменные для попапа редактирования профиля
export const popupTypeEdit = document.querySelector('.popup_type_edit');
export const popupEditCloseButton = document.querySelector('.popup__close-button_type_edit');
export const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
export const profileName = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__description');
export const formElementEdit = document.querySelector('.popup__form_type_edit');
export const nameInput = formElementEdit.querySelector('.popup__form-input_type_name');
export const descriptionInput = formElementEdit.querySelector('.popup__form-input_type_description');
// Переменные для куда нужно вывести карточки
export const cardsContainer = '.cards';
// Переменные для попапа добавления карточек
export const popupTypeAdd = document.querySelector('.popup_type_add');
export const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
export const popupAddCloseButton = document.querySelector('.popup__close-button_type_add');
export const formElementAdd = document.querySelector('.popup__form_type_add');
export const titleInput = formElementAdd.querySelector('.popup__form-input_type_title');
export const linkInput = formElementAdd.querySelector('.popup__form-input_type_link');
// Переменные для попапа с изображениями
export const popupTypeImage = document.querySelector('.popup_type_image');
export const popupImageCloseButton = document.querySelector('.popup__close-button_type_image');
export const popupFigureImage = document.querySelector('.popup__figure-image');
export const popupFigureLabel = document.querySelector('.popup__figure-label');
// Имена классов формы
export const objectClass = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__form-button_disabled',
  inputErrorClass: 'popup__form-input_type_error',
  errorClass: 'popup__form-error_visible'
}
