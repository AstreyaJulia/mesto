# Учебный проект "Место"

### Обзор

* Описание
* Использовано
* Процесс написания

**Описание**
Проектная работа 3 курса, спринт 4
по профессии ["Веб-разработчик"](https://practicum.yandex.ru/profile/web/) 
образовательной платформы [ЯндексПрактикум](https://practicum.yandex.ru)
поток №39, группа "Purple"
старт обучения по основной программе - 14.11.2021 года

[Страница проекта на GitHub Pages](https://astreyajulia.github.io/mesto/)

## Использовано:
1. Браузерные стили сброшены через Normalize.css;
2. Семантическая верстка;
3. Файловая структура проекта организована по БЭМ-схеме Nested;
4. Шрифты в форматах woff и woff2;
5. Изображения с unsplash:
   * [Iceland](https://unsplash.com/photos/NljlxpD5nDo) от пользователя `Cosmic Timetraveler`;
   * [Буковель, Yaremcha, Ukraine](https://unsplash.com/photos/vwkGYtsTrOw) от пользователя `Maksym Tymchyk`;
   * [Iceland](https://unsplash.com/photos/3ZM3ynmfJKY) от пользователя Leandra Rieger;
   * [Road trip through Arizona](https://unsplash.com/photos/DcLgNe7rswI) от пользователя `Polina Kuzovkova`;
   * [Toronto, Canada](https://unsplash.com/photos/EtegrieNVDM) от пользователя `Hazwan Kosni`;
   * [Trondheim](https://unsplash.com/photos/B8CQ-YXE1l4) от пользователя `Error 420 📷`;
6. Сетка на flex (в основном);
7. Сетка на grid для блока gallery;
8. Фиксированное (fixed) позиционирование для всплывашки (popup) чтоб не убегала при прокручивании страницы;

## Пошагово:
#### Спринт 4 (10.01.2022 - ...):
1. Настройка проекта: gitignore, nojekyll;
2. [Normalize.css](https://necolas.github.io/normalize.css/). Установка через npm: `npm install normalize.css`;
3. Семантическая разметка;
4. Изображения с Unsplash и из макета Figma;
5. Параметры текстовых элементов - цвет, размер, междустрочный интервал;
6. Шапка (header) для больших разрешений;
7. Шапка (header) для мобильных разрешений;
8. Профиль (profile) для больших разрешений;
9. Профиль (profile) для мобильных разрешений;
10. Галерея (gallery) для больших разрешений;
11. Общий блок button для изменения прозрачности при наведении на кнопки;
12. Галерея (gallery) для мобильных разрешений;
13. Подвал (footer) для больших разрешений;
14. Подвал (footer) для мобильных разрешений;
15. Всплывашка (popup);
16. JS:
* ф-я открытия всплывашек (с аргументом popup - элемент всплывашки, т.к. их будет несколько);
* ф-я закрытия всплывашки (с аргументом popup - элемент всплывашки, т.к. их будет несколько);
* ф-я получения данных пользователя (сейчас - из профиля, в будущем - из сервера);
* ф-я очистки инпутов (с аргументом popup - элемент всплывашки, т.к. их будет 2 - редактирование профиля и добавление места);
* ф-я кнопки лайк (сейчас просто переключает класс);
* ф-я отправки введенных в всплывашку редактирования профиля данных (сейчас просто переписывает значения в профиле);
