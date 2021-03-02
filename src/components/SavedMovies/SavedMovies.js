import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies({ selectedMovies, onClickCardButton }) {
  return (
    <div className="saved-movies">
      <Header />
      <SearchForm />
      <MoviesCardList
        cards={selectedMovies}
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
