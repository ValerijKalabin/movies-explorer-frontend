import './Login.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Login() {
  return (
    <div className="login">
      <div className="login__container">
        <Link to="/" className="login__logo" >
          <img className="login__image" src={logo} alt="Логотип" />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
        <form className="login__form" name="login">
          <label className="login__label" htmlFor="email">E-mail</label>
          <input
            className="login__input"
            id="email"
            name="email"
            type="email"
            placeholder="Ваша почта"
          />
          <label className="login__label" htmlFor="password">Пароль</label>
          <input
            className="login__input"
            id="password"
            name="password"
            type="password"
            placeholder="Ваш пароль"
          />
        </form>
      </div>
      <div className="login__container">
        <button className="login__button" type="submit">Войти</button>
        <div className="login__redirect">
          <p className="login__question">Ещё не зарегистрированы?</p>
          <Link to="/signup" className="login__link">Регистрация</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
