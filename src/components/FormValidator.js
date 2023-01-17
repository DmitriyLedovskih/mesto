// Класс для валидации форм
class FormValidator {
  constructor(settings, form) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = form;
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
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    return inputList.some(element => {
      return !element.validity.valid;
    });
  }

  // Метод для отключения и включения кнопки
  stateToggleButton() {
    const button = this._form.querySelector(this._submitButtonSelector);
    if (this._hasInvalidInput()) {
      button.classList.add(this._inactiveButtonClass);
      button.disabled = true;
    } else {
      button.classList.remove(this._inactiveButtonClass);
      button.disabled = false;
    }
  }

  // Метод для добавления обработчика события
  _setEventListener() {
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this.stateToggleButton();
    inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._inputValidate(input);
        this.stateToggleButton();
      });
    });
  }

  resetValidation() {
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    inputList.forEach(input => {
      this._hiddenError(input);
      this.stateToggleButton();
    });
  }

  // Метод для включения валидации
  enabledValidation() {
    this._setEventListener();
  }
}

export{ FormValidator }
