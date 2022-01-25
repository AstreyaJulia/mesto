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

// кнопки закрытия всплывашек на всех всплывашках
const popup_close_buttons = document.querySelectorAll(".popup__close-button");

/// * Карточки в галерее *///

// Все кнопки лайк в галерее. Кнопок много, и клик по каждой надо слушать.
const photo_card_like_btns = document.querySelectorAll('.photo-card__button');


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
  // ищем все input[type="text"] в popup который передан аргументом
  let inputs = popup.querySelectorAll('input[type="text"]');
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

// функция отправки данных формы редактирования профиля
// аргумент evt - передаваемое событие. только для evt.preventDefault()
function profile_form_submit(evt) {
  evt.preventDefault();

  /* присваиваем значениям в профиле значения инпутов */
  profile_title.textContent = popup_title_input.value;
  profile_subtitle.textContent = popup_subtitle_input.value;

  /* Закрыть всплывашку профиля */
  popup_close(profile_edit_popup);
  /* Очистить инпуты в всплывашке редактирования профиля */
  clear_inputs(profile_edit_popup);
}

/// ПРОСЛУШИВАТЕЛИ ///

// Слушаем клик по кнопке редактирования профиля
profile_edit_btn.addEventListener('click', function () {
  /* Открыть всплывашку профиля */
  popup_show(profile_edit_popup);
  /* Получить данные о пользователе. Сейчас - из страницы, потом - из сервера */
  get_users_info();
})

// Слушаем клик по кнопке лайка фотографии. Кнопок много, вешаем прослушиватель на каждую.
photo_card_like_btns.forEach((photo_card_like_btn) => {
  photo_card_like_btn.addEventListener('click', function () {
    photo_like(photo_card_like_btn);
  })
});

// Слушаем отправку формы редактирования профиля
edit_profile_form.addEventListener('submit', profile_form_submit);

// Слушаем клик по кнопке Добавить место
add_place_btn.addEventListener('click', function () {
  /* Открыть всплывашку добавления места */
  popup_show(new_place_popup);
})
