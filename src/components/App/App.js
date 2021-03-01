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
import * as api from '../../utils/MainApi';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [selectedMovies, setSelectedMovies] = useState([]);
  const loggedIn = !!currentUser.email;

  function handleClickCardButton(movie) {
    if(!movie.owner) {
      api.saveMovie(movie, currentUser._id)
        .then((selectedMovie) => {
          setSelectedMovies([selectedMovie, ...selectedMovies]);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      api.deleteMovie(movie._id)
        .then(() => {
          const newSelectedMovies = selectedMovies.filter((selectedMovie) => selectedMovie._id !== movie._id);
          setSelectedMovies(newSelectedMovies);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  useEffect(() => {
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
            onClickCardButton={handleClickCardButton}
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
            setCurrentUser={setCurrentUser}
          />
          <Route path="/signup">
            {
              !loggedIn
              ? <Register setCurrentUser={setCurrentUser} />
              : <Redirect to="./movies" />
            }
          </Route>
          <Route path="/signin">
            {
              !loggedIn
              ? <Login setCurrentUser={setCurrentUser} />
              : <Redirect to="./movies" />
            }
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
