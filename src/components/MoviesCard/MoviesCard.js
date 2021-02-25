import './MoviesCard.css';
import imageSaved from '../../images/card-saved.svg';
import noImage from '../../images/no-image.jpg';
import { getDurationCaption } from '../../utils/helpers';

function MoviesCard({ card, isSavedMoviesList }) {
  const cardImage = card.image ? `https://api.nomoreparties.co${card.image.url}` : noImage;
  return (
    <li className="card">
      <div className="card__info">
        <h3 className="card__title">{card.nameRU}</h3>
        <p className="card__duration">{`${card.duration} ${getDurationCaption(card.duration)}`}</p>
      </div>
      <a
        className="card__link"
        href={card.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img className="card__image" src={cardImage} alt={card.nameRU} />
      </a>
      <button
        className={`card__button ${card.caption && !isSavedMoviesList ? 'card__button_disabled' : ''}`}
        disabled={card.caption && !isSavedMoviesList}
        type="button"
      >
        { !isSavedMoviesList && card.caption && <img src={imageSaved} alt="Сохранено" /> }
        { !isSavedMoviesList && !card.caption && 'Сохранить' }
        {
          isSavedMoviesList &&
          <svg width="8" height="7" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.06077 3.3822L7.30003 1.14294L6.23937 0.0822754L4.00011 2.32154L1.76097 0.0823915L0.700309 1.14305L2.93945 3.3822L0.58252 5.73913L1.64318 6.79979L4.00011 4.44286L6.35716 6.79991L7.41782 5.73925L5.06077 3.3822Z" fill="black"/>
          </svg>
        }
      </button>
    </li>
  );
}

export default MoviesCard;
