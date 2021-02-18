import './MoviesCard.css';
import imageSaved from '../../images/card-saved.svg';
import imageDelete from '../../images/card-delete.svg';

function MoviesCard({ card, isSavedMoviesList }) {
  return (
    <li className="card">
      <div className="card__info">
        <h3 className="card__title">{card.title}</h3>
        <p className="card__duration">{card.duration}</p>
      </div>
      <img className="card__image" src={card.image} alt={card.title} />
      <button
        className={`card__button ${card.saved && !isSavedMoviesList ? 'card__button_disabled' : ''}`}
        disabled={card.saved && !isSavedMoviesList}
        type="button"
      >
        { !isSavedMoviesList && card.saved && <img src={imageSaved} alt="Сохранено" /> }
        { !isSavedMoviesList && !card.saved && 'Сохранить' }
        { isSavedMoviesList && <img src={imageDelete} alt="Удалить" /> }
      </button>
    </li>
  );
}

export default MoviesCard;
