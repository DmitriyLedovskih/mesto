// Класс для измения профиля
export default class UserInfo {
  constructor(selectorName, selectorDescr) {
    this._selectorName = document.querySelector(selectorName);
    this._selectorDescr = document.querySelector(selectorDescr);
  }

  // Метод для получения данных из профиля
  getUserInfo() {
    return {
      name: this._selectorName.textContent,
      description: this._selectorDescr.textContent
    };
  }

  // Метод для редактирования профиля
  setUserInfo(data) {
    this._selectorName.textContent = data.name;
    this._selectorDescr.textContent = data.description;
  }
}
