let popup = document.querySelector('.popup');
let buttonEdit = document.querySelector('.profile__button-edit');
let popupClose = document.querySelector('.popup__close');

buttonEdit.addEventListener('click', function() {
  popup.classList.add('popup_opened');
});

popupClose.addEventListener('click', function() {
  popup.classList.remove('popup_opened');
});

let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__form-input_type_name')
let jobInput = formElement.querySelector('.popup__form-input_type_job')

function formSubmitHandler (evt) {
    evt.preventDefault();

    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;
    let profileName = document.querySelector('.profile__name');
    let profileJob = document.querySelector('.profile__description');
    profileName.textContent = nameInputValue;
    profileJob.textContent = jobInputValue;
}

formElement.addEventListener('submit', formSubmitHandler);
