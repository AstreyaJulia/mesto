'use strict';

/** Все всплывашки на странице */
/** @type {HTMLCollection} */
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
const addPlaceButton = document.querySelector(".profile__add-button");

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

/** кнопки закрытия всплывашек на всех всплывашках */
/** @type {HTMLCollection} */
const popupCloseButtons = document.querySelectorAll(".popup__close-button");

/** Массив карточек в галерее */
/** @type {Object} */
const initialCards = [
  {
    name: 'Исландия',
    link: 'images/photos/iceland_1.jpg'
  },
  {
    name: 'Буковель, Украина',
    link: 'images/photos/bukovel_1.jpg'
  },
  {
    name: 'Исландия',
    link: 'images/photos/iceland_2.jpg'
  },
  {
    name: 'Аризона, США',
    link: 'images/photos/arizona_1.jpg'
  },
  {
    name: 'Торонто, Канада',
    link: 'images/photos/toronto_1.jpg'
  },
  {
    name: 'Тронхейм, Норвегия',
    link: 'images/photos/trondheim_1.jpg'
  }
];

/** шаблон карточки */
/** @type {HTMLElement} */
const cardTeplate = document.querySelector('#photo-card').content;

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


/**
 * Открывашка всплывашки, добавление прослушивателя нажатия на ESC
 * @param {HTMLElement} popup - элемент popup
 */
function showPopup(popup) {
  popup.classList.add('popup_opened');
  window.addEventListener('keydown', closeESC);
}


/**
 * Закрывашка всплывашки, удаление прослушивателя нажатия на ESC
 * @param {HTMLElement} popup - элемент popup
 */
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  window.removeEventListener('keydown', closeESC);
}


/**
 * Очистить все инпуты после закрытия всплывашки
 * @param {HTMLElement} popup - элемент popup
 */
function clearInputs(popup) {
  if (popup.querySelector('input')) {
    popup.querySelector('form').reset();

    /** Поля пустые - блокируем кнопку отправки формы */
    /** @type {HTMLButtonElement} */
    const submitButton = popup.querySelector('.popup__submit')
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.classList.add(validationSettings.inactiveButtonClass);
    }
  }
}


/**
 * Получить сведения о пользователе
 */
function getUsersInfo() {
  popupTitleInput.value = profileTitle.textContent;
  popupSubtitleInput.value = profileSubtitle.textContent;
}


/**
 * Кнопка Лайк на карточках фотографий
 * @param {HTMLButtonElement} button - нажатая кнопка
 */
function likePhoto(button) {
  button.classList.toggle("photo-card__button_active");
}


/**
 * записываем свойства нажатой картинки в всплывашку
 * @param {HTMLImageElement} photo - элемент изображения из нажатой карточки
 */
function getImage(photo) {
  imageViewPopupImage.src = photo.src;
  imageViewPopupImage.alt = photo.alt;
  imageViewPopupCaption.textContent = photo.alt;
  showPopup(imageViewPopup);
}

/**
 * функция отправки данных формы редактирования профиля
 */
function submitProfileForm(evt) {
  evt.preventDefault();

  /** присваиваем значениям в профиле значения инпутов */
  profileTitle.textContent = popupTitleInput.value;
  profileSubtitle.textContent = popupSubtitleInput.value;

  /** Закрыть всплывашку профиля - удаляем класс popup_opened */
  closePopup(profileEditPopup);
}


/**
 * создаем карточку
 * @param {Object} item - элемент из массива {name: название, link: ссылка}
 */
function createCard(item) {

  /** в шаблоне берем весь элемент li */
  /** @type {Node} */
  const cardElement = cardTeplate.querySelector('li').cloneNode(true);

  /** элемент изображения */
  /** @type {HTMLImageElement} */
  const cardImage = cardElement.querySelector('.photo-card__image');

  /** записываем в шаблон значения из элемента массива */
  cardImage.src = item.link;
  cardImage.alt = item.name;

  /** @type {string} */
  cardElement.querySelector('.photo-card__title').textContent = item.name;

  /** прослушиватель нажатия на картинку */
  cardImage.addEventListener('click', function (evt) {
    getImage(evt.target);
  })

  /** прослушиватель лайка */
  cardElement.querySelector('.photo-card__button').addEventListener('click', function (evt) {
    likePhoto(evt.target);
  })

  /** прослушиватель удаления */
  cardElement.querySelector('.photo-card__delete').addEventListener('click', function () {
    deletePhoto(cardElement);
  })

  /**
   * @returns {HTMLElement} возвращаем полностью созданный элемент карточки с прослушивателями
   */
  return cardElement
}


/**
 * функция удаления карточки
 * @param {HTMLElement} element - элемент удаляемого изображения
 */
function deletePhoto(element) {
  element.closest('li').remove();
}


/**
 * функция отправки формы добавления места
 */
function submitNewPlaceForm(evt) {
  evt.preventDefault();

  /** добавляем карточку */
  photoCards.prepend(createCard({name: placeName.value, link: placeLink.value}))

  /** Закрыть всплывашку добавления карточки - удаляем класс popup_opened */
  closePopup(newPlacePopup)

  /** Очистить инпуты в всплывашке добавления карточки */
  /** тайм-аут, потому что заметна очистка формы при закрытии */
  setTimeout(clearInputs, 350, newPlacePopup);
}


/**
 * ф-я закрытия всплывашки по нажатию ESC
 */
function closeESC(evt) {
  if (evt.key === "Escape") {

    /** Ищем открытую всплывашку с классом popup_opened, больше 1 их точно не будет */
    const popup = document.querySelector('.popup_opened');

    /** Закрываем всплывашку */
    closePopup(popup);

    /** Если у всплывашки есть форма, очищаем инпуты */
    /** тайм-аут, потому что заметна очистка формы при закрытии */
    setTimeout(clearInputs, 350, popup);
  }
}


/** Универсальная функция-закрывашка всплывашек, если что-то ввели, а потом закрыли */
Array.from(popupCloseButtons).forEach((popupCloseButton) => {

  /** для каждой кнопки закрытия всплывашки делаем прослушиватель */
  popupCloseButton.addEventListener('click', function () {

    /** локальная переменная для всплывашки, ищет ближнюю родительскую, с классом popup */
    let popup = popupCloseButton.closest('.popup');

    /** закрываем всплывашку, удаляем класс popup_opened */
    closePopup(popup);

    /** Если у всплывашки есть форма, очищаем инпуты */
    /** тайм-аут, потому что заметна очистка формы при закрытии */
    setTimeout(clearInputs, 350, popup);
  })
})


/** Слушаем клик по кнопке редактирования профиля */
profileEditButton.addEventListener('click', function () {

  /** Открыть всплывашку профиля */
  showPopup(profileEditPopup);

  /** Получить данные о пользователе */
  getUsersInfo();
})

/** Слушаем отправку формы редактирования профиля */
editProfileForm.addEventListener('submit', submitProfileForm);

/** Слушаем клик по кнопке Добавить место */
addPlaceButton.addEventListener('click', function () {

  /** Открыть всплывашку добавления места */
  showPopup(newPlacePopup);
})

/** Слушаем отправку формы добавления места */
newPlaceForm.addEventListener('submit', submitNewPlaceForm);

/** Слушалка нажатия на оверлей, закрывает всплывашку и очищает ее форму (если есть) */
Array.from(popups).forEach((popup) => {
  popup.addEventListener('click', function (evt) {
    if (evt.target === popup) {
      closePopup(evt.target);

      /** Если у всплывашки есть форма, очищаем инпуты */
      /** тайм-аут, потому что заметна очистка формы при закрытии */
      setTimeout(clearInputs, 350, popup);
    }
  })
})


/** ждем загрузки DOM */
document.addEventListener('DOMContentLoaded', function () {

  /** отрисовываем карточки в галерее */
  initialCards.forEach((item) => {
    photoCards.prepend(createCard(item));
  })
});
