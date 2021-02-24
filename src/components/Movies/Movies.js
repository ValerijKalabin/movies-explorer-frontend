import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import cards from '../../utils/cards';

function Movies() {
  const loggedIn = true;

  return (
    <div className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm />
      <MoviesCardList
        cards={cards}
        isSavedMoviesList={false}
        isVisibleButtonMore={true}
      />
      <Footer />
    </div>
  );
}

export default Movies;
