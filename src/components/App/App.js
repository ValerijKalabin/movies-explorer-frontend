import './App.css';
import { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import ErrorPopup from '../ErrorPopup/ErrorPopup';
import * as api from '../../utils/MainApi';
import * as moviesApi from '../../utils/MoviesApi';
import {
  NOT_FOUND_MOVIES,
  SERVER_ERROR_MESSAGE
} from '../../utils/constants';

function App() {
  const localUser = JSON.parse(localStorage.getItem('current-user')) || {};

  const [isVisiblePreloader, setVisiblePreloader] = useState(false);
  const [isDisabledSearch, setDisabledSearch] = useState(false);
  const [errorPopupMessage, setErrorPopupMessage] = useState('');
  const [messageNoMovies, setMessageNoMovies] = useState('');
  const [allMovies, setAllMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState(localUser);

  const loggedIn = !!currentUser.email;

  function saveAllMovies(movies) {
    const verifiedMovies = movies.map((movie) => {
      movie.isSaved = selectedMovies.some((selectedMovie) => selectedMovie.movieId === movie.id);
      return movie;
    });
    setAllMovies(verifiedMovies);
    localStorage.setItem('all-movies', JSON.stringify(verifiedMovies));
  };

  function handleAuthSubmit(user, movies) {
    setCurrentUser(user);
    setSelectedMovies(movies.reverse());
    localStorage.setItem('current-user', JSON.stringify(user));
  }

  function handleUpdateUser(user) {
    setCurrentUser(user);
    localStorage.setItem('current-user', JSON.stringify(user));
  }

  function handleMoviesSearchSubmit() {
    setDisabledSearch(true);
    setMessageNoMovies('');
    setVisiblePreloader(true);
    moviesApi.getMovies()
      .then((movies) => {
        saveAllMovies(movies);
        setMessageNoMovies(NOT_FOUND_MOVIES);
      })
      .catch(() => {
        setMessageNoMovies(SERVER_ERROR_MESSAGE);
      })
      .finally(() => {
        setVisiblePreloader(false);
        setDisabledSearch(false);
      });
  }

  function handleClickCardButton(movie) {
    if(!movie.isSaved && !movie.owner) {
      api.saveMovie(movie, currentUser._id)
        .then((selectedMovie) => {
          setSelectedMovies([selectedMovie, ...selectedMovies]);
        })
        .catch(() => {
          setErrorPopupMessage(SERVER_ERROR_MESSAGE);
        });
    } else {
      const movieId = movie.id || movie.movieId;
      const deletedMovie = selectedMovies.find((selectedMovie) => selectedMovie.movieId === movieId);
      api.deleteMovie(deletedMovie._id)
        .then(() => {
          const newSelectedMovies = selectedMovies.filter((selectedMovie) => selectedMovie.movieId !== movieId);
          setSelectedMovies(newSelectedMovies);
        })
        .catch(() => {
          setErrorPopupMessage(SERVER_ERROR_MESSAGE);
        });
    }
  }

  function handleClickPopupButton() {
    setErrorPopupMessage('');
  }

  useEffect(() => {
    Promise.all([
      api.getUser(),
      api.getSavedMovies()
    ])
      .then(([user, movies]) => {
        setCurrentUser(user);
        setSelectedMovies(movies.reverse());
        localStorage.setItem('current-user', JSON.stringify(user));
      })
      .catch(() => {
        setCurrentUser({});
        localStorage.removeItem('current-user');
      });
  }, []);

  useEffect(() => {
    const localMovies = JSON.parse(localStorage.getItem('all-movies')) || [];
    const verifiedMovies = localMovies.map((localMovie) => {
      localMovie.isSaved = selectedMovies.some((selectedMovie) => selectedMovie.movieId === localMovie.id);
      return localMovie;
    });
    setAllMovies(verifiedMovies);
    localStorage.setItem('all-movies', JSON.stringify(verifiedMovies));
    if(!!verifiedMovies.length) {
      setMessageNoMovies(NOT_FOUND_MOVIES);
    }
  }, [currentUser, selectedMovies]);

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <ProtectedRoute
            path="/movies"
            component={Movies}
            allMovies={allMovies}
            onMoviesSearchSubmit={handleMoviesSearchSubmit}
            isDisabledSearch={isDisabledSearch}
            onClickCardButton={handleClickCardButton}
            isVisiblePreloader={isVisiblePreloader}
            messageNoMovies={messageNoMovies}
          />
          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            selectedMovies={selectedMovies}
            onClickCardButton={handleClickCardButton}
          />
          <ProtectedRoute
            path="/profile"
            component={Profile}
            onUpdateUser={handleUpdateUser}
          />
          <Route path="/signup">
            {
              !loggedIn
              ? <Register onRegisterSubmit={handleAuthSubmit} />
              : <Redirect to="./" />
            }
          </Route>
          <Route path="/signin">
            {
              !loggedIn
              ? <Login onLoginSubmit={handleAuthSubmit} />
              : <Redirect to="./" />
            }
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
        {
          !!errorPopupMessage &&
          <ErrorPopup
            errorPopupMessage={errorPopupMessage}
            onClickPopupButton={handleClickPopupButton}
          />
        }
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
