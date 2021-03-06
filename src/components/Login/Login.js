import './Login.css';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../images/logo.svg';
import * as api from '../../utils/MainApi';
import * as helper from '../../utils/helpers';

function Login({ onSubmitLoginForm }) {
  const [emailValue, setEmailValue] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailValidity, setEmailValidity] = useState(false);

  const [passwordValue, setPasswordValue] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordValidity, setPasswordValidity] = useState(false);

  const [isDisabledForm, setDisabledForm] = useState(false);
  const [authErrorMessage, setAuthErrorMessage] = useState('');
  const [buttonCaption, setButtonCaption] = useState('Войти');

  const isDisabledButton = !emailValidity || !passwordValidity || isDisabledForm;
  const history = useHistory();

  function handleChangeInputEmail(event) {
    setEmailValue(event.target.value);
    setEmailError(event.target.validationMessage);
    setEmailValidity(event.target.validity.valid);
    setAuthErrorMessage('');
  }

  function handleChangeInputPassword(event) {
    setPasswordValue(event.target.value);
    setPasswordError(event.target.validationMessage);
    setPasswordValidity(event.target.validity.valid);
    setAuthErrorMessage('');
  }

  function handleSubmitForm(event) {
    event.preventDefault();
    setDisabledForm(true);
    setAuthErrorMessage('');
    setButtonCaption('Авторизация...');
    api.login(emailValue, passwordValue)
      .then(() => {
        Promise.all([
          api.getUser(),
          api.getSavedMovies()
        ])
          .then(([user, movies]) => {
            onSubmitLoginForm(user, movies);
            history.push('/movies');
          });
      })
      .catch((error) => {
        setAuthErrorMessage(helper.getErrorMessage(error));
      })
      .finally(() => {
        setButtonCaption('Войти');
        setDisabledForm(false);
      });
  }

  return (
    <div className="login">
      <div className="login__container">
        <Link to="/" className="login__logo" >
          <img className="login__image" src={logo} alt="Логотип" />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
        <form
          className="login__form"
          id="login"
          name="login"
          onSubmit={handleSubmitForm}
        >
          <label className="login__label" htmlFor="email">E-mail</label>
          <input
            className={`login__input ${emailError ? 'login__input_error' : ''}`}
            id="email"
            name="email"
            type="email"
            placeholder="Ваша почта"
            required
            minLength="5"
            maxLength="30"
            value={emailValue}
            onChange={handleChangeInputEmail}
            disabled={isDisabledForm}
          />
          {!!emailError && <span className="login__error">{emailError}</span>}
          <label className="login__label" htmlFor="password">Пароль</label>
          <input
            className={`login__input ${passwordError ? 'login__input_error' : ''}`}
            id="password"
            name="password"
            type="password"
            placeholder="Ваш пароль"
            required
            minLength="6"
            value={passwordValue}
            onChange={handleChangeInputPassword}
            disabled={isDisabledForm}
          />
          {!!passwordError && <span className="login__error">{passwordError}</span>}
        </form>
      </div>
      <div className="login__container">
        <div className="login__message-container">
          <p className="login__message-text">{authErrorMessage}</p>
        </div>
        <button
          className={`login__button ${isDisabledButton ? 'login__button_disabled' : ''}`}
          form="login"
          type="submit"
          disabled={isDisabledButton}
        >
          {buttonCaption}
        </button>
        <div className="login__redirect">
          <p className="login__question">Ещё не зарегистрированы?</p>
          <Link to="/signup" className="login__link">Регистрация</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
