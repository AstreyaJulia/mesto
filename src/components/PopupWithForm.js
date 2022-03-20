import {Popup} from './Popup.js'

/** Открывает и закрывает всплывашку с формой */
export class PopupWithForm extends Popup {

  /** Конструктор всплывашки с формой
   * @param popupSelector - селектор всплывашки
   * @param handleSubmitForm - обработчик отправки формы */
  constructor(popupSelector, {handleSubmitForm}) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
  }

  /** Получает значения инпутов формы всплывашки
   * @returns {*|{}} - объект с названиями инпутов и их значениями: {название: значение}
   * @private */
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', () => {
      this._handleSubmitForm(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}

