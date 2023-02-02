import { objectClass } from "../utils/constants.js";
import Popup from "./Popup.js";

// Класс для отправки форм
export default class PopupWithForm extends Popup {
  constructor(popup, form, { handleFormSubmit }) {
    super(popup);
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(objectClass.inputSelector));
    this._handleFormSubmit = handleFormSubmit;
  }

  // Метод для получения данных из инпутов
  _getInputValues() {
    const dataObject = {};
    this._inputList.forEach(input => {
      dataObject[input.name] = input.value;
    });
    return dataObject;
  }

  // Метод для добавления обработчиков события
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  // Метод для очистки форм при закрытие попапа
  close() {
    super.close();
    this._form.reset();
  }
}
