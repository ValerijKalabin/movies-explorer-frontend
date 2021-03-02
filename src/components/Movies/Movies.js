import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { useEffect, useState } from 'react';
import * as helper from '../../utils/helpers';

function Movies({
    isMoviesCheckboxChecked,
    onMoviesCheckboxChange,
    onMoviesSearchSubmit,
    onClickCardButton,
    isVisiblePreloader,
    messageNoMovies,
    searchMovies
}) {
  const [moviesCount, setMoviesCount] = useState(helper.getMoviesCount());
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [currentMovies, setCurrentMovies] = useState([]);

  function handleClickMoreButton() {
    setMoviesCount(moviesCount + helper.getAddMoviesCount());
  }

  useEffect(() => {
    const moviesFiltered = helper.durationFilter(searchMovies, isMoviesCheckboxChecked);
    setFilteredMovies(moviesFiltered);
    setCurrentMovies(moviesFiltered.slice(0, moviesCount));
  }, [searchMovies, isMoviesCheckboxChecked, moviesCount]);

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
        onSearchSubmit={onMoviesSearchSubmit}
        isCheckboxChecked={isMoviesCheckboxChecked}
        onCheckboxChange={onMoviesCheckboxChange}
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
