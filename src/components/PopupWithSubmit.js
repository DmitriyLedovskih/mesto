import Popup from "./Popup";

export default class PopupWithSubmit extends Popup {
  constructor(popup, form, { handleSubmit }) {
    super(popup);
    this._form = form;
    this._handleSubmit = handleSubmit;
  }

  open(item, card) {
    super.open();
    this._item = item;
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._item, this._card);
    });
  }
}
