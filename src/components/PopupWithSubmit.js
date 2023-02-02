import Popup from "./Popup";

export default class PopupWithSubmit extends Popup {
  constructor(popup, form, { handleSubmit }) {
    super(popup);
    this._form = form;
    this._handleSubmit = handleSubmit;
  }

  setEventListeners(data, card) {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit(data, card);
    });
  }
}
