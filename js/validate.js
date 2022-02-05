'use strict';

// настройки валидации
const validationSettings = {
  // класс формы
  formSelector: '.popup__form',
  //класс инпута
  inputSelector: '.popup__input',
  // класс кнопки отправки формы
  submitButtonSelector: '.popup__submit',
  // класс, к-рый делает кнопку отправки формы заблокированной
  inactiveButtonClass: 'popup__submit_disabled',
  // класс, подсвечивающий поле с ошибками
  inputErrorClass: 'popup__input_type_error',
  // класс, делающий ошибку видимой
  errorClass: 'popup__error_visible'
};

// Ф-я включающая/выключающая ошибку валидации инпута
// Аргументы:
// input - валидируемый инпут,  form - элемент формы
// message - сообщение об ошибке, если нужно скрыть, то передаем ''
// mode - переключатель режимов: 'show' - показать ошибку, 'hide' - скрыть ошибку
function switchInputError(input, form, message, mode) {

  // Сообщение об ошибке для инпута (создается по id соседнего инпута через <span>)
  const error = form.querySelector(`#${input.id}-error`);

  // Записываем cообщение об ошибке
  error.textContent = message;

  // Переключатель режимов
  switch (mode) {

      // показать ошибку, добавляем классы инпуту и ошибке
    case 'show':
      input.classList.add(validationSettings.inputErrorClass);
      error.classList.add(validationSettings.errorClass);
      break;

      // скрыть ошибку, удаляем классы инпута и ошибки
    case 'hide':
      input.classList.remove(validationSettings.inputErrorClass);
      error.classList.remove(validationSettings.errorClass);
      break;
  }
}

// Ф-я валидации инпута
// аргумент form - элемент формы
// input - инпут
function validateInput(form, input) {
  // Если инпут не прошел валидацию (?) показывает ошибку, иначе (:) убирает ошибку
  !input.validity.valid ? switchInputError(input, form, input.validationMessage, 'show') : switchInputError(input, form, '', 'hide');
}

// Переключатель состояния кнопки отправки формы
// аргумент inputArray - коллекция валидируемых инпутов,
// submitButton - кнопка отправки формы
function switchSubmitButton(inputArray, submitButton) {
  // Фильтруем массив инпутов, если валидацию прошел один или ни одного инпута, то
  // кнопка блокируется
  if (Array.from(inputArray).filter(input => !input.validity.valid).length === 0) {
    submitButton.disabled = false;
    submitButton.classList.remove(validationSettings.inactiveButtonClass);
  } else {
    submitButton.disabled = true;
    submitButton.classList.add(validationSettings.inactiveButtonClass);
  }
}

// Создание прослушивателей
// аргумент form - элемент формы, на которую вешаем прослушиватели
function setInputEvtListeners(form) {

  // Коллекция инпутов в форме
  const inputArray = form.querySelectorAll(validationSettings.inputSelector);

  // Кнопка Отправить форму
  const submitButton = form.querySelector(validationSettings.submitButtonSelector);

  // Валидация при открытии формы
  switchSubmitButton(inputArray, submitButton)

  // Вешаем прослушиватель input каждому инпуту
  inputArray.forEach((input) => {
    input.addEventListener('input', () => {

      // Валидация инпута, включает/выключает ошибки
      validateInput(form, input);

      // Переключалка состояния кнопки отправки формы
      switchSubmitButton(inputArray, submitButton);
    });
  });
}

// Функция включения валидации
function enableValidation() {

  // Коллекция форм на странице
  const formsArray = Array.from(document.querySelectorAll(validationSettings.formSelector));

  // Перебираем коллекцию форм, вешаем прослушиватель submit каждой форме
  formsArray.forEach((form) => {

    form.addEventListener('submit', (evt) => {
      // отмена дефолтного действия браузера
      evt.preventDefault();
    });

    // вешаем прослушиватели на инпуты формы
    setInputEvtListeners(form);
  });
}

// ждем загрузки DOM
document.addEventListener('DOMContentLoaded', function () {
// Включаем валидацию
  enableValidation();
});
