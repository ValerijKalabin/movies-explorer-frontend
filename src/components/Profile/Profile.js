import './Profile.css';
import Header from '../Header/Header';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import * as api from '../../utils/MainApi';
import * as helper from '../../utils/helpers';

function Profile({ setCurrentUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [exitButtonCaption, setExitButtonCaption] = useState('Выйти из аккаунта');
  const [submitButtonCaption, setSubmitButtonCaption] = useState('Сохранить');
  const [messageResultEdit, setMessageRusultEdit] = useState('');
  const [isVisibleSubmitButton, setVisibleSubmitButton] = useState(false);
  const [isDisabledInput, setDisabledInput] = useState(true);
  const [updateProfileStatus, setUpdateProfileStatus] = useState(false);

  const [nameValue, setNameValue] = useState(currentUser.name);
  const [nameError, setNameError] = useState('');
  const [nameValidity, setNameValidity] = useState(true);

  const [emailValue, setEmailValue] = useState(currentUser.email);
  const [emailError, setEmailError] = useState('');
  const [emailValidity, setEmailValidity] = useState(true);

  const isDisabledSubmitButton = !nameValidity || !emailValidity;
  const history = useHistory();

  function handleClickEditButton() {
    setDisabledInput(false);
    setVisibleSubmitButton(true);
  }

  function handleChangeNameInput(event) {
    setNameValue(event.target.value);
    setNameError(event.target.validationMessage);
    setNameValidity(event.target.validity.valid);
    setMessageRusultEdit('');
    setUpdateProfileStatus(false);
    setSubmitButtonCaption('Сохранить');
  }

  function handleChangeEmailInput(event) {
    setEmailValue(event.target.value);
    setEmailError(event.target.validationMessage);
    setEmailValidity(event.target.validity.valid);
    setMessageRusultEdit('');
    setUpdateProfileStatus(false);
    setSubmitButtonCaption('Сохранить');
  }

  function handleSubmitForm(event) {
    event.preventDefault();
    if(!updateProfileStatus) {
      setMessageRusultEdit('');
      setSubmitButtonCaption('Сохранение...');
      api.updateProfile(nameValue, emailValue)
        .then((user) => {
          setCurrentUser(user);
          setMessageRusultEdit('Данные профиля успешно обновлены!');
          setUpdateProfileStatus(true);
          setSubmitButtonCaption('OK');
        })
        .catch((error) => {
          setMessageRusultEdit(helper.getErrorMessage(error));
          setSubmitButtonCaption('Сохранить');
        });
    } else {
      setMessageRusultEdit('');
      setUpdateProfileStatus(false);
      setSubmitButtonCaption('Сохранить');
      setDisabledInput(true);
      setVisibleSubmitButton(false);
    }
  }

  function handleClickExitButton() {
    setExitButtonCaption('Выход из аккаунта...');
    api.logout()
      .then(() => {
        setCurrentUser({});
        history.push('/');
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setExitButtonCaption('Выйти из аккаунта');
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
              disabled={isDisabledInput}
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
              disabled={isDisabledInput}
              onChange={handleChangeEmailInput}
            />
            <span className="profile__error profile__error_type_email">{emailError}</span>
          </form>
        </div>
        <div className="profile__container">
          <div className="profile__message-container">
            <p className="profile__message-text">{messageResultEdit}</p>
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
