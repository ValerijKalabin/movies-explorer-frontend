const getDurationCaption = (duration) => {
  const tens = Math.abs(duration) % 100;
  const units = tens % 10;
  if (tens > 10 && tens < 20) return 'минут';
  if (units > 1 && units < 5) return 'минуты';
  if (units === 1) return 'минута';
  return 'минут';
};

const movieFilter = (movies, value) => movies.filter((movie) => {
  const nameLowerCase = movie.nameRU.toLowerCase();
  const valueLowerCase = value.toLowerCase();
  return nameLowerCase.includes(valueLowerCase);
});

export { getDurationCaption, movieFilter };
