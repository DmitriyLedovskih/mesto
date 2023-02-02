// Класс для создания карточек
export default class Card {
  constructor({ data, handleCardClick, handleDeleteCard, handleLikeCard }, owner, template) {
    this._data = data;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
    this._owner = owner;
    this._template = template;
  }

  // Метод для получения Template
  _getTemplate() {
    return document.querySelector(this._template).content.querySelector('.card').cloneNode(true);
  }

  // Метод для создания карточек
  createCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.card__image').src = this._data.link;
    this._element.querySelector('.card__image').alt = this._data.name;
    this._element.querySelector('.card__title').textContent = this._data.name;
    this._setEventListener();
    this._isLiked();
    this._isOwner();
    return this._element;
  }

  // Метод для вывода количества лайков
  likeCounter(data) {
    this._element.querySelector('.card__like-counter').textContent = data.likes.length;
  }

  // Метода для добавление активного класса для лайка
  likeAdd() {
    this._element.querySelector('.card__like-button').classList.add('card__like-button_active');
  }

  // Метода для убирания активного класса для лайка
  likeRemove() {
    this._element.querySelector('.card__like-button').classList.remove('card__like-button_active');
  }

  // Метод для проверки владельца карточки
  _isOwner() {
    this._owner
      .then(res =>{
      if (this._data.owner._id !== res._id) {
        this._element.querySelector('.card__delete-button').remove();
      }
    })
  }

  // Метод для проверки лайкнутых карточек
  _isLiked() {
     this._owner
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
    this._element.querySelector('.card__like-button').addEventListener('click', (evt) => {
      this._handleLikeCard(evt);
    });
    this._element.querySelector('.card__image').addEventListener('click', () => this._handleCardClick());
    this._element.querySelector('.card__delete-button').addEventListener('click', () => this._handleDeleteCard());
  }
}
