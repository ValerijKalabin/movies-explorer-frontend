import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import savedCards from '../../utils/savedCards';

function SavedMovies() {

  return (
    <div className="saved-movies">
      <Header isAuthNav={false} />
      <SearchForm />
      <MoviesCardList
        cards={savedCards}
        isSavedMoviesList={true}
        isVisibleButtonMore={false}
      />
      <Footer />
    </div>
  );
}

export default SavedMovies;
