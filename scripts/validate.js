// Функция для показа подсказки
function showError(input, errorMessage, settings) {
  const error = document.querySelector(`.${input.id}-error`)
  input.classList.add(settings.inputErrorClass);
  error.textContent = errorMessage;
  error.classList.add(settings.errorClass);
}

// Функция для скрытия подсказки
function hiddenError(input, settings) {
  const error = document.querySelector(`.${input.id}-error`)
  input.classList.remove(settings.inputErrorClass);
  error.textContent = '';
  error.classList.remove(settings.errorClass);
}

// Функция для проверки валидации инпутов
function inputValidate(input, settings) {
  if (!input.validity.valid) {
    showError(input, input.validationMessage, settings);
  } else {
    hiddenError(input, settings);
  }
}

// Функция для добавленния обработчика события инпутов
function setEventListener(form, settings) {
  const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
  const button = form.querySelector(settings.submitButtonSelector);

  stateToggleButton(inputList, button, settings);
  inputList.forEach(element => {
    element.addEventListener('input', () => {
      inputValidate(element, settings);
      stateToggleButton(inputList, button, settings);
    });
  });
}

// Функция для добавленния обработчика события всем формам
function enabledValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach(element => {
    setEventListener(element, settings);
  });
}

enabledValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__form-button_disabled',
  inputErrorClass: 'popup__form-input_type_error',
  errorClass: 'popup__form-error_visible'
});

// Функция для проверки что во всех полях нет ошибки
function hasInvalidInput(input) {
  return input.some(element => {
    return !element.validity.valid;
  });
}

// Функция для отключения и включения кнопки
function stateToggleButton(input, button, settings) {
  if (hasInvalidInput(input)) {
    button.classList.add(settings.inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(settings.inactiveButtonClass);
    button.disabled = false;
  }
}
