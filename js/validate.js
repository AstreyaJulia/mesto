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
const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};


/**
 * Включение ошибки валидации инпута
 * @param {HTMLInputElement} input - валидируемый инпут
 * @param {HTMLFormElement} form - элемент формы
 * @param {string} message - сообщение об ошибке
 */
function showInputError(input, form, message) {

  /** Сообщение об ошибке для инпута (создается по id соседнего инпута через <span>) */
  /** @type {HTMLElement} */
  const error = form.querySelector(`#${input.id}-error`);

  /** Сообщение об ошибке для инпута (создается по id соседнего инпута через <span>) */
  /** @type {string} */
  error.textContent = message;

  /** показать ошибку, добавляем классы инпуту и ошибке */
  input.classList.add(validationSettings.inputErrorClass);
  error.classList.add(validationSettings.errorClass);
}


/**
 * Выключение ошибки валидации инпута
 * @param {HTMLInputElement} input - валидируемый инпут
 * @param {HTMLFormElement} form - элемент формы
 */
function hideInputError(input, form) {

  /** Сообщение об ошибке для инпута (создается по id соседнего инпута через <span>) */
  /** @type {HTMLElement} */
  const error = form.querySelector(`#${input.id}-error`);

  /** Записываем cообщение об ошибке */
  /** @type {string} */
  error.textContent = "";

  /** скрыть ошибку, удаляем классы у инпута и ошибки */
  input.classList.remove(validationSettings.inputErrorClass);
  error.classList.remove(validationSettings.errorClass);
}


/**
 * Валидация инпута
 * @param {HTMLInputElement} input - валидируемый инпут
 * @param {HTMLFormElement} form - элемент формы
 */
function validateInput(form, input) {

  /** Если инпут не прошел валидацию (?) показывает ошибку, иначе (:) убирает ошибку */
  !input.validity.valid ? showInputError(input, form, input.validationMessage) : hideInputError(input, form);
}


/**
 * Переключатель состояния кнопки отправки формы
 * @param {HTMLCollection} inputArray - коллекция валидируемых инпутов
 * @param {HTMLButtonElement} submitButton - кнопка отправки формы
 */
function switchSubmitButton(inputArray, submitButton) {

  /** Фильтруем массив инпутов, если валидацию прошел один или ни одного инпута, то кнопка блокируется */
  if (Array.from(inputArray).filter(input => !input.validity.valid).length === 0) {
    submitButton.disabled = false;
    submitButton.classList.remove(validationSettings.inactiveButtonClass);
  } else {
    submitButton.disabled = true;
    submitButton.classList.add(validationSettings.inactiveButtonClass);
  }
}


/**
 * Создание прослушивателей
 * @param {HTMLFormElement} form - элемент формы, на которую вешаем прослушиватели
 */
function setInputEvtListeners(form) {

  /** Коллекция инпутов в форме */
  /** @type {HTMLCollection} */
  const inputArray = form.querySelectorAll(validationSettings.inputSelector);

  /** Кнопка Отправить форму */
  /** @type {HTMLButtonElement} */
  const submitButton = form.querySelector(validationSettings.submitButtonSelector);

  /** Валидация при открытии формы */
  switchSubmitButton(inputArray, submitButton)

  /** Вешаем прослушиватель input каждому инпуту */
  Array.from(inputArray).forEach((input) => {
    input.addEventListener('input', () => {

      /** Валидация инпута, включает/выключает ошибки */
      validateInput(form, input);

      /** Переключалка состояния кнопки отправки формы */
      switchSubmitButton(inputArray, submitButton);
    });
  });
}


/**
 * Функция включения валидации
 */
function enableValidation() {

  /** Коллекция форм на странице */
  /** @type {HTMLCollection} */
  const formsArray = document.querySelectorAll(validationSettings.formSelector);

  /** Перебираем коллекцию форм, вешаем прослушиватель submit каждой форме */
  Array.from(formsArray).forEach((form) => {

    form.addEventListener('submit', (evt) => {

      /** отмена дефолтного действия браузера */
      evt.preventDefault();
    });

    /** вешаем прослушиватели на инпуты формы */
    setInputEvtListeners(form);
  });
}


/**
 * ждем загрузки DOM
 */
document.addEventListener('DOMContentLoaded', function () {

  /** Включаем валидацию */
  enableValidation();
});