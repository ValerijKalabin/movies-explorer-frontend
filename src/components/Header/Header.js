import './Header.css';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import AuthNavigation from '../AuthNavigation/AuthNavigation';
import MoviesNavigation from '../MoviesNavigation/MoviesNavigation';

function Header() {
  const currentUser = useContext(CurrentUserContext);
  const loggedIn = !!currentUser.email;

  return (
    <div className="header">
      <Link to="/" className="header__link">
        <img className="header__logo" src={logo} alt="Логотип" />
      </Link>
      {!loggedIn && <AuthNavigation />}
      {loggedIn && <MoviesNavigation />}
    </div>
  );
}

export default Header;
