import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { useState } from 'react';
import { movieFilter } from '../../utils/helpers';
import * as api from '../../utils/MoviesApi';

function Movies() {
  const loggedIn = true;
  const [searchValue, setSearchValue] = useState('');
  const [searchError, setSearchError] = useState('');
  const [currentMovies, setCurrentMovies] = useState([]);

  function handleSearchChange(event) {
    setSearchValue(event.target.value);
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    const searchValueTrim = searchValue.trim();
    if (!searchValueTrim) {
      setSearchError('Нужно ввести ключевое слово');
    } else {
      setSearchError('');
      api.getMovies()
        .then((movies) => {
          setCurrentMovies(movieFilter(movies, searchValue));
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setSearchValue(searchValueTrim);
  }

  return (
    <div className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm
        value={searchValue}
        error={searchError}
        handleChange={handleSearchChange}
        handleSubmit={handleSearchSubmit}
      />
      <MoviesCardList
        cards={currentMovies}
        isSavedMoviesList={false}
        isVisibleButtonMore={true}
      />
      <Footer />
    </div>
  );
}

export default Movies;
