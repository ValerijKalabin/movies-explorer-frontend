import './Register.css';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../images/logo.svg';
import * as api from '../../utils/MainApi';
import * as helper from '../../utils/helpers';

function Register({ onRegisterSubmit }) {
  const [nameValue, setNameValue] = useState('');
  const [nameError, setNameError] = useState('');
  const [nameValidity, setNameValidity] = useState(false);

  const [emailValue, setEmailValue] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailValidity, setEmailValidity] = useState(false);

  const [passwordValue, setPasswordValue] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordValidity, setPasswordValidity] = useState(false);

  const [isDisabledForm, setDisabledForm] = useState(false);
  const [authErrorMessage, setAuthErrorMessage] = useState('');
  const [buttonCaption, setButtonCaption] = useState('Зарегистрироваться');

  const isDisabledButton = !nameValidity || !emailValidity || !passwordValidity || isDisabledForm;
  const history = useHistory();

  function handleChangeInputName(event) {
    setNameValue(event.target.value);
    setNameError(event.target.validationMessage);
    setNameValidity(event.target.validity.valid);
    setAuthErrorMessage('');
  }

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
    setButtonCaption('Регистрация...');
    api.register(nameValue, emailValue, passwordValue)
      .then(() => {
        api.login(emailValue, passwordValue)
          .then(() => {
            Promise.all([
              api.getUser(),
              api.getSavedMovies()
            ])
              .then(([user, movies]) => {
                onRegisterSubmit(user, movies);
                history.push('/movies');
              });
          });
      })
      .catch((error) => {
        setAuthErrorMessage(helper.getErrorMessage(error));
      })
      .finally(() => {
        setButtonCaption('Зарегистрироваться');
        setDisabledForm(false);
      });
  }

  return (
    <div className="register">
      <div className="register__container">
        <Link to="/" className="register__logo" >
          <img className="register__image" src={logo} alt="Логотип" />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <form
          className="register__form"
          id="register"
          name="register"
          onSubmit={handleSubmitForm}
        >
          <label className="register__label" htmlFor="name">Имя</label>
          <input
            className={`register__input ${nameError ? 'register__input_error' : ''}`}
            id="name"
            name="name"
            type="text"
            placeholder="Ваше имя"
            required
            minLength="2"
            maxLength="30"
            value={nameValue}
            onChange={handleChangeInputName}
            disabled={isDisabledForm}
          />
          {!!nameError && <span className="register__error">{nameError}</span>}
          <label className="register__label" htmlFor="email">E-mail</label>
          <input
            className={`register__input ${emailError ? 'register__input_error' : ''}`}
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
          {!!emailError && <span className="register__error">{emailError}</span>}
          <label className="register__label" htmlFor="password">Пароль</label>
          <input
            className={`register__input ${passwordError ? 'register__input_error' : ''}`}
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
          {!!passwordError && <span className="register__error">{passwordError}</span>}
        </form>
      </div>
      <div className="register__container">
        <div className="register__message-container">
          <p className="register__message-text">{authErrorMessage}</p>
        </div>
        <button
          className={`register__button ${isDisabledButton ? 'register__button_disabled' : ''}`}
          form="register"
          type="submit"
          disabled={isDisabledButton}
        >
          {buttonCaption}
        </button>
        <div className="register__redirect">
          <p className="register__question">Уже зарегистрированы?</p>
          <Link to="/signin" className="register__link">Войти</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
