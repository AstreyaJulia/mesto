import {getImage} from "./index.js";

export class Card {
  /** Конструктор карточки
   * @param cardTemplateSelector - селектор шаблона карточки из разметки
   * @param item - элемент из массива {name: название, link: ссылка} */
  constructor(item, cardTemplateSelector) {
    this._name = item.name;
    this._link = item.link;
    this._cardElement = cardTemplateSelector;
  }

  /** Получает шаблон, клонирует его
   * @returns {Node} - элемент карточки
   * @private */
  _getCardTemplate() {
    return document.querySelector(this._cardElement).content.cloneNode(true);
  }

  /** Переключает кнопку Лайк на карточках фотографий */
  _likePhoto(evt) {
    evt.target.classList.toggle("photo-card__button_active");
  }

  /** Удаляет карточку */
  _deletePhoto(evt) {
    evt.target.closest('li').remove();
  }

  /** Устанавливает прослушиватели: лайк, удаление, нажатие на изображение
   * @private */
  _setEventListeners() {
    this._cardItem.querySelector('.photo-card__button').addEventListener('click', this._likePhoto);
    this._cardItem.querySelector('.photo-card__delete').addEventListener('click', this._deletePhoto);
    this._cardImage.addEventListener('click', getImage);
  }

  /** Создает карточку, заполняет название, ссылку на изображение, устанавливает прослушиватели
   * @returns {Node} - заполненный элемент карточки с установленными прослушивателями */
  createCard() {
    this._cardItem = this._getCardTemplate();
    this._cardImage = this._cardItem.querySelector('.photo-card__image');
    this._cardItem.querySelector('.photo-card__title').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._setEventListeners();
    return this._cardItem;
  }
}
