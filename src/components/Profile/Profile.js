import './Profile.css';
import Header from '../Header/Header';

function Profile() {
  const loggedIn = true;

  return (
    <div className="profile">
      <Header loggedIn={loggedIn} />
      <div className="profile__page">
        <div className="profile__container">
          <h1 className="profile__title">Привет, Виталий!</h1>
          <form className="profile__form" name="profile">
            <div className="profile__form-container">
              <label className="profile__label" htmlFor="name">Имя</label>
              <input className="profile__input" id="name" name="name" type="text" />
            </div>
            <div className="profile__form-container">
              <label className="profile__label" htmlFor="email">Почта</label>
              <input className="profile__input" id="email" name="email" type="email" />
            </div>
          </form>
        </div>
        <div className="profile__container">
          <button className="profile__button" type="submit">Редактировать</button>
          <button className="profile__button profile__button_type_exit" type="button">Выйти из аккаунта</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
