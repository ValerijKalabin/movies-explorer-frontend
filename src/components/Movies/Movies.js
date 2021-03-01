import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { useEffect, useState } from 'react';
import * as api from '../../utils/MoviesApi';
import * as helper from '../../utils/helpers';

function Movies({ onClickCardButton }) {
  const [searchValue, setSearchValue] = useState('');
  const [searchError, setSearchError] = useState('');
  const [notCardsMessage, setNotCardsMessage] = useState('');
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

  function handleClickMoreButton() {
    setMoviesCount(moviesCount + helper.getAddMoviesCount());
    setCurrentMovies(filterMovies.slice(0, moviesCount + helper.getAddMoviesCount()));
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    const searchValueTrim = searchValue.trim();
    setSearchValue(searchValueTrim);
    if (!searchValueTrim) {
      setSearchError('Нужно ввести ключевое слово');
    } else {
      setSearchError('');
      setNotCardsMessage('');
      setSearchMovies([]);
      setFilterMovies([]);
      setCurrentMovies([]);
      setMoviesCount(helper.getMoviesCount());
      setVisiblePreloader(true);
      api.getMovies()
        .then((movies) => {
          const moviesFound = helper.searchFilter(movies, searchValueTrim);
          setSearchMovies(moviesFound);
          localStorage.setItem('movies-found', JSON.stringify(moviesFound));
          const moviesFiltered = helper.durationFilter(moviesFound, checkboxChecked);
          setFilterMovies(moviesFiltered);
          setCurrentMovies(moviesFiltered.slice(0, helper.getMoviesCount()));
          setNotCardsMessage('Ничего не найдено');
        })
        .catch(() => {
          setNotCardsMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        })
        .finally(() => {
          setVisiblePreloader(false);
        });
    }
  }

  useEffect(() => {
    const localMovies = JSON.parse(localStorage.getItem('movies-found'));
    if (localMovies && localMovies.length) {
      setSearchMovies(localMovies);
      setFilterMovies(localMovies);
      setMoviesCount(helper.getMoviesCount());
      setCurrentMovies(localMovies.slice(0, helper.getMoviesCount()));
      setNotCardsMessage('Ничего не найдено');
    }
  }, []);

  useEffect(() => {
    function updateCardsList() {
      setTimeout(() => {
        setMoviesCount(helper.getMoviesCount());
        setCurrentMovies(filterMovies.slice(0, helper.getMoviesCount()));
      }, 700);
    }

    window.addEventListener('resize', updateCardsList);
    return () => window.removeEventListener('resize', updateCardsList);
  }, [filterMovies]);

  return (
    <div className="movies">
      <Header />
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
        notCardsMessage={notCardsMessage}
        isVisiblePreloader={isVisiblePreloader}
        isVisibleButtonMore={filterMovies.length > currentMovies.length}
        onClickMoreButton={handleClickMoreButton}
        onClickCardButton={onClickCardButton}
      />
      <Footer />
    </div>
  );
}

export default Movies;
