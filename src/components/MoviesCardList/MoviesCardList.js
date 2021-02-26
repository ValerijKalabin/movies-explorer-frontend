import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({
  cards,
  isSavedMoviesList,
  isVisibleButtonMore,
  isVisiblePreloader
}) {
  return (
    <section className="cards">
      <ul className="cards__list">
        {cards.map((card, index) => (
          <MoviesCard
            key={'key' + index}
            card={card}
            isSavedMoviesList={isSavedMoviesList}
          />
        ))}
      </ul>
      {
        isVisibleButtonMore &&
        <button
          className="cards__button"
          type="button"
          name="more"
        >
          Ещё
        </button>
      }
      <Preloader isVisiblePreloader={isVisiblePreloader} />
    </section>
  )
}

export default MoviesCardList;
