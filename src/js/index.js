'use strict';

/** Импорт стилей */
import '../pages/index.css';

/** Массив карточек */
import {initialCards} from "./initialCards.js";

/** Создает карточки, вешает прослушиватели */
import {Card} from "./Card.js";

/** Создает карточки, вешает прослушиватели */
import {FormValidator, validationSettings} from "./FormValidator.js";

/** Все всплывашки на странице */
/** @type {NodeListOf<Element>} */
const popups = document.querySelectorAll('.popup:not(:first-child)');

/** Кнопка редактирования профиля */
/** @type {HTMLElement} */
const profileEditButton = document.querySelector(".profile__button");

/** Имя пользователя из профиля */
/** @type {HTMLElement} */
const profileTitle = document.querySelector(".profile__title");

/** Подпись пользователя из профиля */
/** @type {HTMLElement} */
const profileSubtitle = document.querySelector(".profile__subtitle");

/** Всплывашка редактирования профиля */
/** @type {HTMLElement} */
const profileEditPopup = document.querySelector(".popup_edit_profile");

/** Имя пользователя в всплывашке редактирования профиля */
/** @type {HTMLInputElement} */
const popupTitleInput = profileEditPopup.querySelector('#profile_name');

/** Подпись пользователя в всплывашке редактирования профиля */
/** @type {HTMLInputElement} */
const popupSubtitleInput = profileEditPopup.querySelector('#profile_title');

/** Форма в всплывашке редактирования профиля */
/** @type {HTMLFormElement} */
const editProfileForm = profileEditPopup.querySelector('.popup__form');

/** Кнопка Добавить место */
/** @type {HTMLButtonElement} */
const buttonAddPlace = document.querySelector(".profile__add-button");

/** Всплывашка (popup) добавления места */
/** @type {HTMLElement} */
const newPlacePopup = document.querySelector(".popup_new-place");

/** Форма в всплывашке добавления места */
/** @type {HTMLFormElement} */
const newPlaceForm = newPlacePopup.querySelector('.popup__form');

/** Инпут, принимающий название места */
/** @type {HTMLInputElement} */
const placeName = newPlaceForm.querySelector('#place_name');

/** Инпут, принимающий ссылку на изображение */
/** @type {HTMLInputElement} */
const placeLink = newPlaceForm.querySelector('#place_url');

/** контейнер карточек галереи - контейнер photo-cards внутри секции gallery */
/** @type {HTMLElement} */
const photoCards = document.querySelector('.gallery .photo-cards');

/** Всплывашка просмотра изображений */
/** @type {HTMLElement} */
const imageViewPopup = document.querySelector(".popup_view_image");

/** Элемент изображения в всплывашке просмотра места */
/** @type {HTMLImageElement} */
const imageViewPopupImage = imageViewPopup.querySelector(".popup__image");

/** Элемент описания изображения в всплывашке просмотра места */
/** @type {HTMLElement} */
const imageViewPopupCaption = imageViewPopup.querySelector(".popup__caption");

/** Форма редактирования профиля
 * @type {Element} */
const formProfileEdit = document.querySelector(".popup_edit_profile " + validationSettings.formSelector);

/** Экземпляр валидатора для формы редактирования профиля
 * @type {FormValidator} */
const profileEditValidator = new FormValidator(validationSettings, formProfileEdit);

/** Форма добавления карточки
 * @type {Element} */
const formNewPlace = document.querySelector(".popup_new-place " + validationSettings.formSelector);

/** Экземпляр валидатора для формы добавления карточки
 * @type {FormValidator} */
const newPlaceValidator = new FormValidator(validationSettings, formNewPlace);


/** Открывашка всплывашки, добавление прослушивателя нажатия на ESC
 * @param {HTMLElement} popup - элемент popup */
function showPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeESC);
}


/** Закрывашка всплывашки, удаление прослушивателя нажатия на ESC
 * @param {HTMLElement} popup - элемент popup */
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeESC);
}


/** Получить сведения о пользователе */
function getUsersInfo() {
  popupTitleInput.value = profileTitle.textContent;
  popupSubtitleInput.value = profileSubtitle.textContent;
}


/** Записать свойства нажатой картинки в всплывашку */
export function getImage(evt) {
  imageViewPopupImage.src = evt.target.src;
  imageViewPopupImage.alt = evt.target.alt;
  imageViewPopupCaption.textContent = evt.target.alt;
  showPopup(imageViewPopup);
}

/** Отправка данных формы редактирования профиля */
function submitProfileForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupTitleInput.value;
  profileSubtitle.textContent = popupSubtitleInput.value;
  closePopup(profileEditPopup);
}


/** Отправка формы добавления места */
function submitNewPlaceForm(evt) {
  evt.preventDefault();

  /** добавляем карточку */
  photoCards.prepend(
    new Card({name: placeName.value, link: placeLink.value}, "#photo-card").createCard()
  )

  /** закрыли попап, сбросили форму */
  closePopup(newPlacePopup);
  newPlaceForm.reset();
}


/** Закрывает всплывашку по ESC */
function closeESC(evt) {
  if (evt.key === "Escape") {

    /** @type {HTMLElement} */
    const popup = document.querySelector('.popup_opened');

    closePopup(popup);
  }
}


/** Сброс всплывашки по нажатию на оверлей или кнопку закрытия */
function resetPopup(evt) {

  /** @type {HTMLElement} */
  const popup = evt.target.closest('.popup:not(:first-child)');

  /** если цель события оверлей или кнопка закрытия */
  if (evt.target === popup || evt.target.closest('.popup__close-button')) {
    closePopup(popup);
  }
}


/** Прослушиватель нажатия на оверлей */
popups.forEach((popup) => {
  popup.addEventListener('click', resetPopup)
})


/** Прослушиватель нажатия на кнопку редактирования профиля */
profileEditButton.addEventListener('click', function () {
  getUsersInfo();
  showPopup(profileEditPopup);
  profileEditValidator.validateInputs(); /** Иначе если стереть поля и закрыть не сохраняя, то при повторном открытии попапа ошибки не исчезнут */
  profileEditValidator.switchSubmitButton();
})

/** Прослушиватель отправки формы редактирования профиля */
editProfileForm.addEventListener('submit', submitProfileForm);


/** Прослушиватель нажатия на кнопку Добавить место */
buttonAddPlace.addEventListener('click', function () {
  showPopup(newPlacePopup);
  newPlaceValidator.validateInputs(); /** Возможно, лишнее, но зато сразу понятно, какие поля не заполнены */
  newPlaceValidator.switchSubmitButton();
})


/** Слушаем отправку формы добавления места */
newPlaceForm.addEventListener('submit', submitNewPlaceForm);


/** Ждем загрузки DOM */
document.addEventListener('DOMContentLoaded', function () {

  /** Отрисовывает карточки при загрузке страницы */
  initialCards.forEach((item) => {
    photoCards.prepend(
      new Card(item, "#photo-card").createCard()
    );
  });

  /** Включает валидацию */
  profileEditValidator.enableValidation();
  newPlaceValidator.enableValidation();
});
