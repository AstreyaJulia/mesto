'use strict';

import './index.css'; /** Импорт стилей */
import {initialCards} from "../utils/const.js"; /** Массив карточек */
import {Card} from "../components/Card.js"; /** Создает карточки, вешает прослушиватели */
import {FormValidator, validationSettings} from "../components/FormValidator.js"; /** Создает карточки, вешает прослушиватели */
import {Section} from '../components/Section.js'
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithImage} from '../components/PopupWithImage.js'; /** Создает всплывашку с изображением */
import {UserInfo} from '../components/UserInfo.js';

/** Форма редактирования профиля
 * @type {Element} */
const formProfileEdit = document.querySelector(".popup_edit_profile " + validationSettings.formSelector);

/** Форма добавления карточки
 * @type {Element} */
const formNewPlace = document.querySelector(".popup_new-place " + validationSettings.formSelector);

/** Всплывашка редактирования профиля */
/** @type {HTMLElement} */
const profileEditPopup = document.querySelector(".popup_edit_profile");

/** Кнопка редактирования профиля */
/** @type {HTMLElement} */
const profileEditButton = document.querySelector(".profile__button");

/** Имя пользователя в всплывашке редактирования профиля */
/** @type {HTMLInputElement} */
const popupTitleInput = profileEditPopup.querySelector('#profile_name');

/** Подпись пользователя в всплывашке редактирования профиля */
/** @type {HTMLInputElement} */
const popupSubtitleInput = profileEditPopup.querySelector('#profile_title');

/** Кнопка Добавить место */
/** @type {HTMLButtonElement} */
const buttonAddPlace = document.querySelector(".profile__add-button");

/** Экземпляр валидатора для формы редактирования профиля
 * @type {FormValidator} */
const profileEditValidator = new FormValidator(validationSettings, formProfileEdit);

/** Экземпляр валидатора для формы добавления карточки
 * @type {FormValidator} */
const newPlaceValidator = new FormValidator(validationSettings, formNewPlace);

/** Экземпляр всплывашки просмотра изображения */
const popupImage = new PopupWithImage('.popup_view_image');

/** Экземпляр профиля пользователя */
const profile = new UserInfo({profileTitle: ".profile__title", profileSubtitle: ".profile__subtitle"});

/** Экземпляр формы редактирования профиля */
const profileForm = new PopupWithForm(
  ".popup_edit_profile",
  {
    handleSubmitForm: (inputValues) => {
      profile.setUserInfo(inputValues);
      profileForm.close();
    }
  });

/** Создает экземпляры карточек
 * @param item - элемент карточки {name, link}
 * @returns {Node} - готовый узел карточки с прослушивателями */
const copyCard = (item) => {
  const card = new Card({
      item,
      handleCardClick: () => {
        popupImage.open({title: item.name, src: item.link});
      },
    },
    "#photo-card");
  return card.createCard();
}

/** Создает новую секцию для галереи
 * @type {Section} - экземпляр класса Section */
const sectionPhotoCards = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      sectionPhotoCards.addItem(copyCard(item))
    }
  },
  '.photo-cards');

/** Экземпляр формы добавления карточки */
const addPhotoForm = new PopupWithForm(
  ".popup_new-place",
  {
    handleSubmitForm: (inputValues) => {
      sectionPhotoCards.addItem(copyCard(inputValues));
      addPhotoForm.close();
    }
  });

/** Присваивает инпутам в форме редактирования профиля значения
 * @param info объект значений {title: title, subtitle: subtitle} */
const setProfileInputs = (info) => {
  popupTitleInput.value = info.title;
  popupSubtitleInput.value = info.subtitle;
};

/** Прослушиватель нажатия на кнопку редактирования профиля */
profileEditButton.addEventListener('click', function () {
  setProfileInputs(profile.getUserInfo());
  profileForm.open();
  profileEditValidator.validateInputs();
  profileEditValidator.switchSubmitButton();
})

/** Прослушиватель нажатия на кнопку Добавить место */
buttonAddPlace.addEventListener('click', function () {
  addPhotoForm.open();
  newPlaceValidator.validateInputs();
  /** Возможно, лишнее, но зато сразу понятно, какие поля не заполнены */
  newPlaceValidator.switchSubmitButton();
})

/** Ждем загрузки DOM */
document.addEventListener('DOMContentLoaded', function () {

  /** Отрисовывает карточки при загрузке страницы */
  sectionPhotoCards.renderElements();

  /** Включает валидацию */
  profileEditValidator.enableValidation();
  newPlaceValidator.enableValidation();

  /** Вешает прослушиватели всплывашки изображения */
  popupImage.setEventListeners();

  /** Вешает прослушиватели всплывашки редактирования профиля */
  profileForm.setEventListeners();

  /** Вешает прослушиватели всплывашки добавления карточки */
  addPhotoForm.setEventListeners();
});
