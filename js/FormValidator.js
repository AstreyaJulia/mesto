'use strict';

/**
 * Настройки валидации
 * @param {string} formSelector - класс формы
 * @param {string} inputSelector - класс инпута
 * @param {string} submitButtonSelector - класс кнопки отправки формы
 * @param {string} inactiveButtonClass - класс, к-рый делает кнопку отправки формы заблокированной
 * @param {string} inputErrorClass - класс, подсвечивающий поле с ошибками
 * @param {string} errorClass - класс, делающий ошибку видимой
 */
/** @type {Object} */
export const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export class FormValidator {
  constructor(validationSettings) {
    this._formSelector = validationSettings.formSelector;
    this._popupInput = validationSettings.inputSelector;
    this._popupSubmit = validationSettings.submitButtonSelector;
    this._popupSubmitDisabled = validationSettings.inactiveButtonClass;
    this._popupInputTypeError = validationSettings.inputErrorClass;
    this._popupErrorVisible = validationSettings.errorClass;
  }


  /**
   * Включает ошибку валидации инпута
   * @param input - валидируемый инпут
   * @param form - элемент формы
   * @param message - сообщение об ошибке
   * @private
   */
  _showInputError(input, form, message) {

  const error = form.querySelector(`#${input.id}-error`);

  error.textContent = message;

  input.classList.add(this._popupInputTypeError);
  error.classList.add(this._popupErrorVisible);
  }


  /**
   * Выключает ошибку валидации инпута
   * @param input - валидируемый инпут
   * @param form - элемент формы
   * @private
   */
  _hideInputError(input, form) {

    const error = form.querySelector(`#${input.id}-error`);

    error.textContent = "";

    input.classList.remove(this._popupInputTypeError);
    error.classList.remove(this._popupErrorVisible);
  }


  /**
   * Валидация инпута
   * @param form - валидируемый инпут
   * @param input - элемент формы
   * @private
   */
  _validateInput(form, input) {

    /** Если инпут не прошел валидацию (?) показывает ошибку, иначе (:) убирает ошибку */
    !input.validity.valid ? this._showInputError(input, form, input.validationMessage) : this._hideInputError(input, form);
  }


  /**
   * Переключает состояние кнопки отправки формы
   * @param inputArray - коллекция валидируемых инпутов
   * @param submitButton - кнопка отправки формы
   * @private
   */
  _switchSubmitButton(inputArray, submitButton) {
    if (Array.from(inputArray).filter(input => !input.validity.valid).length === 0) {
      submitButton.disabled = false;
      submitButton.classList.remove(this._popupSubmitDisabled);
    } else {
      submitButton.disabled = true;
      submitButton.classList.add(this._popupSubmitDisabled);
    }
  }


  /**
   * Создание прослушивателей
   * @param form - элемент формы, на которую вешаем прослушиватели
   * @private
   */
  _setInputEvtListeners(form) {

    const inputArray = form.querySelectorAll(this._popupInput);

    const submitButton = form.querySelector(this._popupSubmit);

    this._switchSubmitButton(inputArray, submitButton)

    /** Вешаем прослушиватель input каждому инпуту */
    Array.from(inputArray).forEach((input) => {
      input.addEventListener('input', () => {

        /** Валидация инпута, включает/выключает ошибки */
        this._validateInput(form, input);

        /** Переключалка состояния кнопки отправки формы */
        this._switchSubmitButton(inputArray, submitButton);
      });
    });
  }

  /**
   * Функция включения валидации
   */
  enableValidation() {

    const formsArray = document.querySelectorAll(this._formSelector);

    Array.from(formsArray).forEach((form) => {

      form.addEventListener('submit', (evt) => {

        evt.preventDefault();
      });

      this._setInputEvtListeners(form);
    });
  }
}
