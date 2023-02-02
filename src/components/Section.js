// Класс для вывода элемонтов на страницу
export default class Section {
  constructor({ renderer }, container) {
    this._renderer = renderer;
    this._container = document.querySelector(container);
  }

  // Метод для получения элементов массива
  renderItems(items) {
    items.forEach(item => {
      this._renderer(item);
    });
  }

  // Метод для вывода элементов
  addItem(element) {
    this._container.prepend(element);
  }
}
