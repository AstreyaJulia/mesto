import {Popup} from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  /** Всплывашка с подтверждением, должна присутствовать form с селектором .popup__form
   * @param popupSelector - селектор всплывашки
   * @param handleSubmitDelete - хендлер по отправке формы */
  constructor(popupSelector, {handleSubmitDelete}) {
    super(popupSelector);
    this._handleSubmitDelete = handleSubmitDelete;
    this._form = this._popup.querySelector('.popup__form');
  }

  /** Установка прослушивателя отправки формы */
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitDelete(this._idCard, this._cardElement);
      this.close();
    })
  }

  getCard(id, element) {
    this._clear();
    this._idCard = id;
    this._cardElement = element;
  }

  /** Очистка id карточки, элемента карточки
   * @private */
  _clear() {
    this._idCard = '';
    this._cardElement = '';
  }

}
