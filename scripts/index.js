// Переменные для попапа редактирования профиля
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupEditCloseButton = document.querySelector('.popup__close-button_type_edit');
const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const formElementEdit = document.querySelector('.popup__form_type_edit');
const nameInput = formElementEdit.querySelector('.popup__form-input_type_name');
const descriptionInput = formElementEdit.querySelector('.popup__form-input_type_description');
// Переменные для попапа добавления карточек
const popupTypeAdd = document.querySelector('.popup_type_add');
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
const popupAddCloseButton = document.querySelector('.popup__close-button_type_add');
const formElementAdd = document.querySelector('.popup__form_type_add');
const titleInput = formElementAdd.querySelector('.popup__form-input_type_title');
const linkInput = formElementAdd.querySelector('.popup__form-input_type_link');
// Переменные для карточек
const cardsContainer = document.querySelector('.cards');
const templateCard = document.querySelector('#template-card').content;
// Переменные для попапа с изображениями
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImageCloseButton = document.querySelector('.popup__close-button_type_image');
const popupContainerImage = document.querySelector('.popup__container-image');
const popupFigureImage = document.querySelector('.popup__figure-image');
const popupFigureLabel = document.querySelector('.popup__figure-label');

// Функция для лайка карточек
function likeCard(e) {
  e.target.classList.toggle('card__like-button_active');
}

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
function closeOverlay(e) {
  if (e.target === e.currentTarget) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// Функция для закрытие попапа с помощью клавиши Esc
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// Функция для удаления карточек
function removeCard(element) {
  element.remove();
}

// Функция для создания карточек
function createCard(data) {
  const templateElement = templateCard.querySelector('.card').cloneNode(true);
  const cardImage = templateElement.querySelector('.card__image');
  const cardTitle = templateElement.querySelector('.card__title');
  const cardLike = templateElement.querySelector('.card__like-button');
  const cardDelete  = templateElement.querySelector('.card__delete-button');
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  cardLike.addEventListener('click', likeCard);
  cardImage.addEventListener('click', () => openImagePopup(data));
  cardDelete.addEventListener('click', () => removeCard(templateElement));
  return templateElement;
}

function renderInitialCards() {
  initialCards.forEach(data => {
    const card = createCard(
      {
        name: data.name,
        link: data.link
      }
    );
    renderingCard(cardsContainer, card)
  });
}

renderInitialCards();

// Функция для добавления карточек
function addCard(evt) {
  evt.preventDefault();
  const card = createCard(
    {
      name: titleInput.value,
      link: linkInput.value
    }
  );
  renderingCard(cardsContainer, card)
  formElementAdd.reset();
  const popupButton = evt.submitter;
  popupButton.classList.add('popup__form-button_disabled');
  popupButton.disabled = true;
  closePopup(popupTypeAdd);
}

// Функция для вывода карточек
function renderingCard(container, card) {
  container.prepend(card);
}

// Функция для рендеринга картинок при открытие попапа
function openImagePopup(data) {
  popupFigureImage.src = data.link;
  popupFigureImage.alt = data.name;
  popupFigureLabel.textContent = data.name;
  openPopup(popupTypeImage);
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

// Обработчики события когда форма отправлена
formElementEdit.addEventListener('submit', profileEdit);
formElementAdd.addEventListener('submit', addCard);

// Обработчики события при клике
buttonOpenAddCardPopup.addEventListener('click', () => openPopup(popupTypeAdd));
buttonOpenEditProfilePopup.addEventListener('click', () => fillInFormInputs());
popupAddCloseButton.addEventListener('click', () => closePopup(popupTypeAdd));
popupEditCloseButton.addEventListener('click', () => closePopup(popupTypeEdit));
popupImageCloseButton.addEventListener('click', () => closePopup(popupTypeImage));
