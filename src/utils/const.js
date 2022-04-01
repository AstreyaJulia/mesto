import iceland_1 from '../images/photos/iceland_1.jpg';
import bukovel_1 from '../images/photos/bukovel_1.jpg';
import iceland_2 from '../images/photos/iceland_2.jpg';
import arizona_1 from '../images/photos/arizona_1.jpg';
import toronto_1 from '../images/photos/toronto_1.jpg';
import trondheim_1 from '../images/photos/trondheim_1.jpg';

/** Массив карточек в галерее */
export const initialCards = [
  {
    name: 'Исландия',
    link: iceland_1
  },
  {
    name: 'Буковель, Украина',
    link: bukovel_1
  },
  {
    name: 'Исландия',
    link: iceland_2
  },
  {
    name: 'Аризона, США',
    link: arizona_1
  },
  {
    name: 'Торонто, Канада',
    link: toronto_1
  },
  {
    name: 'Тронхейм, Норвегия',
    link: trondheim_1
  }
];

/** Объект настроек для работы с API
 * @type {{headers: {authorization: string, "Content-Type": string}, serverURL: string}}
 */
export const apiSettings = {
  serverURL: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: '4731e034-9d67-4265-b193-d9b726ab32a8',
    'Content-Type': 'application/json'
  }
};
