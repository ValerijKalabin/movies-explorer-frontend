import './Header.css';
import { Link } from 'react-router-dom';
import headerLogo from '../../images/header-logo.svg';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn }) {
  return (
    <div className="header">
      <Link to="/" className="header__link">
        <img className="header__logo" src={headerLogo} alt="Логотип" />
      </Link>
      <Navigation loggedIn={loggedIn} />
    </div>
  );
}

export default Header;
