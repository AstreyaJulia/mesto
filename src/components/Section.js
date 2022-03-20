/** Отрисовщик элементов страницы */
export class Section {

  /** Конструктор элемента
   * @param items - массив данных, добавляемых на страницу при инициализации класса
   * @param renderer - ф-я создающая и орисовывающая данные
   * @param containerSelector - селектор контейнера, в который добавляются созданные элементы
   */
  constructor({items, renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this._items = items;
  }

  /** Добавляет элемент в контейнер
   * @param element - добавляемый DOM-элемент
   */
  addItem(element){
    this._container.prepend(element);
  }

  /** Отрисовывает элементы (вначале очищает содержимое контейнера) */
  renderElements(){
    this._container.innerHTML = '';
    this._items.forEach((element) => {
      this._renderer(element);
    });
  }

}
