import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { useEffect, useState } from 'react';
import * as helper from '../../utils/helpers';

function Movies({
  allMovies,
  onMoviesSearchSubmit,
  isDisabledSearch,
  onClickCardButton,
  isVisiblePreloader,
  messageNoMovies
}) {
  const [searchValue, setSearchValue] = useState('');
  const [isCheckboxChecked, setCheckboxChecked] = useState(false);
  const [moviesCount, setMoviesCount] = useState(helper.getMoviesCount());
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [currentMovies, setCurrentMovies] = useState([]);

  function handleSearchSubmit(value) {
    setSearchValue(value);
    if(!allMovies.length) {
      onMoviesSearchSubmit();
    }
  }

  function handleCheckboxChange() {
    setCheckboxChecked(!isCheckboxChecked);
  }

  function handleClickMoreButton() {
    setMoviesCount(moviesCount + helper.getAddMoviesCount());
  }

  useEffect(() => {
    const moviesFound = helper.searchFilter(allMovies, searchValue);
    const moviesFiltered = helper.durationFilter(moviesFound, isCheckboxChecked);
    setFilteredMovies(moviesFiltered);
    setCurrentMovies(moviesFiltered.slice(0, moviesCount));
  }, [allMovies, searchValue, isCheckboxChecked, moviesCount]);

  useEffect(() => {
    function updateCardsList() {
      setTimeout(() => {
        setMoviesCount(helper.getMoviesCount());
        setCurrentMovies(filteredMovies.slice(0, helper.getMoviesCount()));
      }, 700);
    }
    window.addEventListener('resize', updateCardsList);
    return () => window.removeEventListener('resize', updateCardsList);
  }, [filteredMovies]);

  return (
    <div className="movies">
      <Header />
      <SearchForm
        onSearchSubmit={handleSearchSubmit}
        isDisabledSearch={isDisabledSearch}
        isCheckboxChecked={isCheckboxChecked}
        onCheckboxChange={handleCheckboxChange}
      />
      <MoviesCardList
        cards={currentMovies}
        messageNoMovies={messageNoMovies}
        isVisiblePreloader={isVisiblePreloader}
        isVisibleButtonMore={filteredMovies.length > currentMovies.length}
        onClickMoreButton={handleClickMoreButton}
        onClickCardButton={onClickCardButton}
      />
      <Footer />
    </div>
  );
}

export default Movies;
