'use strict'; // строгий режим

///* Профиль *///

// Кнопка редактирования профиля
const profile_edit_btn = document.querySelector(".profile__button");

// Информация о пользователе из профиля
const profile_title = document.querySelector(".profile__title");
const profile_subtitle = document.querySelector(".profile__subtitle");

///* Всплывашка (popup) редактирования профиля *///

// Сама всплывашка редактирования профиля
const profile_edit_popup = document.querySelector(".popup_edit_profile");

// Кнопка закрытия всплывашки редактирования профиля
const profile_edit_popup_close_btn = profile_edit_popup.querySelector(".popup__close-button");

// Инпуты в всплывашке редактирования профиля
const popup_title_input = document.getElementById('profile_name');
const popup_subtitle_input = document.getElementById('profile_title');

// Форма в всплывашке редактирования профиля
const edit_profile_form = profile_edit_popup.querySelector('.popup__form');



/// * Карточки в галерее *///

// Все кнопки лайк в галерее. Кнопок много, и клик по каждой надо слушать.
const photo_card_like_btns = document.querySelectorAll('.photo-card__button');



///* ФУНКЦИИ *///

// Открывашка всплывашки. Если всплывашек будет несколько
// Аргумент popup - элемент popup
function popup_show(popup) {
  popup.classList.add('popup_opened');
}

/* FIXME -> Сделать универсальную ф-ю открывашку, в которой условие,
    если у элемента есть класс нового места или профиля, то сделать сброс значений */
// Закрывашка всплывашки. Если всплывашек будет несколько
// Аргумент popup - элемент popup
function popup_close(popup) {
  popup.classList.remove('popup_opened');
}

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

function form_submit_check(evt) {
  evt.preventDefault();

}

/// ПРОСЛУШИВАТЕЛИ ///

// Слушаем клик по кнопке редактирования профиля
profile_edit_btn.addEventListener('click', function () {
  /* Открыть всплывашку профиля */
  popup_show(profile_edit_popup);
  /* Получить данные о пользователе. Сейчас - из страницы, потом - из сервера */
  get_users_info();
})

// Слушаем клик по кнопке закрытия всплывашки редактирования профиля
/* FIXME -> Сделать универсальную ф-ю открывашку, в которой условие,
    если у элемента есть класс нового места или профиля, то сделать сброс значений */
profile_edit_popup_close_btn.addEventListener('click', function () {
  /* Закрыть всплывашку профиля */
  popup_close(profile_edit_popup);
  /* Очистить инпуты в всплывашке редактирования профиля */
  clear_inputs(profile_edit_popup);
})

// Слушаем клик по кнопке лайка фотографии. Кнопок много, вешаем прослушиватель на каждую.
photo_card_like_btns.forEach((photo_card_like_btn) => {
  photo_card_like_btn.addEventListener('click', function () {
    photo_like(photo_card_like_btn);
  })
});

// Прослушиватель для отправки формы редактирования профиля
edit_profile_form.addEventListener('submit', form_submit_check);
