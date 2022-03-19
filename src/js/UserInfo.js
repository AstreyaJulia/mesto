/** Отображает информацию о пользователе на странице */
export class UserInfo {

  /** Конструктор
   * @param profileTitle - селектор элемента с именем пользователя на странице
   * @param profileSubtitle - селектор элемента с подписью пользователя на странице */
  constructor({profileTitle, profileSubtitle}) {
    this._title = document.querySelector(profileTitle);
    this._subtitle = document.querySelector(profileSubtitle);
  }

  /** Получает информацию о пользователе из разметки
   * @returns {*|{subtitle: *, title: *}} - объект с именем и подписью */
  getUserInfo() {
    this._info = {
      title: this._title.textContent,
      subtitle: this._subtitle.textContent,
    };
    return this._info;
  }

  /** Добавляет новые данные пользователя на страницу
   * @param info - объект с именем и подписью {*|{title: *, subtitle: *}} */
  setUserInfo(info) {
    this._title.textContent = info.name;
    this._subtitle.textContent = info.title;
  }
}
