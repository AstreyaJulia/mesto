'use strict';

///* Профиль *///

// Кнопка редактирования профиля
const profileEditButton = document.querySelector(".profile__button");

// Информация о пользователе из профиля
let profileTitle = document.querySelector(".profile__title");
let profileSubtitle = document.querySelector(".profile__subtitle");

///* Всплывашка (popup) редактирования профиля *///

// Сама всплывашка редактирования профиля
const profileEditPopup = document.querySelector(".popup_edit_profile");

// Инпуты в всплывашке редактирования профиля
const popupTitleInput = profileEditPopup.querySelector('#profile_name');
const popupSubtitleInput = profileEditPopup.querySelector('#profile_title');

// Форма в всплывашке редактирования профиля
const editProfileForm = profileEditPopup.querySelector('.popup__form');

/* Добавление места */
// Кнопка Добавить место
const addPlaceButton = document.querySelector(".profile__add-button");

///* Всплывашка (popup) добавления места *///
const newPlacePopup = document.querySelector(".popup_new-place");

// Форма в всплывашке добавления места
const newPlaceForm = newPlacePopup.querySelector('.popup__form');

const placeName = newPlaceForm.querySelector('#place_name');
const placeLink = newPlaceForm.querySelector('#place_url');

// кнопки закрытия всплывашек на всех всплывашках
const popupCloseButtons = document.querySelectorAll(".popup__close-button");

/// * Карточки в галерее *///

/* Массив карточек */

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

// шаблон карточки
const cardTeplate = document.querySelector('#photo-card').content;

// контейнер карточек галереи - контейнер photo-cards внутри секции gallery
const photoCards = document.querySelector('.gallery .photo-cards');


///* Всплывашка просмотра изображений *///
const imageViewPopup = document.querySelector(".popup_view_image");

const imageViewPopupImage = imageViewPopup.querySelector(".popup__image");
const imageViewPopupCaption = imageViewPopup.querySelector(".popup__caption");

///* ФУНКЦИИ *///

// Открывашка всплывашки
// Аргумент popup - элемент popup
function showPopup(popup) {
  popup.classList.add('popup_opened');
}

// Закрывашка всплывашки
// Аргумент popup - элемент popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Очистить все инпуты после закрытия всплывашки
// Аргумент popup - элемент popup
function clearInputs(popup) {
  popup.querySelector('form').reset();
}

// Получить сведения о пользователе
function getUsersInfo() {
  popupTitleInput.value = profileTitle.textContent;
  popupSubtitleInput.value = profileSubtitle.textContent;
}

// Кнопка Лайк на карточках фотографий
// Аргумент button - нажатая кнопка
function likePhoto(button) {
  button.classList.toggle("photo-card__button_active");
}

// записываем свойства нажатой картинки в всплывашку:
// src - из src нажатой картинки,
// alt и описание изображения - из photo-card__title ближайшего родительского photo-card
function getImage(photo) {
  imageViewPopupImage.src = photo.src;
  imageViewPopupImage.alt = photo.closest('.photo-card').querySelector('.photo-card__title').textContent;
  imageViewPopupCaption.textContent = photo.closest('.photo-card').querySelector('.photo-card__title').textContent;
  showPopup(imageViewPopup);
}

// функция отправки данных формы редактирования профиля
function submitProfileForm(evt) {
  evt.preventDefault();

  /* присваиваем значениям в профиле значения инпутов */
  profileTitle.textContent = popupTitleInput.value;
  profileSubtitle.textContent = popupSubtitleInput.value;

  /* Закрыть всплывашку профиля - удаляем класс popup_opened */
  closePopup(profileEditPopup);
}

// создаем карточку
// аргумент item - элемент из массива {name: название, link: ссылка}
function createCard(item) {
  // в шаблоне берем весь элемент li
  const cardElement = cardTeplate.querySelector('li').cloneNode(true);

  // записываем в шаблон значения из элемента массива
  cardElement.querySelector('.photo-card__image').src = item.link;
  cardElement.querySelector('.photo-card__image').alt = item.name;
  cardElement.querySelector('.photo-card__title').textContent = item.name;

  // прослушиватель нажатия на картинку
  cardElement.querySelector('.photo-card__image').addEventListener('click', function () {
    getImage(cardElement.querySelector('.photo-card__image'));
  })

  // прослушиватель лайка
  cardElement.querySelector('.photo-card__button').addEventListener('click', function () {
    likePhoto(cardElement.querySelector('.photo-card__button'));
  })

  // прослушиватель удаления
  cardElement.querySelector('.photo-card__delete').addEventListener('click', function () {
    deletePhoto(cardElement.querySelector('.photo-card'));
  })

  // возвращаем полностью созданный элемент карточки с прослушивателями
  return cardElement
}

// функция удаления карточки
function deletePhoto(element) {
  element.closest('li').remove();
}

// функция отправки формы добавления места
function submitNewPlaceForm(evt) {
  evt.preventDefault();

// добавляем карточку
  photoCards.prepend(createCard({name: placeName.value, link: placeLink.value}))

  /* Закрыть всплывашку добавления карточки - удаляем класс popup_opened */
  closePopup(newPlacePopup)
  /* Очистить инпуты в всплывашке добавления карточки */
  clearInputs(newPlacePopup)
}

/// ПРОСЛУШИВАТЕЛИ ///

// Универсальная функция-закрывашка всплывашек, если что-то ввели, а потом закрыли
popupCloseButtons.forEach((popupCloseButton) => {
// для каждой кнопки закрытия всплывашки делаем прослушиватель
  popupCloseButton.addEventListener('click', function () {
    // локальная переменная для всплывашки, ищет ближнюю родительскую, с классом popup
    let popup = popupCloseButton.closest('.popup');
    // закрываем всплывашку, удаляем класс popup_opened
    closePopup(popup);
  })
})

// Слушаем клик по кнопке редактирования профиля
profileEditButton.addEventListener('click', function () {
  /* Открыть всплывашку профиля */
  showPopup(profileEditPopup);
  /* Получить данные о пользователе */
  getUsersInfo();
})

// Слушаем отправку формы редактирования профиля
editProfileForm.addEventListener('submit', submitProfileForm);

// Слушаем клик по кнопке Добавить место
addPlaceButton.addEventListener('click', function () {
  /* Открыть всплывашку добавления места */
  showPopup(newPlacePopup);
})

// Слушаем отправку формы добавления места
newPlaceForm.addEventListener('submit', submitNewPlaceForm);

// ждем загрузки DOM
document.addEventListener('DOMContentLoaded', function () {
  // отрисовываем карточки в галерее
  initialCards.forEach((item) => {
    photoCards.prepend(createCard(item));
  })
});
