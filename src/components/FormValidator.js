// Класс для валидации форм
export default class FormValidator {
  constructor(settings, form) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._formButton = this._form.querySelector(this._submitButtonSelector);
  }

  // Метод для показа подсказки
  _showError(input) {
    const error = document.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    error.textContent = input.validationMessage;
    error.classList.add(this._errorClass);
  }

  // Метод для скрытия подсказки
  _hiddenError(input) {
    const error = document.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    error.textContent = '';
    error.classList.remove(this._errorClass);
  }

  // Метод для проверки валидации инпутов
  _inputValidate(input) {
    if (!input.validity.valid) {
      this._showError(input);
    } else {
      this._hiddenError(input);
    }
  }

  // Метод для проверки какие поля не валидные
  _hasInvalidInput() {
    return this._inputList.some(element => {
      return !element.validity.valid;
    });
  }

  // Метод для отключения и включения кнопки
  _stateToggleButton() {
    if (this._hasInvalidInput()) {
      this._formButton.classList.add(this._inactiveButtonClass);
      this._formButton.disabled = true;
    } else {
      this._formButton.classList.remove(this._inactiveButtonClass);
      this._formButton.disabled = false;
    }
  }

  // Метод для добавления обработчика события
  _setEventListener() {
    this._stateToggleButton();
    this._inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._inputValidate(input);
        this._stateToggleButton();
      });
    });
  }

  // Метод для сброса валидации
  resetValidation() {
    this._inputList.forEach(input => {
      this._hiddenError(input);
      this._stateToggleButton();
    });
  }

  // Метод для включения валидации
  enabledValidation() {
    this._setEventListener();
  }
}
