import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({
  cards,
  isSavedMoviesList,
  isVisibleButtonMore
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
    </section>
  )
}

export default MoviesCardList;
