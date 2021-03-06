import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import * as helper from '../../utils/helpers';

function MoviesCard({ card, onClickCardButton }) {
  const location = useLocation();
  const isSavedMoviesList = location.pathname === '/saved-movies';

  function handleClickButton() {
    onClickCardButton(card);
  }

  return (
    <li className="card">
      <div className="card__info">
        <h3 className="card__title">{card.nameRU}</h3>
        <p className="card__duration">{`${card.duration} ${helper.getDurationCaption(card.duration)}`}</p>
      </div>
      <a
        className="card__link"
        href={helper.getTrailerHref(card)}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="card__image"
          src={helper.getCardImage(card)}
          alt={card.nameRU}
        />
      </a>
      <button
        className={`card__button ${!isSavedMoviesList && card.isSaved ? 'card__button_saved' : ''}`}
        type="button"
        onClick={handleClickButton}
      >
        {
          !isSavedMoviesList && card.isSaved &&
          <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 3.75L3.81905 6L9 1.5" stroke="white" stroke-width="1.5"/>
          </svg>
        }
        { !isSavedMoviesList && !card.isSaved && 'Сохранить' }
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
