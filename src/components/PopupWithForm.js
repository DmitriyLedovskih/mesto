import { objectClass } from "../utils/constants.js";
import { FormValidator } from "./FormValidator.js";
import Popup from "./Popup.js";

// Класс для отправки форм
export default class PopupWithForm extends Popup {
  constructor(popup, form, { handleFormSubmit }) {
    super(popup);
    this._form = form;
    this._handleFormSubmit = handleFormSubmit;
  }

  // Метод для получения данных из инпутов
  _getInputValues() {
    this._inputList = Array.from(this._form.querySelectorAll(objectClass.inputSelector));
    const dataObject = {};
    this._inputList.forEach(input => {
      dataObject[input.name] = input.value;
    });
    return dataObject;
  }
  
  // Метод для добавления обработчиков события
  setEventListeners(popupClose) {
    super.setEventListeners(popupClose);
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
      new FormValidator(objectClass, this._form).resetValidation()
    });
  }

  // Метод для очистки форм при закрытие попапа
  close() {
    super.close();
    this._form.reset();
  }
}
