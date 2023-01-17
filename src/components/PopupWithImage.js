import { popupFigureImage, popupFigureLabel } from "../utils/constants.js";
import Popup from "./Popup.js";

// Класс для открытия попапа картинок
export default class PopupWithImage extends Popup {
  constructor(popup, { data }) {
    super(popup);
    this._name = data.title;
    this._link = data.link;
  }

  // Метод для получения данных карточки
  open() {
    super.open();

    popupFigureImage.src = this._link;
    popupFigureImage.alt = this._name;
    popupFigureLabel.textContent = this._name;
  }
}
