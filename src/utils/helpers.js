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
