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
import * as helper from '../../utils/helpers';
import {
  NOT_FOUND_MOVIES,
  SERVER_ERROR_MESSAGE
} from '../../utils/constants';

function App() {
  const [isVisiblePreloader, setVisiblePreloader] = useState(false);
  const [errorPopupMessage, setErrorPopupMessage] = useState('');
  const [messageNoMovies, setMessageNoMovies] = useState('');
  const [searchMovies, setSearchMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const loggedIn = !!currentUser.email;

  function saveSearchMovies(moviesFound) {
    const moviesVerified = moviesFound.map((movieFound) => {
      const movieFoundSelected = selectedMovies.some((selectedMovie) => selectedMovie.movieId === movieFound.id);
      if(movieFoundSelected) {
        movieFound.isSaved = true;
      } else {
        movieFound.isSaved = false;
      }
      return movieFound;
    });
    setSearchMovies(moviesVerified);
    localStorage.setItem('movies-found', JSON.stringify(moviesVerified));
  };

  function adjustSearchMovies(movie, isSaved) {
    const newSearchMovies = searchMovies.map((searchMovie) => {
      const movieId = movie.id || movie.movieId;
      if (searchMovie.id === movieId) {
        searchMovie.isSaved = isSaved;
      }
      return searchMovie;
    });
    setSearchMovies(newSearchMovies);
    localStorage.setItem('movies-found', JSON.stringify(newSearchMovies));
  };

  function handleAuthSubmit(user, movies) {
    setCurrentUser(user);
    setSelectedMovies(movies.reverse());
  }

  function handleUpdateUser(user) {
    setCurrentUser(user);
  }

  function handleMoviesSearchSubmit(value) {
    setMessageNoMovies('');
    setSearchMovies([]);
    setVisiblePreloader(true);
    moviesApi.getMovies()
      .then((movies) => {
        const moviesFound = helper.searchFilter(movies, value);
        saveSearchMovies(moviesFound);
        setMessageNoMovies(NOT_FOUND_MOVIES);
      })
      .catch(() => {
        setMessageNoMovies(SERVER_ERROR_MESSAGE);
      })
      .finally(() => {
        setVisiblePreloader(false);
      });
  }

  function handleClickCardButton(movie) {
    if(!movie.isSaved && !movie.owner) {
      api.saveMovie(movie, currentUser._id)
        .then((selectedMovie) => {
          setSelectedMovies([selectedMovie, ...selectedMovies]);
          adjustSearchMovies(movie, true);
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
          adjustSearchMovies(movie, false);
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
    const localMovies = JSON.parse(localStorage.getItem('movies-found'));
    if (localMovies && localMovies.length) {
      setSearchMovies(localMovies);
      setMessageNoMovies(NOT_FOUND_MOVIES);
    }
    Promise.all([
      api.getUser(),
      api.getSavedMovies()
    ])
      .then(([user, movies]) => {
        setCurrentUser(user);
        setSelectedMovies(movies.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
            onMoviesSearchSubmit={handleMoviesSearchSubmit}
            onClickCardButton={handleClickCardButton}
            isVisiblePreloader={isVisiblePreloader}
            messageNoMovies={messageNoMovies}
            searchMovies={searchMovies}
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
              : <Redirect to="./movies" />
            }
          </Route>
          <Route path="/signin">
            {
              !loggedIn
              ? <Login onLoginSubmit={handleAuthSubmit} />
              : <Redirect to="./movies" />
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
