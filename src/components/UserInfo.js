// Класс для измения профиля
export default class UserInfo {
  constructor(selectorName, selectorDescr, selectorAvatar) {
    this._selectorName = document.querySelector(selectorName);
    this._selectorDescr = document.querySelector(selectorDescr);
    this._selectorAvatar = document.querySelector(selectorAvatar);
  }

  // Метод для получения данных из профиля
  getUserInfo() {
    return {
      name: this._selectorName.textContent,
      about: this._selectorDescr.textContent
    };
  }

  // Метод для редактирования профиля
  setUserInfo(data) {
    this._selectorName.textContent = data.name;
    this._selectorDescr.textContent = data.about;
    // this._selectorAvatar.src = data.avatar;
  }
}
