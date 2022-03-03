import {getImage, likePhoto, deletePhoto} from "./index.js";

export class Card {
  /**
   * Конструктор карточки
   * @param cardTemplateSelector - селектор шаблона карточки из разметки
   * @param item - элемент из массива {name: название, link: ссылка}
   */
  constructor(item, cardTemplateSelector) {
    this._name = item.name;
    this._link = item.link;
    this._cardElement = cardTemplateSelector;
  }

  /**
   * Получает шаблон, клонирует его
   * @returns {Node} - элемент карточки
   * @private
   */
  _getCardTemplate() {
    return document.querySelector(this._cardElement).content.cloneNode(true);
  }

  /**
   * Устанавливает прослушиватели: лайк, удаление, нажатие на изображение
   * @private
   */
  _setEventListeners() {
    this._cardItem.querySelector('.photo-card__button').addEventListener('click', likePhoto);
    this._cardItem.querySelector('.photo-card__delete').addEventListener('click', deletePhoto);
    this._cardImage.addEventListener('click', getImage);
  }

  /**
   * Создает карточку, заполняет название, ссылку на изображение, устанавливает прослушиватели
   * @returns {Node} - заполненный элемент карточки с установленными прослушивателями
   */
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