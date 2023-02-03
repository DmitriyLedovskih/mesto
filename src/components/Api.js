// Класс Api для подключения к серверу
export default class Api {
  constructor(options) {
    this._options = options;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  }

  // Метод для получения карточек
  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers
    })
    .then(this._checkResponse);
  }

  // Метод для получения данных пользователя
  getProfileInfo() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers
    })
    .then(this._checkResponse);
  }

  // Метод для изменея данных пользователя
  profileEdit(inputData) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        name: inputData.name,
        about: inputData.about
      })
    })
    .then(this._checkResponse);
  }

  // Метод для добавления карточек
  addCard(cardData) {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })
    })
    .then(this._checkResponse);
  }

  // Метод для удаление карточек
  deleteCard(id) {
    return fetch(`${this._options.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._options.headers,
    })
    .then(this._checkResponse);
  }

    // Метод для измения аватара
  editAvatar(avatarData) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        avatar: avatarData.avatar
      })
    })
    .then(this._checkResponse);
  }

  // Метод для добавления лайков
  handleLikeCard(id) {
    return fetch(`${this._options.baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._options.headers,
    })
    .then(this._checkResponse);
  }

  // Метод для удаления лайков
  deleteLikeCard(id) {
    return fetch(`${this._options.baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._options.headers,
    })
    .then(this._checkResponse);
  }
}
