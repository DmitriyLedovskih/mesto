// Класс для валидации форм
class FormValidator {
  constructor(settings, input, form) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._input = input;
    this._form = form;
  }

  // Метод для показа подсказки
  _showError() {
    const error = document.querySelector(`.${this._input.id}-error`);
    this._input.classList.add(this._inputErrorClass);
    error.textContent = this._input.validationMessage;
    error.classList.add(this._errorClass);
  }

  // Метод для скрытия подсказки
  _hiddenError() {
    const error = document.querySelector(`.${this._input.id}-error`)
    this._input.classList.remove(this._inputErrorClass);
    error.textContent = '';
    error.classList.remove(this._errorClass);
  }

  // Метод для проверки валидации инпутов
  _inputValidate() {
    if (!this._input.validity.valid) {
      this._showError();
    } else {
      this._hiddenError();
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
  _stateToggleButton() {
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
    this._input.addEventListener('input', () => {
      this._inputValidate();
      this._stateToggleButton();
    });
    this._stateToggleButton();
  }

  // Метод для включения валидации
  enabledValidation() {
    this._setEventListener();
  }
}

// Функция для активации валидации
function validation() {
  const objectClass = {
    formSelector: '.popup__form',
    inputSelector: '.popup__form-input',
    submitButtonSelector: '.popup__form-button',
    inactiveButtonClass: 'popup__form-button_disabled',
    inputErrorClass: 'popup__form-input_type_error',
    errorClass: 'popup__form-error_visible'
  }

  const inputList = Array.from(document.querySelectorAll(objectClass.inputSelector));
  const formList = Array.from(document.querySelectorAll(objectClass.formSelector));

  formList.forEach(form => {
    inputList.forEach(input => {
      new FormValidator(objectClass, input, form).enabledValidation();
    });
  });
}

validation();
