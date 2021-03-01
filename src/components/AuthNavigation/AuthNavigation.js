import './AuthNavigation.css';
import { Link } from 'react-router-dom';

function AuthNavigation() {
  return (
    <nav className="auth">
      <ul className="auth__list">
        <li className="auth__item">
          <Link to="/signup" className="auth__link auth__link_type_signup">Регистрация</Link>
        </li>
        <li className="auth__item">
          <Link to="/signin" className="auth__link auth__link_type_signin">Войти</Link>
        </li>
      </ul>
    </nav>
  );
}

export default AuthNavigation;
