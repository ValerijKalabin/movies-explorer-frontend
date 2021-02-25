const MAX_DURATION_OF_SHORT_FILM = 40;

const movieFilter = (movies, value, checked) => movies.filter((movie) => {
  const nameLowerCase = movie.nameRU.toLowerCase();
  const valueLowerCase = value.toLowerCase();
  const maxDuration = checked ? MAX_DURATION_OF_SHORT_FILM : Infinity;
  return nameLowerCase.includes(valueLowerCase) && movie.duration <= maxDuration;
});

const getDurationCaption = (duration) => {
  const tens = Math.abs(duration) % 100;
  const units = tens % 10;
  if (tens > 10 && tens < 20) return 'минут';
  if (units > 1 && units < 5) return 'минуты';
  if (units === 1) return 'минута';
  return 'минут';
};

export { getDurationCaption, movieFilter };
