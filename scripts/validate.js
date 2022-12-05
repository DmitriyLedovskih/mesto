// Функция для показа подсказки
function showError(input, errorMessage) {
  const error = document.querySelector(`.${input.id}-error`)
  input.classList.add('popup__form-input_type_error');
  error.textContent = errorMessage;
}

// Функция для скрытия подсказки
function hiddenError(input) {
  const error = document.querySelector(`.${input.id}-error`)
  input.classList.remove('popup__form-input_type_error');
  error.textContent = '';
}

// Функция для проверки валидации инпутов
function inputValidate(input) {
  if (!input.validity.valid) {
    showError(input, input.validationMessage);
  } else {
    hiddenError(input);
  }
}

// Функция для добавленния обработчика события инпутов
function setEventListener(form) {
  const inputList = Array.from(form.querySelectorAll('.popup__form-input'));
  const button = form.querySelector('.popup__form-button');
  
  stateToggleButton(inputList, button);
  inputList.forEach(element => {
    element.addEventListener('input', () => {
      inputValidate(element);
      stateToggleButton(inputList, button);
    });
  });
}

// Функция для добавленния обработчика события всем формам
function enabledValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach(element => {
    element.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListener(element);
  });
}

enabledValidation();

// Функция для проверки что во всех полях нет ошибки
function hasInvalidInput(input) {
  return input.some(element => {
    return !element.validity.valid;
  });
}

// Функция для отключения и включения кнопки
function stateToggleButton(input, button) {
  if (hasInvalidInput(input)) {
    button.classList.add('popup__form-button_disabled');
  } else {
    button.classList.remove('popup__form-button_disabled');
  }
}
