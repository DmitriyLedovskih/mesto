// Класс для попапов
export default class Popup {
  constructor(popup) {
    this._popup = popup;
  }

  // Метод для открытия попапа
  open() {
    this._popup.classList.add('popup_opened');
    this._handleEscClose = this._handleEscClose.bind(this);
    document.addEventListener('keydown', this._handleEscClose);
  }

  // Метод для закрытия попапа
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // Метод для закрытие попапа по клику на esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  // Метод для добавления обработчиков события
  setEventListeners(popupClose) {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
    popupClose.addEventListener('click', () => this.close());
  }
}
