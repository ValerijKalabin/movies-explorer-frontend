import './Profile.css';
import Header from '../Header/Header';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as api from '../../utils/MainApi';

function Profile({ setCurrentUser }) {
  const [exitButtonCaption, setExitButtonCaption] = useState('Выйти из аккаунта');

  const history = useHistory();

  function handleClickExitButton() {
    setExitButtonCaption('Выхожу...');
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
      <Header isAuthNav={false} />
      <div className="profile__page">
        <div className="profile__container">
          <h1 className="profile__title">Привет, Виталий!</h1>
          <form className="profile__form" name="profile">
            <label className="profile__label profile__label_type_name" htmlFor="name">Имя</label>
            <label className="profile__label profile__label_type_email" htmlFor="email">Почта</label>
            <input
              className="profile__input profile__input_type_name"
              id="name"
              name="name"
              type="text"
              placeholder="Ваше имя"
              required
              minLength="2"
              maxLength="30"
            />
            <input
              className="profile__input profile__input_type_email"
              id="email"
              name="email"
              type="email"
              placeholder="Ваша почта"
              required
              minLength="5"
              maxLength="30"
            />
          </form>
        </div>
        <div className="profile__container">
          <button className="profile__button" type="submit" disabled>Редактировать</button>
          <button
            className="profile__button profile__button_type_exit"
            type="button"
            onClick={handleClickExitButton}
          >
            {exitButtonCaption}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
