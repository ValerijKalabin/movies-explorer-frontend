import './Header.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import AuthNavigation from '../AuthNavigation/AuthNavigation';
import MoviesNavigation from '../MoviesNavigation/MoviesNavigation';

function Header({ isAuthNav }) {
  return (
    <div className="header">
      <Link to="/" className="header__link">
        <img className="header__logo" src={logo} alt="Логотип" />
      </Link>
      {isAuthNav && <AuthNavigation />}
      {!isAuthNav && <MoviesNavigation />}
    </div>
  );
}

export default Header;
