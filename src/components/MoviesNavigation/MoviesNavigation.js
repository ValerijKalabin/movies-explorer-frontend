import './MoviesNavigation.css';
import iconClose from '../../images/icon-close.svg';
import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

function MoviesNavigation() {
  const [isVisiblePopup, setVisiblePopup] = useState(false);
  const location = useLocation();
  const isPromoStyle = location.pathname === '/';

  function handleClickButtonMenu() {
    setVisiblePopup(true);
  }

  function handleClickButtonClose() {
    setVisiblePopup(false);
  }

  return (
    <nav className="navigation">
      <button className="navigation__button-menu" type="button" onClick={handleClickButtonMenu}>
        <svg
          className={`navigation__icon-menu ${isPromoStyle ? 'navigation__icon-menu_style_promo' : ''}`}
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill-rule="evenodd" clip-rule="evenodd" d="M36 14L8 14V11L36 11V14Z" fill="black"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M36 24L8 24V21L36 21V24Z" fill="black"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M36 34L8 34V31L36 31V34Z" fill="black"/>
        </svg>
      </button>
      <div className={`navigation__popup ${isVisiblePopup ? 'navigation__popup_visible' : ''}`}>
        <div className={`navigation__container ${isVisiblePopup ? 'navigation__container_visible' : ''}`}>
          <div className="navigation__list-container">
            <button className="navigation__button-close" type="button" onClick={handleClickButtonClose}>
              <img className="navigation__icon-close" src={iconClose} alt="Закрыть" />
            </button>
            <ul className="navigation__list">
              <li className="navigation__item navigation__item_type_main">
                <Link to="/" className="navigation__link">Главная</Link>
              </li>
              <li className="navigation__item">
                <NavLink
                  to="/movies"
                  className={`navigation__link ${isPromoStyle ? 'navigation__link_style_promo' : ''}`}
                  activeClassName="navigation__link_active"
                >
                  Фильмы
                </NavLink>
              </li>
              <li className="navigation__item">
                <NavLink
                  to="/saved-movies"
                  className={`navigation__link ${isPromoStyle ? 'navigation__link_style_promo' : ''}`}
                  activeClassName="navigation__link_active"
                >
                  Сохранённые фильмы
                </NavLink>
              </li>
            </ul>
          </div>
          <NavLink
            to="/profile"
            className={`navigation__profile ${isPromoStyle ? 'navigation__profile_style_promo' : ''}`}
            activeClassName="navigation__profile_active"
          >
            Аккаунт
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default MoviesNavigation;
