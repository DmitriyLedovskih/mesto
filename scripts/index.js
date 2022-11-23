// Переменные для попапа редактирования профиля
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupEditCloseButton = document.querySelector('.popup__close-button_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formElementEdit = document.querySelector('.popup__form');
const nameInput = formElementEdit.querySelector('.popup__form-input_type_name');
const jobInput = formElementEdit.querySelector('.popup__form-input_type_job');
// Переменные для попапа добавления карточек
const popupTypeAdd = document.querySelector('.popup_type_add');
const addButton = document.querySelector('.profile__add-button');
const popupAddCloseButton = document.querySelector('.popup__close-button_type_add');
const formElementAdd = document.querySelector('.popup__form_type_add');
const titleInput = formElementAdd.querySelector('.popup__form-input_type_title');
const linkInput = formElementAdd.querySelector('.popup__form-input_type_link');
// Переменные для карточек
const cards = document.querySelector('.cards');
const templateCard = document.querySelector('#template-card').content;
// Переменные для попапа с изображениями
const templateImage = document.querySelector('#template-image').content;
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImageCloseButton = document.querySelector('.popup__close-button_type_image');
const PopupContainerImage = document.querySelector('.popup__container-image');

// Массив с данными карточек которые отображаются при загрузке
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Функция для лайка карточек
function likeCard(e) {
  e.target.classList.toggle('card__like-button_active');
}

// Функция для открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Функция для закрытия попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Функция для удаления карточек и картинок при закрытие попапа с картинками
function removeElement(element) {
  element.remove();
}

// Функция для рендеренга карточек при загрузке сайта
function renderCard() {
  initialCards.forEach(element => {
    const templateElement = templateCard.querySelector('.card').cloneNode(true);
    const cardImage = templateElement.querySelector('.card__image');
    const cardTitle = templateElement.querySelector('.card__title');
    const cardLike = templateElement.querySelector('.card__like-button');
    const cardDelete  = templateElement.querySelector('.card__delete-button');
    cardImage.src = element.link;
    cardImage.alt = element.name;
    cardTitle.textContent = element.name;
    cardLike.addEventListener('click', likeCard);
    cardImage.addEventListener('click', () => renderImage(cardImage));
    cardDelete.addEventListener('click', () => removeElement(templateElement));
    cardImage.addEventListener('click', () => openPopup(popupTypeImage));
    cards.append(templateElement);
  });
}

renderCard();

// Функция для добавления карточек
function addCard(evt) {
  evt.preventDefault();
  const templateElement = templateCard.querySelector('.card').cloneNode(true);
  const cardImage = templateElement.querySelector('.card__image');
  const cardTitle = templateElement.querySelector('.card__title');
  const cardLike = templateElement.querySelector('.card__like-button');
  const cardDelete  = templateElement.querySelector('.card__delete-button');
  cardImage.src = linkInput.value;
  cardImage.alt = titleInput.value;
  cardTitle.textContent = titleInput.value;
  cardLike.addEventListener('click', likeCard);
  cardImage.addEventListener('click', () => renderImage(cardImage));
  cardDelete.addEventListener('click', () => removeElement(templateElement));
  cardImage.addEventListener('click', () => openPopup(popupTypeImage));
  cards.prepend(templateElement);
  titleInput.value = '';
  linkInput.value = '';
  closePopup(popupTypeAdd);
}

// Функция для рендеринга картинок при открытие попапа
function renderImage(cardImage) {
  const templateElement = templateImage.querySelector('.popup__figure').cloneNode(true);
  const popupFigureImage = templateElement.querySelector('.popup__figure-image');
  const popupFigureLabel = templateElement.querySelector('.popup__figure-label');
  popupFigureImage.src = cardImage.src;
  popupFigureImage.alt = cardImage.alt;
  popupFigureLabel.textContent = cardImage.alt;
  popupImageCloseButton.addEventListener('click', () => removeElement(templateElement));
  PopupContainerImage.append(templateElement);
}

// Функция для получения данных с профиля и добавления их в инпуты
function popupFormItem() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

popupFormItem();

// Функция для редактирования профиля
function profileEdit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupTypeEdit);
}

// Обработчики события когда форма отправлена

formElementEdit.addEventListener('submit', profileEdit);
formElementAdd.addEventListener('submit', addCard);

// Обработчики события при клике
addButton.addEventListener('click', () => openPopup(popupTypeAdd));
editButton.addEventListener('click', () => openPopup(popupTypeEdit));
popupAddCloseButton.addEventListener('click', () => closePopup(popupTypeAdd));
popupEditCloseButton.addEventListener('click', () => closePopup(popupTypeEdit));
popupImageCloseButton.addEventListener('click', () => closePopup(popupTypeImage));
