import noImage from '../images/no-image.jpg';

const MAX_DURATION_OF_SHORT_FILM = 40;

export const durationFilter = (movies, checked) => movies.filter((movie) => {
  const maxDuration = checked ? MAX_DURATION_OF_SHORT_FILM : Infinity;
  return movie.duration <= maxDuration;
});

export const searchFilter = (movies, value) => movies.filter((movie) => {
  const nameLowerCase = movie.nameRU.toLowerCase();
  const valueLowerCase = value.toLowerCase();
  return nameLowerCase.includes(valueLowerCase);
});

export const getMoviesCount = () => {
  if (window.innerWidth >= 1080) return 12;
  if (window.innerWidth >= 680) return 8;
  return 5;
};

export const getAddMoviesCount = () => {
  if (window.innerWidth >= 1080) return 3;
  return 2;
};

export const getDurationCaption = (duration) => {
  const tens = Math.abs(duration) % 100;
  const units = tens % 10;
  if (tens > 10 && tens < 20) return 'минут';
  if (units > 1 && units < 5) return 'минуты';
  if (units === 1) return 'минута';
  return 'минут';
};

export const getErrorMessage = (error) => {
  if (error.status === 400) return 'Укажите корректные данные пользователя';
  if (error.status === 401) return 'Неправильные почта или пароль';
  if (error.status === 404) return 'Ресурс не найден';
  if (error.status === 409) return 'Пользователь с такой почтой уже зарегистрирован';
  return 'Ошибка сервера';
};

export const getTrailerHref = (card) => {
  if (card.trailerLink) return card.trailerLink;
  if (card.trailer) return card.trailer;
  return 'https://www.youtube.com/';
};

export const getCardImage = (card) => {
  if (card.image && card.image.url) return `https://api.nomoreparties.co${card.image.url}`;
  if (card.image) return card.image;
  return noImage;
};
