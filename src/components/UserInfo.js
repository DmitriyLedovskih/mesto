import { descriptionInput, nameInput } from "../utils/constants.js";

// Класс для измения профиля
export default class UserInfo {
  constructor({ name, descr }) {
    this._selectorName = name;
    this._selectorDescr = descr;
  }

  // Метод для получения данных из профиля
  getUserInfo() {
    nameInput.value =  this._selectorName.textContent;
    descriptionInput.value = this._selectorDescr.textContent;
  }

  // Метод для редактирования профиля
  setUserInfo() {
    this._selectorName.textContent = nameInput.value;
    this._selectorDescr.textContent = descriptionInput.value;
  }
}
