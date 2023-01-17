// Класс для вывода элемонтов на страницу
export default class Section {
  constructor({ items, renderer }, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(container);
  }

  // Метод для получения элементов массива
  renderItems() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }

  // Метод для вывода элементов
  addItem(element) {
    this._container.prepend(element);
  }
}
