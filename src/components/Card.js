// Класс для создания карточек
export default class Card {
  constructor({ data, handleCardClick, handleDeleteCard, handleLikeCard }, userData, template) {
    this._data = data;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
    this.userData = userData;
    this._template = template;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._likeCounter = this._element.querySelector('.card__like-counter');
    this._likeButton = this._element.querySelector('.card__like-button');
    this._deleteButton = this._element.querySelector('.card__delete-button');
    this._cardTitle = this._element.querySelector('.card__title');
  }

  // Метод для получения Template
  _getTemplate() {
    return document.querySelector(this._template).content.querySelector('.card').cloneNode(true);
  }

  // Метод для создания карточек
  createCard() {
    this._cardImage.src = this._data.link;
    this._cardImage.alt = this._data.name;
    this._cardTitle.textContent = this._data.name;
    this._isLiked();
    this._isOwner();
    this._setEventListener();
    return this._element;
  }

  // Метод для вывода количества лайков
  likeCounter(data) {
    this._likeCounter.textContent = data.likes.length;
  }

  // Метода для добавление активного класса для лайка
  likeAdd() {
    this._likeButton.classList.add('card__like-button_active');
  }

  // Метода для убирания активного класса для лайка
  likeRemove() {
    this._likeButton.classList.remove('card__like-button_active');
  }

  // Метод для проверки владельца карточки
  _isOwner() {
    this.userData
      .then(res =>{
      if (this._data.owner._id !== res._id) {
        this._deleteButton.remove();
      }
    })
  }

  // Метод для проверки лайкнутых карточек
  _isLiked() {
     this.userData
      .then(res =>{
        this._data.likes.forEach(element => {
          if (element._id === res._id) {
            this.likeAdd();
          } else {
            this.likeRemove();
          }
        });
    })
  }

  // Метод для добавленеия обработчиков события
  _setEventListener() {
    this._likeButton.addEventListener('click', (evt) => {
      this._handleLikeCard(evt);
    });
    this._cardImage.addEventListener('click', () => this._handleCardClick());
    this._deleteButton.addEventListener('click', () => this._handleDeleteCard());
  }
}
