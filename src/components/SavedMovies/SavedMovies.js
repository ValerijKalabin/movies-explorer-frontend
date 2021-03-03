import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { useEffect, useState } from 'react';
import * as helper from '../../utils/helpers';

function SavedMovies({ selectedMovies, onClickCardButton }) {
  const [searchValue, setSearchValue] = useState('');
  const [isCheckboxChecked, setCheckboxChecked] = useState(false);
  const [currentMovies, setCurrentMovies] = useState(selectedMovies);

  function handleSearchSubmit(value) {
    setSearchValue(value);
  }

  function handleCheckboxChange() {
    setCheckboxChecked(!isCheckboxChecked);
  }

  useEffect(() => {
    const moviesFound = helper.searchFilter(selectedMovies, searchValue);
    const moviesFiltered = helper.durationFilter(moviesFound, isCheckboxChecked);
    setCurrentMovies(moviesFiltered);
  }, [selectedMovies, searchValue, isCheckboxChecked]);

  return (
    <div className="saved-movies">
      <Header />
      <SearchForm
        onSearchSubmit={handleSearchSubmit}
        isCheckboxChecked={isCheckboxChecked}
        onCheckboxChange={handleCheckboxChange}
      />
      <MoviesCardList
        cards={currentMovies}
        messageNoMovies=''
        isVisiblePreloader={false}
        isVisibleButtonMore={false}
        onClickCardButton={onClickCardButton}
      />
      <Footer />
    </div>
  );
}

export default SavedMovies;
