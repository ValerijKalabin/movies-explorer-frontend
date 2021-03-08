import './Promo.css';
import landingLogo from '../../images/landing-logo.svg';
import Header from '../Header/Header';

function Promo() {
  return (
    <section className="promo">
      <Header />
      <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
      <div className="promo__container">
        <img className="promo__logo" src={landingLogo} alt="Логотип Промо" />
      </div>
    </section>
  );
}

export default Promo;
