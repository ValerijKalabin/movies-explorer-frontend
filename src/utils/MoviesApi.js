export const MOVIES_URL = 'https://api.nomoreparties.co/beatfilm-movies';

export const getResponseData = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(response);
};

export const getMovies = () => {
  return fetch(MOVIES_URL, {
    method: 'GET'
  })
    .then(getResponseData);
};
