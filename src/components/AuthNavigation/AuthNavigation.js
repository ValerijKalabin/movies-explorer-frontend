import './AuthNavigation.css';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function AuthNavigation() {
  const currentUser = useContext(CurrentUserContext);
  const loggedIn = !!currentUser.email;

  return (
    <nav className="auth">
      <ul className="auth__list">
        <li className="auth__item">
          <Link
            to={!loggedIn ? '/signup' : '/movies'}
            className="auth__link auth__link_type_signup"
          >
            Регистрация
          </Link>
        </li>
        <li className="auth__item">
          <Link
            to={!loggedIn ? '/signin' : '/movies'}
            className="auth__link auth__link_type_signin"
          >
            Войти
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default AuthNavigation;
