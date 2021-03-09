import './Profile.css';
import Header from '../Header/Header';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import * as api from '../../utils/MainApi';
import * as helper from '../../utils/helpers';
import {
  SUCCESSFUL_PROFILE_UPDATE,
  SERVER_ERROR_MESSAGE
} from '../../utils/constants';

function Profile({ onSubmitProfileForm, onClickExitButton }) {
  const currentUser = useContext(CurrentUserContext);

  const [exitButtonCaption, setExitButtonCaption] = useState('Выйти из аккаунта');
  const [submitButtonCaption, setSubmitButtonCaption] = useState('Сохранить');
  const [requestResultMessage, setRequestResultMessage] = useState('');
  const [isDisabledExitButton, setDisabledExitButton] = useState(false);
  const [isVisibleSubmitButton, setVisibleSubmitButton] = useState(false);
  const [isDisabledForm, setDisabledForm] = useState(true);
  const [updateProfileStatus, setUpdateProfileStatus] = useState(false);

  const [nameValue, setNameValue] = useState(currentUser.name);
  const [nameError, setNameError] = useState('');
  const [nameValidity, setNameValidity] = useState(true);

  const [emailValue, setEmailValue] = useState(currentUser.email);
  const [emailError, setEmailError] = useState('');
  const [emailValidity, setEmailValidity] = useState(true);

  const isDisabledSubmitButton = (
    (nameValue === currentUser.name && emailValue === currentUser.email)
    || !nameValidity
    || !emailValidity
    || isDisabledForm
  ) && !updateProfileStatus;
  const history = useHistory();

  function handleClickEditButton() {
    setDisabledForm(false);
    setVisibleSubmitButton(true);
    setRequestResultMessage('');
  }

  function handleChangeNameInput(event) {
    setNameValue(event.target.value);
    setNameError(event.target.validationMessage);
    setNameValidity(event.target.validity.valid);
    setRequestResultMessage('');
    setUpdateProfileStatus(false);
    setSubmitButtonCaption('Сохранить');
  }

  function handleChangeEmailInput(event) {
    setEmailValue(event.target.value);
    setEmailError(event.target.validationMessage);
    setEmailValidity(event.target.validity.valid);
    setRequestResultMessage('');
    setUpdateProfileStatus(false);
    setSubmitButtonCaption('Сохранить');
  }

  function handleSubmitForm(event) {
    event.preventDefault();
    if(!updateProfileStatus) {
      setDisabledForm(true);
      setRequestResultMessage('');
      setSubmitButtonCaption('Сохранение...');
      api.updateProfile(nameValue, emailValue)
        .then((user) => {
          onSubmitProfileForm(user);
          setRequestResultMessage(SUCCESSFUL_PROFILE_UPDATE);
          setUpdateProfileStatus(true);
          setSubmitButtonCaption('OK');
        })
        .catch((error) => {
          setRequestResultMessage(helper.getErrorMessage(error));
          setSubmitButtonCaption('Сохранить');
        })
        .finally(() => {
          setDisabledForm(false);
        });
    } else {
      setRequestResultMessage('');
      setUpdateProfileStatus(false);
      setSubmitButtonCaption('Сохранить');
      setDisabledForm(true);
      setVisibleSubmitButton(false);
    }
  }

  function handleClickExitButton() {
    setDisabledExitButton(true);
    setRequestResultMessage('');
    setExitButtonCaption('Выход из аккаунта...');
    api.logout()
      .then(() => {
        onClickExitButton();
        history.push('/');
      })
      .catch(() => {
        setRequestResultMessage(SERVER_ERROR_MESSAGE);
      })
      .finally(() => {
        setExitButtonCaption('Выйти из аккаунта');
        setDisabledExitButton(false);
      });
  }

  return (
    <div className="profile">
      <Header />
      <div className="profile__page">
        <div className="profile__container">
          <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
          <form
            className="profile__form"
            id="profile"
            name="profile"
            onSubmit={handleSubmitForm}
          >
            <label className="profile__label profile__label_type_name" htmlFor="name">Имя</label>
            <label className="profile__label profile__label_type_email" htmlFor="email">Почта</label>
            <span className="profile__error profile__error_type_name">{nameError}</span>
            <input
              className={`profile__input profile__input_type_name ${nameError ? 'profile__input_error' : ''}`}
              id="name"
              name="name"
              type="text"
              placeholder="Ваше имя"
              required
              minLength="2"
              maxLength="30"
              value={nameValue}
              disabled={isDisabledForm}
              onChange={handleChangeNameInput}
            />
            <input
              className={`profile__input profile__input_type_email ${emailError ? 'profile__input_error' : ''}`}
              id="email"
              name="email"
              type="email"
              placeholder="Ваша почта"
              required
              minLength="5"
              maxLength="30"
              value={emailValue}
              disabled={isDisabledForm}
              onChange={handleChangeEmailInput}
            />
            <span className="profile__error profile__error_type_email">{emailError}</span>
          </form>
        </div>
        <div className="profile__container">
          <div className="profile__message-container">
            <p className="profile__message-text">{requestResultMessage}</p>
          </div>
          {
            !isVisibleSubmitButton &&
            <button
              className="profile__button"
              type="button"
              onClick={handleClickEditButton}
            >
              Редактировать
            </button>
          }
          {
            !isVisibleSubmitButton &&
            <button
              className="profile__button profile__button_type_exit"
              type="button"
              onClick={handleClickExitButton}
              disabled={isDisabledExitButton}
            >
              {exitButtonCaption}
            </button>
          }
          {
            isVisibleSubmitButton &&
            <button
              className={`profile__submit ${isDisabledSubmitButton ? 'profile__submit_disabled' : ''}`}
              type="submit"
              form="profile"
              disabled={isDisabledSubmitButton}
            >
              {submitButtonCaption}
            </button>
          }
        </div>
      </div>
    </div>
  );
}

export default Profile;
