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
let popupTitleInput = profileEditPopup.querySelector('#profile_name');
let popupSubtitleInput = profileEditPopup.querySelector('#profile_title');

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

let initialCards = [
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

///* Всплывашка просмотра изображений *///
const imageViewPopup = document.querySelector(".popup_view_image");

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
  // ищем все input в popup который передан аргументом
  let inputs = popup.querySelectorAll('input');
  // Очищаем каждый инпут
  inputs.forEach((input) => {
    input.value = "";
  });
}

// Получить сведения о пользователе
// в данный момент - из профиля, в будущем - от сервера
function getUsersInfo() {
  popupTitleInput.value = profileTitle.textContent;
  popupSubtitleInput.value = profileSubtitle.textContent;
}

// Кнопка Лайк на карточках фотографий
// Аргумент button - нажатая кнопка
function likePhoto(button) {
  // Если нажата
  if (button.classList.contains("photo-card__button_active")) {
    /* Отправляем данные на сервер с id фото */
    // ...
    /* Удаляем класс */
    button.classList.remove("photo-card__button_active")
  } else {
    /* Отправляем данные на сервер с id фото */
    // ...
    /* Добавляем класс */
    button.classList.add("photo-card__button_active")
  }
}

// записываем свойства нажатой картинки в всплывашку:
// src - из src нажатой картинки,
// alt и описание изображения - из photo-card__title ближайшего родительского photo-card
function getImage(photo) {
  document.querySelector(".popup__image").src = photo.src;
  document.querySelector(".popup__image").alt = photo.closest('.photo-card').querySelector('.photo-card__title').innerHTML;
  document.querySelector(".popup__caption").innerHTML = photo.closest('.photo-card').querySelector('.photo-card__title').innerHTML;
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
  /* Очистить инпуты в всплывашке редактирования профиля */
  clearInputs(profileEditPopup)
}

// отрисовка карточек в галерее
function renderPhotoCards() {

  // контейнер карточек галереи - контейнер photo-cards внутри секции gallery
  const photoCards = document.querySelector('.gallery .photo-cards');

  // константа-шаблон в которую вставляются элементы из массива карточек
  // аргументы name, link - это ключи массива, те, что нужны в данной константе
  const createPhotoCardsString = ({name, link}) =>
    `<li>
        <article class="photo-card">
          <button class="photo-card__delete button" type="button"></button>
          <img src="${link}" class="photo-card__image" alt="${name}">
          <div class="photo-card__footer">
            <p class="photo-card__title">${name}</p>
            <button class="photo-card__button button" type="button"></button>
          </div>
        </article>
      </li>
    `;

// очищаем контейнер перед отрисовкой
  photoCards.innerHTML = '';

// из массива карточек initialCards делаем элемент из карточек (константа photoCardsString) по шаблону,
// записанному в константе createPhotoCardsString, соединяя элементы между собой элементом '' (join(''))
// аргумент card - отдельный элемент массива initialCards
  const photoCardsString = initialCards.map((card) =>
    createPhotoCardsString(card)).join('');

// вставляем созданный элемент из карточек в контейнер photoCards
  photoCards.insertAdjacentHTML('beforeend', photoCardsString);

  // изображения в карточках галереи, нужны именно изображения, иначе будет срабатывать там, где не надо
  // если константу сделать вне функции, то браузер их не увидит, т.к. до рендера карточек их нет и слушать нечего
  const photoCardImages = document.querySelectorAll('.photo-card__image');

  // Все кнопки лайк в галерее. Кнопок много, и клик по каждой надо слушать.
  // если константу сделать вне функции, то браузер их не увидит, т.к. до рендера карточек их нет и слушать нечего
  const photoCardLikeButtons = document.querySelectorAll('.photo-card__button');

  // Все кнопки удалить в галерее. Кнопок много, и клик по каждой надо слушать.
  // если константу сделать вне функции, то браузер их не увидит, т.к. до рендера карточек их нет и слушать нечего
  const photoCardDeleteButtons = document.querySelectorAll('.photo-card__delete');

  // Слушаем клик по изображениям всех карточек
  photoCardImages.forEach((photoCardImage) => {
    photoCardImage.addEventListener('click', function () {
      getImage(photoCardImage);
    })
  });

  // Слушаем клик по кнопке лайка фотографии. Кнопок много, вешаем прослушиватель на каждую.
  photoCardLikeButtons.forEach((photoCardLikeButton) => {
    photoCardLikeButton.addEventListener('click', function () {
      likePhoto(photoCardLikeButton);
    })
  });

  // Слушаем клик по кнопке удаления фотографии. Кнопок много, вешаем прослушиватель на каждую.
  photoCardDeleteButtons.forEach((photoCardDeleteButton) => {
    photoCardDeleteButton.addEventListener('click', function () {
      // передаем ближайшую к кнопке удаления родительскую карточку
      deletePhoto(photoCardDeleteButton.closest('.photo-card'));
      // отрисовываем карточки по обновленному массиву
      renderPhotoCards();
    })
  });
}

// функция удаления карточки
// с расчетом на хранение массива карточек на сервере в будущем
function deletePhoto(element) {
  // карточки галереи - photo-cards внутри секции gallery
  // после рендеринга
  const photoRendered = document.querySelectorAll('.gallery .photo-cards .photo-card');

  // получаем индекс элемента массива photoRendered, для которого нажали удалить
  let index = Object.keys(photoRendered).find(key => photoRendered[key] === element);

  // из массива initialCards удаляем элемент по id
  initialCards.splice(index, 1);
}

// функция отправки формы добавления места
function submitNewPlaceForm(evt) {
  evt.preventDefault();
// записываем элемент с ключами name и link в конец массива
  // он реверсирован, потому карточка будет первой
  initialCards.push({name: placeName.value, link: placeLink.value});

  // отрисовываем карточки по обновленному массиву
 renderPhotoCards();

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
    // если у всплывашки есть инпуты, то они очищаются
    let inputs = popup.querySelectorAll('input');
    if (inputs) {
      clearInputs(popup);
    }
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

// слушаем нажатие enter в инпутах формы
editProfileForm.querySelectorAll('input').forEach((input) => {
  input.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      submitProfileForm(evt);
    }
  })
})

// Слушаем клик по кнопке Добавить место
addPlaceButton.addEventListener('click', function () {
  /* Открыть всплывашку добавления места */
  showPopup(newPlacePopup);
})

// Слушаем отправку формы добавления места
newPlaceForm.addEventListener('submit', submitNewPlaceForm);

// слушаем нажатие enter в инпутах формы
newPlaceForm.querySelectorAll('input').forEach((input) => {
  input.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      submitNewPlaceForm(evt);
    }
  })
})

// ждем загрузки DOM
document.addEventListener('DOMContentLoaded', function () {
  // отрисовываем карточки
  renderPhotoCards();
});
