import './AboutMe.css';
import photo from '../../images/wel.jpg';

function AboutMe() {
  return (
    <section className="student">
      <h2 className="student__title">Студент</h2>
      <div className="student__container">
        <div className="student__info">
          <div className="student__profile">
            <h3 className="student__name">Валерий</h3>
            <p className="student__profession">Веб-разработчик</p>
            <p className="student__description">
              Я родился в городе Прокопьевске Кемеровской области.
              Окончил Сибирский металлургический институт в городе Новокузнецке
              по специальности промышленная электроника. Сейчас живу в Новосибирске.
              У меня есть жена, дочь и сын. Я люблю слушать музыку и увлекаюсь
              веб-разработкой.
            </p>
          </div>
          <ul className="student__list">
            <li className="student__item">
              <a
                className="student__link"
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
            </li>
            <li className="student__item">
              <a
                className="student__link"
                href="https://github.com/ValerijKalabin"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
          </ul>
        </div>
        <img className="student__photo" src={photo} alt="Фото" />
      </div>
    </section>
  );
}

export default AboutMe;
