import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { useState } from 'react';
import * as api from '../../utils/MoviesApi';
import * as helper from '../../utils/helpers';

function Movies() {
  const loggedIn = true;
  const [searchValue, setSearchValue] = useState('');
  const [searchError, setSearchError] = useState('');
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [isVisiblePreloader, setVisiblePreloader] = useState(false);
  const [searchMovies, setSearchMovies] = useState([]);
  const [filterMovies, setFilterMovies] = useState([]);
  const [currentMovies, setCurrentMovies] = useState([]);
  const [moviesCount, setMoviesCount] = useState(0);

  function handleSearchChange(event) {
    setSearchValue(event.target.value);
  }

  function handleCheckboxChange() {
    setCheckboxChecked(!checkboxChecked);
    const moviesFiltered = helper.durationFilter(searchMovies, !checkboxChecked);
    setFilterMovies(moviesFiltered);
    setCurrentMovies(moviesFiltered.slice(0, moviesCount));
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    const searchValueTrim = searchValue.trim();
    setSearchValue(searchValueTrim);
    if (!searchValueTrim) {
      setSearchError('Нужно ввести ключевое слово');
    } else {
      setSearchError('');
      setSearchMovies([]);
      setFilterMovies([]);
      setCurrentMovies([]);
      setMoviesCount(helper.getMoviesCount());
      setVisiblePreloader(true);
      api.getMovies()
        .then((movies) => {
          const moviesFound = helper.searchFilter(movies, searchValueTrim);
          setSearchMovies(moviesFound);
          const moviesFiltered = helper.durationFilter(moviesFound, checkboxChecked);
          setFilterMovies(moviesFiltered);
          setCurrentMovies(moviesFiltered.slice(0, helper.getMoviesCount()));
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setVisiblePreloader(false);
        });
    }
  }

  function handleButtonMoreClick() {
    setMoviesCount(moviesCount + helper.getAddMoviesCount());
    setCurrentMovies(filterMovies.slice(0, moviesCount + helper.getAddMoviesCount()));
  }

  return (
    <div className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm
        value={searchValue}
        error={searchError}
        handleChange={handleSearchChange}
        handleSubmit={handleSearchSubmit}
        isCheckboxChecked={checkboxChecked}
        onCheckboxChange={handleCheckboxChange}
      />
      <MoviesCardList
        cards={currentMovies}
        isSavedMoviesList={false}
        isVisiblePreloader={isVisiblePreloader}
        isVisibleButtonMore={filterMovies.length > currentMovies.length}
        onButtonMoreClick={handleButtonMoreClick}
      />
      <Footer />
    </div>
  );
}

export default Movies;
