'use strict';

import './index.css';
import {apiSettings} from "../utils/const.js";
import {Card} from "../components/Card.js";
import {
  FormValidator,
  validationSettings
} from "../components/FormValidator.js";
import {Section} from '../components/Section.js'
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithConfirmation} from '../components/PopupWithConfirmation.js';
import {UserInfo} from '../components/UserInfo.js';
import {Api} from '../components/Api';

/** Экземпляр API
 * @type {Api} */
const api = new Api(apiSettings);

/** Отрисовывает карточки при загрузке страницы */
api.getCards()
  .then((initialCards) =>
    /** Возможно, лишний промис замедляет получение данных, но зато id пользователя не нужно прописывать в Card */
    api.getUserInfo()
      .then((data) => {
        /** Создает новую секцию для галереи @type {Section} */
        const sectionPhotoCards = new Section({
          items: initialCards,
          renderer: (item) => {
            sectionPhotoCards.addItem(copyCard(item, data._id))
          }
        }, '.photo-cards');
        sectionPhotoCards.renderElements();
        return sectionPhotoCards
      })
      .catch((err) => {
        console.log(err);
      })
  );

api.getUserInfo()
  .then((user) => {
    profile.setUserInfo(user)
  })

/** Профиль пользователя */

/** Форма редактирования профиля
 * @type {Element} */
const formProfileEdit = document.querySelector(".popup_edit_profile " + validationSettings.formSelector);

/** Форма редактирования аватара
 * @type {Element} */
const formAvatarEdit = document.querySelector(".popup_update-avatar " + validationSettings.formSelector);

/** Экземпляр валидатора для формы редактирования профиля
 * @type {FormValidator} */
const profileEditValidator = new FormValidator(validationSettings, formProfileEdit);

/** Экземпляр валидатора для формы редактирования аватара
 * @type {FormValidator} */
const avatarEditValidator = new FormValidator(validationSettings, formAvatarEdit);

/** Всплывашка редактирования профиля */
/** @type {HTMLElement} */
const profileEditPopup = document.querySelector(".popup_edit_profile");

/** Имя пользователя в всплывашке редактирования профиля */
/** @type {HTMLInputElement} */
const popupTitleInput = profileEditPopup.querySelector('#profile_name');

/** Подпись пользователя в всплывашке редактирования профиля */
/** @type {HTMLInputElement} */
const popupAboutInput = profileEditPopup.querySelector('#profile_about');

/** Кнопка редактирования профиля */
/** @type {HTMLElement} */
const profileEditButton = document.querySelector(".profile__button");

/** Экземпляр профиля пользователя */
const profile = new UserInfo(
  {
    profileTitle: ".profile__title",
    profileAbout: ".profile__about",
    profileAvatar: ".profile__avatar"
  }
);

/** Экземпляр формы редактирования профиля */
const profileForm = new PopupWithForm(
  ".popup_edit_profile",
  {
    handleSubmitForm: (inputValues) => {
      api.sendUserInfo(inputValues)
        .then((data) => {
          profile.setUserInfo(
            {name: data.name, about: data.about, avatar: data.avatar}
          );
          profileForm.close();
        })
        .catch((err) => {
          console.log(err);
        })
    }
  });

/** Присваивает инпутам в форме редактирования профиля значения
 * @param info объект значений {title: title, about: about} */
const setProfileInputs = (info) => {
  popupTitleInput.value = info.title;
  popupAboutInput.value = info.about;
};

const avatarEditButton = document.querySelector(".profile__edit-avatar-button");

avatarEditButton.addEventListener('click', () => {
  avatarForm.open();
  avatarEditValidator.validateInputs();
  avatarEditValidator.switchSubmitButton();
})

/** Экземпляр формы редактирования аватара */
const avatarForm = new PopupWithForm(
  ".popup_update-avatar",
  {
    handleSubmitForm: (inputValues) => {
      api.updateAvatar(inputValues.avatar)
        .then((res) => {
          profile.setUserInfo({avatar: res.avatar, name: res.name, about: res.about});
          avatarForm.close();
        })
        .catch((err) => {
          console.log(err);
        })
    }
  })

/** Карточки изображений */

/** Форма добавления карточки
 * @type {Element} */
const formNewPlace = document.querySelector(".popup_new-place " + validationSettings.formSelector);

/** Экземпляр валидатора для формы добавления карточки
 * @type {FormValidator} */
const newPlaceValidator = new FormValidator(validationSettings, formNewPlace);

/** Экземпляр всплывашки просмотра изображения */
const popupImage = new PopupWithImage('.popup_view_image');

/** Экземпляр всплывашки подтверждения удаления карточки */
const popupImageDelete = new PopupWithConfirmation(
  '.popup_delete-place',
  {
    handleSubmitDelete: (id, element) => {
      api.deleteCard(id)
        .then(() => {
          element.remove();
          element = '';
          popupImageDelete.close();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
);

/** Кнопка Добавить место */
/** @type {HTMLButtonElement} */
const buttonAddPlace = document.querySelector(".profile__add-button");

/** Создает экземпляры карточек
 * @param item - элемент карточки {name, link}
 * @param currentUser
 * @returns {Node} - готовый узел карточки с прослушивателями */
const copyCard = (item, currentUser) => {
  return new Card({
      item, currentUser,
      handleCardClick: () => {
        popupImage.open({title: item.name, src: item.link});
      },
      handleDeleteCard: (id, element) => {
        popupImageDelete.open();
        popupImageDelete.getCard(id, element)
      },
      handleLikeCard: {
        handleSetLike: (id, element) => {
          api.setLike(id)
            .then((res) => {
              const counter = element.querySelector('.photo-card__like-counter');
              res.likes.length !== 0
                ? counter.textContent = res.likes.length
                : counter.textContent = '0';
            })
            .catch((err) => {
              console.log(err);
            })
        },
        handleDeleteLike: (id, element) => {
          api.deleteLike(id)
            .then((res) => {
              const counter = element.querySelector('.photo-card__like-counter');
              res.likes.length !== 0
                ? counter.textContent = res.likes.length
                : counter.textContent = '0';
            })
            .catch((err) => {
              console.log(err);
            })

        }
      }
    },
    "#photo-card").createCard();
}

/** Экземпляр формы добавления карточки */
const addPhotoForm = new PopupWithForm(
  ".popup_new-place",
  {
    handleSubmitForm: (inputValues) => {
      api.sendCard(inputValues)
        .then((data) => {
          api.getUserInfo()
            .then((user) => {
              const sectionPhotoCards = new Section({}, '.photo-cards')
              sectionPhotoCards.addItem(copyCard(data, user._id))
            })

        })
    }
  });


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

  /** Включает валидацию */
  profileEditValidator.enableValidation();
  newPlaceValidator.enableValidation();
  avatarEditValidator.enableValidation()

  /** Вешает прослушиватели всплывашки изображения */
  popupImage.setEventListeners();

  /** Вешает прослушиватели всплывашки редактирования профиля */
  profileForm.setEventListeners();

  /** Вешает прослушиватели всплывашки удаления карточки */
  popupImageDelete.setEventListeners();

  /** Вешает прослушиватели всплывашки добавления карточки */
  addPhotoForm.setEventListeners();

  /** Вешает прослушиватели всплывашки редактирования аватара */
  avatarForm.setEventListeners();
});
