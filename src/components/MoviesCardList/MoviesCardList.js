import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({
  cards,
  isSavedMoviesList,
  notCardsMessage,
  isVisiblePreloader,
  isVisibleButtonMore,
  onButtonMoreClick
}) {
  const isVisibleMessage = !cards.length;
  const isVisibleCards = !!cards.length;
  return (
    <section className="cards">
      {
        isVisibleMessage &&
        <p className="cards__message">{notCardsMessage}</p>
      }
      {
        isVisibleCards &&
        <ul className="cards__list">
          {cards.map((card, index) => (
            <MoviesCard
              key={'key' + index}
              card={card}
              isSavedMoviesList={isSavedMoviesList}
            />
          ))}
        </ul>
      }
      {
        isVisibleButtonMore &&
        <button
          className="cards__button"
          type="button"
          name="more"
          onClick={onButtonMoreClick}
        >
          Ещё
        </button>
      }
      <Preloader isVisiblePreloader={isVisiblePreloader} />
    </section>
  )
}

export default MoviesCardList;
