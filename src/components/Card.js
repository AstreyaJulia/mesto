export class Card {
  /** Конструктор карточки
   * @param currentUser - id залогиненного пользователя, полученное перед отрисовкой карточек
   * @param handleCardClick - ф-я, открывающая всплывашку изображения при клике на картинку
   * @param handleDeleteCard - ф-я, открывающая всплывашку подтверждения удаления карточки
   * @param handleLikeCard - ф-я, ставящая/удаляющая лайк
   * @param cardTemplateSelector - селектор шаблона карточки из разметки
   * @param item - элемент из массива {_id: ID карточки, name: название, link: ссылка, likes: лайки, owner{} - данные о владельце карточки ({_id: ID владельца})} */
  constructor({item, currentUser, handleCardClick, handleDeleteCard, handleLikeCard}, cardTemplateSelector) {
    this._cardId = item._id;
    this._name = item.name;
    this._link = item.link;
    this._likes = item.likes;
    this._ownerId = item.owner._id;
    this._cardElement = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
    this._currentUser = currentUser;
  }

  /** Получает шаблон, клонирует его
   * @returns {Node} - элемент карточки
   * @private */
  _getCardTemplate() {
    return document.querySelector(this._cardElement).content.querySelector('li').cloneNode(true);
  }

  /** Получает кол-во лайков фото, проверяет, поставил ли текущий пользователь лайк и делает активной кнопку лайка
   * @private */
  checkLikes() {
    if (this._likes.length !== 0) {
      this._cardItem.querySelector('.photo-card__like-counter').textContent = this._likes.length;
    } else {
      this._cardItem.querySelector('.photo-card__like-counter').textContent = '0';
    }
    this._likes.forEach((like) => {
      if (like._id === this._currentUser) {
        this._cardLikeButton.classList.add('photo-card__like-button_active');
      }
    });
  }

  /** Устанавливает прослушиватели: лайк, удаление, нажатие на изображение
   * если владелец карточки не является текущим пользователем, то прослушиватель на кнопку удаления не вешается
   * @private */
  _setEventListeners() {
    this._cardLikeButton.addEventListener('click', () => {
      if (!this._cardLikeButton.classList.contains('photo-card__like-button_active')) {
        this._handleLikeCard.handleSetLike(this._cardId, this._cardItem);
        this._cardLikeButton.classList.add('photo-card__like-button_active');
      } else {
        this._handleLikeCard.handleDeleteLike(this._cardId, this._cardItem);
        this._cardLikeButton.classList.remove('photo-card__like-button_active');
      }
    });
    if (this._ownerId === this._currentUser) {
      this._cardDeleteButton.addEventListener('click', () => this._handleDeleteCard(this._cardId, this._cardItem));
    }
    this._cardImage.addEventListener('click', () => this._handleCardClick());
  }

  /** Создает карточку, заполняет название, ссылку на изображение, устанавливает прослушиватели
   * если владелец карточки не является текущим пользователем, то кнопка удаления не отображается
   * @returns {Node} - заполненный элемент карточки с установленными прослушивателями */
  createCard() {
    this._cardItem = this._getCardTemplate();
    this._cardImage = this._cardItem.querySelector('.photo-card__image');
    this._cardLikeButton = this._cardItem.querySelector('.photo-card__like-button');
    this._cardDeleteButton = this._cardItem.querySelector('.photo-card__delete');
    this._cardItem.querySelector('.photo-card__title').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    if (this._ownerId !== this._currentUser) {
      this._cardDeleteButton.remove();
    }
    this.checkLikes();
    this._setEventListeners();
    return this._cardItem;
  }
}
