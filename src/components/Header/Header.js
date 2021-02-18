import './Header.css';
import headerLogo from '../../images/header-logo.svg';
import Navigation from '../Navigation/Navigation';

function Header() {
  return (
    <div className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип" />
      <Navigation />
    </div>
  );
}

export default Header;
