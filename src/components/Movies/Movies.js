import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';

function Movies() {
  const loggedIn = true;

  return (
    <div className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm />
      <Footer />
    </div>
  );
}

export default Movies;
