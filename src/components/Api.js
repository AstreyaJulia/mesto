export class Api {
  /** @param options - опции для работы с API (serverURL - url сервера, headers - заголовки в виде объекта) */
  constructor(options) {
    this._headers = options.headers;
    this._serverURL = options.serverURL;
    /** возвращает ответ / ошибку после выполнения промиса */
    this._handlePromiseReturn = ((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  /** Работа с данными пользователя */

  /** Получает инфо о пользователе с сервера
   * @returns {Promise<Response>} - объект с данными пользователя / текст ошибки */
  getUserInfo() {
    return fetch(`${this._serverURL}/users/me`, {
      headers: this._headers
    })
      .then((res) => this._handlePromiseReturn(res));
  }

  /** Отправляет инфо о пользователе на сервер
   * @param data - отправляемые данные
   * @returns {Promise<Response>} - объект с обновленными даннями / текст ошибки */
  sendUserInfo(data) {
    return fetch(`${this._serverURL}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then((res) => this._handlePromiseReturn(res));
  }

  /** Обновляет аватар пользователя на сервере
   * @param avatar
   * @returns {Promise<Response>} - объект с обновленными даннями / текст ошибки */
  updateAvatar(avatar) {
    return fetch(`${this._serverURL}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then((res) => this._handlePromiseReturn(res));
  }

  /** Работа с карточками */

  /** Получает карточки с сервера
   * @returns {Promise<Response>} - объект с карточками / текст ошибки */
  getCards() {
    return fetch(`${this._serverURL}/cards`, {
      headers: this._headers
    })
      .then((res) => this._handlePromiseReturn(res));
  }

  /** Отправляет данные о новой карточке на сервер
   * @param data - объект с данными карточки
   * @returns {Promise<Response>} - объект карточки / текст ошибки */
  sendCard(data) {
    return fetch(`${this._serverURL}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then((res) => this._handlePromiseReturn(res));
  }

  /** Удаляет карточку с сервера
   * @param cardID - ID карточки
   * @returns {Promise<Response>} - объект карточки / текст ошибки */
  deleteCard(cardID) {
    return fetch(`${this._serverURL}/cards/${cardID}`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  /** Ставит лайк
   * @param cardID - ID карточки
   * @returns {Promise<Response>} - объект карточки / текст ошибки */
  setLike(cardID) {
    return fetch(`${this._serverURL}/cards/${cardID}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
      .then((res) => this._handlePromiseReturn(res));
  }

  /** Удаляет лайк
   * @param cardID - ID карточки
   * @returns {Promise<Response>} - объект карточки / текст ошибки */
  deleteLike(cardID) {
    return fetch(`${this._serverURL}/cards/${cardID}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then((res) => this._handlePromiseReturn(res));
  }

}
