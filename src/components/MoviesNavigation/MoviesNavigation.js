import React from 'react'
import './MoviesNavigation.css';
import { Link, NavLink } from 'react-router-dom';
import iconMenu from '../../images/icon-menu.svg';
import iconClose from '../../images/icon-close.svg';

function MoviesNavigation() {
  const [isVisiblePopup, setVisiblePopup] = React.useState(false);

  function handleClickButtonMenu() {
    setVisiblePopup(true);
  }

  function handleClickButtonClose() {
    setVisiblePopup(false);
  }

  return (
    <nav className="navigation">
      <button className="navigation__button-menu" type="button" onClick={handleClickButtonMenu}>
        <img className="navigation__icon-menu" src={iconMenu} alt="Меню" />
      </button>
      <div className={`navigation__popup ${isVisiblePopup ? 'navigation__popup_visible' : ''}`}>
        <div className="navigation__container">
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
                  className="navigation__link"
                  activeClassName="navigation__link_active"
                >
                  Фильмы
                </NavLink>
              </li>
              <li className="navigation__item">
                <NavLink
                  to="/saved-movies"
                  className="navigation__link"
                  activeClassName="navigation__link_active"
                >
                  Сохранённые фильмы
                </NavLink>
              </li>
            </ul>
          </div>
          <Link to="/profile" className="navigation__profile">Аккаунт</Link>
        </div>
      </div>
    </nav>
  );
}

export default MoviesNavigation;
