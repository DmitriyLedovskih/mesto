import Popup from "./Popup.js";

// Класс для открытия попапа картинок
export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._popupFigureImage = document.querySelector('.popup__figure-image');
    this._popupFigureLabel = document.querySelector('.popup__figure-label');
  }

  // Метод для получения данных карточки
  open(data) {
    super.open();
    this._name = data.name;
    this._link = data.link;

    this._popupFigureImage.src = this._link;
    this._popupFigureImage.alt = this._name;
    this._popupFigureLabel.textContent = this._name;
  }
}
