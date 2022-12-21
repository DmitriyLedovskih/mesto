// Переменные для попапа редактирования профиля
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupEditCloseButton = document.querySelector('.popup__close-button_type_edit');
const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const formElementEdit = document.querySelector('.popup__form_type_edit');
const nameInput = formElementEdit.querySelector('.popup__form-input_type_name');
const descriptionInput = formElementEdit.querySelector('.popup__form-input_type_description');

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
  openPopup(popupTypeEdit);

}
// Функция для редактирования профиля
function profileEdit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupTypeEdit);
}

// Обработчик события когда форма отправлена
formElementEdit.addEventListener('submit', profileEdit);

// Обработчики события при клике
buttonOpenEditProfilePopup.addEventListener('click', () => fillInFormInputs());
popupEditCloseButton.addEventListener('click', () => closePopup(popupTypeEdit));

// Экспорт функций
export {openPopup, closePopup}
