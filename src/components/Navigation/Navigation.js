import './Navigation.css';
import { Link, NavLink } from 'react-router-dom';

function Navigation() {
  const loggedIn = true;

  return (
    <nav className="navigation">
      {!loggedIn &&
        <ul className="navigation__list">
          <li className="navigation__auth-item">
            <Link to="/signup" className="navigation__signup">Регистрация</Link>
          </li>
          <li className="navigation__auth-item">
            <Link to="/signin" className="navigation__signin">Войти</Link>
          </li>
        </ul>
      }
      {loggedIn &&
        <div className="navigation__main">
          <ul className="navigation__list">
            <li className="navigation__movie-item">
              <NavLink
                to="/movies"
                className="navigation__movie"
                activeClassName="navigation__movie_active"
              >
                Фильмы
              </NavLink>
            </li>
            <li className="navigation__movie-item">
              <NavLink
                to="/saved-movies"
                className="navigation__movie"
                activeClassName="navigation__movie_active"
              >
                Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
          <Link to="/profile" className="navigation__profile">Аккаунт</Link>
        </div>
      }
    </nav>
  );
}

export default Navigation;
