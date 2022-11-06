let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let popupClose = document.querySelector('.popup__close');

editButton.addEventListener('click', function() {
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
    let profileJob = document.querySelector('.profile__job');
    profileName.textContent = nameInputValue;
    profileJob.textContent = jobInputValue;
}

formElement.addEventListener('submit', formSubmitHandler);
