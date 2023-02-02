export default class Api {
  constructor(options) {
    this._options = options;
  }

  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers
    })
    .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  }

  getProfileInfo() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers
    })
    .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  }

  profileEdit(inputData) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        name: inputData.name,
        about: inputData.about
      })
    })
    .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  }

  addCard(cardData) {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })
    })
    .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  }

  deleteCard(id) {
    return fetch(`${this._options.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._options.headers,
    })
    .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  }

  editAvatar(avatarData) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        avatar: avatarData.avatar
      })
    })
    .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  }

  handleLikeCard(id) {
    return fetch(`${this._options.baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._options.headers,
    })
    .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  }

  deleteLikeCard(id) {
    return fetch(`${this._options.baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._options.headers,
    })
    .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  }

}
