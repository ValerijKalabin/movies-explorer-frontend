import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({
  cards,
  messageNoMovies,
  isVisiblePreloader,
  isVisibleButtonMore,
  onClickMoreButton,
  onClickCardButton
}) {
  const isVisibleMessage = !cards.length;
  const isVisibleCards = !!cards.length;

  return (
    <section className="cards">
      {
        isVisibleMessage &&
        <p className="cards__message">{messageNoMovies}</p>
      }
      {
        isVisibleCards &&
        <ul className="cards__list">
          {cards.map((card) => (
            <MoviesCard
              key={card._id}
              card={card}
              onClickCardButton={onClickCardButton}
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
          onClick={onClickMoreButton}
        >
          Ещё
        </button>
      }
      <Preloader isVisiblePreloader={isVisiblePreloader} />
    </section>
  )
}

export default MoviesCardList;
