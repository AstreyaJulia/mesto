'use strict'; // строгий режим

///* Профиль *///

// Кнопка редактирования профиля
const profile_edit_btn = document.querySelector(".profile__button");

// Информация о пользователе из профиля
let profile_title = document.querySelector(".profile__title");
let profile_subtitle = document.querySelector(".profile__subtitle");

///* Всплывашка (popup) редактирования профиля *///

// Сама всплывашка редактирования профиля
const profile_edit_popup = document.querySelector(".popup_edit_profile");

// Кнопка закрытия всплывашки редактирования профиля
//const profile_edit_popup_close_btn = profile_edit_popup.querySelector(".popup__close-button");

// Инпуты в всплывашке редактирования профиля
let popup_title_input = document.getElementById('profile_name');
let popup_subtitle_input = document.getElementById('profile_title');

// Форма в всплывашке редактирования профиля
const edit_profile_form = profile_edit_popup.querySelector('.popup__form');


/* Добавление места */
// Кнопка Добавить место
const add_place_btn = document.querySelector(".profile__add-button");

///* Всплывашка (popup) добавления места *///
const new_place_popup = document.querySelector(".popup_new-place");

// Форма в всплывашке добавления места
const new_place_form = new_place_popup.querySelector('.popup__form');

const place_name = new_place_form.querySelector('#place_name');
const place_link = new_place_form.querySelector('#place_url');

// кнопки закрытия всплывашек на всех всплывашках
const popup_close_buttons = document.querySelectorAll(".popup__close-button");

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

// контейнер карточек галереи - контейнер photo-cards внутри секции gallery
const photo_cards = document.querySelector('.gallery .photo-cards');


///* Всплывашка просмотра изображений *///
const image_view_popup = document.querySelector(".popup_view_image");

///* ФУНКЦИИ *///

// Открывашка всплывашки. Если всплывашек будет несколько
// Аргумент popup - элемент popup
function popup_show(popup) {
  popup.classList.add('popup_opened');
}

// Универсальная функция-закрывашка всплывашек
popup_close_buttons.forEach((popup_close_button) => {
// для каждой кнопки закрытия всплывашки делаем прослушиватель
  popup_close_button.addEventListener('click', function () {
    // локальная переменная для всплывашки, ищет ближнюю родительскую, с классом popup
    let popup = popup_close_button.closest('.popup');
    // закрываем всплывашку, удаляем класс popup_opened
    popup.classList.remove('popup_opened');
    // если всплывашка с классом popup_new-place или popup_edit_profile, очищаем инпуты
    // хотя можно присваивать таким всплывашкам отельный класс и не перечислять в условии
    if (popup.classList.contains('popup_new-place') || popup.classList.contains('popup_new-place')) {
      clear_inputs(popup);
    }
  })
})

// Получить сведения о пользователе
// в данный момент - ииз профиля, в будущем - из сервера
function get_users_info() {
  popup_title_input.value = profile_title.innerHTML;
  popup_subtitle_input.value = profile_subtitle.innerHTML;
}

// Очистить все инпуты после закрытия всплывашки
// Аргумент popup - элемент popup
function clear_inputs(popup) {
  // ищем все input в popup который передан аргументом
  let inputs = popup.querySelectorAll('input');
  // Очищаем каждый инпут
  inputs.forEach((input) => {
    input.value = "";
  });
}

// Кнопка Лайк на карточках фотографий
// Аргумент button - нажатая кнопка
function photo_like(button) {
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
function get_image(photo_card_image) {
  document.querySelector(".popup__image").src = photo_card_image.src;
  document.querySelector(".popup__image").alt = photo_card_image.closest('.photo-card').querySelector('.photo-card__title').innerHTML;
  document.querySelector(".popup__caption").innerHTML = photo_card_image.closest('.photo-card').querySelector('.photo-card__title').innerHTML;
  popup_show(image_view_popup);
}

// функция отправки данных формы редактирования профиля
// аргумент evt - передаваемое событие. только для evt.preventDefault()
function profile_form_submit(evt) {
  evt.preventDefault();

  /* присваиваем значениям в профиле значения инпутов */
  profile_title.textContent = popup_title_input.value;
  profile_subtitle.textContent = popup_subtitle_input.value;

  /* Закрыть всплывашку профиля - удаляем класс popup_opened */
  profile_edit_popup.classList.remove('popup_opened');
  /* Очистить инпуты в всплывашке редактирования профиля */
  clear_inputs(profile_edit_popup);
}

// отрисовка карточек в галерее
function photo_cards_render() {

  // константа-шаблон в которую вставляются элементы из массива карточек
  // аргументы name, link - это ключи массива, те, что нужны в данной константе
  const photo_cards_string_create = ({name, link}) =>
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
  photo_cards.innerHTML = '';

// из массива карточек initialCards делаем элемент из карточек (константа photo_cards_string) по шаблону,
// записанному в константе photo_cards_string_create, соединяя элементы между собой элементом '' (join(''))
// в обратном порядке, так как в верстке новые карточки расположены слева вверху, а старые - справа внизу
// аргумент card - отдельный элемент массива initialCards
  const photo_cards_string = initialCards.map((card) =>
    photo_cards_string_create(card)).reverse().join('');

// вставляем созданный элемент из карточек в контейнер photo_cards
  photo_cards.insertAdjacentHTML('beforeend', photo_cards_string);

  // изображения в карточках галереи, нужны именно изображения, иначе будет срабатывать там, где не надо
  // если константу сделать вне функции, то браузер их не увидит, т.к. до рендера карточек их нет и слушать нечего
  const photo_card_images = document.querySelectorAll('.photo-card__image');

  // Все кнопки лайк в галерее. Кнопок много, и клик по каждой надо слушать.
  // если константу сделать вне функции, то браузер их не увидит, т.к. до рендера карточек их нет и слушать нечего
  const photo_card_like_btns = document.querySelectorAll('.photo-card__button');

  // Все кнопки удалить в галерее. Кнопок много, и клик по каждой надо слушать.
  // если константу сделать вне функции, то браузер их не увидит, т.к. до рендера карточек их нет и слушать нечего
  const photo_card_delete_btns = document.querySelectorAll('.photo-card__delete');

  // Слушаем клик по изображениям всех карточек
  photo_card_images.forEach((photo_card_image) => {
    photo_card_image.addEventListener('click', function () {
      get_image(photo_card_image);
    })
  });

  // Слушаем клик по кнопке лайка фотографии. Кнопок много, вешаем прослушиватель на каждую.
  photo_card_like_btns.forEach((photo_card_like_btn) => {
    photo_card_like_btn.addEventListener('click', function () {
      photo_like(photo_card_like_btn);
    })
  });

  // Слушаем клик по кнопке удаления фотографии. Кнопок много, вешаем прослушиватель на каждую.
  photo_card_delete_btns.forEach((photo_card_delete_btn) => {
    photo_card_delete_btn.addEventListener('click', function () {
      // передаем ближайшую к кнопке удаления родительскую карточку
      photo_delete(photo_card_delete_btn.closest('.photo-card'));
    })
  });
}

// функция удаления карточки
// с расчетом на хранение массива карточек на сервере в будущем
function photo_delete(element) {
  // карточки галереи - photo-cards внутри секции gallery
  // после рендеринга
  const photo_rendered = document.querySelectorAll('.gallery .photo-cards .photo-card');

  // получаем индекс элемента массива photo_rendered, для которого нажали удалить
  let index = Object.keys(photo_rendered).find(key => photo_rendered[key] === element);

  // из массива initialCards удаляем элемент по id
  // так как массив реверсирован, то порядок индексов будет противоположен порядку карточек,
  // из полученного индекса вычитаем длину массива карточек (-1, т.к. индексы идут с 0),
  // получаем абсолютное значение (избавляемся от отрицательных значений)
  initialCards.splice(Math.abs(index - (photo_rendered.length - 1)), 1);

  // отрисовываем карточки по обновленному массиву
  photo_cards_render();
}

// функция отправки формы добавления места
function new_place_form_submit(evt) {
  evt.preventDefault();
// записываем элемент с ключами name и link в конец массива
  // он реверсирован, потому карточка будет первой
  initialCards.push({name: place_name.value, link: place_link.value});

  // отрисовываем карточки по обновленному массиву
  photo_cards_render();

  /* Закрыть всплывашку добавления карточки - удаляем класс popup_opened */
  new_place_popup.classList.remove('popup_opened');
  /* Очистить инпуты в всплывашке добавления карточки */
  clear_inputs(new_place_popup);
}

/// ПРОСЛУШИВАТЕЛИ ///

// Слушаем клик по кнопке редактирования профиля
profile_edit_btn.addEventListener('click', function () {
  /* Открыть всплывашку профиля */
  popup_show(profile_edit_popup);
  /* Получить данные о пользователе. Сейчас - из страницы, потом - из сервера */
  get_users_info();
})

// Слушаем отправку формы редактирования профиля
edit_profile_form.addEventListener('submit', profile_form_submit);

// Слушаем клик по кнопке Добавить место
add_place_btn.addEventListener('click', function () {
  /* Открыть всплывашку добавления места */
  popup_show(new_place_popup);
})

// Слушаем отправку формы добавления места
new_place_form.addEventListener('submit', new_place_form_submit);

// ждем загрузки DOM
document.addEventListener('DOMContentLoaded', function () {
  // отрисовываем карточки
  photo_cards_render();
});
