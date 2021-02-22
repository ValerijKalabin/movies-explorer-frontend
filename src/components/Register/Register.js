import './Register.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Register() {
 return (
    <div className="register">
      <div className="register__container">
        <Link to="/" className="register__logo" >
          <img className="register__image" src={logo} alt="Логотип" />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <form className="register__form" name="register">
          <label className="register__label" htmlFor="name">Имя</label>
          <input
            className="register__input"
            id="name"
            name="name"
            type="text"
            placeholder="Ваше имя"
          />
          <label className="register__label" htmlFor="email">E-mail</label>
          <input
            className="register__input"
            id="email"
            name="email"
            type="email"
            placeholder="Ваша почта"
          />
          <label className="register__label" htmlFor="password">Пароль</label>
          <input
            className="register__input"
            id="password"
            name="password"
            type="password"
            placeholder="Ваш пароль"
          />
        </form>
      </div>
      <div className="register__container">
        <button className="register__button" type="submit">Зарегистрироваться</button>
        <div className="register__redirect">
          <p className="register__question">Уже зарегистрированы?</p>
          <Link to="/signin" className="register__link">Войти</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
