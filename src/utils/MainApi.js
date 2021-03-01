export const BASE_URL = './api';

export const getResponseData = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(response);
};

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name, email, password})
  })
    .then(getResponseData);
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
    .then(getResponseData);
};

export const logout = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: 'post'
  })
    .then(getResponseData);
}

export const getUser = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET'
  })
    .then(getResponseData);
};

export const saveMovie = (movie, userId) => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: movie.image ? `https://api.nomoreparties.co${movie.image.url}` : 'https://images.puella-magi.net/thumb/2/27/No_Image_Wide.svg/1600px-No_Image_Wide.svg.png?20110202071158',
      thumbnail: movie.image ?`https://api.nomoreparties.co${movie.image.url}` : 'https://images.puella-magi.net/thumb/2/27/No_Image_Wide.svg/1600px-No_Image_Wide.svg.png?20110202071158',
      trailer: movie.trailerLink,
      owner: userId,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN
    })
  })
    .then(getResponseData);
};

export const deleteMovie = (movieId) => {
  return fetch(`${BASE_URL}/movies/${movieId}`, {
    method: 'DELETE'
  })
    .then(getResponseData);
}

export const getSavedMovies = () => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'GET'
  })
    .then(getResponseData);
};
